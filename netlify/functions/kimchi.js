// netlify/functions/kimchi.js
//
// Same-origin proxy for the Kimchi LLM API. The browser cannot call Kimchi
// directly because Kimchi does not send CORS headers for browser origins.
// This function accepts a POST at `/api/kimchi/<path>` (rewritten by
// netlify.toml / public/_redirects) and forwards it to
// `https://llm.kimchi.dev/openai/v1/<path>`, injecting the API key from
// `KIMCHI_API_KEY`.
//
// On cPanel (non-Netlify) hosts, the same proxy lives at
// public/api/kimchi.php. Keep both files in sync when changing upstream
// behaviour. The dev-server proxy lives in vite.config.js.
//
// ─── DEPLOYMENT NOTE ──────────────────────────────────────────────────────
// In the Netlify dashboard, set the env var to:
//
//     KIMCHI_API_KEY   =  <your Kimchi key>
//
// (NOT `VITE_KIMCHI_API_KEY`. The `VITE_` prefix would tell Vite to
// inline the value into the client bundle, leaking the key to every
// visitor. Netlify Functions only read unprefixed vars from the
// runtime env, so the key stays server-side.)
// ──────────────────────────────────────────────────────────────────────────
//
// The Netlify Functions runtime is Node.js; we use the built-in `fetch`
// (Node ≥18). This file deliberately has ZERO npm dependencies so the
// Netlify bundler does not need to install anything for this function —
// `@netlify/functions` is used only for JSDoc types (which the bundler
// strips) and for an optional `logger` (which is just a console wrapper).
// `netlify/functions/package.json` still declares `"type": "module"` so
// this file is parsed as ESM (the root `package.json` setting does NOT
// propagate into the function directory).

const KIMCHI_BASE = "https://llm.kimchi.dev/openai/v1";
const TIMEOUT_MS = 30_000;

/**
 * @typedef {Object} NetlifyEvent
 * @property {string} httpMethod
 * @property {string} [path]
 * @property {Record<string, string>} [headers]
 * @property {string|null} [body]
 * @property {Record<string, string>} [queryStringParameters]
 *
 * @typedef {Object} NetlifyContext
 * @property {string} functionName
 * @property {string} awsRequestId
 * @property {(msg: string) => void} [log]
 * @property {(msg: string) => void} [error]
 */

/**
 * Best-effort structured log to the Netlify function log. Falls back to
 * `console.log` if the context log helpers aren't available.
 * @param {NetlifyContext} context
 * @param {"info"|"error"} level
 * @param {string} msg
 */
function logEvent(context, level, msg) {
  const fn = level === "error" ? context?.error : context?.log;
  if (typeof fn === "function") {
    try {
      fn(msg);
      return;
    } catch {
      /* fall through to console */
    }
  }
  if (level === "error") console.error(msg);
  else console.log(msg);
}

/**
 * @param {NetlifyEvent} event
 * @param {NetlifyContext} [context]
 */
export async function handler(event, context = /** @type {NetlifyContext} */ ({})) {
  // Log every invocation so the Netlify function logs show the live path.
  // Helps confirm the function is actually being hit on prod deploys.
  logEvent(context, "info", `kimchi: ${event.httpMethod} ${event.path || "/"}`);

  // Health check: GET returns the configured key length so you can verify
  // the env var is loaded without burning a Kimchi credit. The key itself
  // is never echoed.
  if (event.httpMethod === "GET") {
    const apiKey = process.env.KIMCHI_API_KEY;
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: true,
        path: event.path || "/",
        apiKeyConfigured: Boolean(apiKey),
        apiKeyLength: apiKey ? apiKey.length : 0,
        node: process.version,
      }),
    };
  }

  // Only POST is allowed for proxied calls.
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "GET, POST", "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.KIMCHI_API_KEY;
  if (!apiKey) {
    logEvent(context, "error", "KIMCHI_API_KEY is not set in the Netlify environment");
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error:
          "KIMCHI_API_KEY is not configured in the Netlify environment.",
      }),
    };
  }

  // The rewrite in netlify.toml / public/_redirects strips `/api/kimchi`
  // so `event.path` here is the upstream path, e.g. `/chat/completions`.
  const upstreamPath = event.path || "/chat/completions";
  const url = `${KIMCHI_BASE}${upstreamPath.startsWith("/") ? upstreamPath : `/${upstreamPath}`}`;

  // Forward the original body verbatim. We trust the client because the
  // only thing exposed here is a single-route proxy and the upstream
  // already validates request shape.
  /** @type {Record<string, string>} */
  const headers = {
    "Content-Type":
      event.headers?.["content-type"] || "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers,
      body: event.body || "{}",
      signal: controller.signal,
    });

    const text = await upstream.text();
    clearTimeout(timer);

    // Mirror upstream status + content-type so the client gets the same
    // shape it would have seen from Kimchi directly.
    /** @type {Record<string, string>} */
    const responseHeaders = {
      "Content-Type":
        upstream.headers.get("content-type") || "application/json",
    };

    if (!upstream.ok) {
      logEvent(context, "error", `kimchi upstream ${upstream.status}: ${text.slice(0, 500)}`);
    }

    return {
      statusCode: upstream.status,
      headers: responseHeaders,
      body: text,
    };
  } catch (err) {
    clearTimeout(timer);
    const message =
      err && typeof err === "object" && "name" in err && err.name === "AbortError"
        ? "Upstream timed out"
        : err && typeof err === "object" && "message" in err
          ? String(err.message)
          : "Unknown upstream error";

    logEvent(context, "error", `kimchi upstream error: ${message}`);

    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: message }),
    };
  }
}

export default { handler };
