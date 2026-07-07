// src/features/chatbot/utils/id.js
//
// Tiny id helpers. We avoid pulling in `uuid` because:
//
//   • It's not currently a dependency.
//   • The project values minimal deps.
//   • These ids never leave the client.
//
// crypto.randomUUID is preferred when available — it gives RFC4122 v4 ids.
// For older environments we fall back to Math.random — collision risk is
// negligible because ids are only used to key a single React list.

/**
 * Generate a short, sortable id.
 * @returns {string}
 */
export function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
