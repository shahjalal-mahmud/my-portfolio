// M3 Timeline — single left rail, mobile-friendly vertical stack.
// Each entry is provided via children.

import { motion } from "framer-motion";

export function M3Timeline({ children }) {
  return (
    <div className="relative pl-6">
      {/* Continuous rail */}
      <span
        aria-hidden="true"
        className="absolute left-[11px] top-2 bottom-2 w-px bg-base-300"
      />
      <ol className="space-y-3">{children}</ol>
    </div>
  );
}

export function M3TimelineItem({ icon, color = "primary", title, subtitle, trailing, children }) {
  const ring =
    color === "success"
      ? "bg-success/15 text-success"
      : color === "info"
      ? "bg-info/15 text-info"
      : color === "warning"
      ? "bg-warning/15 text-warning"
      : color === "error"
      ? "bg-error/15 text-error"
      : color === "secondary"
      ? "bg-secondary/15 text-secondary"
      : "bg-primary/15 text-primary";

  return (
    <motion.li
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Dot */}
      <span
        aria-hidden="true"
        className={`absolute -left-[18px] top-3 w-6 h-6 rounded-full flex items-center justify-center ${ring} ring-4 ring-base-100`}
      >
        <span className="text-[14px] flex items-center">{icon}</span>
      </span>
      <div className="bg-base-100 m3-elev-1 m3-shape-lg p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="m3-title-large text-base-content leading-tight">{title}</h3>
            {subtitle && (
              <p className="m3-body-medium text-base-content/65 mt-0.5">{subtitle}</p>
            )}
          </div>
          {trailing && <div className="flex-shrink-0 text-base-content/55">{trailing}</div>}
        </div>
        {children && <div className="mt-2 text-sm text-base-content/75">{children}</div>}
      </div>
    </motion.li>
  );
}

export default M3Timeline;