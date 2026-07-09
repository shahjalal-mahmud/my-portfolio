// netlify/functions/kimchi.js
//
// Same-origin proxy for the Kimchi LLM API. The browser cannot call Kimchi
// directly because Kimchi does not send CORS headers for browser origins.
// This function accepts a POST at `/api/kimchi/<path>` (rewritten by
// netlify.toml) and forwards it to `https://llm.kimchi.dev/openai/v1/<path>`,
// injecting the API key from `KIMCHI_API_KEY`.
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
// (Node ≥18) so there are no dependencies. The `netlify/functions/package.json`
// declares `"type": "module"` so this file is parsed as ESM (the root
// `package.json` setting does NOT propagate into the function directory).

import { logger } from "@netlify/functions";

const KIMCHI_BASE = "https://llm.kimchi.dev/openai/v1";
const TIMEOUT_MS = 30_000;

/**
 * @param {import('@netlify/functions').HandlerEvent} event
 * @param {import('@netlify/functions').HandlerContext} context
 */
export async function handler(event, context) {
  // Log every invocation so the Netlify function logs show the live path.
  // Helps confirm the function is actually being hit on prod deploys.
  if (context && typeof context.log === "function") {
    context.log(`kimchi: ${event.httpMethod} ${event.path}`);
  }

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
    logger?.error?.("KIMCHI_API_KEY is not set in the Netlify environment");
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error:
          "KIMCHI_API_KEY is not configured in the Netlify environment.",
      }),
    };
  }

  // The rewrite in netlify.toml strips `/api/kimchi` so `event.path` here
  // is the upstream path, e.g. `/chat/completions`.
  const upstreamPath = event.path || "/chat/completions";
  const url = `${KIMCHI_BASE}${upstreamPath.startsWith("/") ? upstreamPath : `/${upstreamPath}`}`;

  // Forward the original body verbatim. We trust the client because the
  // only thing exposed here is a single-route proxy and the upstream
  // already validates request shape.
  /** @type {Record<string, string>} */
  const headers = {
    "Content-Type":
      event.headers["content-type"] || "application/json",
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
      logger?.error?.(`kimchi upstream ${upstream.status}: ${text.slice(0, 500)}`);
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

    logger?.error?.(`kimchi upstream error: ${message}`);

    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: message }),
    };
  }
}

export default { handler };