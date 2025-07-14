import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

export function Main() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
