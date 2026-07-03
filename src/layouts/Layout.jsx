// src/components/Layout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../sections/Contact";
import OfflineBanner from "../shared/components/OfflineBanner";
import InstallAppButton from "../shared/components/InstallAppButton";
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
      {/* PWA install chip. Hidden on mobile (<768px) because MobileDrawer hosts it. */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40">
        <InstallAppButton variant="desktop" className="shadow-lg" />
      </div>
    </>
  );
};

export default Layout;
