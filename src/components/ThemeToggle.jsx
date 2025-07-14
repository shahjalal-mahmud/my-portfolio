import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme on load
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // Handle toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle text-xl bg-base-200 hover:bg-base-300 transition duration-300"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
    </button>
  );
};

export default ThemeToggle;
