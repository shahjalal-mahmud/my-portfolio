// M3 List Item — three-line with leading/trailing slots.

import { FaChevronRight } from "react-icons/fa";

export function M3ListItem({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  href,
  className = "",
  as: Tag = "div",
  divider = false,
}) {
  const content = (
    <>
      {leading && (
        <span className="w-10 h-10 rounded-2xl flex items-center justify-center text-primary text-xl flex-shrink-0">
          {leading}
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className="block m3-body-large text-base-content truncate">{title}</span>
        {subtitle && (
          <span className="block m3-body-medium text-base-content/65 truncate">
            {subtitle}
          </span>
        )}
      </span>
      {trailing !== undefined ? (
        <span className="text-base-content/55 text-lg flex-shrink-0">
          {trailing}
        </span>
      ) : onClick || href ? (
        <FaChevronRight className="text-base-content/40 text-sm flex-shrink-0" />
      ) : null}
    </>
  );

  const cls = `m3-tap flex items-center gap-3 px-4 py-3 min-h-[56px]
    ${onClick || href ? "m3-state-hover active:bg-base-200/70 cursor-pointer" : ""}
    ${divider ? "border-b border-base-300/60" : ""}
    ${className}`;

  if (href) {
    return (
      <Tag href={href} className={cls}>
        {content}
      </Tag>
    );
  }
  return (
    <Tag onClick={onClick} className={cls} role={onClick ? "button" : undefined}>
      {content}
    </Tag>
  );
}

export default M3ListItem;