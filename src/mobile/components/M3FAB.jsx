// M3 Floating Action Button (extended or default size).
//
// Variants: filled | tonal | outlined (filled is the most common).

import { motion } from "framer-motion";

export function M3FAB({
  variant = "filled",
  size = "default", // "default" | "extended" | "small"
  icon,
  label,
  onClick,
  className = "",
  ariaLabel,
}) {
  const shape =
    size === "extended"
      ? "px-4 h-14 rounded-2xl gap-2"
      : size === "small"
      ? "w-10 h-10 rounded-2xl"
      : "w-14 h-14 rounded-2xl";

  const surface =
    variant === "tonal"
      ? "bg-primary/15 text-primary"
      : variant === "outlined"
      ? "bg-base-100 text-primary border border-primary/40"
      : "bg-primary text-primary-content";

  const shadow = variant === "outlined" ? "" : "m3-elev-3";

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`m3-tap m3-ripple ${shape} ${surface} ${shadow}
        flex items-center justify-center font-medium
        ${size === "extended" ? "m3-label-large" : ""}
        ${className}`}
    >
      {icon && <span className="text-[22px] flex items-center">{icon}</span>}
      {size === "extended" && label && <span>{label}</span>}
    </motion.button>
  );
}

export default M3FAB;