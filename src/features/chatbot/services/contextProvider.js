// src/features/chatbot/services/contextProvider.js
//
// Phase-2 RAG stub. Today the function returns an empty payload. Phase 3
// will read knowledge/*.md, chunk it, embed the chunks, and perform a
// top-K retrieval per user query. The shape returned here is what the
// aiService will splice into the Gemini request, so the wire format is
// pinned today and only the body changes in Phase 3.
//
// The two return fields:
//
//   • systemAdditions  — extra lines appended to the system prompt
//                        (e.g. "Relevant context for this question: ...")
//   • retrievedChunks  — raw chunks the caller may want to surface to the
//                        user as citations (UI work is Phase 3+)
//
// aiService.js is responsible for splicing `systemAdditions` into the
// system instruction before each request. Callers never touch this file.

/**
 * @typedef {Object} RetrievedChunk
 * @property {string} id        Stable chunk id (file#anchor etc.).
 * @property {string} source    File the chunk came from.
 * @property {string} text      Chunk text.
 * @property {number} [score]   Relevance score (provider-specific).
 */

/**
 * @typedef {Object} ChatContext
 * @property {string} systemAdditions
 * @property {RetrievedChunk[]} retrievedChunks
 */

/**
 * Build the context payload for a single user turn.
 *
 * Phase 2 returns an empty payload. Phase 3 will:
 *   1. Embed the user query.
 *   2. Run a vector search over the embedded knowledge base.
 *   3. Return the top-K chunks + a pre-formatted addition string.
 *
 * @param {string} _userMessage            Current user message (unused in Phase 2).
 * @returns {Promise<ChatContext>}
 */
export async function buildContext(_userMessage) {
  return {
    systemAdditions: "",
    retrievedChunks: [],
  };
}

export default buildContext;