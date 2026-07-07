// src/features/chatbot/services/aiService.js
//
// PHASE 1 — Placeholder AI service. Every method is clearly marked as
// "awaiting implementation" and returns a rejected promise with a descriptive
// error, so the UI surfaces a friendly "service not yet wired up" message
// instead of silently swallowing the failure.
//
// The shape of each method matches the eventual Gemini Free Tier integration:
//
//   • initializeChat()   — boot conversation, hydrate system prompt / KB.
//   • sendMessage(text)  — push user turn, stream assistant reply.
//   • clearConversation()— reset transcript + cached context.
//   • cancelRequest()    — abort an in-flight streaming response.
//
// Replace the bodies when wiring up `@google/generative-ai` (or the Fetch
// equivalent). Keep the signatures stable so consumers don't break.

import { AI_MODEL, CHAT_SURFACE } from "../config/chatbot.config";

/**
 * Marker error so the chat UI can render a friendly message instead of
 * leaking a raw exception.
 */
export class AiServiceUnavailableError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "AiServiceUnavailableError";
  }
}

/**
 * Throws a typed error explaining that the AI provider is not yet integrated.
 * @param {string} op
 */
function notImplemented(op) {
  return new AiServiceUnavailableError(
    `AI service operation "${op}" is awaiting implementation. ` +
      `Configured provider: ${AI_MODEL.provider}, model: ${AI_MODEL.model}.`
  );
}

/**
 * In-flight abort controller, if any. Phase 1 always returns null because we
 * never start a request — kept here so consumers can wire cancelRequest()
 * without touching them again later.
 *
 * @type {AbortController | null}
 */
let activeController = null;

/**
 * Initialise the chat session.
 *
 * PHASE 1: returns immediately. Future implementation will warm up the
 * provider client and hydrate the system prompt with the knowledge base.
 *
 * @returns {Promise<{ conversationId: string }>}
 */
export async function initializeChat() {
  // Phase 1: nothing to do. Phase 2: hydrate prompt + KB and warm model.
  return Promise.resolve({ conversationId: `stub-${Date.now()}` });
}

/**
 * Send a user message and receive a single assistant response.
 *
 * PHASE 1: rejects with `AiServiceUnavailableError`. Phase 2 will:
 *   • open an AbortController and stash it in `activeController`
 *   • stream chunks into the transcript via the `onChunk` callback
 *   • return the final AssistantResponse once the stream ends
 *
 * @param {string} _text                  User message (unused in Phase 1).
 * @param {object} [_opts]
 * @param {(chunk: string) => void} [_opts.onChunk]
 * @param {AbortSignal} [_opts.signal]
 * @returns {Promise<import('../types/chat.types').AssistantResponse>}
 */
export async function sendMessage(_text, _opts = {}) {
  // Phase 1: tell the UI that the backend isn't wired up yet.
  return Promise.reject(notImplemented("sendMessage"));
}

/**
 * Clear the current conversation on the server / in cache.
 *
 * PHASE 1: no-op that resolves. Phase 2 will notify the provider (if it
 * supports it) and wipe local caches.
 *
 * @param {string} [_conversationId]
 * @returns {Promise<void>}
 */
export async function clearConversation(_conversationId) {
  return Promise.resolve();
}

/**
 * Cancel the in-flight request, if any.
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
 * Whether the assistant has an active request — exposed for the typing
 * indicator. Currently always false.
 *
 * @returns {boolean}
 */
export function isRequestActive() {
  return activeController !== null;
}

/**
 * Convenience — short artificial typing delay so the UI feels alive while
 * we wait for a real response. Re-exported from config so consumers can
 * reach a single source of truth.
 */
export const TYPING_DELAY_MS = CHAT_SURFACE.typingDelayMs;