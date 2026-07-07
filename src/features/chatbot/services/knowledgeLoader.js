// src/features/chatbot/services/knowledgeLoader.js
//
// Loads the markdown knowledge base under /knowledge into memory once,
// parses each file into retrievable chunks (one chunk per Markdown section),
// and caches the result. The retriever (./retriever.js) consumes this cache
// to assemble the per-turn context for Gemini.
//
// PHASE 4 — lightweight, zero-dependency, keyword-scored retrieval.
// No embeddings, no vector DB, no third-party libraries.
//
// Files are loaded eagerly at module init via Vite's `import.meta.glob`
// so the entire knowledge base ships inline in the bundle (≈50 KB).
// No runtime fetch, no flash-of-empty-context, and no extra requests.
//
// Reload strategy: in Phase 4 the knowledge base is treated as immutable
// for the page session. A `reloadKnowledge()` export is provided so future
// code (e.g. a HMR hook, or a "Refresh knowledge" admin button) can
// invalidate the cache without re-importing the module.

import retriever from "./retriever";

// ─── Static import of every knowledge source ──────────────────────────────────
//
// Vite resolves `?raw` to the file contents as a string at build time.
// `eager: true` keeps the import synchronous so the cache is warm before
// the first user message.
//
// `metadata.json` is excluded from the glob because it isn't a Markdown
// source — it's the manifest that describes them. We import it separately
// below.

const RAW_FILES = import.meta.glob("/knowledge/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Vite types this as `{ [path: string]: string }`. Normalise to a stable
// shape with just the basename + contents.
const RAW_BY_BASENAME = (() => {
  /** @type {Record<string, string>} */
  const out = {};
  for (const path in RAW_FILES) {
    const fileName = path.split("/").pop() || path;
    out[fileName] = RAW_FILES[path] || "";
  }
  return out;
})();

// Manifest — best-effort import. If the file is missing or malformed the
// loader still functions; the manifest just enriches citations.
let MANIFEST = null;
try {
  // `?raw` works for `.json` too — Vite returns the JSON as a string, which
  // we parse here.
  const manifestRaw = import.meta.glob("/knowledge/metadata.json", {
    query: "?raw",
    import: "default",
    eager: true,
  });
  const first = Object.values(manifestRaw)[0];
  if (typeof first === "string" && first.trim()) {
    MANIFEST = JSON.parse(first);
  }
} catch {
  // Malformed JSON shouldn't crash the chatbot. The loader still works.
  MANIFEST = null;
}

// ─── Cache ───────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} KnowledgeChunk
 * @property {string} id                Stable id: `<file>#<sectionIndex>`
 * @property {string} source            Basename of the source .md file.
 * @property {string} section           Heading the chunk sits under (or "" if top-level).
 * @property {string} text              Plain-text content (markdown preserved).
 * @property {string[]} tokens          Lower-cased word tokens used for scoring.
 * @property {number} index             Ordinal of the chunk within its source file.
 */

/**
 * @typedef {Object} KnowledgeBase
 * @property {KnowledgeChunk[]} chunks   Every chunk, in original order.
 * @property {Record<string, string>} rawByFile  Original raw markdown, keyed by basename.
 * @property {Record<string, string>} manifest   The loaded metadata.json (may be null).
 * @property {number} builtAt            Epoch ms when the cache was populated.
 */

/** @type {KnowledgeBase | null} */
let cache = null;

/**
 * Parse a single Markdown file into chunks. One chunk per Markdown section
 * (`#` / `##` / `###` headings). The chunk's `text` keeps the original
 * Markdown so the model can render it back faithfully; `tokens` is the
 * lower-cased word list used by the retriever.
 *
 * @param {string} fileName
 * @param {string} raw
 * @returns {KnowledgeChunk[]}
 */
function chunkMarkdown(fileName, raw) {
  if (typeof raw !== "string" || raw.length === 0) return [];

  const lines = raw.split(/\r?\n/);
  /** @type {KnowledgeChunk[]} */
  const chunks = [];

  /** @type {string} */
  let currentSection = "";
  /** @type {string[]} */
  let buffer = [];
  /** @type {number} */
  let sectionIndex = 0;

  const flush = () => {
    const text = buffer.join("\n").trim();
    if (!text) return;
    const tokens = retriever.tokenize(text);
    if (tokens.length === 0 && text.length === 0) return;
    chunks.push({
      id: `${fileName}#${sectionIndex}`,
      source: fileName,
      section: currentSection,
      text,
      tokens,
      index: sectionIndex,
    });
    sectionIndex += 1;
  };

  for (const line of lines) {
    const heading = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) {
      // Close the previous section, then start a new one.
      flush();
      buffer = [];
      currentSection = heading[2].trim();
      continue;
    }
    buffer.push(line);
  }
  flush();

  return chunks;
}

/**
 * Build (or rebuild) the knowledge cache from the statically-imported
 * markdown files. Idempotent.
 *
 * @returns {KnowledgeBase}
 */
export function buildKnowledgeBase() {
  /** @type {KnowledgeChunk[]} */
  const allChunks = [];
  for (const [fileName, raw] of Object.entries(RAW_BY_BASENAME)) {
    try {
      const chunks = chunkMarkdown(fileName, raw);
      allChunks.push(...chunks);
    } catch {
      // Malformed file — skip but keep the rest of the knowledge base alive.
    }
  }
  cache = {
    chunks: allChunks,
    rawByFile: RAW_BY_BASENAME,
    manifest: MANIFEST,
    builtAt: Date.now(),
  };
  return cache;
}

/**
 * Get the knowledge base. Lazily builds the cache on first call so cold
 * starts still work in tests / SSR.
 *
 * @returns {KnowledgeBase}
 */
export function getKnowledgeBase() {
  if (cache) return cache;
  return buildKnowledgeBase();
}

/**
 * Force a rebuild. Useful after a knowledge file change (HMR / admin
 * action). The Markdown is already in the bundle from `import.meta.glob`
 * so we don't re-read from disk — we just re-chunk the existing strings.
 *
 * @returns {KnowledgeBase}
 */
export function reloadKnowledge() {
  cache = null;
  return buildKnowledgeBase();
}

/**
 * Total number of chunks in the cache. Useful for diagnostics and tests.
 * @returns {number}
 */
export function getChunkCount() {
  return getKnowledgeBase().chunks.length;
}

/**
 * File-level descriptions from the manifest (if loaded). The system prompt
 * uses this so the model can cite sections correctly.
 *
 * @returns {Array<{ file: string, description: string }>}
 */
export function getFileCatalog() {
  const manifest = getKnowledgeBase().manifest;
  if (!manifest || !Array.isArray(manifest.files)) return [];
  return manifest.files
    .filter((f) => f && typeof f.file === "string")
    .map((f) => ({ file: f.file, description: String(f.description || "") }));
}