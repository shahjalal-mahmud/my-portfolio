// src/components/Layout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../sections/Contact";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16"> {/* Padding for fixed navbar */}
        <Outlet /> {/* Renders child routes */}
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
