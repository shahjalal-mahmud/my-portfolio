// M3 Top App Bar (center-aligned, modern Android chrome).
//
// Two title modes:
//   • single (default): one bold title row.
//   • two-line: large title + small subtitle beneath (Material 3 expressive).
//
// Props:
//   title          — string title
//   subtitle       — optional small meta line (e.g. "Welcome back")
//   leading        — ReactNode (avatar, hamburger, back arrow, etc.)
//   trailing       — ReactNode (icons, overflow)
//   scrollElevate  — applies the M3 "elevated on scroll" pattern
//   className      — extra utility classes appended to the outer <header>
//
// See: https://m3.material.io/components/top-app-bar/specs

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function M3TopAppBar({
  title,
  subtitle,
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
        bg-base-100/85 backdrop-blur-md
        border-b border-base-300/40
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
              className="m3-tap w-10 h-10 rounded-full flex items-center justify-center text-primary m3-state-hover active:scale-95 transition-transform"
            >
              <FaArrowLeft className="text-lg" />
            </button>
          )}
        </div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 min-w-0 px-1 leading-tight"
        >
          <h1
            className={`text-[1.05rem] font-semibold text-base-content truncate ${titleClassName}`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[0.7rem] uppercase tracking-[0.12em] text-base-content/55 truncate -mt-0.5">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Trailing */}
        <div className="flex items-center justify-end gap-0.5 min-w-12 pr-1">
          {trailing}
        </div>
      </div>
    </header>
  );
}

export default M3TopAppBar;