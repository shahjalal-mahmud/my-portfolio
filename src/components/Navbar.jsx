import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import '../styles/glitch.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Career Roadmap", href: "#roadmap" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "GitHub", href: "#github" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md z-50 px-4 md:px-8 transition-all duration-300">
      <div className="flex-1">
        <a href="#hero" className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">
          Shahjalal.dev
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">
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

      {/* Right Side: Theme Toggle + Mobile Menu Button */}
      <div className="flex items-center gap-6 ml-2 sm:ml-4 md:ml-6">
        <ThemeToggle />

        {/* Mobile Menu Icon */}
        <button
          className="lg:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-base-100 shadow-xl transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button
            className="text-xl"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
