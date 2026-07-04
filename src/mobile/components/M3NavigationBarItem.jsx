// M3 Navigation Bar item — one destination in the bottom NavigationBar.
// Uses the Material 3 expressive active pill (rounded "selected" indicator
// behind the icon) — the canonical shape used in modern Android.

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export function M3NavigationBarItem({ to, icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      aria-label={label}
      className={({ isActive }) =>
        `m3-tap relative flex-1 flex flex-col items-center justify-center
         min-h-[56px] py-1.5 px-1 gap-0.5
         transition-colors duration-150
         ${isActive ? "text-primary" : "text-base-content/65"}`
      }
    >
      {({ isActive }) => (
        <>
          {/* Selected indicator pill (Material 3 spec: 64x32 behind icon) */}
          <motion.span
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              width: isActive ? 64 : 32,
              height: isActive ? 32 : 32,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute top-1.5 rounded-full bg-primary/15 pointer-events-none"
            style={{ left: "50%", x: "-50%" }}
          />

          {/* Icon */}
          <motion.span
            initial={false}
            animate={{
              y: isActive ? -1 : 0,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="relative z-10 w-6 h-6 flex items-center justify-center text-[22px]"
          >
            {icon}
          </motion.span>

          {/* Label */}
          <motion.span
            initial={false}
            animate={{
              fontSize: isActive ? "11px" : "11px",
              fontWeight: isActive ? 600 : 500,
            }}
            transition={{ duration: 0.15 }}
            className="relative z-10 leading-none tracking-wide"
          >
            {label}
          </motion.span>
        </>
      )}
    </NavLink>
  );
}

export default M3NavigationBarItem;