import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaPalette, FaFont } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const themeMenuRef = useRef(null);
  const navbarRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Education", id: "education" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  // Handle click outside for theme menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (!section) continue;
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleNavClick = (id) => {
    setIsOpen(false);
    setActiveSection(id);

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
    <nav
      ref={navbarRef}
      className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md z-50 px-4 md:px-8 transition-all duration-300"
    >
      <div className="flex-1">
        <button
          onClick={() => handleNavClick("hero")}
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary hover:opacity-80 transition-opacity"
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
            className={`text-base font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${activeSection === link.id
                ? "text-primary after:scale-x-100"
                : "hover:text-primary after:scale-x-0 hover:after:scale-x-100"
              }`}
          >
            {link.name}
          </button>
        ))}
      </div>

      {/* Right Side: Theme Controls + Mobile Menu Button */}
      <div className="flex items-center gap-4 ml-2 sm:ml-4 md:ml-6">
        {/* Desktop Theme Selector */}
        <div className="hidden lg:block relative" ref={themeMenuRef}>
          <button
            className="btn btn-ghost gap-1 normal-case"
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
          >
            <FaPalette className="text-lg" />
            <span className="hidden md:inline">Theme</span>
            {isThemeMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {/* Dropdown Content */}
          <div
            className={`absolute right-0 mt-2 w-96 bg-base-200 rounded-box shadow-xl p-4 z-50 transition-all duration-200 ${isThemeMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
          >
            <ThemeSelector />
          </div>
        </div>

        {/* Mobile Theme Toggle */}
        <div className="lg:hidden">
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg
              className="swap-on fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-off fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-xl btn btn-ghost btn-circle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-64 sm:w-80 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-200">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="h-full flex flex-col overflow-y-auto">
            <ul className="flex-1 flex flex-col p-4 space-y-2">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${activeSection === link.id
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                      }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Theme Selector in Mobile Menu */}
            <div className="p-4 border-t border-base-200">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg">
                  <FaFont className="text-primary" />
                  <span className="font-medium">Theme Settings</span>
                </div>
                <ThemeSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;