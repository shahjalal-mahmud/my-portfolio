/* Service Worker — versioned cache, app-shell precache, runtime cache for assets & HTML. */

const VERSION = "v1.0.0";
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const HTML_CACHE = `html-${VERSION}`;

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
];

// ---- install: precache app shell ----
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL).catch(() => undefined))
      .then(() => self.skipWaiting())
  );
});

// ---- activate: clean old caches ----
self.addEventListener("activate", (event) => {
  const allowed = new Set([STATIC_CACHE, RUNTIME_CACHE, HTML_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !allowed.has(k)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// ---- fetch: routing rules ----
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only handle same-origin requests and Google Fonts.
  const sameOrigin = url.origin === self.location.origin;
  const isGoogleFonts =
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com";

  if (!sameOrigin && !isGoogleFonts) return;

  // HTML navigations: network-first, fall back to cached index for offline.
  if (request.mode === "navigate" || (request.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(networkFirstHTML(request));
    return;
  }

  // Static assets + Google Fonts: stale-while-revalidate.
  event.respondWith(staleWhileRevalidate(request));
});

async function networkFirstHTML(request) {
  try {
    const fresh = await fetch(request);
    const cache = await caches.open(HTML_CACHE);
    cache.put("/index.html", fresh.clone()).catch(() => undefined);
    return fresh;
  } catch (_) {
    const cache = await caches.open(HTML_CACHE);
    const cached =
      (await cache.match("/index.html")) ||
      (await cache.match(request)) ||
      (await caches.match(request));
    if (cached) return cached;
    return new Response(
      "<h1>Offline</h1><p>This page is not cached yet. Please reconnect and try again.</p>",
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone()).catch(() => undefined);
      }
      return response;
    })
    .catch(() => cached);
  return cached || networkPromise;
}

// ---- messages: allow page to trigger skipWaiting ----
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});