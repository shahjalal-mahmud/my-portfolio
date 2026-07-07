// src/features/chatbot/components/ChatWindow.jsx
//
// The main chat surface. Layout:
//
//   ┌──────────────────────────┐
//   │  ChatHeader              │  sticky
//   ├──────────────────────────┤
//   │  MessageList / Empty     │  flex-1, scrollable
//   ├──────────────────────────┤
//   │  ChatInput               │  sticky
//   └──────────────────────────┘
//
// Phase 1 has no real model; sending a message renders a typed
// "not wired yet" assistant bubble so the user sees the full conversation
// loop working without the live Gemini call.

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatEmptyState from "./ChatEmptyState";
import ChatErrorState from "./ChatErrorState";
import { useChat } from "../hooks/useChat";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { useBreakpoint } from "../../../shared/hooks/useBreakpoint";

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export function ChatWindow({ open, onClose }) {
  const { state, sendMessage, clear, close, isSending } = useChat();
  const { isMobile } = useBreakpoint();
  const [draft, setDraft] = useState("");

  const listRef = useAutoScroll([state.messages, state.status]);

  // ESC closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSend = useCallback(async () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    await sendMessage(text);
  }, [draft, sendMessage]);

  const handleSuggested = useCallback(
    async (q) => {
      if (!q) return;
      await sendMessage(q.prompt || q.text);
    },
    [sendMessage]
  );

  const handleClear = useCallback(() => {
    clear();
    setDraft("");
  }, [clear]);

  const handleDismissError = useCallback(() => {
    // Reducer doesn't expose CLEAR_ERROR directly, so we close+open to reset.
    // For Phase 1 the simplest reliable path is to clear the conversation.
    clear();
  }, [clear]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="chat-window"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-label="AI assistant"
          className={`
            fixed z-50 overflow-hidden
            bg-base-100 text-base-content
            border border-base-300/60
            rounded-3xl shadow-2xl
            flex flex-col
            ${
              isMobile
                ? "inset-x-3 bottom-24 top-auto max-h-[80vh]"
                : "right-6 bottom-24 w-[min(380px,calc(100vw-3rem))] h-[min(620px,calc(100vh-7rem))]"
            }
          `}
        >
          <ChatHeader
            onClose={() => {
              close();
              onClose?.();
            }}
            onClear={handleClear}
            canClear={state.messages.length > 0}
          />

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
          >
            {state.status === "error" && state.error && (
              <ChatErrorState
                message={state.error}
                onRetry={handleClear}
                onDismiss={handleDismissError}
              />
            )}

            {state.messages.length === 0 ? (
              <ChatEmptyState
                questions={state.suggestions}
                onSelect={handleSuggested}
              />
            ) : (
              state.messages.map((m) => <ChatMessage key={m.id} message={m} />)
            )}
          </div>

          <ChatInput
            value={draft}
            onChange={setDraft}
            onSend={handleSend}
            disabled={isSending}
            placeholder={
              state.messages.length === 0
                ? "Ask anything about Shahajalal…"
                : "Send a message…"
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ChatWindow;
