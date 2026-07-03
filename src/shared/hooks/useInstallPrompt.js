// Captures the browser's beforeinstallprompt event so we can offer a manual
// "Install app" affordance. Browsers normally show their own mini-banner —
// capturing the event lets us defer that prompt and trigger it on demand.
//
// NOTE: calling `e.preventDefault()` on `beforeinstallprompt` is what
// suppresses Chrome's automatic mini-banner and surfaces the informational
// console message "Banner not shown: beforeinstallprompt.preventDefault()
// called". That message is expected here and indicates the install hook is
// working correctly — without preventDefault, the user wouldn't get our
// custom install button.
//
// Returns:
//   { supported, installed, promptInstall }
//
//   supported: the browser has fired beforeinstallprompt at least once
//   installed: the app is already running as an installed PWA
//   promptInstall: () => Promise<'accepted'|'dismissed'|null>
//
//   - promptInstall() resolves to "accepted" if the user accepted the install,
//     "dismissed" if they dismissed it, or null if no prompt is pending.
//   - The hook re-arms itself after dismissal so the user can re-trigger later.

import { useCallback, useEffect, useState } from "react";

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Detect already-installed PWA (standalone display mode).
    const mq = window.matchMedia("(display-mode: standalone)");
    setInstalled(mq.matches);
    const onChange = (e) => setInstalled(e.matches);
    mq.addEventListener("change", onChange);

    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const onAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return null;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null); // prompt can only be used once
    return choice?.outcome || null;
  }, [deferredPrompt]);

  return {
    supported: !!deferredPrompt,
    installed,
    promptInstall,
  };
}

export default useInstallPrompt;