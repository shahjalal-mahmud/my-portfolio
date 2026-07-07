// src/features/chatbot/components/ChatErrorState.jsx
//
// Full-width error banner shown inside the message list when the assistant
// service rejects. Reuses the project ToastContainer for transient errors —
// this banner is for in-panel messaging only.

import { AlertTriangle } from "lucide-react";

/**
 * @param {Object} props
 * @param {string | null} props.message
 * @param {() => void} [props.onRetry]
 * @param {() => void} [props.onDismiss]
 */
export function ChatErrorState({ message, onRetry, onDismiss }) {
  return (
    <div
      role="alert"
      className="
        mx-4 my-3 rounded-2xl
        border border-error/30
        bg-error/10 text-error
        px-4 py-3 flex items-start gap-3
      "
    >
      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">Something went wrong</p>
        {message && (
          <p className="text-xs text-error/80 mt-0.5 break-words">{message}</p>
        )}
        {(onRetry || onDismiss) && (
          <div className="mt-2 flex items-center gap-2">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="
                  text-xs font-semibold underline underline-offset-2
                  hover:text-error/80
                "
              >
                Try again
              </button>
            )}
            {onRetry && onDismiss && (
              <span className="text-error/40 text-xs">·</span>
            )}
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="
                  text-xs font-semibold underline underline-offset-2
                  hover:text-error/80
                "
              >
                Dismiss
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatErrorState;
