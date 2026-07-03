// Lightweight IntersectionObserver hook for "in-view" reveals.
// Returns `[ref, isInView]`. Use instead of framer-motion's whileInView
// where you want CSS-only reveals (saves a bit of JS on the mobile shell).

import { useEffect, useRef, useState } from "react";

export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

export default useReveal;