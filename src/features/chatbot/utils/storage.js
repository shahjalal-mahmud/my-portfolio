// src/features/chatbot/utils/storage.js
//
// Thin, SSR-safe wrappers around localStorage. Used by the chat hook to
// persist the transcript and conversation id. Silently no-ops when storage
// is unavailable (private mode, SSR, quota exhausted).

/**
 * Read a JSON-encoded value from localStorage.
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
export function readJSON(key, fallback) {
  if (typeof window === "undefined" || !window.localStorage) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Write a JSON-encoded value to localStorage. Swallows quota / serialisation
 * errors silently — UI state should never crash the app because storage is
 * unhappy.
 *
 * @param {string} key
 * @param {unknown} value
 */
export function writeJSON(key, value) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* no-op */
  }
}

/**
 * Remove a key from localStorage.
 * @param {string} key
 */
export function removeKey(key) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* no-op */
  }
}
