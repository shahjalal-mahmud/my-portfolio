// Responsive breakpoint hook.
//
// Returns `{ isMobile, isDesktop, ready }`.
// "Mobile" is everything below 768px (Tailwind's `md` boundary).
//
// Implementation notes:
//   - Uses useSyncExternalStore so the value is consistent across concurrent
//     renders and SSR.
//   - Initial value is read synchronously from `window.matchMedia(...)` so
//     the first render is correct (no flash of wrong layout).
//   - `ready` is `false` only on the very first render in environments where
//     `window` is undefined (tests / SSR). In a browser it's always `true`.

import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

function subscribe(callback) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerSnapshot() {
  return false; // SSR / tests: assume desktop
}

export function useBreakpoint() {
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    isMobile,
    isDesktop: !isMobile,
    ready: typeof window !== "undefined",
  };
}

export default useBreakpoint;