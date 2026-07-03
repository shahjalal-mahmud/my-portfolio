// M3 Top App Bar (small variant).
//
// Props:
//   title       — string title
//   leading     — ReactNode (hamburger, back arrow, etc.)
//   trailing    — ReactNode (icons, overflow)
//   scrollable  — applies the M3 "elevated on scroll" pattern via fixed + bg swap
//
// See: https://m3.material.io/components/top-app-bar/specs

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function M3TopAppBar({
  title,
  leading,
  trailing,
  scrollElevate = true,
  className = "",
  titleClassName = "",
}) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!scrollElevate) return;
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollElevate]);

  return (
    <header
      className={`
        fixed top-0 inset-x-0 z-40
        h-14 m3-safe-top
        bg-base-100
        transition-shadow duration-200
        ${scrollElevate && scrolled ? "m3-elev-2" : ""}
        ${className}
      `}
    >
      <div className="h-14 flex items-center px-2 gap-1">
        {/* Leading */}
        <div className="flex items-center justify-center min-w-12">
          {leading ?? (
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="m3-tap w-10 h-10 rounded-full flex items-center justify-center text-primary m3-state-hover"
            >
              <FaArrowLeft className="text-lg" />
            </button>
          )}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className={`flex-1 text-[1.1rem] font-semibold text-base-content truncate px-1 ${titleClassName}`}
        >
          {title}
        </motion.h1>

        {/* Trailing */}
        <div className="flex items-center justify-end gap-1 min-w-12 pr-1">
          {trailing}
        </div>
      </div>
    </header>
  );
}

export default M3TopAppBar;