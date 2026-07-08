// src/components/Layout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../sections/Contact";
import OfflineBanner from "../shared/components/OfflineBanner";
import InstallAppButton from "../shared/components/InstallAppButton";
import ChatAssistant from "../features/chatbot";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <OfflineBanner />
      <Navbar />
      <main className="pt-16"> {/* Padding for fixed navbar */}
        <Outlet /> {/* Renders child routes */}
        <Contact />
        <Footer />
      </main>
      {/*
        Floating action stack — bottom-right column on desktop.
        ┌─────────────────────────────┐
        │ PWA install chip (when available)
        │ ↕ 8px gap
        │ Chat FAB (always)
        └─────────────────────────────┘
        Hidden on mobile (<768px) because MobileDrawer hosts the install
        chip and the mobile FAB lives inside MobileNavBar.
      */}
      <div className="hidden md:flex fixed bottom-[88px] right-6 z-40">
        <InstallAppButton variant="desktop" className="shadow-lg shadow-primary/10" />
      </div>
      {/* Floating AI assistant — same mount point on both experiences. */}
      <ChatAssistant />
    </>
  );
};

export default Layout;
