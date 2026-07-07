// src/features/chatbot/components/ChatMessage.jsx
//
// Renders a single message bubble. Bubbles inherit from the active DaisyUI
// theme via utility classes — no hardcoded colours. User and assistant get
// distinct surfaces so the conversation reads naturally on every theme.

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

import TypingIndicator from "./TypingIndicator";

/**
 * @param {Object} props
 * @param {import('../types/chat.types').Message} props.message
 */
export function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  const bubbleCls = isUser
    ? "bg-primary text-primary-content rounded-2xl rounded-br-md"
    : "bg-base-200 text-base-content rounded-2xl rounded-bl-md";

  const Avatar = isUser ? User : Bot;
  const avatarCls = isUser
    ? "bg-primary/15 text-primary"
    : "bg-secondary/15 text-secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div
          aria-hidden="true"
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${avatarCls}`}
        >
          <Avatar className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[78%] px-3.5 py-2 ${bubbleCls} shadow-sm`}>
        {message.pending ? (
          <TypingIndicator />
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        )}
      </div>

      {isUser && (
        <div
          aria-hidden="true"
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${avatarCls}`}
        >
          <Avatar className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );
}

export default ChatMessage;