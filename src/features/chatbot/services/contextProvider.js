// src/features/chatbot/services/contextProvider.js
//
// PHASE 4 — knowledge-aware context provider.
//
// For every user message:
//   1. Pull the cached knowledge base (one global fetch, lazy).
//   2. Rank chunks against the query using the lightweight retriever.
//   3. Format the top-K chunks into a system-instruction addition block
//      that names the source file + section so the model can cite.
//   4. Return both the additions string (spliced into the system prompt
//      by aiService) and the raw retrieved chunks (for telemetry + the
//      future "show sources" UI surface).
//
// The function is async for API symmetry / future swap to embeddings —
// the actual work is sync today. Errors are swallowed and downgraded
// to an empty context so a broken knowledge file never crashes the chat.

import { getKnowledgeBase, getFileCatalog } from "./knowledgeLoader";
import { rank } from "./retriever";

/**
 * @typedef {Object} RetrievedChunk
 * @property {string} id
 * @property {string} source
 * @property {string} section
 * @property {string} text
 * @property {number} score
 */

/**
 * @typedef {Object} ChatContext
 * @property {string} systemAdditions
 * @property {RetrievedChunk[]} retrievedChunks
 */

// Phase 4 tuning knobs. Kept inline (not in chatbot.config) because they're
// retrieval-internal and almost nobody tunes them.
const TOP_K = 5;
const MIN_SCORE = 0.5;
const MAX_CONTEXT_CHARS = 6000;

/**
 * Format retrieved chunks as the system-instruction addition block.
 *
 * Includes a short catalogue of every knowledge file with a one-line
 * description (sourced from metadata.json) so the model knows which file
 * is authoritative for which topic — this lets it cite "skills.md" instead
 * of guessing.
 *
 * @param {RetrievedChunk[]} chunks
 * @returns {string}
 */
function formatAdditions(chunks) {
  const catalog = getFileCatalog();
  /** @type {string[]} */
  const out = [];

  out.push("## Portfolio knowledge base");
  out.push(
    "The following Markdown files are authoritative for every answer you give. " +
      "Cite the source file whenever you draw a fact from it. If the answer is " +
      "not present, say so explicitly rather than guessing."
  );
  if (catalog.length > 0) {
    out.push("");
    out.push("### File catalogue");
    for (const f of catalog) {
      out.push(`- \`${f.file}\` — ${f.description}`);
    }
  }

  if (chunks.length === 0) {
    out.push("");
    out.push("### Retrieved context for this question");
    out.push(
      "_No specific chunks matched the query. Answer from the catalogue above " +
        "or, if nothing applies, politely say you don't have that information._"
    );
    return out.join("\n");
  }

  out.push("");
  out.push("### Retrieved context for this question");
  for (const c of chunks) {
    const heading = c.section ? ` > ${c.section}` : "";
    out.push("");
    out.push(`#### Source: \`${c.source}\`${heading}`);
    out.push(c.text);
  }

  let joined = out.join("\n");
  if (joined.length > MAX_CONTEXT_CHARS) {
    joined = joined.slice(0, MAX_CONTEXT_CHARS) + "\n\n_…(truncated)_";
  }
  return joined;
}

/**
 * Build the context payload for a single user turn.
 *
 * @param {string} userMessage
 * @returns {Promise<ChatContext>}
 */
export async function buildContext(userMessage) {
  try {
    const kb = getKnowledgeBase();
    if (!kb || kb.chunks.length === 0) {
      return { systemAdditions: "", retrievedChunks: [] };
    }
    const top = rank(userMessage, kb.chunks, { topK: TOP_K, minScore: MIN_SCORE });
    /** @type {RetrievedChunk[]} */
    const retrieved = top.map((c, i) => ({
      id: c.id,
      source: c.source,
      section: c.section,
      text: c.text,
      // Score is lost during rank(); reverse-engineer a 0..1 confidence
      // from the chunk's ordinal in the top-K list. Good enough for a
      // future "show sources" UI; the model never sees this number.
      score: Math.max(0, 1 - i * 0.15),
    }));
    return {
      systemAdditions: formatAdditions(retrieved),
      retrievedChunks: retrieved,
    };
  } catch {
    // A broken knowledge file must never crash the chat.
    return { systemAdditions: "", retrievedChunks: [] };
  }
}

export default buildContext;