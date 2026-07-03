// Switches between Desktop and Mobile variants of a page or layout based on viewport.
//
// Usage:
//   <ExperienceSwitch desktop={DesktopLayout} mobile={MobileLayout} />
//   <ExperienceSwitch desktop={DesktopHome}     mobile={MobileHome} />

import { useBreakpoint } from "../hooks/useBreakpoint";

export default function ExperienceSwitch({ desktop, mobile }) {
  const { isMobile, ready } = useBreakpoint();

  if (!ready) return null;

  // `desktop` and `mobile` are React components passed in by the router.
  // They're rendered as JSX below — referencing them via aliases silences
  // the false-positive `no-unused-vars` rule.
  const Desktop = desktop;
  const Mobile = mobile;

  return isMobile ? <Mobile /> : <Desktop />;
}