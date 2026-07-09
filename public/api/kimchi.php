<?php
// public/api/kimchi.php
//
// Same-origin proxy for the Kimchi LLM API, used by the portfolio
// chatbot when the site is hosted on cPanel (or any Apache host that
// runs PHP). On Netlify, the equivalent code lives in
// netlify/functions/kimchi.js — keep the two in sync when changing
// upstream behaviour. The dev-server proxy lives in vite.config.js.
// All three consume the same upstream base URL:
//
//   https://llm.kimchi.dev/openai/v1
//
// The browser cannot call Kimchi directly because Kimchi does not send
// CORS headers for browser origins. This script accepts requests at
// `/api/kimchi[/<path>]` (rewritten by public/.htaccess) and forwards
// them to the upstream, injecting the API key from `KIMCHI_API_KEY`.
//
// ─── DEPLOYMENT ───────────────────────────────────────────────────────────
// On cPanel, the API key MUST live in a config file ONE directory above
// public_html, e.g. `/home/<user>/kimchi-config.php`. That file is not
// web-accessible (it's outside the document root), so the key never
// reaches the browser. See public/api/README.md and DEPLOYMENT_CPANEL.md
// for the full setup.
//
// Required PHP extensions: curl. Recommended: PHP >= 8.1 (7.4 works but
// is EOL).
// ──────────────────────────────────────────────────────────────────────────

declare(strict_types=1);

const KIMCHI_BASE       = 'https://llm.kimchi.dev/openai/v1';
const ALLOWED_ORIGIN    = 'https://shahajalal.me';
const CURL_CONNECT_TIMEOUT_S = 10;
const CURL_TIMEOUT_S    = 30; // keep in sync with netlify/functions/kimchi.js TIMEOUT_MS

/**
 * Load and validate the API key from a config file one directory above
 * public_html. Returns the key string, or sends a 500 JSON response
 * and aborts on any failure.
 */
function load_api_key(): string
{
    // Top-level `return` in a PHP file aborts the request cleanly with
    // no output — used here so the failure paths below stay one-liners.
    $configPath = __DIR__ . '/../../kimchi-config.php';

    // Note: we deliberately do NOT pre-check `is_file()` — that's a
    // TOCTOU anti-pattern. The require either succeeds or throws, and
    // we handle both outcomes.
    try {
        $config = require $configPath;
    } catch (\Throwable $e) {
        send_missing_config(
            'Could not load kimchi-config.php: ' . $e->getMessage()
        );
    }

    if (!is_array($config) || empty($config['kimchi_api_key']) || !is_string($config['kimchi_api_key'])) {
        send_missing_config(
            'kimchi-config.php must return an array with a non-empty string key "kimchi_api_key".'
        );
    }

    return $config['kimchi_api_key'];
}

function send_missing_config(string $hint): void
{
    send_json(500, [
        'error' => 'KIMCHI_API_KEY is not configured in the cPanel environment.',
        'hint'  => $hint,
    ]);
}

/**
 * Send a JSON response with the given HTTP status code and exit.
 *
 * @param int                  $status HTTP status code.
 * @param array<string, mixed> $body   Will be JSON-encoded.
 */
function send_json(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function get_path_info(): string
{
    $info = $_SERVER['PATH_INFO'] ?? '';
    return ($info === '' || $info === '/') ? '/chat/completions' : $info;
}

// ─── CORS preflight ───────────────────────────────────────────────────────

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}

// ─── Routing ───────────────────────────────────────────────────────────────

$method   = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$pathInfo = get_path_info();
$apiKey   = load_api_key();

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);

if ($method === 'GET') {
    // Health check. Shape mirrors netlify/functions/kimchi.js (kept in
    // sync so existing monitoring tools work unchanged), except for
    // the `node` field which identifies the runtime.
    send_json(200, [
        'ok'               => true,
        'path'             => $pathInfo,
        'apiKeyConfigured' => true,
        'apiKeyLength'     => strlen($apiKey),
        'node'             => 'cpanel-php-' . PHP_VERSION,
    ]);
}

if ($method !== 'POST') {
    header('Allow: GET, POST');
    send_json(405, ['error' => 'Method Not Allowed']);
}

// ─── POST: proxy the request to Kimchi ─────────────────────────────────────

$rawBody = file_get_contents('php://input') ?: '{}';

$ch = curl_init();
if ($ch === false) {
    send_json(500, ['error' => 'curl_init failed']);
}

curl_setopt_array($ch, [
    CURLOPT_URL            => KIMCHI_BASE . $pathInfo,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $rawBody,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
        'Accept: application/json',
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER         => true,
    CURLOPT_CONNECTTIMEOUT => CURL_CONNECT_TIMEOUT_S,
    CURLOPT_TIMEOUT        => CURL_TIMEOUT_S,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_USERAGENT      => 'portfolio-cpanel-kimchi-proxy/1.0',
]);

$response = curl_exec($ch);

if ($response === false) {
    $errno  = curl_errno($ch);
    $errMsg = curl_error($ch);
    curl_close($ch);

    // 28 = CURLE_OPERATION_TIMEDOUT. Wording kept identical to the
    // Netlify function so error-mapping in the client is uniform.
    $error = $errno === 28
        ? 'Upstream timed out'
        : 'Upstream curl error (' . $errno . '): ' . $errMsg;

    send_json(502, ['error' => $error]);
}

$status     = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$headerSize = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$headersRaw = substr((string) $response, 0, $headerSize);
$body       = substr((string) $response, $headerSize);
curl_close($ch);

// Mirror upstream Content-Type; fall back to JSON which is what Kimchi
// returns today. This keeps the response byte-compatible with what a
// direct browser→Kimchi call would have produced (modulo CORS).
$contentType = 'application/json; charset=utf-8';
if (preg_match('/^content-type\s*:\s*(.+?)\r?\n/imi', $headersRaw, $m)) {
    $contentType = trim($m[1]);
}

if ($status >= 400) {
    // Log only metadata — never the body, which may contain the user's
    // prompt content on 4xx responses from Kimchi (content policy,
    // context window, etc.).
    error_log(sprintf(
        'kimchi upstream %d %s (body bytes: %d)',
        $status,
        $pathInfo,
        strlen($body)
    ));
}

http_response_code($status);
header('Content-Type: ' . $contentType);
echo $body;