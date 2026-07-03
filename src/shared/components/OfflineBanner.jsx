// Listens to navigator.onLine via useOnlineStatus and surfaces a one-time
// toast when the network drops or recovers.
//
// Designed to be mounted once at the layout root (both DesktopLayout and
// MobileLayout). Uses the existing <ToastContainer/> already in the tree,
// so no extra mount is required. Throttles transitions so we don't spam
// toasts while the OS is flapping online/offline.

import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const COOLDOWN_MS = 4000; // don't re-fire the same toast within this window

function showOnline() {
  toast.dismiss("offline-status");
  toast.success("Back online — sync resumed.", {
    toastId: "offline-status",
    autoClose: 2500,
    theme: "colored",
  });
}

function showOffline() {
  toast.dismiss("offline-status");
  toast.warn("You're offline — showing cached content where available.", {
    toastId: "offline-status",
    autoClose: 3500,
    theme: "colored",
  });
}

export default function OfflineBanner() {
  const online = useOnlineStatus();
  const lastFiredRef = useRef(0);
  const wasOnlineRef = useRef(online);

  useEffect(() => {
    // Skip the very first sync render so we don't toast on app load.
    if (wasOnlineRef.current === online) return;
    wasOnlineRef.current = online;

    const now = Date.now();
    if (now - lastFiredRef.current < COOLDOWN_MS) return;
    lastFiredRef.current = now;

    if (online) showOnline();
    else showOffline();
  }, [online]);

  return null;
}