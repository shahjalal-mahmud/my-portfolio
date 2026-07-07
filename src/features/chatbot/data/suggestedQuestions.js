// src/features/chatbot/data/suggestedQuestions.js
//
// Source of suggested starter questions. Lives in `data/` so it's easy to
// swap for a dynamic source later (CMS, API, knowledge base) without
// touching components. Phase 1 ships with a static list tuned to the
// portfolio domains.

import { DEFAULT_SUGGESTIONS } from "../config/chatbot.config";

/**
 * @returns {import('../types/chat.types').SuggestedQuestion[]}
 */
export function getSuggestedQuestions() {
  return DEFAULT_SUGGESTIONS.map((s) => ({ ...s }));
}
