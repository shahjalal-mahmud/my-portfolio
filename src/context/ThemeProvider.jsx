// src/context/ThemeProvider.jsx
import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
