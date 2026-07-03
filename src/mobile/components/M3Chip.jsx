// M3 Chip — assist (default), filter, or input variants.

import { motion } from "framer-motion";

export function M3Chip({
  variant = "assist",
  selected = false,
  onClick,
  icon,
  label,
  className = "",
}) {
  const isInteractive = !!onClick;

  const surface =
    variant === "filter"
      ? selected
        ? "bg-secondary-container text-secondary-content border-transparent"
        : "bg-base-100 text-base-content border-base-300/60"
      : "bg-base-200/70 text-base-content border-transparent";

  const cls = `
    m3-shape-sm inline-flex items-center gap-1.5
    h-8 px-3 m3-label-large border
    ${surface}
    ${isInteractive ? "m3-tap cursor-pointer active:scale-95 transition-all" : ""}
    ${className}`;

  if (!isInteractive) {
    return (
      <span className={cls}>
        {icon && <span className="text-base">{icon}</span>}
        <span>{label}</span>
      </span>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cls}
      aria-pressed={selected}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </motion.button>
  );
}

export default M3Chip;