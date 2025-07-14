import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50 px-4">
      <div className="flex-1">
        <a className="text-2xl font-extrabold tracking-tight text-primary">Shahjalal.dev</a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 mr-6">
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="text-base font-medium hover:text-primary transition-colors duration-300"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Theme Toggle and Mobile Menu Button */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-4 mt-2 w-40 bg-base-100 rounded-box shadow-lg md:hidden transition-all duration-300">
          <ul className="menu menu-compact">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;