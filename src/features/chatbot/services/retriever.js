// src/features/chatbot/services/retriever.js
//
// Lightweight, zero-dependency retriever for the chat assistant.
//
// Strategy:
//   1. Tokenise the user query into lowercase word stems.
//   2. For each chunk in the knowledge base, compute a relevance score:
//        • TF  — how many query tokens appear in the chunk (with diminishing
//                returns so a chunk matching 50 keywords doesn't 50x a
//                chunk matching 3).
//        • Filename match — does the chunk's source file contain a query
//                token? (e.g. "skills" boosts skills.md).
//        • Heading match — does the chunk's section heading contain a
//                query token? (strong signal — sections are authored as
//                topical labels).
//   3. Return the top-K chunks above a minimum score threshold.
//
// Why not embeddings: the knowledge base is ≈50 KB. A 200-dim TF-IDF + cosine
// would shave single-digit milliseconds but cost 10+ MB of model + runtime
// fetch. Keyword scoring runs in <1 ms and is good enough for the
// portfolio's structure (filenames are already topical).
//
// This module is pure: no I/O, no globals beyond exported helpers. The
// loader builds the chunk index and passes chunks to rank().

/**
 * Tokeniser — lowercase, strip punctuation, drop short stopwords.
 * Matches Unicode word boundaries so non-Latin text tokenises correctly.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function tokenize(text) {
  if (typeof text !== "string" || !text) return [];
  const lowered = text.toLowerCase();
  // Split on anything that's not a letter/digit/underscore/emoji/word char.
  // Keep numeric tokens (e.g. "3.90", "2025") because they're meaningful here.
  const raw = lowered.split(/[^\p{L}\p{N}_]+/u).filter(Boolean);
  // English stopword list (kept small for performance). Domain-specific
  // tokens like "java" or "kotlin" are NOT stopwords because they exist
  // as project-relevant keywords.
  const stop = STOPWORDS;
  /** @type {string[]} */
  const out = [];
  for (const tok of raw) {
    if (tok.length < 2) continue;
    if (stop.has(tok)) continue;
    out.push(tok);
  }
  return out;
}

/** @type {Set<string>} */
const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
  "has", "have", "he", "her", "his", "i", "in", "is", "it", "its",
  "of", "on", "or", "she", "so", "that", "the", "their", "them",
  "they", "this", "to", "was", "we", "were", "what", "when", "where",
  "which", "who", "why", "with", "you", "your",
  "do", "does", "did", "can", "could", "should", "would", "will",
  "shall", "may", "might", "must", "not", "no", "any", "some",
  "all", "more", "most", "than", "then", "now", "here", "there",
  "but", "if", "else", "also", "just", "only", "about",
]);

/**
 * A chunk with pre-tokenised text. Matches the shape produced by
 * knowledgeLoader.
 *
 * @typedef {Object} IndexedChunk
 * @property {string} id
 * @property {string} source
 * @property {string} section
 * @property {string} text
 * @property {string[]} tokens
 * @property {number} index
 */

/**
 * Score a single chunk against the query tokens.
 *
 * Combines three signals (any one of which may be zero):
 *   • TF — how many query tokens appear in the chunk (with diminishing
 *          returns and a coverage factor so a chunk matching most
 *          keywords beats one that matches just one).
 *   • Filename match — does the chunk's source file contain a query
 *          token? (e.g. "skills" boosts skills.md).
 *   • Heading match — does the chunk's section heading contain a query
 *          token? (strong signal — sections are topical labels).
 *
 * The bonuses apply even when TF is zero, because topical intent (the
 * user asked "what are his skills?") is fully expressed by filename +
 * heading matches — the body text doesn't need to echo the word "skills"
 * to be the right chunk.
 *
 * @param {string[]} queryTokens
 * @param {IndexedChunk} chunk
 * @returns {number}
 */
function scoreChunk(queryTokens, chunk) {
  if (queryTokens.length === 0) return 0;

  /** @type {Map<string, number>} */
  const tf = new Map();
  for (const tok of chunk.tokens) {
    tf.set(tok, (tf.get(tok) || 0) + 1);
  }

  let tfScore = 0;
  let matchedTerms = 0;
  for (const q of queryTokens) {
    const count = tf.get(q);
    if (!count) continue;
    matchedTerms += 1;
    // Diminishing returns: log(1 + count).
    tfScore += Math.log(1 + count);
  }

  // Filename boost — query tokens that appear in the source filename.
  const sourceTokens = chunk.source.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  let fileBonus = 0;
  for (const q of queryTokens) {
    if (sourceTokens.includes(q)) fileBonus += 1.2;
  }

  // Section heading boost — sections are topical labels.
  const headingTokens = tokenize(chunk.section);
  let headingBonus = 0;
  for (const q of queryTokens) {
    if (headingTokens.includes(q)) headingBonus += 1.5;
  }

  // If nothing matched at all, drop the chunk.
  if (matchedTerms === 0 && fileBonus === 0 && headingBonus === 0) return 0;

  // TF weighted by coverage so a chunk matching most query terms beats
  // one matching only one. The bonuses sit on top so topical chunks with
  // no body-text overlap still surface.
  const coverage = matchedTerms === 0 ? 0 : matchedTerms / queryTokens.length;
  const tfComponent = tfScore * (0.6 + 0.4 * coverage);
  return tfComponent + fileBonus + headingBonus;
}

/**
 * Rank a list of chunks against a free-text query. Returns the top-K
 * chunks sorted by descending score. The `minScore` cutoff filters out
 * noise — anything below it (e.g. pure stopword queries that tokenised
 * to zero terms) is dropped.
 *
 * @param {string} query
 * @param {IndexedChunk[]} chunks
 * @param {object} [opts]
 * @param {number} [opts.topK=5]
 * @param {number} [opts.minScore=0.5]
 * @returns {IndexedChunk[]}
 */
export function rank(query, chunks, opts = {}) {
  const topK = opts.topK ?? 5;
  const minScore = opts.minScore ?? 0.5;
  const queryTokens = tokenize(query || "");
  if (queryTokens.length === 0) return [];

  /** @type {Array<{ chunk: IndexedChunk, score: number }>} */
  const scored = [];
  for (const chunk of chunks) {
    const score = scoreChunk(queryTokens, chunk);
    if (score >= minScore) scored.push({ chunk, score });
  }
  scored.sort((a, b) => b.score - a.score || a.chunk.id.localeCompare(b.chunk.id));
  return scored.slice(0, topK).map((s) => s.chunk);
}

const retriever = { tokenize, rank };
export default retriever;