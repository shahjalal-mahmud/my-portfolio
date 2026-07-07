// src/features/chatbot/components/ChatInput.jsx
//
// Textarea + send button. Supports Enter to send, Shift+Enter for newline,
// and respects `inputMaxLength` from config. Sits at the bottom of the
// ChatWindow, sticks to the bottom while the message list scrolls.

import { useCallback, useRef, useEffect } from "react";
import { Send } from "lucide-react";

import { CHAT_SURFACE } from "../config/chatbot.config";

/**
 * @param {Object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {() => void} props.onSend
 * @param {boolean} props.disabled
 * @param {string} [props.placeholder]
 */
export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  placeholder = "Ask me anything…",
}) {
  const textareaRef = useRef(null);

  // Auto-grow the textarea up to ~6 rows.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  // Focus the input on mount.
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!disabled && value.trim()) onSend();
      }
    },
    [disabled, value, onSend]
  );

  const canSend = !disabled && value.trim().length > 0;

  return (
    <div className="border-t border-base-300/60 bg-base-100/95 backdrop-blur p-3">
      <div
        className="
          flex items-end gap-2 rounded-2xl
          bg-base-200 border border-base-300/60
          focus-within:border-primary/60
          transition-colors
        "
      >
        <label htmlFor="chat-input" className="sr-only">
          Message
        </label>
        <textarea
          id="chat-input"
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          aria-label="Message"
          maxLength={CHAT_SURFACE.inputMaxLength}
          className="
            flex-1 resize-none bg-transparent
            px-3 py-2.5
            text-sm text-base-content placeholder:text-base-content/45
            focus:outline-none
            disabled:opacity-60
          "
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
          className={`
            m3-tap flex-shrink-0 m-1
            w-9 h-9 rounded-xl
            flex items-center justify-center
            transition-all
            ${
              canSend
                ? "bg-primary text-primary-content hover:bg-primary/90"
                : "bg-base-300 text-base-content/40 cursor-not-allowed"
            }
          `}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <p className="mt-1.5 px-1 text-[11px] text-base-content/40">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}

export default ChatInput;
