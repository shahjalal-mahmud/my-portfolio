// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import ProjectDetails from "../components/ProjectDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects/:slug",
        element: <ProjectDetails />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="text-center mt-20 text-red-500 text-xl">
        404 – Page Not Found
      </div>
    ),
  },
]);

export default router;
