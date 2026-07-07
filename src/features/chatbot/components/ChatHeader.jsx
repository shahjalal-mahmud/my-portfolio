// src/features/chatbot/components/ChatHeader.jsx
//
// Sticky header inside ChatWindow. Shows the assistant identity, an online
// indicator, and the close + clear actions. Uses DaisyUI theme tokens only.

import { motion } from "framer-motion";
import { Bot, RotateCcw, X } from "lucide-react";

import { ASSISTANT_PROFILE } from "../config/chatbot.config";

/**
 * @param {Object} props
 * @param {() => void} props.onClose
 * @param {() => void} props.onClear
 * @param {boolean} props.canClear
 */
export function ChatHeader({ onClose, onClear, canClear }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="
        relative flex items-center gap-3 px-4 py-3
        bg-base-100/95 backdrop-blur
        border-b border-base-300/60
      "
    >
      <div
        aria-hidden="true"
        className="
          relative flex-shrink-0 w-10 h-10 rounded-2xl
          bg-primary/15 text-primary
          flex items-center justify-center
        "
      >
        <Bot className="w-5 h-5" />
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success ring-2 ring-base-100" />
      </div>

      <div className="min-w-0 flex-1 leading-tight">
        <h2 className="text-sm font-semibold text-base-content truncate">
          {ASSISTANT_PROFILE.name}
        </h2>
        <p className="text-xs text-base-content/60 truncate">
          {ASSISTANT_PROFILE.tagline}
        </p>
      </div>

      <div className="flex items-center gap-0.5">
        {canClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear conversation"
            className="
              m3-tap w-9 h-9 rounded-full flex items-center justify-center
              text-base-content/70 hover:bg-base-200
              active:scale-95 transition-transform
            "
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="
            m3-tap w-9 h-9 rounded-full flex items-center justify-center
            text-base-content/70 hover:bg-base-200
            active:scale-95 transition-transform
          "
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.header>
  );
}

export default ChatHeader;