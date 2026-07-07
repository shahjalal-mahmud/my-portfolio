// src/features/chatbot/config/chatbot.config.js
//
// Centralised configuration for the AI assistant. Every tunable lives here so
// we never sprinkle magic numbers across components/services.
//
// PHASE 1 NOTE: this file ships PLACEHOLDERS only. No provider is wired up,
// no model is contacted. The values below are realistic defaults for a future
// Google Gemini Free Tier integration but are intentionally inert.

/**
 * @typedef {Object} AiModelConfig
 * @property {string} provider                  "gemini" (only supported provider in scope).
 * @property {string} model                     Model identifier.
 * @property {number} temperature               Sampling temperature (0..1).
 * @property {number} topP                      Nucleus sampling cutoff.
 * @property {number} topK                      Top-K sampling cutoff.
 * @property {number} maxOutputTokens           Cap on tokens per response.
 * @property {number} timeoutMs                 Per-request timeout.
 * @property {number} retryCount                Auto-retry attempts on transient errors.
 * @property {number} retryBackoffMs            Initial backoff between retries.
 */

/**
 * @typedef {Object} ChatSurfaceConfig
 * @property {number} maxMessages               Hard cap on transcript length (FIFO eviction).
 * @property {number} typingDelayMs             Simulated typing latency before assistant replies.
 * @property {number} inputMaxLength            Hard cap on user input length.
 * @property {boolean} persistToStorage         Whether to mirror transcript in localStorage.
 * @property {string} storageKey                localStorage key when persistToStorage is true.
 * @property {string} conversationIdKey         localStorage key for the conversation id.
 * @property {boolean} autoOpenOnFirstVisit     Show the launcher pulse on a user's first visit.
 */

/**
 * Provider/model placeholders. Swap `model` once the Gemini SDK is wired in.
 * @type {AiModelConfig}
 */
export const AI_MODEL = Object.freeze({
  provider: "gemini",
  // Gemini Free Tier default. Change once the SDK is integrated.
  model: "gemini-2.0-flash",
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
  timeoutMs: 20_000,
  retryCount: 2,
  retryBackoffMs: 600,
});

/**
 * UI / lifecycle knobs.
 * @type {ChatSurfaceConfig}
 */
export const CHAT_SURFACE = Object.freeze({
  maxMessages: 50,
  typingDelayMs: 450,
  inputMaxLength: 1000,
  persistToStorage: true,
  storageKey: "portfolio.chat.transcript.v1",
  conversationIdKey: "portfolio.chat.conversationId.v1",
  autoOpenOnFirstVisit: false,
});

/**
 * Placeholder suggestions rendered in the empty state. The component reads
 * these from the data file (which is dynamic-friendly); this list is the
 * Phase 1 default.
 *
 * @type {ReadonlyArray<{ id: string, text: string, category: string }>}
 */
export const DEFAULT_SUGGESTIONS = Object.freeze([
  { id: "about",     text: "Tell me about Shahajalal.",          category: "about"    },
  { id: "projects",  text: "What projects has he built?",       category: "projects" },
  { id: "skills",    text: "What technologies does he use?",    category: "skills"   },
  { id: "contact",   text: "How can I contact him?",            category: "contact"  },
]);

/**
 * Friendly metadata surfaced in the chat header. Kept here so the assistant
 * can be rebranded (name / avatar / tagline) without touching components.
 */
export const ASSISTANT_PROFILE = Object.freeze({
  name: "Shahajalal AI",
  shortName: "Shahajalal",
  tagline: "Ask me anything about Shahajalal.",
});