// src/features/chatbot/services/systemPrompt.js
//
// The system prompt sent to Gemini on every chat session. Phase 2 ships the
// scaffold only — the real prompt (with portfolio knowledge, persona,
// boundaries, fallbacks) lands in a later phase alongside the knowledge
// base.
//
// Sourced as a function so we can later inject dynamic context (current
// date, user locale, retrieved KB chunks) without changing call sites.

/**
 * Build the system prompt for a Gemini chat session.
 *
 * Phase 2 placeholder. Phase 3 will compose this with:
 *   • Retrieved knowledge chunks from knowledge/*.md
 *   • Persona / tone settings
 *   • Date-aware safe-harbour phrasing when info is missing
 *
 * @returns {string}
 */
export function buildSystemPrompt() {
  return [
    "You are the AI assistant for Md Shahajalal Mahmud.",
    "",
    "You answer questions using the provided portfolio knowledge.",
    "",
    "If information is unavailable, politely say you don't know.",
    "Never invent facts.",
    "Do not pretend to know information that has not been provided.",
    "",
    "Remain professional and concise.",
  ].join("\n");
}

export default buildSystemPrompt;