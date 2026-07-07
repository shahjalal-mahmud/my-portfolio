// src/features/chatbot/services/aiService.js
//
// PHASE 2 — Google Gemini Free Tier integration.
//
// Public surface (signatures preserved from Phase 1 so no consumer changes):
//   • initializeChat()                 — boot conversation, hydrate session
//   • sendMessage(text, {onChunk, signal}) — stream a reply
//   • clearConversation(id?)           — reset transcript + cached session
//   • cancelRequest()                  — abort in-flight stream
//   • isRequestActive()                — typing-indicator helper
//   • TYPING_DELAY_MS                  — re-export from config
//
// Plus the error / utility surface:
//   • AiServiceError                   — single typed error with `code`
//   • AI_ERROR_CODES                   — string-enum of known codes
//   • humanizeError(err)               — error → user-facing string
//   • buildHistoryFromMessages(messages) — rebuild Gemini history from transcript

import { GoogleGenAI } from "@google/genai";

import { AI_MODEL, CHAT_SURFACE } from "../config/chatbot.config";
import { buildSystemPrompt } from "./systemPrompt";
import { buildContext } from "./contextProvider";

// ─── Errors ──────────────────────────────────────────────────────────────────

/**
 * String-enum of error categories the service can surface.
 * Consumers branch on `err.code` to render friendly messages.
 */
export const AI_ERROR_CODES = Object.freeze({
  MISSING_API_KEY: "MISSING_API_KEY",
  INVALID_API_KEY: "INVALID_API_KEY",
  RATE_LIMIT: "RATE_LIMIT",
  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
  TIMEOUT: "TIMEOUT",
  NETWORK: "NETWORK",
  CANCELLED: "CANCELLED",
  INVALID_RESPONSE: "INVALID_RESPONSE",
  UNKNOWN: "UNKNOWN",
});

/**
 * Single typed error class for the AI service. Carries a stable `code`
 * for callers (no `instanceof` checks needed) and the original `cause`
 * for debugging.
 */
export class AiServiceError extends Error {
  /**
   * @param {string} message
   * @param {keyof typeof AI_ERROR_CODES} code
   * @param {Error} [cause]
   */
  constructor(message, code = AI_ERROR_CODES.UNKNOWN, cause) {
    super(message);
    this.name = "AiServiceError";
    this.code = code;
    if (cause) this.cause = cause;
  }
}

/**
 * Map a thrown error to a short user-facing message. The mapping lives here
 * (not in useChat) so the service is the single source of truth for what
 * the user sees.
 *
 * @param {unknown} err
 * @returns {string}
 */
export function humanizeError(err) {
  if (!err || typeof err !== "object") {
    return "Something went wrong. Please try again.";
  }
  const code = /** @type {{ code?: string }} */ (err).code;
  switch (code) {
    case AI_ERROR_CODES.MISSING_API_KEY:
      return "The assistant isn't configured yet (missing API key). Add VITE_GEMINI_API_KEY to enable it.";
    case AI_ERROR_CODES.INVALID_API_KEY:
      return "The API key was rejected. Please verify VITE_GEMINI_API_KEY and try again.";
    case AI_ERROR_CODES.RATE_LIMIT:
      return "Hit a rate limit just now. Wait a few seconds and try again.";
    case AI_ERROR_CODES.QUOTA_EXCEEDED:
      return "The free-tier quota is exhausted for now. Please try again later.";
    case AI_ERROR_CODES.TIMEOUT:
      return "The request took too long. Please try again.";
    case AI_ERROR_CODES.NETWORK:
      return "Network unavailable. Check your connection and try again.";
    case AI_ERROR_CODES.CANCELLED:
      return "Request cancelled.";
    case AI_ERROR_CODES.INVALID_RESPONSE:
      return "Received an unexpected response from the assistant. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

// ─── Friendly error mapping from SDK errors ───────────────────────────────────

/**
 * Translate a Gemini SDK / fetch error into a typed `AiServiceError`.
 * The SDK + browser fetch layer each throw differently; we inspect both.
 *
 * @param {unknown} err
 * @returns {AiServiceError}
 */
function normalizeError(err) {
  if (err instanceof AiServiceError) return err;

  /** @type {any} */
  const e = err;
  const status =
    e?.status ||
    e?.response?.status ||
    e?.error?.code ||
    e?.code ||
    undefined;
  const message = (typeof e?.message === "string" ? e.message : "") || "";

  // User-initiated cancellation always wins.
  if (e?.name === "AbortError" || /aborted/i.test(message)) {
    return new AiServiceError("Request was cancelled.", AI_ERROR_CODES.CANCELLED, /** @type {Error} */ (err));
  }

  if (status === 401 || /api[_-]?key.*invalid/i.test(message) || /unauthenticated/i.test(message)) {
    return new AiServiceError("Invalid API key.", AI_ERROR_CODES.INVALID_API_KEY, /** @type {Error} */ (err));
  }
  if (status === 403 || /forbidden/i.test(message)) {
    return new AiServiceError("API key forbidden.", AI_ERROR_CODES.INVALID_API_KEY, /** @type {Error} */ (err));
  }
  if (status === 429) {
    // Gemini uses 429 for both rate limit and quota. We treat "rateLimitExceeded"
    // as transient (RATE_LIMIT, retried) and "quotaExceeded" / "RESOURCE_EXHAUSTED"
    // as terminal (QUOTA_EXCEEDED, not retried).
    const reason =
      e?.error?.status || e?.errorDetails?.[0]?.reason || e?.details || "";
    if (/quota/i.test(reason) || /RESOURCE_EXHAUSTED/i.test(message)) {
      return new AiServiceError("Quota exceeded.", AI_ERROR_CODES.QUOTA_EXCEEDED, /** @type {Error} */ (err));
    }
    return new AiServiceError("Rate limited.", AI_ERROR_CODES.RATE_LIMIT, /** @type {Error} */ (err));
  }
  if (status === 400 || /invalid argument/i.test(message)) {
    return new AiServiceError("Invalid request.", AI_ERROR_CODES.INVALID_RESPONSE, /** @type {Error} */ (err));
  }
  if (typeof status === "number" && status >= 500) {
    return new AiServiceError("Provider error.", AI_ERROR_CODES.NETWORK, /** @type {Error} */ (err));
  }
  if (/network|fetch|failed to fetch|TypeError/i.test(message)) {
    return new AiServiceError("Network failure.", AI_ERROR_CODES.NETWORK, /** @type {Error} */ (err));
  }
  return new AiServiceError(message || "Unknown error.", AI_ERROR_CODES.UNKNOWN, /** @type {Error} */ (err));
}

// ─── Client + session management ──────────────────────────────────────────────

/** @type {GoogleGenAI | null} */
let client = null;
/** @type {any | null} */ // Chat instance from @google/genai
let chatSession = null;

/**
 * Read the API key from Vite env. Returns empty string (NOT undefined) when
 * missing so callers can produce a single, clear error.
 *
 * @returns {string}
 */
function readApiKey() {
  // Vite exposes env vars through `import.meta.env`. VITE_* are inlined into
  // the bundle at build time.
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return typeof key === "string" ? key.trim() : "";
}

/**
 * Lazily build the Gemini client. Throws a typed error if the key is
 * missing so consumers can surface it before any request is sent.
 *
 * @returns {GoogleGenAI}
 */
function getClient() {
  if (client) return client;
  const apiKey = readApiKey();
  if (!apiKey) {
    throw new AiServiceError(
      "VITE_GEMINI_API_KEY is not set.",
      AI_ERROR_CODES.MISSING_API_KEY
    );
  }
  // The new SDK uses `apiKey` (string) and accepts additional `httpOptions`
  // for custom fetch impls. We keep it minimal.
  client = new GoogleGenAI({ apiKey });
  return client;
}

/**
 * Build the `config` block Gemini expects. Maps every AI_MODEL knob
 * one-to-one so config tweaks flow through automatically.
 *
 * @param {string} [systemInstructionAdditions]
 * @returns {Record<string, unknown>}
 */
function buildGenerationConfig(systemInstructionAdditions = "") {
  const baseInstruction = buildSystemPrompt();
  const systemInstruction = systemInstructionAdditions
    ? `${baseInstruction}\n\n${systemInstructionAdditions}`
    : baseInstruction;

  return {
    systemInstruction,
    temperature: AI_MODEL.temperature,
    topP: AI_MODEL.topP,
    topK: AI_MODEL.topK,
    maxOutputTokens: AI_MODEL.maxOutputTokens,
  };
}

/**
 * Map a transcript `Message` to a Gemini history entry.
 *
 * Gemini's chat history uses `{ role: "user" | "model", parts: [{text}] }`.
 * We skip empty / pending / error rows so the rebuild never feeds garbage
 * to the model.
 *
 * @param {import('../types/chat.types').Message[]} messages
 * @returns {Array<{ role: "user" | "model", parts: Array<{ text: string }> }>}
 */
export function buildHistoryFromMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && !m.pending && !m.error && typeof m.content === "string" && m.content.length > 0)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
}

/**
 * Get (or lazily build) the chat session. Rebuilds history from the caller's
 * transcript on first use after a reload so multi-turn context survives.
 *
 * @param {import('../types/chat.types').Message[]} [history]
 * @returns {any} The Gemini Chat object (SDK type elided for portability).
 */
function getOrCreateChatSession(history = []) {
  if (chatSession) return chatSession;
  const ai = getClient();
  chatSession = ai.chats.create({
    model: AI_MODEL.model,
    config: buildGenerationConfig(),
    history: buildHistoryFromMessages(history),
  });
  return chatSession;
}

/**
 * Determine whether an error is transient and worth retrying.
 * @param {unknown} err
 * @returns {boolean}
 */
function isRetryable(err) {
  if (err instanceof AiServiceError) {
    return (
      err.code === AI_ERROR_CODES.RATE_LIMIT ||
      err.code === AI_ERROR_CODES.NETWORK ||
      err.code === AI_ERROR_CODES.TIMEOUT
    );
  }
  return false;
}

/** @type {AbortController | null} */
let activeController = null;

/**
 * Sleep helper used for retry backoff.
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Initialise the chat session. Validates configuration eagerly so the user
 * sees a clear "missing key" message on first open instead of on first send.
 *
 * Safe to call repeatedly; it is idempotent.
 *
 * @returns {Promise<{ conversationId: string }>}
 */
export async function initializeChat() {
  // Eager validation — does NOT construct the client yet (lazy).
  const apiKey = readApiKey();
  if (!apiKey) {
    // Resolve normally so the UI doesn't panic on boot. The next
    // `sendMessage` will throw the typed error and surface it.
    return { conversationId: `pending-${Date.now()}` };
  }
  // We don't construct the chat session here — it will be built lazily on
  // first send, using the persisted transcript as history.
  return { conversationId: `ready-${Date.now()}` };
}

/**
 * Send a user message and stream the assistant reply chunk-by-chunk.
 *
 * The optional `onChunk` is invoked once per non-empty chunk as tokens
 * arrive, letting `useChat` patch the placeholder assistant bubble
 * incrementally. The returned promise resolves with the full
 * `AssistantResponse` once the stream ends (or rejects on error).
 *
 * @param {string} text
 * @param {object} [opts]
 * @param {(chunk: string) => void} [opts.onChunk]
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<import('../types/chat.types').AssistantResponse>}
 */
export async function sendMessage(text, opts = {}) {
  const trimmed = (text || "").trim();
  if (!trimmed) {
    throw new AiServiceError("Empty message.", AI_ERROR_CODES.INVALID_RESPONSE);
  }
  const { onChunk, signal } = opts;

  // Pull current transcript from the persistence layer so the rebuilt
  // history matches what the user sees.
  const persisted = CHAT_SURFACE.persistToStorage
    ? readTranscript()
    : [];

  const startedAt = Date.now();
  const controller = new AbortController();
  activeController = controller;
  // Wire caller-provided signal → our controller.
  const externalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", externalAbort, { once: true });
  }
  // Timeout via setTimeout, since the SDK doesn't accept AbortSignal today.
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, AI_MODEL.timeoutMs);

  /** @type {string} */
  let assistantText = "";
  /** @type {Record<string, unknown> | undefined} */
  let meta;

  try {
    // Retry loop for transient failures only.
    let attempt = 0;
    while (true) {
      try {
        const chat = getOrCreateChatSession(persisted);
        const stream = await chat.sendMessageStream({ message: trimmed });

        for await (const chunk of stream) {
          if (controller.signal.aborted) {
            throw new AiServiceError("Cancelled.", AI_ERROR_CODES.CANCELLED);
          }
          // The SDK exposes text via `chunk.text` on each delta.
          const piece = typeof chunk?.text === "string" ? chunk.text : "";
          if (!piece) continue; // skip reasoning-only / empty chunks
          assistantText += piece;
          if (typeof onChunk === "function") onChunk(piece);
        }
        // Capture trailing metadata if the SDK attached any candidates.
        const finalChunk = stream && /** @type {any} */ (stream).response;
        if (finalChunk) meta = { provider: "gemini" };

        return {
          id: `asst-${startedAt}`,
          content: assistantText,
          latencyMs: Date.now() - startedAt,
          meta: meta || { provider: "gemini" },
        };
      } catch (err) {
        const wrapped = normalizeError(err);
        if (timedOut) {
          throw new AiServiceError(
            "Request timed out.",
            AI_ERROR_CODES.TIMEOUT,
            /** @type {Error} */ (err)
          );
        }
        if (attempt < AI_MODEL.retryCount && isRetryable(wrapped)) {
          attempt += 1;
          const backoff = AI_MODEL.retryBackoffMs * 2 ** (attempt - 1);
          await sleep(backoff);
          continue;
        }
        throw wrapped;
      }
    }
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener("abort", externalAbort);
    if (activeController === controller) activeController = null;
  }
}

/**
 * Read the persisted transcript from localStorage. Centralised here so the
 * service can swap the persistence layer (IndexedDB, server, …) without
 * touching callers.
 *
 * @returns {import('../types/chat.types').Message[]}
 */
function readTranscript() {
  if (typeof window === "undefined" || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(CHAT_SURFACE.storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Clear the in-memory chat session so the next `sendMessage` rebuilds
 * history fresh from the (now empty) `localStorage` transcript.
 *
 * @param {string} [_conversationId] Unused — kept for API stability.
 * @returns {Promise<void>}
 */
export async function clearConversation(_conversationId) {
  chatSession = null;
  return Promise.resolve();
}

/**
 * Abort the in-flight stream, if any. Idempotent.
 *
 * @returns {void}
 */
export function cancelRequest() {
  if (activeController) {
    activeController.abort();
    activeController = null;
  }
}

/**
 * Whether the assistant currently has an active streaming request.
 *
 * @returns {boolean}
 */
export function isRequestActive() {
  return activeController !== null;
}

/**
 * Convenience — re-exported so callers reach a single source of truth.
 */
export const TYPING_DELAY_MS = CHAT_SURFACE.typingDelayMs;