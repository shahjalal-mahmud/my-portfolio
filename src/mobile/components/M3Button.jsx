// M3 Button — filled | tonal | outlined | text | elevated.

import { motion } from "framer-motion";

export function M3Button({
  variant = "filled",
  size = "default", // default | small
  icon,
  iconRight,
  children,
  onClick,
  href,
  className = "",
  fullWidth = false,
  ...rest
}) {
  const sizing = size === "small" ? "h-9 px-3 m3-label-medium" : "h-11 px-5 m3-label-large";

  const surface =
    variant === "filled"
      ? "bg-primary text-primary-content"
      : variant === "tonal"
      ? "bg-primary/15 text-primary"
      : variant === "elevated"
      ? "bg-base-100 text-primary m3-elev-1"
      : variant === "outlined"
      ? "bg-transparent text-primary border border-primary/40"
      : "bg-transparent text-primary"; // text

  const shape = variant === "text" ? "rounded-full px-3" : "rounded-full";
  const cls = `
    m3-tap inline-flex items-center justify-center gap-2
    ${sizing} ${shape} ${surface}
    font-medium whitespace-nowrap
    ${fullWidth ? "w-full" : ""}
    ${className}`;

  const inner = (
    <>
      {icon && <span className="text-[18px] flex items-center">{icon}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="text-[18px] flex items-center">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className={cls}
        {...rest}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cls}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}

export default M3Button;