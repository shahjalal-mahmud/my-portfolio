import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
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
