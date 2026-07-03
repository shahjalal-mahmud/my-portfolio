// M3 Navigation Bar item — one destination in the bottom NavigationBar.

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
         min-h-[48px] py-1.5 px-1 gap-0.5
         transition-colors duration-150
         ${isActive ? "text-primary" : "text-base-content/65 hover:text-base-content"}`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active pill */}
          <motion.span
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.6,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute top-1.5 w-16 h-7 rounded-full bg-primary/15 pointer-events-none"
          />
          <span className="relative z-10 w-6 h-6 flex items-center justify-center text-[22px]">
            {icon}
          </span>
          <span className="relative z-10 text-[11px] font-medium leading-none tracking-wide">
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default M3NavigationBarItem;