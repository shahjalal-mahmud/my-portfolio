// src/features/chatbot/config/chatbot.config.js
//
// Centralised configuration for the AI assistant. Every tunable lives here so
// we never sprinkle magic numbers across components/services.

/**
 * @typedef {Object} AiModelConfig
 * @property {string} provider                  "kimchi" (only supported provider).
 * @property {string} model                     Model identifier on Kimchi (e.g. "kimi-k2.7").
 * @property {number} temperature               Sampling temperature (0..2 for Kimchi-compatible models).
 * @property {number} topP                      Nucleus sampling cutoff.
 * @property {number} maxOutputTokens           Cap on tokens per response.
 * @property {number} timeoutMs                 Per-request timeout.
 * @property {number} retryCount                Auto-retry attempts on transient errors.
 * @property {number} retryBackoffMs            Initial backoff between retries.
 * @property {string} baseUrl                   Same-origin proxy base URL
 *                                           (Vite dev / Netlify fn). The
 *                                           browser never sees the Kimchi
 *                                           host directly because Kimchi
 *                                           does not allow browser CORS.
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
 * Kimchi defaults. Swap `model` to any chat-completions model id available
 * on https://kimchi.dev (e.g. "kimi-k2.7").
 *
 * @type {AiModelConfig}
 */
export const AI_MODEL = Object.freeze({
  provider: "kimchi",
  model: "kimi-k2.7",
  temperature: 0.7,
  topP: 0.95,
  maxOutputTokens: 1024,
  timeoutMs: 30_000,
  retryCount: 2,
  retryBackoffMs: 600,
  // Same-origin proxy. Resolved by:
  //   • Vite dev-server proxy (vite.config.js)
  //   • Netlify redirect → serverless function (netlify.toml + functions/kimchi.js)
  baseUrl: "/api/kimchi",
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
 * Placeholder suggestions rendered in the empty state.
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