import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaPalette } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const themeMenuRef = useRef(null);
  const navbarRef = useRef(null);
  const dropdownRefs = {
    background: useRef(null),
    portfolio: useRef(null),
    statistics: useRef(null)
  };

  // Nav structure with dropdown items
  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Background",
      items: [
        { name: "Education", path: "/education-experience#education" },
        { name: "Experience", path: "/education-experience#experience" }
      ]
    },
    {
      name: "Portfolio",
      items: [
        { name: "Skills", path: "/skills-projects#skills" },
        { name: "Projects", path: "/skills-projects#projects" }
      ]
    },
    {
      name: "Statistics",
      items: [
        { name: "GitHub", path: "/statistics#github" },
        { name: "Codeforces", path: "/statistics#codeforces" }
      ]
    },
    { name: "Services", path: "/services" },
    // { name: "Blog", path: "/blog" },
  ];

  // Handle click outside for theme menu and dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setIsThemeMenuOpen(false);
      }

      // Close dropdowns if clicked outside
      if (openDropdown &&
        dropdownRefs[openDropdown]?.current &&
        !dropdownRefs[openDropdown].current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleNavClick = (path) => {
    setIsOpen(false);
    setOpenDropdown(null);

    if (path.includes("#")) {
      const [route, hash] = path.split("#");
      if (location.pathname !== route) {
        navigate(route, { state: { hash } });
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(path);
    }
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Handle hash navigation after route change
  useEffect(() => {
    if (location.state?.hash) {
      const element = document.getElementById(location.state.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // Check if a link is active
  const isActive = (path) => {
    const [route, hash] = path.split('#');
    const currentPath = location.pathname;
    const currentHash = location.hash.replace('#', '');

    // For home page with hash
    if (path === '/#about' && currentPath === '/' && currentHash === 'about') return true;
    if (path === '/#github' && currentPath === '/' && currentHash === 'github') return true;
    if (path === '/#contact' && currentPath === '/' && currentHash === 'contact') return true;

    // For other routes
    if (path.startsWith('/#')) {
      return currentPath === route.split('#')[0] && currentHash === hash;
    }

    // For exact matches
    return currentPath === path;
  };

  // Check if any child item is active (for dropdown parent)
  const isDropdownActive = (items) => {
    return items.some(item => isActive(item.path));
  };

  return (
    <nav
      ref={navbarRef}
      className="navbar bg-base-100/90 backdrop-blur-sm fixed top-0 left-0 w-full shadow-md z-50 px-4 md:px-6 lg:px-8 transition-all duration-300"
    >
      <div className="flex-1">
        <button
          onClick={() => handleNavClick("/")}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-primary hover:opacity-80 transition-opacity"
        >
          Shahajalal Mahmud
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-1">
        {navItems.map((item, idx) => {
          if (item.items) {
            // Render dropdown menu
            const dropdownKey = item.name.toLowerCase();
            return (
              <div key={idx} className="relative" ref={dropdownRefs[dropdownKey]}>
                <button
                  onClick={() => toggleDropdown(dropdownKey)}
                  className={`px-4 py-3 text-sm font-medium flex items-center gap-1 transition-all duration-200 rounded-lg ${
                    isDropdownActive(item.items)
                      ? "text-primary bg-primary/10"
                      : "text-base-content hover:text-primary hover:bg-base-200"
                  }`}
                >
                  {item.name}
                  {openDropdown === dropdownKey ? (
                    <FaChevronUp className="text-xs opacity-70" />
                  ) : (
                    <FaChevronDown className="text-xs opacity-70" />
                  )}
                </button>

                {/* Dropdown Content */}
                <div
                  className={`absolute left-0 mt-1 min-w-[200px] bg-base-100 rounded-lg shadow-xl z-50 border border-base-200 transition-all duration-200 ${
                    openDropdown === dropdownKey
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <ul className="py-1 space-y-1">
                    {item.items.map((subItem, subIdx) => (
                      <li key={subIdx} className="px-1 py-0.5">
                        <button
                          onClick={() => handleNavClick(subItem.path)}
                          className={`w-full text-left px-4 py-2 text-sm rounded-md transition-all duration-150 flex items-center ${
                            isActive(subItem.path)
                              ? "bg-primary text-primary-content"
                              : "hover:bg-base-200"
                          }`}
                        >
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          } else {
            // Render regular nav item
            return (
              <button
                key={idx}
                onClick={() => handleNavClick(item.path)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-base-content hover:text-primary hover:bg-base-200"
                }`}
              >
                {item.name}
              </button>
            );
          }
        })}
      </div>

      {/* Right Side: Theme Controls + Mobile Menu Button */}
      <div className="flex items-center gap-2 ml-2 sm:ml-4 md:ml-6">
        {/* Theme Selector - Visible on all devices */}
        <div className="relative" ref={themeMenuRef}>
          <button
            className="btn btn-ghost btn-sm sm:btn-md gap-1 normal-case px-2 sm:px-3"
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
          >
            <FaPalette className="text-lg" />
            <span className="hidden sm:inline">Theme</span>
            {isThemeMenuOpen ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
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
          className="lg:hidden text-xl btn btn-ghost btn-circle btn-sm sm:btn-md"
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
          className={`absolute top-0 right-0 h-[calc(100vh-64px)] w-64 sm:w-72 bg-base-100/95 backdrop-blur-sm shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col overflow-y-auto">
            <ul className="flex-1 flex flex-col p-2 space-y-1">
              {navItems.map((item, idx) => {
                if (item.items) {
                  // Render dropdown in mobile
                  return (
                    <li key={idx} className="menu-dropdown">
                      <details open={isDropdownActive(item.items)}>
                        <summary
                          className={`px-4 py-3 rounded-lg ${
                            isDropdownActive(item.items)
                              ? "bg-primary text-primary-content"
                              : "hover:bg-base-200"
                          }`}
                        >
                          {item.name}
                        </summary>
                        <ul className="pl-2 mt-1 space-y-1">
                          {item.items.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <button
                                onClick={() => handleNavClick(subItem.path)}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                                  isActive(subItem.path)
                                    ? "bg-primary text-primary-content"
                                    : "hover:bg-base-200"
                                }`}
                              >
                                {subItem.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  );
                } else {
                  // Render regular item in mobile
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                          isActive(item.path)
                            ? "bg-primary text-primary-content"
                            : "hover:bg-base-200"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;