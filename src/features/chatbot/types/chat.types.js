// src/features/chatbot/types/chat.types.js
//
// Strongly typed domain models for the AI assistant. The project currently
// ships plain JSX, so we document these with JSDoc typedefs and consume them
// from `import type` comments where appropriate. The shapes are identical to
// what a future TS migration would emit, so swapping to .ts/.tsx later is a
// mechanical rename.
//
// Keep this file PURE data — no React, no Framer Motion, no DOM.

/**
 * @typedef {"system" | "user" | "assistant"} MessageRole
 *   Who authored a message in the conversation.
 */

/**
 * Discrete lifecycle states for the chat surface.
 * Drives loading / empty / error / typing indicators.
 *
 * @typedef {"idle" | "loading" | "typing" | "error" | "success"} ChatStatus
 */

/**
 * Source of a message — useful for analytics and deciding whether content
 * is editable before send.
 *
 * @typedef {"user" | "assistant" | "suggestion"} MessageSource
 */

/**
 * A single message in the conversation transcript.
 *
 * @typedef {Object} Message
 * @property {string} id                        Stable identifier (uuid).
 * @property {MessageRole} role                  Author of the message.
 * @property {string} content                    Plain-text / markdown content.
 * @property {number} timestamp                 Epoch milliseconds.
 * @property {boolean} [pending]                True while waiting for assistant reply.
 * @property {boolean} [error]                  True if the message represents a failure.
 * @property {MessageSource} [source]           Origin of the message (e.g. suggested question).
 * @property {string[]} [suggestions]           Follow-up suggestions, if any.
 */

/**
 * Suggested starter question shown in the empty state.
 *
 * @typedef {Object} SuggestedQuestion
 * @property {string} id
 * @property {string} text                      Display label, e.g. "Tell me about Shahajalal".
 * @property {string} [prompt]                  Optional prompt override sent to the assistant.
 * @property {string} [category]                Coarse grouping (about, projects, contact, etc.).
 */

/**
 * Payload returned by the assistant service for a single turn.
 * Today the service is a placeholder, but this shape matches Gemini's
 * generateContent response so wiring it in later is a drop-in change.
 *
 * @typedef {Object} AssistantResponse
 * @property {string} id                        Echo of the assistant message id.
 * @property {string} content                   Generated reply text.
 * @property {number} [latencyMs]               Time taken to generate, for telemetry.
 * @property {string[]} [suggestions]           Follow-up suggestions to show under the reply.
 * @property {Record<string, unknown>} [meta]   Provider metadata (model, tokens, finish reason).
 */

/**
 * A user-supplied message before it is committed to the transcript.
 *
 * @typedef {Object} UserMessage
 * @property {string} text                      Raw user text.
 * @property {MessageSource} [source]           Defaults to "user".
 */

/**
 * The full chat surface state — what `useChat` manages.
 *
 * @typedef {Object} ChatState
 * @property {boolean} isOpen                   Whether the chat window is visible.
 * @property {ChatStatus} status                Coarse lifecycle indicator.
 * @property {Message[]} messages               Ordered transcript (oldest first).
 * @property {string | null} error              Last error message, if any.
 * @property {string | null} conversationId     Stable id for the current session.
 * @property {boolean} hasReceivedReply         Convenience flag — has the assistant ever replied?
 * @property {SuggestedQuestion[]} suggestions  Shown when messages.length === 0.
 * @property {string | null} pendingInput        Text the user typed but did not send.
 */

/**
 * Actions accepted by the chat reducer. Kept as a tagged union so future
 * streaming / cancel / retry actions slot in without breaking consumers.
 *
 * @typedef {Object} ChatAction
 * @property {"OPEN" | "CLOSE" | "TOGGLE"} [type]
 * @property {"SET_STATUS" | "SET_ERROR" | "CLEAR_ERROR" | "CLEAR" | "RESET" | "SET_PENDING_INPUT"} [type]
 * @property {"APPEND_USER_MESSAGE" | "APPEND_ASSISTANT_MESSAGE" | "UPDATE_MESSAGE" | "APPEND_TO_MESSAGE" | "REMOVE_MESSAGE"} [type]
 * @property {Message} [message]
 * @property {string} [id]
 * @property {Partial<Message>} [patch]
 * @property {ChatStatus} [status]
 * @property {string | null} [error]
 * @property {string} [conversationId]
 * @property {string} [text]
 * @property {MessageSource} [source]
 */

export {};
