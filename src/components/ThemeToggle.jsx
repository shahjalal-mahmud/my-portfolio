import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  // Default to "dark" if no theme saved
  const getInitialTheme = () =>
    localStorage.getItem("theme") || "dark";

  const [theme, setTheme] = useState(getInitialTheme());

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
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
