// Locks body scroll while `locked` is true. Cleans up on unmount.
//
// Usage:
//   useScrollLock(isDrawerOpen);

import { useEffect } from "react";

export function useScrollLock(locked) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!locked) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

export default useScrollLock;