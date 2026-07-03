import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider } from './context/ThemeContext';
import router from "./routes/router.jsx";

AOS.init({
  duration: 800,
  offset: 120,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>
);

// Global toast surface — both Desktop and Mobile shells fire toasts (contact
// form submit, offline/online events). Mounted once at app root so it works
// regardless of which experience is currently rendered.
const toastRoot = document.createElement("div");
toastRoot.id = "global-toast-root";
document.body.appendChild(toastRoot);
ReactDOM.createRoot(toastRoot).render(
  <ToastContainer
    position="top-right"
    autoClose={3000}
    theme="colored"
    newestOnTop
    limit={4}
  />
);

// ---- Service Worker registration (PWA) ----
// Disabled in dev to avoid stale caches interfering with HMR.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((err) => {
        console.warn("[SW] registration failed:", err);
      });
  });
}
