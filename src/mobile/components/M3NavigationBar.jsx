// M3 Navigation Bar — bottom bar with up to 5 destinations.
// Uses a translucent surface and a thin top border for the modern Android
// chrome feel. Includes an optional center FAB slot ("notch" pattern).
//
// Props:
//   left       — react node(s) for the leading side (typically 1–2 items)
//   right      — react node(s) for the trailing side (typically 1–2 items)
//   fabSlot    — optional element rendered in the center "notch"
//   className  — extra utility classes appended to the outer <nav>

export function M3NavigationBar({
  left,
  right,
  fabSlot,
  className = "",
}) {
  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className={
        "fixed bottom-0 inset-x-0 z-40 " +
        "bg-base-100/85 backdrop-blur-md " +
        "border-t border-base-300/50 " +
        "m3-safe-bottom " +
        className
      }
    >
      <div className="relative h-16 flex items-stretch">
        {/* Left items */}
        <div className="flex-1 flex items-stretch">{left}</div>

        {/* Center FAB slot (notch) */}
        {fabSlot && (
          <div className="w-16 flex items-start justify-center pt-0.5">
            {fabSlot}
          </div>
        )}

        {/* Right items */}
        <div className="flex-1 flex items-stretch">{right}</div>
      </div>
    </nav>
  );
}

export default M3NavigationBar;