import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
//
// We use `loadEnv(mode, root, '')` with an EMPTY prefix so we can read
// `KIMCHI_API_KEY` (no VITE_ prefix) from `.env` for the dev-server proxy.
// If we left it `VITE_`-prefixed, Vite would inline its value into the
// client bundle at build time — leaking the key to every visitor. The
// dev server reads it via `process.env` instead, keeping the value
// server-side only.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const kimchiApiKey = env.KIMCHI_API_KEY

  return {
    plugins: [
      tailwindcss(),
      react()
    ],
    server: {
      // The Kimchi API does not allow browser CORS, so the dev server proxies
      // `/api/kimchi/*` to `https://llm.kimchi.dev/openai/v1/*` and injects
      // the API key server-side. The client code is identical between dev
      // and production (Netlify function in prod, see netlify.toml).
      proxy: {
        '/api/kimchi': {
          target: 'https://llm.kimchi.dev/openai/v1',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/kimchi/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (kimchiApiKey) {
                proxyReq.setHeader('Authorization', `Bearer ${kimchiApiKey}`)
              }
            })
          },
        },
      },
    },
  }
})