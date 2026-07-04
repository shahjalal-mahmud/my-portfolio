// MobileLayout — the chrome wrapper for the mobile experience.
// Provides top app bar, bottom NavigationBar, and the overflow drawer.
//
// The drawer is mode-aware — each app-bar trigger opens it with the
// appropriate mode:
//   • avatar / menu  → "menu"   (full menu)
//   • notification   → "alerts" (no Appearance)
//   • theme palette  → "theme"  (Appearance only)

import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileAppBar from "./MobileAppBar";
import MobileNavBar from "./MobileNavBar";
import MobileDrawer from "./MobileDrawer";
import OfflineBanner from "../shared/components/OfflineBanner";

export default function MobileLayout() {
  // null when closed; otherwise the mode the drawer should render in.
  const [drawerMode, setDrawerMode] = useState(null);
  const drawerOpen = drawerMode !== null;

  const openDrawer = (mode = "menu") => setDrawerMode(mode);
  const closeDrawer = () => setDrawerMode(null);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <MobileAppBar onOpenDrawer={openDrawer} />

      {/* Padded for top app bar (56px + safe-area) and bottom nav (64px + safe-area). */}
      <main className="pt-14 pb-16">
        <Outlet />
      </main>

      <MobileNavBar />
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} mode={drawerMode || "menu"} />
      <OfflineBanner />
    </div>
  );
}