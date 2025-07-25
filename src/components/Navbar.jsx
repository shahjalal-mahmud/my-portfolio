import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import ThemeSelector from "./ThemeSelector";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Education", id: "education" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md z-50 px-4 md:px-8 transition-all duration-300">
      <div className="flex-1">
        <button
          onClick={() => handleNavClick("hero")}
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary"
        >
          Shahjalal.dev
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">
        {navLinks.map((link, idx) => (
          <button
            key={idx}
            onClick={() => handleNavClick(link.id)}
            className="text-base font-medium hover:text-primary transition-colors duration-300"
          >
            {link.name}
          </button>
        ))}
      </div>

      {/* Right Side: Theme Controls + Mobile Menu Button */}
      <div className="flex items-center gap-4 ml-2 sm:ml-4 md:ml-6">
        {/* Desktop Theme Selector - Hidden on mobile */}
        <div className="hidden lg:flex">
          <ThemeSelector />
        </div>
        
        {/* Mobile Theme Toggle - Shows only toggle button */}
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
        
        <button
          className="lg:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-base-100 shadow-xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button className="text-xl" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
        
        {/* Mobile Menu Content */}
        <div className="h-full flex flex-col">
          <ul className="flex-1 flex flex-col p-4 space-y-4">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="block text-base font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Theme Selector in Mobile Menu */}
          <div className="p-4 border-t">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;