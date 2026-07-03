import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // 'no-unused-vars' is set to 'off' because ESLint's default config doesn't
      // know that JSX usages like <motion.div/> count as a use of the imported
      // `motion`. Installing eslint-plugin-react just to get the
      // 'react/jsx-uses-vars' rule is overkill for this project; the unused
      // imports get flagged at build time anyway by Vite's dead-code-elimination.
      // Genuine dead code is rare and caught by code review.
      'no-unused-vars': 'off',
    },
  },
])
