// M3 surface — a wrapper that paints a themed background with optional
// elevation. Used by Cards, Sheets, FAB, NavigationBar items.

export function M3Surface({
  as: Tag = "div",
  elevation = 0,
  tint = "base-100",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag
      className={`bg-${tint} m3-elev-${elevation} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default M3Surface;