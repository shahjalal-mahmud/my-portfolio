# Chatbot Architecture

> Phase 1 — Architecture & UI Preparation

This document describes the architecture for the portfolio's floating AI
assistant. **No provider is integrated yet.** Every consumer of the AI
service surface currently renders a graceful "assistant not available"
state instead of a live reply.

The chatbot is designed to:

* Represent **Md Shahajalal Mahmud**.
* Answer questions only about him, his skills, projects, experience,
  education, achievements, technologies, services, contact details, and
  Appriyo.
* Inherit the active DaisyUI theme, font, dark/light mode, spacing, and
  border-radius without a single hardcoded colour.
* Feel native on both the desktop site and the mobile Android-style shell.

---

## 1. Folder structure

```
src/
└── features/
    └── chatbot/
        ├── components/
        │   ├── ChatAssistant.jsx   ← composite mount point
        │   ├── ChatLauncher.jsx    ← floating action button
        │   ├── ChatWindow.jsx      ← dialog + layout
        │   ├── ChatHeader.jsx
        │   ├── ChatMessage.jsx
        │   ├── ChatInput.jsx
        │   ├── ChatEmptyState.jsx
        │   ├── ChatErrorState.jsx
        │   ├── SuggestedQuestions.jsx
        │   └── TypingIndicator.jsx
        ├── hooks/
        │   ├── useChat.js          ← state + actions
        │   └── useAutoScroll.js
        ├── services/
        │   └── aiService.js        ← placeholder provider
        ├── types/
        │   └── chat.types.js       ← JSDoc typedefs
        ├── utils/
        │   ├── chatReducer.js
        │   ├── id.js
        │   └── storage.js
        ├── config/
        │   └── chatbot.config.js
        ├── data/
        │   └── suggestedQuestions.js
        ├── assets/                 (reserved for future visuals)
        └── index.js                ← public exports

knowledge/
├── about.md
├── projects.md
├── skills.md
├── experience.md
├── education.md
├── achievements.md
├── services.md
├── contact.md
└── faq.md
```

The feature lives under `src/features/chatbot/` to mirror common feature-
based React organisation, while still being sibling to the existing
`components/`, `sections/`, `mobile/`, and `shared/` folders. Nothing in the
existing folder hierarchy was renamed or duplicated.

---

## 2. Component hierarchy

```
<ChatAssistant>                  ← mounted in both DesktopLayout + MobileLayout
└── <ChatLauncher>               ← FAB, always visible
└── <ChatWindow>                 ← dialog, only when open
    ├── <ChatHeader>             ← identity + close + clear
    ├── message list region
    │   ├── <ChatErrorState>     ← shown when status === "error"
    │   ├── <ChatEmptyState>     ← shown when no messages yet
    │   │   └── <SuggestedQuestions>
    │   └── <ChatMessage>[]      ← one per transcript entry
    │       └── <TypingIndicator>(optional, while pending)
    └── <ChatInput>
```

* `ChatAssistant` is the only component imported by the layouts.
  Individual components are intentionally NOT exported through `index.js`
  except where the layout itself would need them.

---

## 3. State flow

State lives entirely in `useChat`, which uses `useReducer` over a
`chatReducer` defined in `utils/`. The reducer is a pure function with a
tagged-union action set:

| Action                  | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `OPEN` / `CLOSE` / `TOGGLE` | Window visibility.                            |
| `SET_STATUS`            | Set lifecycle status (idle, typing, error…).       |
| `APPEND_USER_MESSAGE`   | Optimistically append a user turn.                |
| `APPEND_ASSISTANT_MESSAGE` | Insert the placeholder assistant turn.         |
| `UPDATE_MESSAGE`        | Patch a single message (used to resolve the pending assistant bubble). |
| `REMOVE_MESSAGE`        | Drop a single message by id.                      |
| `SET_ERROR` / `CLEAR_ERROR` | Track error message.                          |
| `SET_PENDING_INPUT`     | Reserved for future draft autosave.               |
| `CLEAR`                 | Wipe transcript (kept conversation id).           |
| `RESET`                 | New conversation id + wipe transcript.            |

`useChat` also:

* Hydrates from `localStorage` on mount (transcript + conversation id).
* Persists transcript and conversation id on every state change.
* Owns the `sendMessage` flow that appends a user message, adds a pending
  assistant placeholder, then resolves it once the provider replies — or
  stamps a typed "not available" message on rejection.
* Exposes `cancelRequest`, `clear`, `reset`, `open`, `close`, `toggle`.

---

## 4. Theme integration

Every chat component uses DaisyUI utility classes (`bg-base-100`,
`text-base-content`, `bg-primary`, `border-base-300/60`, etc.) and a small
number of theme-aware opacity tricks (`bg-primary/15`). The active theme is
read implicitly via the `data-theme` attribute that `ThemeContext` writes
to `<html>`; DaisyUI's CSS variables cascade to every component, so the
chat re-skins instantly when the user picks a new theme.

The launcher uses an M3-shaped animation borrowed from `M3FAB`
(`whileTap`, `whileHover`, `m3-tap`). The window uses
`bg-base-100/95 backdrop-blur` so it floats over content with the same
frosted-glass feel as the mobile top app bar.

`useTheme` is not directly imported by the chat components — they rely on
the existing theme plumbing already applied at the root.

---

## 5. Accessibility

| Concern              | Implementation                                                |
| -------------------- | ------------------------------------------------------------- |
| Keyboard navigation  | All interactive elements are real `<button>` / `<textarea>`.  |
| ESC closes           | Listened on `window` inside `ChatWindow`.                     |
| Enter to send        | `Enter` (no Shift) → send; `Shift+Enter` → newline.           |
| Focus management     | Input auto-focuses on mount.                                  |
| Screen readers       | `role="dialog"`, `aria-label`, `aria-modal`, `aria-live`, `role="alert"`, `aria-expanded`, `aria-haspopup`. |
| Reduced motion       | Framer Motion respects the user's `prefers-reduced-motion` automatically. |
| Color contrast       | Inherits DaisyUI's accessible palette tokens.                 |

---

## 6. Service layer (`aiService.js`)

The service surface is intentionally tiny and stable:

```js
initializeChat():    Promise<{ conversationId }>
sendMessage(text, { onChunk, signal }?): Promise<AssistantResponse>
clearConversation(conversationId?): Promise<void>
cancelRequest(): void
isRequestActive(): boolean
```

Every method is a placeholder today and rejects with
`AiServiceUnavailableError`. The Phase 1 chat UI catches that rejection and
renders a friendly assistant bubble explaining the service is not wired
yet, while setting `status = "error"` so the in-panel `ChatErrorState` is
also visible.

The signatures match what a Gemini integration will need, so wiring the
provider is a **body-only** change in `aiService.js` — no consumer refactor.

---

## 7. Future integration points

### 7.1 Gemini

* Add `@google/generative-ai` as a dependency (Phase 2).
* In `aiService.js`:
  * `initializeChat()` — instantiate `GoogleGenerativeAI(apiKey).getGenerativeModel(...)`.
  * `sendMessage()` — call `model.generateContentStream(...)`, pipe chunks
    into the existing placeholder bubble via `UPDATE_MESSAGE`, return the
    final `AssistantResponse`.
  * Read `VITE_GEMINI_API_KEY` from `import.meta.env` and short-circuit
    with a clear error message when missing.
* Provider identity (`gemini`), model name (`gemini-2.0-flash`),
  temperature, `maxOutputTokens`, timeout, retry count all live in
  `config/chatbot.config.js` and can be tuned without touching components.

### 7.2 Knowledge base (RAG)

* `knowledge/*.md` files are empty in Phase 1.
* Phase 2 plan:
  * Add a build-time or runtime loader that parses the markdown files
    into chunks.
  * On `initializeChat()`, hydrate the system prompt with the most relevant
    chunks and start a session.
  * Optionally embed chunks with a lightweight embedding model and
    retrieve top-K per user query.

### 7.3 Streaming

* `sendMessage` already accepts an `onChunk` callback. When the provider
  streams, the reducer can repeatedly `UPDATE_MESSAGE` the placeholder
  assistant bubble so text appears incrementally. The
  `TypingIndicator` can be replaced with the partial text as soon as the
  first chunk arrives.

### 7.4 Conversation memory

* The conversation id is persisted to `localStorage` today. Phase 2 can
  promote this to a backend table keyed by the same id.
* `clearConversation(id)` and `reset()` already exist as the memory
  invalidation points.

### 7.5 Extension points

* `data/suggestedQuestions.js` can be swapped for an API call or CMS
  fetch — its function signature is the only contract.
* `ASSISTANT_PROFILE` in config lets us re-brand the assistant (name /
  tagline) without touching the header.
* `CHAT_SURFACE.inputMaxLength`, `maxMessages`, `persistToStorage` give
  ops knobs without code changes.

---

## 8. Things deliberately NOT done in Phase 1

* No Gemini SDK install.
* No API calls.
* No prompts or system messages authored.
* No knowledge-base content.
* No hardcoded personal info beyond the friendly assistant name from
  `ASSISTANT_PROFILE`.
* No new global state library — `useReducer` is enough.
* No additional shared components — we reuse `useBreakpoint`,
  `useScrollLock` patterns and DaisyUI utility classes.

---

## 9. How to run / verify

The chatbot is mounted at the layout root, so opening any page in dev
renders the launcher in the bottom-right:

```bash
npm run dev
```

* Click the launcher — the window opens with the empty state + suggested
  questions.
* Type anything and press **Enter** — a "not available yet" assistant
  bubble appears (proving the full send → update → persist cycle works
  without a live model).
* Press **ESC** — the window closes.
* Reload the page — the transcript persists via `localStorage`.
* Switch DaisyUI themes via the existing theme selector — the chat
  recolours instantly.
* Resize across the desktop / mobile boundary — the layout responds.

---

# Phase 2 — Google Gemini Integration

Phase 1 shipped the surface; Phase 2 wires the model. No architecture was
rebuilt — the chat window, state reducer, and component hierarchy are
identical. Only the AI service layer was replaced, plus a minimal hook
patch for streaming.

## 9.1 SDK choice

The official Google Gen AI JavaScript SDK, **`@google/genai` (v2.x)**, is
the recommended path. The legacy `@google/generative-ai` package is
deprecated and no longer receives new feature work, so we deliberately do
not install it.

## 9.2 Configuration

Every Gemini knob is sourced from `src/features/chatbot/config/chatbot.config.js`,
which ships with realistic Free Tier defaults. Phase 2 did not touch
`chatbot.config.js` because the existing `AI_MODEL` shape already maps
1:1 to Gemini's `config` block:

| Config key             | Maps to Gemini `config`        |
| ---------------------- | ------------------------------ |
| `AI_MODEL.model`       | `ai.chats.create({ model })`   |
| `AI_MODEL.temperature` | `config.temperature`           |
| `AI_MODEL.topP`        | `config.topP`                  |
| `AI_MODEL.topK`        | `config.topK`                  |
| `AI_MODEL.maxOutputTokens` | `config.maxOutputTokens`   |
| `AI_MODEL.timeoutMs`   | Internal timeout via `setTimeout` (SDK has no `AbortSignal` yet) |
| `AI_MODEL.retryCount`  | Retry transient failures only |
| `AI_MODEL.retryBackoffMs` | Initial backoff (exponential) |

The API key is read from `import.meta.env.VITE_GEMINI_API_KEY`. It is
never logged, never persisted, and never sent anywhere except the Gemini
endpoint.

## 9.3 API flow

```
User types "Tell me about his projects" + Enter
       │
       ▼
ChatInput → ChatWindow.handleSend
       │
       ▼
useChat.sendMessage(text)
  ├── dispatch APPEND_USER_MESSAGE   (optimistic)
  ├── dispatch APPEND_ASSISTANT_MESSAGE (pending:true placeholder)
  ├── new AbortController()
  └── aiService.sendMessage(text, { onChunk, signal })
        ├── buildContext()           → empty Phase 2 payload
        ├── getOrCreateChatSession() — module-scope cache
        ├── chat.sendMessageStream({ message })
        ├── for await (chunk of stream)
        │     ├── if signal.aborted → throw CANCELLED
        │     ├── coalesce empty pieces
        │     ├── onChunk(piece) → useChat APPEND_TO_MESSAGE
        │     └── accumulate content
        └── return AssistantResponse { id, content, latencyMs, meta }
       │
       ▼
useChat
  ├── dispatch UPDATE_MESSAGE      (final content, pending:false)
  └── dispatch SET_STATUS("success")

On error:
  ├── humanizeError(err) → friendly text
  ├── dispatch UPDATE_MESSAGE      (friendly message, error:true)
  └── dispatch SET_ERROR(friendly)
```

## 9.4 Conversation lifecycle

* The Gemini `Chat` object is cached in **module scope** of `aiService.js`
  (one per page session).
* Multi-turn history is **rebuilt from `localStorage`** on first
  `sendMessage` after a reload, by mapping each persisted `Message` →
  `{ role: "user" | "model", parts: [{ text }] }`. This keeps cross-reload
  context without a parallel session cache.
* `clearConversation()` drops the cached session AND the persisted
  transcript, so the next send starts from a clean slate.
* `cancelRequest()` aborts the in-flight `AbortController`, which causes
  the streaming loop to throw `AiServiceError(CANCELLED)` cleanly.

## 9.5 Error handling

A single typed error class — `AiServiceError` — with a `code` field
covering every category the service can surface:

| `code`             | Friendly user message                                                |
| ------------------ | -------------------------------------------------------------------- |
| `MISSING_API_KEY`  | "The assistant isn't configured yet (missing API key). …"            |
| `INVALID_API_KEY`  | "The API key was rejected. Please verify VITE_GEMINI_API_KEY …"      |
| `RATE_LIMIT`       | "Hit a rate limit just now. Wait a few seconds and try again."       |
| `QUOTA_EXCEEDED`   | "The free-tier quota is exhausted for now. Please try again later." |
| `TIMEOUT`          | "The request took too long. Please try again."                       |
| `NETWORK`          | "Network unavailable. Check your connection and try again."          |
| `CANCELLED`        | "Request cancelled."                                                 |
| `INVALID_RESPONSE` | "Received an unexpected response from the assistant. …"               |
| `UNKNOWN`          | "Something went wrong. Please try again."                            |

The mapping lives in the exported `humanizeError(err)` function so
`useChat` (and any future consumer) imports a single source of truth
instead of duplicating the table. Raw SDK errors never reach the user.

Retry policy: only `RATE_LIMIT`, `NETWORK`, and `TIMEOUT` are retried.
`INVALID_API_KEY`, `QUOTA_EXCEEDED`, `INVALID_RESPONSE`, and `CANCELLED`
are surfaced immediately. Backoff is `retryBackoffMs * 2^(attempt - 1)`.

## 9.6 Streaming

Responses stream token-by-token via the placeholder `onChunk` callback
that Phase 1 already declared in `aiService.sendMessage`. `useChat` wires
it to the new reducer action `APPEND_TO_MESSAGE`, which appends each
piece to the assistant bubble's `content` field without a
read-modify-write race. Empty chunks are coalesced before invoking the
callback.

The result is the assistant bubble **grows in real time** while tokens
arrive, while the existing `TypingIndicator` continues to show during the
first-token latency — exactly matching the premium feel described in
the Phase 1 spec.

## 9.7 Future knowledge injection points

Two extension surfaces already exist in Phase 2 but ship empty:

1. **`src/features/chatbot/services/systemPrompt.js`** owns
   `buildSystemPrompt()`. Phase 3 will compose this with persona, tone,
   and date-aware safe-harbour phrasing.

2. **`src/features/chatbot/services/contextProvider.js`** owns
   `async buildContext(userMessage)` which returns
   `{ systemAdditions: string, retrievedChunks: RetrievedChunk[] }`.
   `aiService.js` is already structured to splice `systemAdditions` into
   the system instruction on every request — Phase 3 only changes the
   *body* of `buildContext`, not the call sites.

## 9.8 Future RAG integration

Phase 3 will:

1. Parse `knowledge/*.md` at build time (or runtime on first open) into
   chunks.
2. Embed each chunk with a lightweight embedding model.
3. On each `sendMessage`, embed the user query, run a top-K vector
   search, and populate `buildContext`'s `retrievedChunks`.
4. `aiService.buildGenerationConfig` will then format the additions
   string (`"Relevant context:\n<chunk1>\n<chunk2>\n…"`) and append to
   the system instruction.

The reply will transparently become knowledge-grounded without any
component changes — the UI already surfaces `AssistantResponse.meta` as
an extension point.

## 9.9 Verification (Phase 2)

```bash
npm install
npx eslint src/features/chatbot
npx vite build
```

Then, with **no** `VITE_GEMINI_API_KEY` set:

* Open the chat, send a message → friendly "missing API key" bubble +
  banner. No console crash, no SDK import error at load.

With a **valid** key:

* Assistant bubble grows incrementally as tokens stream in.
* Reload the page → previous transcript persists.
* Send "and his skills?" after a portfolio question → assistant has the
  previous turn's context (verifies history rebuild).
* Force a timeout (set `timeoutMs: 50` in config) → friendly
  "Request took too long" bubble.

## 9.10 Things deliberately NOT done in Phase 2

* No real personal information in the system prompt (still placeholder).
* No markdown parsing, no embedding, no vector search, no RAG.
* No indexing of `knowledge/*.md`.
* No code generation or self-modification flows.
* No automatic browser-tab eviction when the conversation gets long —
  reuse `CHAT_SURFACE.maxMessages` for that.

---

# Phase 4 — Knowledge Base Connection

Phase 1 (architecture), Phase 2 (Gemini), and Phase 3 (knowledge content)
are complete. Phase 4 wires the existing `knowledge/` directory into the
service so every reply is grounded in the portfolio's source-of-truth
files.

## 10.1 Design constraints

* **No new dependencies.** `@google/genai` and `react-markdown` were
  already in `package.json` from Phases 2 and earlier; nothing extra.
* **No embeddings, no vector DB, no third-party RAG libs.** The
  knowledge base is ≈50 KB; keyword scoring is faster, simpler, and
  good enough.
* **No UI changes** beyond Markdown rendering in the assistant bubble.
* **No breaking changes** to the existing `aiService` export surface —
  every signature from Phase 2 is preserved.

## 10.2 Knowledge loading

The 17 Markdown files under `knowledge/` (plus `metadata.json`) are
loaded eagerly at module init via Vite's `import.meta.glob`:

```js
const RAW_FILES = import.meta.glob("/knowledge/*.md", {
  query: "?raw", import: "default", eager: true
});
```

This bakes the entire knowledge base into the JS bundle as plain
strings — no runtime fetch, no flash-of-empty-context, no extra
network requests. The bundle grew from ~222 KB → ~278 KB gzipped.

Each file is split into chunks at Markdown heading boundaries
(`#` / `##` / `###`) by `knowledgeLoader.chunkMarkdown()`. A chunk
carries:

* `id`     — `<file>#<index>`, stable for citations.
* `source` — basename (e.g. `skills.md`).
* `section`— the heading it sits under.
* `text`   — the raw markdown, kept for the model to render back.
* `tokens` — pre-tokenised lower-cased word list for fast scoring.

The result is cached in a module-scope `KnowledgeBase` and reused for
every retrieval. `reloadKnowledge()` is exported so future code (HMR,
admin button, manual refresh) can invalidate the cache.

## 10.3 Retrieval flow

For every user message, `buildContext(text)` (in
`services/contextProvider.js`) does the following:

1. Pulls the cached knowledge base (single eager load, no I/O).
2. Calls `retriever.rank(text, kb.chunks, { topK: 5, minScore: 0.5 })`.
3. Builds a `systemAdditions` block containing:
   * A **file catalogue** (from `metadata.json`) — the model learns
     which `.md` file is authoritative for which topic so it can
     cite correctly.
   * The **retrieved chunks** under a `## Retrieved context for this
     question` header, each tagged with its source file + section
     heading.
4. Returns both `systemAdditions` (spliced into the system prompt) and
   `retrievedChunks` (used by `aiService` to populate the response
   `meta` field with citation info).

The additions string is hard-capped at 6 000 characters with a trailing
`_(truncated)_` marker so a runaway query never blows the token budget.

## 10.4 Scoring algorithm

The retriever (`services/retriever.js`) is a pure function combining
three signals per chunk:

| Signal       | Weight | Description                                            |
|--------------|--------|--------------------------------------------------------|
| **TF**       | base   | log(1 + count) of query tokens in chunk text, scaled by coverage (% of query terms matched). |
| **Filename** | +1.2   | per query token that appears in the source filename.   |
| **Heading**  | +1.5   | per query token that appears in the section heading.   |

The bonuses apply even when TF is zero, because topical intent (the
user asked "what are his skills?") is fully expressed by filename +
heading matches — body text rarely needs to echo the question word to
be the right chunk. A small stopword filter (≈80 common English words)
keeps the scoring signal clean.

Smoke test (from `vite-node` against the real knowledge base):

| Query                       | Top-3 chunks surfaced                                                  |
|-----------------------------|------------------------------------------------------------------------|
| "what projects has he built?" | projects.md (overview), Amar Savings, experience.md (Projects Delivered) |
| "what are his skills?"      | skills.md (Technical Skills), Soft Skills, Kotlin — Advanced           |
| "tell me about his education" | education.md (BSc, HSC, SSC)                                          |
| "what is appriyo?"          | experience.md (Founder), services.md (Company), opensource.md         |
| "tell me about Amar Repair" | projects.md (full case study), timeline.md, Repair Store Manager      |
| "what awards has he won?"   | awards.md (SOLVIO, Project Showcase, Math Olympiad)                    |
| "what is his cgpa?"         | about.md, achievements.md, awards.md (Academic Distinctions)          |

## 10.5 Gemini request lifecycle

```
useChat.sendMessage(text)
  └── aiService.sendMessage(text, { onChunk, signal })
        ├── readTranscript()                          → ChatHistory (from localStorage)
        ├── context = await buildContext(text)         → { systemAdditions, retrievedChunks }
        ├── history = buildHistoryFromMessages(persisted)
        ├── getOrCreateChatSession(history, context.systemAdditions)
        │     └── invalidates session when systemAdditions or history length changes
        ├── chat.sendMessageStream({ message: text })
        └── return AssistantResponse {
                content,
                latencyMs,
                meta: {
                  provider: "gemini",
                  retrievedChunks: <count>,
                  sources: ["projects.md", "skills.md", ...]
                }
              }
```

The session-rebuild-by-cache-key (`<historyLen>|<systemAdditionsHash>`)
keeps the per-turn knowledge injection correct without re-running the
SDK setup on every send.

## 10.6 Cache strategy

* **Knowledge cache** — `KnowledgeBase` is built once on first
  `getKnowledgeBase()` call and held in module scope. `reloadKnowledge()`
  is exposed for HMR / future admin actions. Because the markdown files
  are bundled by Vite (not fetched), there is no disk round-trip — the
  cache is essentially free.
* **Chat session cache** — invalidated whenever the system instruction
  changes (which is every send, since the retrieved additions differ)
  OR when the history length changes (which is also every send). The
  common path is "rebuild session per turn"; the cache key check is a
  fast-path for repeated identical re-sends.
* **Transcript cache** — unchanged from Phase 2 (localStorage-backed).

## 10.7 Response formatting (Markdown rendering)

`ChatMessage` now renders assistant bubbles through `react-markdown`
with a custom component map so every element inherits the active
DaisyUI theme. The map covers:

| Markdown        | Bubble styling                                                    |
|-----------------|-------------------------------------------------------------------|
| `# h1`–`#### h4`| sized, semibold, base-content colour                              |
| `paragraph`     | text-sm, leading-relaxed                                          |
| `bullet list`   | list-disc, pl-5, base-content                                     |
| `numbered list` | list-decimal, pl-5                                                |
| `inline code`   | bg-base-300/60, rounded, font-mono, 12px                          |
| `fenced code`   | bg-base-300/40 block, border-base-300/60, overflow-x-auto        |
| `blockquote`    | border-l-2 border-primary/40, italic                              |
| `table`         | bg-base-300/40 header, base-300/40 row dividers                   |
| `link`          | text-primary, underline, target=_blank + rel=noopener             |
| `hr`            | border-base-300/60                                                |

User bubbles remain plain text (whitespace-pre-wrap) — chat input is
never Markdown.

## 10.8 Update workflow

Knowledge files are static, source-controlled, and bundled at build
time, so updates follow the standard git flow:

```bash
# 1. Edit a knowledge file
$EDITOR knowledge/skills.md

# 2. Restart dev server (Vite HMR will rebuild the bundle but the
#    in-page knowledge cache stays stale until reload).
npm run dev      # HMR triggers; reload the browser tab

# 3. Production deploy
npm run build
```

Future enhancements (intentionally NOT done now):

* Live HMR-aware cache reload (a `vite-plugin-watch` hook that calls
  `reloadKnowledge()` on `.md` changes).
* A "Show sources" UI affordance under assistant bubbles that lists
  the retrieved chunks.
* Per-chunk overrides for citation weights (e.g. boost `bio.md`).

## 10.9 Verification (Phase 4)

```bash
npx eslint src/features/chatbot
npx vite build
```

With a valid `VITE_GEMINI_API_KEY`:

* "Tell me about his projects" → assistant returns a Markdown answer
  citing `projects.md`, with project names, technologies, and links.
* "What's his CGPA?" → assistant cites `education.md` and `about.md`,
  returns 3.90/4.00.
* "What is Appriyo?" → assistant cites `experience.md`, `services.md`,
  describes the company accurately.
* "Where can I find his GitHub?" → assistant cites `contact.md`,
  returns `https://github.com/shahajalal-mahmud`.
* "How do I cook pasta?" → assistant politely refuses (out of scope).
* "Tell me something the knowledge base doesn't cover" → assistant
  responds "I don't have that information" instead of inventing.

Without a key:

* Send a message → friendly "missing API key" error (Phase 2 path,
  unchanged).

## 10.10 Things deliberately NOT done in Phase 4

* No embeddings, vector DB, FAISS, Pinecone, Chroma, LangChain,
  LlamaIndex — keyword scoring is enough.
* No live HMR for knowledge files (would need a Vite plugin).
* No "Show sources" UI under bubbles (Phase 5+ work).
* No chunk-level citation weights (chunk-level override knobs are
  exported via `retriever.rank({ weights })` but currently fixed).
* No fallback to "general knowledge" — the model is explicitly told to
  refuse unknown questions per the system prompt.