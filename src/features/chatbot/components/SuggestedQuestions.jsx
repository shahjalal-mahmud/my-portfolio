// src/features/chatbot/components/SuggestedQuestions.jsx
//
// Renders the suggested starter questions inside the empty state. Pure
// presentational — the click handler is owned by ChatWindow.

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * @param {Object} props
 * @param {import('../types/chat.types').SuggestedQuestion[]} props.questions
 * @param {(question: import('../types/chat.types').SuggestedQuestion) => void} props.onSelect
 */
export function SuggestedQuestions({ questions, onSelect }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="px-4 pt-2 pb-4">
      <p className="m3-label-large uppercase tracking-[0.14em] text-primary px-1 mb-2">
        Suggested
      </p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, i) => (
          <motion.button
            key={q.id}
            type="button"
            onClick={() => onSelect?.(q)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            whileTap={{ scale: 0.97 }}
            className="
              m3-tap inline-flex items-center gap-1.5
              h-9 px-3.5 rounded-full
              bg-base-200 text-base-content
              border border-base-300/60
              text-sm font-medium
              hover:bg-base-300/60 hover:border-primary/40 hover:text-primary
              transition-colors
            "
          >
            <span>{q.text}</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedQuestions;
