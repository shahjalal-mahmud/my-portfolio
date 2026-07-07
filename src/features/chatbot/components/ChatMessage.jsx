// src/features/chatbot/components/ChatMessage.jsx
//
// Renders a single message bubble. Bubbles inherit the active DaisyUI
// theme via utility classes — no hardcoded colours. User and assistant get
// distinct surfaces so the conversation reads naturally on every theme.
//
// PHASE 4: assistant bubbles render their content as Markdown via
// `react-markdown` so the model can return headings, lists, tables,
// inline code, fenced code blocks, and links. Every element is styled
// with theme tokens (`text-base-content`, `border-base-300/60`, etc.) so
// the rendered Markdown re-skins automatically when the DaisyUI theme
// changes. A compact component map keeps the bubble dense — same
// density as the Phase 1 plain `<p>`.

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

import TypingIndicator from "./TypingIndicator";

/**
 * Component map for react-markdown. Every tag is restyled with DaisyUI
 * utility classes so Markdown output inherits the active theme.
 *
 * @type {Record<string, React.ComponentType<any>>}
 */
const mdComponents = {
  h1: ({ children }) => (
    <h1 className="text-base font-semibold text-base-content mt-2 mb-1.5 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-sm font-semibold text-base-content mt-2 mb-1 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-base-content/90 mt-2 mb-1 first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-medium text-base-content/85 mt-1.5 mb-1 first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-relaxed my-1 first:mt-0 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="text-sm leading-relaxed my-1.5 list-disc pl-5 space-y-0.5 first:mt-0 last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-sm leading-relaxed my-1.5 list-decimal pl-5 space-y-0.5 first:mt-0 last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-sm">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-base-content">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-primary/80 break-words"
    >
      {children}
    </a>
  ),
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <code className="px-1 py-0.5 mx-0.5 rounded bg-base-300/60 text-[12px] font-mono">
          {children}
        </code>
      );
    }
    return (
      <code className={`block ${className || ""}`}>{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-2 p-2.5 rounded-lg bg-base-300/40 border border-base-300/60 overflow-x-auto text-[12px] font-mono leading-relaxed">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 pl-3 border-l-2 border-primary/40 text-base-content/85 italic">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto">
      <table className="text-xs w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-base-300/40">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-base-300/40 last:border-b-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="text-left font-semibold px-2 py-1.5 text-base-content">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-2 py-1.5 align-top text-base-content/90">{children}</td>
  ),
  hr: () => <hr className="my-2 border-base-300/60" />,
};

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
        ) : isAssistant ? (
          // Assistant bubbles render Markdown so headings, lists, tables,
          // code, and links survive from the model's reply.
          <div className="markdown-body break-words">
            <ReactMarkdown components={mdComponents}>
              {message.content || ""}
            </ReactMarkdown>
          </div>
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