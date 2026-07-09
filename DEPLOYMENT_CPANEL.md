# Deploying to cPanel Shared Hosting

This guide walks you through deploying the portfolio to a cPanel shared
host (Hostinger, Namecheap, Bluehost, SiteGround, etc.) so the chatbot
works without Netlify.

The frontend ships as plain static files. The chatbot needs a small PHP
proxy that injects your Kimchi API key server-side — that key must
**never** be in the codebase or the browser bundle.

## Prerequisites

Check these in cPanel before you start:

- [ ] **PHP ≥ 8.1** — *cPanel → MultiPHP Manager* or *Select PHP Version*.
      The proxy uses `declare(strict_types=1)` and a few modern syntax
      features. PHP 7.4 works but is end-of-life; use 8.1 or newer.
- [ ] **`curl` PHP extension enabled** — same panel as above. Look for
      `curl` in the extensions list. It is enabled by default on
      virtually every shared host; disable it only if you have a reason.
- [ ] **Apache `mod_rewrite` enabled** — *cPanel → EasyApache* or
      *Apache Modules*. Almost always on by default.
- [ ] **Apache `mod_headers` enabled** — same place. Required for the
      no-cache and security headers in `.htaccess`.
- [ ] **Domain `shahajalal.me` pointed at the host** — DNS A or CNAME
      record pointing at the server. Allow up to 24h for propagation
      when you first point it.
- [ ] **A way to create a file outside `public_html/`** — either
      cPanel File Manager with the *Up One Level* button, or SSH
      access. The cPanel *Terminal* feature is enough if SSH isn't
      available.

---

## Step 1 — Build the project

From the project root on your local machine:

```sh
npm install        # only if you haven't already
npm run build
```

This produces a `dist/` folder with everything the host needs.

## Step 2 — Remove the Netlify-only file

`dist/_redirects` is processed by Netlify's CDN and is **not** valid
Apache config. Delete it before uploading:

```sh
rm dist/_redirects
```

If you skip this, Apache will try to interpret it as a directory
redirect and the chatbot will 404.

## Step 3 — Upload to `public_html/`

The **contents** of `dist/` go into `public_html/`. Don't upload the
`dist/` folder itself — only its children.

**Easiest method — zip + upload + extract:**

1. On your local machine, zip the contents of `dist/` (not the
   `dist/` folder):
   ```sh
   cd dist && zip -r ../portfolio.zip . && cd ..
   ```
2. In cPanel **File Manager**, navigate to `public_html/`.
3. Click *Upload* → drag `portfolio.zip` → wait for upload.
4. Go back to `public_html/`, right-click `portfolio.zip` → *Extract*.
5. Delete `portfolio.zip`.
6. **Enable *Show hidden files*** in File Manager settings
   (top-right gear icon → *Reset all interface settings* → enable
   *Show hidden files (dotfiles)*) and verify `public_html/.htaccess`
   is present. If it isn't, the SPA and chatbot will both break.

**Alternative — drag-and-drop upload:**

You can drag files directly in File Manager, but dotfiles like
`.htaccess` are easy to miss. Use the zip method unless you have a
reason not to.

## Step 4 — Create the API key config file (outside `public_html/`)

The Kimchi API key lives in `/home/<cpanel-username>/kimchi-config.php`
— one directory above `public_html/`. The PHP proxy will `require` it,
and because it's outside the document root, Apache can never serve it
to a browser.

**File Manager method:**

1. In File Manager, navigate to `/home/<cpanel-username>/` (the
   *Up One Level* button from `public_html/`).
2. Click *+ File* → name it `kimchi-config.php`.
3. Right-click the new file → *Edit* → paste this:
   ```php
   <?php
   return [
       'kimchi_api_key' => 'sk-your-real-kimchi-key-here',
   ];
   ```
4. Replace `sk-your-real-kimchi-key-here` with your actual key from
   <https://kimchi.dev>.
5. Save.

**SSH method:**

```sh
nano ~/kimchi-config.php
# paste the contents above, replace the placeholder, save
```

## Step 5 — Set file permissions

Wrong permissions are the most common cause of "500 — file not
readable" errors. The numbers below are the standard recommendations
for cPanel:

| File / folder | Permission | Why |
|---|---|---|
| `~/kimchi-config.php` | `600` (or `chmod 600`) | Only your user can read it — the key must stay secret. |
| `~/public_html/.htaccess` | `644` | Apache needs to read it; nobody needs to write it. |
| `~/public_html/api/kimchi.php` | `644` | Apache needs to read+execute it as PHP. |
| `~/public_html/api/kimchi-config.example.php` | `644` | It's just a template; safe to be world-readable. |
| `~/public_html/index.html` and other static files | `644` | Standard for static web content. |
| Folders | `755` | Standard for directories the web server needs to traverse. |

In File Manager, right-click each file → *Permissions* → enter the
number above. Via SSH:

```sh
chmod 600  ~/kimchi-config.php
chmod 644  ~/public_html/.htaccess
chmod 644  ~/public_html/api/kimchi.php
chmod 644  ~/public_html/api/kimchi-config.example.php
find ~/public_html -type d -exec chmod 755 {} \;
find ~/public_html -type f -exec chmod 644 {} \;
```

The last two `find` commands are optional but tidy up if any
permissions were wrong from the upload.

## Step 6 — Verify the chatbot (health check)

Open this URL in your browser:

```
https://shahajalal.me/api/kimchi/chat/completions
```

You should see a JSON response like:

```json
{
  "ok": true,
  "path": "/chat/completions",
  "apiKeyConfigured": true,
  "apiKeyLength": 56,
  "node": "cpanel-php-8.1"
}
```

If you get a 404, the `.htaccess` wasn't uploaded. If you get a 500
with `"KIMCHI_API_KEY is not configured"`, the config file path or
permissions are wrong — see troubleshooting below.

## Step 7 — Smoke test the chatbot

1. Open `https://shahajalal.me` in a fresh browser tab.
2. Click the chatbot launcher (bottom-right corner).
3. Type *"Tell me about Shahajalal."* and press Enter.
4. You should get a streaming reply within a couple of seconds.

If the chat bubble shows an error like "The assistant is temporarily
unavailable", open the cPanel *Error Log* (in cPanel dashboard →
*Metrics* → *Errors*) and look for fresh entries — they include the
upstream status code and a snippet of the response body.

---

## Troubleshooting

### 404 on `/api/kimchi/*`

- `.htaccess` not uploaded. In File Manager, enable *Show hidden
  files* and confirm `public_html/.htaccess` exists. The file
  starts with `# public/.htaccess` — open it to verify.
- `mod_rewrite` is off. Ask your host to enable it, or check
  *cPanel → EasyApache → Apache Modules*.
- The browser is hitting an old URL. Hard-reload
  (Ctrl/Cmd + Shift + R) to bypass the service worker cache.

### 500 with `"KIMCHI_API_KEY is not configured"`

The PHP file can't find the config. Diagnose:

1. SSH in and verify the file exists:
   ```sh
   ls -la ~/kimchi-config.php
   ```
2. Test the `require` from PHP directly:
   ```sh
   php -r "var_dump(require '/home/<user>/kimchi-config.php');"
   ```
   You should see the array. If you see `false` or an error, the file
   is unreadable or has a syntax error.
3. The PHP file expects the path `__DIR__ . '/../../kimchi-config.php'`
   to resolve to your home directory. If your cPanel account has a
   non-standard layout (e.g. the document root is one level deeper),
   you'll need to adjust the relative path in `kimchi.php`.

### `open_basedir` restriction blocks `require` outside the document root

Some hosts have a security policy that prevents PHP from reading files
outside `public_html/`. You'll see a warning like
`open_basedir restriction in effect` in the error log.

**Fallback A — `.user.ini` with `auto_prepend_file`:**

Create `/home/<user>/public_html/.user.ini`:

```ini
auto_prepend_file = /home/<user>/kimchi-config.php
```

Then in `kimchi.php`, change the `require` line to:

```php
$config = $GLOBALS['__portfolio_config'] ?? require __DIR__ . '/../../kimchi-config.php';
```

…and have `kimchi-config.php` assign to that global:

```php
<?php
$GLOBALS['__portfolio_config'] = ['kimchi_api_key' => 'sk-...'];
return $GLOBALS['__portfolio_config'];
```

**Fallback B — keep the config inside `public_html/`:**

Put `kimchi-config.php` in `public_html/api/` with a non-standard name
like `kimchi-config.local.php`, and add this to `public_html/.htaccess`
above the existing rewrite rules:

```apache
<Files "kimchi-config.local.php">
    Require all denied
</Files>
```

Then change the `require` in `kimchi.php` to:

```php
$config = require __DIR__ . '/kimchi-config.local.php';
```

This is less secure than keeping the file outside the document root,
but it's the only option on hosts with strict `open_basedir` settings.

### 502 / upstream timeout

- Some shared hosts block outbound HTTPS to non-whitelisted domains.
  Contact your host and ask if `llm.kimchi.dev` (port 443) is allowed.
- The upstream is genuinely slow. The proxy has a 30-second timeout;
  if Kimchi takes longer, the response will be a 502. Try again — most
  responses complete in 2–5 seconds.

### CORS errors in the browser console

Only relevant if you ever serve the frontend from a different origin
than the API. The proxy already returns
`Access-Control-Allow-Origin: https://shahajalal.me`. If you ever
serve from a staging subdomain, add it to the allowlist in
`public/api/kimchi.php` (the `Access-Control-Allow-Origin` header and
the `OPTIONS` preflight block).

### Stale service worker / old chat

The site has a service worker (`public/sw.js`) that caches the app
shell. After a deploy, some users may see the old version until the
SW updates. To force a fresh load:

- **As a user**: Ctrl/Cmd + Shift + R, or DevTools → Application →
  Service Workers → *Unregister*.
- **As a deploy step**: bump the `CACHE_NAME` constant in
  `public/sw.js` before building, so the new SW replaces the old one
  for everyone on their next visit.

### `curl` extension not loaded

In *cPanel → Select PHP Version* → *Extensions*, enable `curl`. This
is enabled by default on every shared host I've seen; only worth
checking if the error log literally says "Call to undefined function
curl_init".

### `.htaccess` causes 500 immediately

You uploaded a file with Windows line endings (CRLF) and Apache is
strict. Fix:

```sh
# On the server, after uploading:
dos2unix ~/public_html/.htaccess
```

Or re-save the file on a machine with Unix line endings before
uploading.

---

## Where things live after deployment

```
/home/<cpanel-username>/
├── kimchi-config.php          ← your real API key (chmod 600)
└── public_html/               ← Apache's document root
    ├── .htaccess              ← SPA fallback + API rewrite + security
    ├── index.html             ← React app entry
    ├── sw.js                  ← service worker
    ├── manifest.webmanifest   ← PWA manifest
    ├── assets/                ← hashed JS + CSS bundles
    ├── icons/                 ← PWA icons
    ├── img/                   ← site images
    ├── projects/              ← project screenshots (avif/webp/png)
    ├── cv.pdf                 ← downloadable CV
    ├── favicon.ico            ← …
    └── api/
        ├── kimchi.php         ← the proxy (chmod 644)
        ├── kimchi-config.example.php  ← template, harmless to leave
        └── README.md          ← short note
```

## Re-deploying after a change

1. `npm run build`
2. `rm dist/_redirects` (still required)
3. Re-zip `dist/*` and upload to `public_html/` (overwrite).
4. If the proxy logic in `public/api/kimchi.php` changed, you can
   edit it directly in cPanel File Manager or re-upload — no restart
   needed, PHP is interpreted on every request.
5. The Kimchi key only changes if you rotate it. Bump
   `~/kimchi-config.php` and you're done.

## Security checklist

- [ ] `~/kimchi-config.php` is `chmod 600` (or `400`).
- [ ] The config file is **not** inside `public_html/`.
- [ ] The browser DevTools → *Network* tab, on a chat request, does
      **not** show the `Authorization: Bearer …` header (it should
      only be on the server-to-server hop to Kimchi, never on the
      browser-to-server hop).
- [ ] `https://shahajalal.me/.env` and `https://shahajalal.me/.git`
      both return 404 (dotfile block rule in `.htaccess`).
- [ ] You have not committed `kimchi-config.php` or any `.env` to
      the git repo.
