// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  return (
    <Routes>
      {/* Home page with all sections */}
      <Route path="/" element={<Home />} />

      {/* Dynamic project detail page */}
      <Route path="/projects/:slug" element={<ProjectDetails />} />

      {/* Fallback 404 page */}
      <Route
        path="*"
        element={
          <div className="text-center mt-20 text-red-500 text-xl">
            404 – Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default App;
