// src/features/chatbot/components/TypingIndicator.jsx
//
// Three-dot pulsing indicator rendered while the assistant is "thinking".
// Inherits the current theme (bg-base-200 / text-base-content) so it blends
// with every DaisyUI theme without any hardcoded colour.

import { motion } from "framer-motion";

const dot = {
  initial: { y: 0, opacity: 0.4 },
  animate: {
    y: [0, -3, 0],
    opacity: [0.4, 1, 0.4],
  },
};

export function TypingIndicator() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Assistant is typing"
      className="inline-flex items-center gap-1.5 rounded-2xl bg-base-200 px-3 py-2"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          variants={dot}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
          className="block h-1.5 w-1.5 rounded-full bg-base-content/70"
        />
      ))}
    </div>
  );
}

export default TypingIndicator;