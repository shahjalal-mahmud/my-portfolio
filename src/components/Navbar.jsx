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
    { name: "Statistics", id: "github" },
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
      className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md z-50 px-4 md:px-6 lg:px-8 transition-all duration-300"
    >
      <div className="flex-1">
        <button
          onClick={() => handleNavClick("hero")}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-primary hover:opacity-80 transition-opacity"
        >
          Shahajalal Mahmud
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">
        {navLinks.map((link, idx) => (
          <button
            key={idx}
            onClick={() => handleNavClick(link.id)}
            className={`px-2 py-1 text-base font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
              activeSection === link.id
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
        {/* Theme Selector - Visible on all devices */}
        <div className="relative" ref={themeMenuRef}>
          <button
            className="btn btn-ghost gap-1 normal-case px-2 sm:px-4"
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
          >
            <FaPalette className="text-lg" />
            <span className="hidden sm:inline">Theme</span>
            {isThemeMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {/* Dropdown Content */}
          <div
            className={`absolute right-0 mt-2 w-72 sm:w-80 md:w-96 bg-base-200 rounded-box shadow-xl p-4 z-50 transition-all duration-200 ${
              isThemeMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <ThemeSelector />
          </div>
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
        className={`lg:hidden fixed inset-y-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: navbarRef.current?.offsetHeight || "64px" }}
      >
        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 h-[calc(100vh-64px)] w-64 sm:w-72 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col overflow-y-auto">
            <ul className="flex-1 flex flex-col p-2 space-y-1">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeSection === link.id
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;