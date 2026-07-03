// M3 Card — three elevation levels (0, 1, 3) per the M3 spec.

import { motion } from "framer-motion";

export function M3Card({
  elevation = 1,
  onClick,
  children,
  className = "",
  ...rest
}) {
  const surface =
    elevation === 0
      ? "bg-transparent border border-base-300/60"
      : "bg-base-100";

  const cls = `
    m3-shape-lg p-4 ${surface} m3-elev-${elevation}
    ${onClick ? "m3-tap cursor-pointer active:scale-[0.99] transition-transform" : ""}
    ${className}`;

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className={`${cls} text-left w-full`}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

export default M3Card;