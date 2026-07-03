// M3 Modal Bottom Sheet — used for the overflow drawer on mobile.
//
// Open: pass `open={true}` and an `onClose` handler.

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useScrollLock } from "../../shared/hooks/useScrollLock";

export function M3Sheet({ open, onClose, title, children, fullHeight = false }) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === "string" ? title : undefined}
            className={`
              fixed inset-x-0 bottom-0 z-50
              bg-base-100 rounded-t-[28px]
              ${fullHeight ? "top-12" : "max-h-[85vh]"}
              flex flex-col m3-elev-3
            `}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1">
              <span className="block w-9 h-1 rounded-full bg-base-content/25" />
            </div>
            {title && (
              <div className="px-5 pb-3">
                <h2 className="m3-title-large text-base-content">{title}</h2>
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-2 pb-6 m3-safe-bottom">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default M3Sheet;