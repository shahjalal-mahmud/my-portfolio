// MobileLayout — the chrome wrapper for the mobile experience.
// Provides top app bar, bottom NavigationBar, and the overflow drawer.

import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileAppBar from "./MobileAppBar";
import MobileNavBar from "./MobileNavBar";
import MobileDrawer from "./MobileDrawer";
import OfflineBanner from "../shared/components/OfflineBanner";

export default function MobileLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <MobileAppBar onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Padded for top app bar (56px + safe-area) and bottom nav (64px + safe-area). */}
      <main className="pt-14 pb-16">
        <Outlet />
      </main>

      <MobileNavBar />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <OfflineBanner />
    </div>
  );
}