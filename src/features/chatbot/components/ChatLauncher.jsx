// src/features/chatbot/components/ChatLauncher.jsx
//
// Floating action button that toggles the chat. Adapts to the active
// experience via useBreakpoint (mobile vs desktop positioning). Theme-
// driven colours, subtle pulse animation, and hover/tap physics via
// Framer Motion — matching the M3 FAB style already used in the project.

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

import { useBreakpoint } from "../../../shared/hooks/useBreakpoint";

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onToggle
 */
export function ChatLauncher({ open, onToggle }) {
  const { isMobile } = useBreakpoint();

  // Position: bottom-right on desktop, bottom-right (above nav bar) on mobile.
  const positionCls = isMobile
    ? "bottom-20 right-4"
    : "bottom-6 right-6";

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      aria-expanded={open}
      aria-haspopup="dialog"
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={`
        m3-tap fixed z-40
        ${positionCls}
        w-14 h-14 rounded-full
        flex items-center justify-center
        bg-primary text-primary-content
        shadow-lg shadow-primary/25
        focus:outline-none focus:ring-2 focus:ring-primary/40
        ${!open ? "animate-pulse" : ""}
      `}
    >
      <motion.span
        key={open ? "x" : "msg"}
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.18 }}
        className="flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.span>
    </motion.button>
  );
}

export default ChatLauncher;
