// src/features/chatbot/services/aiService.js
//
// Kimchi AI integration (https://kimchi.dev).
//
// Kimchi exposes an OpenAI-compatible `/chat/completions` endpoint but does
// NOT send CORS headers for browser origins, so we cannot `fetch` it
// directly from the client. We go through a same-origin proxy:
//
//   • Dev:    Vite dev-server proxy (configured in vite.config.js)
//   • Prod:   Netlify serverless function  (netlify/functions/kimchi.js)
//
// Both expose the route at `/api/kimchi/*`. The client only ever talks to
// `/api/kimchi/chat/completions`, so the proxy is transparent.
//
// We talk to it with `fetch` so we don't add any runtime dependency —
// the entire SDK surface is one POST request.
//
// Public surface (signatures preserved from the OpenRouter era so no
// consumer changes are needed):
//   • initializeChat()                 — boot conversation, validate config
//   • sendMessage(text, {onChunk, signal}) — request a reply
//   • clearConversation(id?)           — reset cached state
//   • cancelRequest()                  — abort in-flight request
//   • isRequestActive()                — typing-indicator helper
//   • TYPING_DELAY_MS                  — re-export from config
//
// Plus the error / utility surface:
//   • AiServiceError                   — single typed error with `code`
//   • AI_ERROR_CODES                   — string-enum of known codes
//   • humanizeError(err)               — error → user-facing string
//   • buildHistoryFromMessages(messages) — rebuild OpenAI-style messages

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
  MODEL_NOT_FOUND: "MODEL_NOT_FOUND",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
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
      return "The assistant isn't configured yet. Please try again shortly.";
    case AI_ERROR_CODES.INVALID_API_KEY:
      return "The assistant rejected the request. Please try again shortly.";
    case AI_ERROR_CODES.RATE_LIMIT:
      return "Hit a rate limit just now. Wait a few seconds and try again.";
    case AI_ERROR_CODES.QUOTA_EXCEEDED:
      return "Your Kimchi credits are exhausted for now. Please try again later.";
    case AI_ERROR_CODES.MODEL_NOT_FOUND:
      return "The configured model is unavailable. Please try again later.";
    case AI_ERROR_CODES.TIMEOUT:
      return "The request took too long. Please try again.";
    case AI_ERROR_CODES.NETWORK:
      return "Network unavailable. Check your connection and try again.";
    case AI_ERROR_CODES.CANCELLED:
      return "Request cancelled.";
    case AI_ERROR_CODES.INVALID_RESPONSE:
      return "Received an unexpected response from the assistant. Please try again.";
    case AI_ERROR_CODES.SERVICE_UNAVAILABLE:
      return "The assistant is temporarily unavailable — please try again shortly.";
    default:
      return "Something went wrong. Please try again.";
  }
}

// ─── Friendly error mapping ──────────────────────────────────────────────────

/**
 * Translate a fetch / Kimchi error into a typed `AiServiceError`.
 *
 * @param {unknown} err
 * @returns {AiServiceError}
 */
function normalizeError(err) {
  if (err instanceof AiServiceError) return err;

  /** @type {any} */
  const e = err;
  const status = typeof e?.status === "number" ? e.status : undefined;
  const message = (typeof e?.message === "string" ? e.message : "") || "";

  // User-initiated cancellation always wins.
  if (e?.name === "AbortError" || /aborted|cancelled/i.test(message)) {
    return new AiServiceError("Request was cancelled.", AI_ERROR_CODES.CANCELLED, /** @type {Error} */ (err));
  }

  if (status === 401 || /api[_-]?key.*invalid/i.test(message) || /unauthenticated/i.test(message) || /no api key/i.test(message)) {
    return new AiServiceError("Invalid API key.", AI_ERROR_CODES.INVALID_API_KEY, /** @type {Error} */ (err));
  }
  if (status === 403 || /forbidden/i.test(message)) {
    return new AiServiceError("API key forbidden.", AI_ERROR_CODES.INVALID_API_KEY, /** @type {Error} */ (err));
  }
  if (status === 404 || /model.*not.*found/i.test(message)) {
    return new AiServiceError("Model not found.", AI_ERROR_CODES.MODEL_NOT_FOUND, /** @type {Error} */ (err));
  }
  if (status === 402 || /credits|payment|insufficient/i.test(message)) {
    return new AiServiceError("Credits exhausted.", AI_ERROR_CODES.QUOTA_EXCEEDED, /** @type {Error} */ (err));
  }
  if (status === 429) {
    return new AiServiceError("Rate limited.", AI_ERROR_CODES.RATE_LIMIT, /** @type {Error} */ (err));
  }
  if (status === 408) {
    return new AiServiceError("Timed out.", AI_ERROR_CODES.TIMEOUT, /** @type {Error} */ (err));
  }
  if (status === 400 || /invalid argument|invalid request/i.test(message)) {
    return new AiServiceError("Invalid request.", AI_ERROR_CODES.INVALID_RESPONSE, /** @type {Error} */ (err));
  }
  // 5xx from the proxy covers both:
  //   • 500 — proxy itself misconfigured (e.g. KIMCHI_API_KEY missing)
  //   • 502/503/504 — Kimchi upstream degraded or unreachable
  // Surface all of them as a single "service unavailable" state so users
  // see one consistent retry-able message instead of provider-specific
  // jargon.
  if (status === 500 || status === 502 || status === 503 || status === 504) {
    return new AiServiceError("Provider unavailable.", AI_ERROR_CODES.SERVICE_UNAVAILABLE, /** @type {Error} */ (err));
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

/** @type {AbortController | null} */
let activeController = null;

/**
 * Build the full system instruction: persona + per-turn knowledge chunks.
 *
 * @param {string} [systemInstructionAdditions]
 * @returns {string}
 */
function buildFullSystemInstruction(systemInstructionAdditions = "") {
  const baseInstruction = buildSystemPrompt();
  return systemInstructionAdditions
    ? `${baseInstruction}\n\n${systemInstructionAdditions}`
    : baseInstruction;
}

/**
 * Map a transcript `Message` to an OpenAI-style chat-completion message.
 *
 * Kimchi uses the OpenAI chat-completion shape: `{ role, content }`.
 * We skip empty / pending / error rows so the rebuild never feeds garbage
 * to the model.
 *
 * @param {import('../types/chat.types').Message[]} messages
 * @returns {Array<{ role: "user" | "assistant", content: string }>}
 */
export function buildHistoryFromMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && !m.pending && !m.error && typeof m.content === "string" && m.content.length > 0)
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }));
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

/** @param {number} ms */
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
  // The client no longer reads or validates the API key — that lives on
  // the server (Vite dev proxy / Netlify function). We just return a
  // stable conversation id so the UI can boot without panicking. If the
  // proxy is misconfigured, the first `sendMessage` will surface the
  // SERVICE_UNAVAILABLE error from `humanizeError`.
  return { conversationId: `ready-${Date.now()}` };
}

/**
 * Send a user message and obtain the assistant reply.
 *
 * The Kimchi integration is single-shot (non-streaming) to mirror the
 * working Dart reference. The optional `onChunk` callback is preserved
 * for API compatibility with the prior OpenRouter integration — for
 * Kimchi it fires once with the full assembled content so the UI gets
 * the same incremental-feedback experience.
 *
 * The function calls `buildContext(userMessage)` to retrieve relevant
 * knowledge chunks and splice them into the per-turn system instruction.
 * A broken knowledge file or empty retrieval never aborts the request.
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

  // Retrieve relevant knowledge and splice into the system instruction.
  // `buildContext` never throws — it returns an empty payload on failure.
  let context;
  try {
    context = await buildContext(trimmed);
  } catch {
    context = { systemAdditions: "", retrievedChunks: [] };
  }
  const history = buildHistoryFromMessages(persisted);

  const startedAt = Date.now();
  const controller = new AbortController();
  activeController = controller;
  // Wire caller-provided signal → our controller.
  const externalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", externalAbort, { once: true });
  }
  // Timeout via setTimeout so the user gets a clean TIMEOUT error rather
  // than hanging on the fetch.
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, AI_MODEL.timeoutMs);

  /** @type {string} */
  let assistantText = "";

  try {
    // Build the request payload.
    /** @type {{ role: "system" | "user" | "assistant", content: string }[]} */
    const messages = [
      { role: "system", content: buildFullSystemInstruction(context.systemAdditions) },
      ...history,
      { role: "user", content: trimmed },
    ];

    const body = JSON.stringify({
      model: AI_MODEL.model,
      messages,
      temperature: AI_MODEL.temperature,
      top_p: AI_MODEL.topP,
      max_tokens: AI_MODEL.maxOutputTokens,
    });

    // Retry loop for transient failures only.
    let attempt = 0;
    while (true) {
      try {
        const response = await fetch(`${AI_MODEL.baseUrl}/chat/completions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          signal: controller.signal,
        });

        if (!response.ok) {
          // Read the body once for error context, then throw a typed error
          // that carries the status for normalizeError().
          /** @type {any} */
          let errorPayload = null;
          try {
            const text = await response.text();
            try {
              errorPayload = JSON.parse(text);
            } catch {
              errorPayload = { message: text };
            }
          } catch {
            /* ignore body-read errors */
          }
          /** @type {any} */
          const err = new Error(
            errorPayload?.error?.message ||
              errorPayload?.message ||
              `Request failed with status ${response.status}`
          );
          err.status = response.status;
          err.error = errorPayload?.error;
          throw err;
        }

        /** @type {any} */
        const decoded = await response.json();
        const choices = Array.isArray(decoded?.choices) ? decoded.choices : null;

        if (!choices || choices.length === 0) {
          throw new AiServiceError(
            "Empty response from Kimchi.",
            AI_ERROR_CODES.INVALID_RESPONSE
          );
        }

        const content =
          (choices[0]?.message && typeof choices[0].message.content === "string"
            ? choices[0].message.content
            : "");

        if (!content || !content.trim()) {
          throw new AiServiceError(
            "Empty response from Kimchi.",
            AI_ERROR_CODES.INVALID_RESPONSE
          );
        }

        assistantText = content.trim();

        // Fire onChunk once with the full content so the UI gets the
        // same incremental-feedback experience as the streaming
        // OpenRouter path. Consumers remain unchanged.
        if (typeof onChunk === "function") {
          onChunk(assistantText);
        }

        return {
          id: `asst-${startedAt}`,
          content: assistantText,
          latencyMs: Date.now() - startedAt,
          meta: {
            provider: "kimchi",
            model: AI_MODEL.model,
            retrievedChunks: context.retrievedChunks.length,
            sources: Array.from(
              new Set(context.retrievedChunks.map((c) => c.source))
            ),
          },
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
 * Clear any in-memory cached state for the conversation. The Kimchi
 * integration is stateless (every request carries the full transcript in
 * `messages`), so this is a no-op today — kept for API stability with the
 * previous OpenRouter-era hook contract.
 *
 * @param {string} [_conversationId] Unused — kept for API stability.
 * @returns {Promise<void>}
 */
export async function clearConversation(_conversationId) {
  return Promise.resolve();
}

/**
 * Abort the in-flight request, if any. Idempotent.
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
 * Whether the assistant currently has an active request.
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