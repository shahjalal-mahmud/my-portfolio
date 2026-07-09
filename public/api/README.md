# `public/api/` — cPanel chat proxy

This folder ships to `dist/api/` at build time. On a cPanel (or any
Apache-with-PHP) host, the chatbot's request to `/api/kimchi/*` is
rewritten by `dist/.htaccess` to `dist/api/kimchi.php`, which proxies
the call to Kimchi's API with the secret key injected server-side.

## Files in this folder

| File | Purpose |
|---|---|
| `kimchi.php` | The proxy. You don't need to edit this in production. |
| `kimchi-config.example.php` | Template for the secret config file. **Copy this** to create your real config. |

## Where the secret config file lives

The API key **must** live in a PHP file **outside** `public_html/`.
Standard cPanel layout:

```
/home/<cpanel-username>/                              ← web root's parent
├── public_html/                                       ← Apache serves this
│   ├── .htaccess                                      ← ships from public/.htaccess
│   ├── index.html                                     ← your React app
│   ├── api/
│   │   ├── kimchi.php                                 ← the proxy
│   │   ├── kimchi-config.example.php                  ← template
│   │   └── README.md                                  ← this file
│   └── …
└── kimchi-config.php                                  ← your real config (NOT web-accessible)
```

The proxy uses `require __DIR__ . '/../../kimchi-config.php'` to load
the key. `__DIR__` is `/home/<user>/public_html/api`, so the resolved
path is `/home/<user>/kimchi-config.php`.

## Verifying it works

After deploying (see `../../DEPLOYMENT_CPANEL.md`), open:

```
https://shahajalal.me/api/kimchi/chat/completions
```

You should see JSON like:

```json
{"ok":true,"path":"/chat/completions","apiKeyConfigured":true,"apiKeyLength":56,"node":"cpanel-php-8.1"}
```

If you get a 500 with `"KIMCHI_API_KEY is not configured"`, the config
file path or permissions are wrong — see the troubleshooting section of
the deployment guide.

## Full deployment guide

For the complete step-by-step (uploading the build, creating the config
file outside `public_html`, setting permissions, troubleshooting), see
[`../../DEPLOYMENT_CPANEL.md`](../../DEPLOYMENT_CPANEL.md).