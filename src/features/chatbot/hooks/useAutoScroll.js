// src/features/chatbot/hooks/useAutoScroll.js
//
// Keeps a scrollable container pinned to the bottom whenever its content
// changes — used by ChatWindow's message list. Respects "sticky to bottom"
// only when the user is already near the bottom, so scrolling up to read
// old messages doesn't get yanked away by a new reply.

import { useEffect, useRef } from "react";

/**
 * @returns {React.RefObject<HTMLElement>}
 */
export function useAutoScroll(deps = []) {
  const ref = useRef(null);
  const pinnedRef = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the user is within ~64px of the bottom, treat them as "pinned".
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 64;
    pinnedRef.current = nearBottom;

    if (nearBottom) {
      el.scrollTop = el.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Manual scroll handler so we can re-pin when the user scrolls back down.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 64;
      pinnedRef.current = nearBottom;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return ref;
}

export default useAutoScroll;
