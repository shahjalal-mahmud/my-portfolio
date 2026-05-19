// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import SkillsProjects from "../pages/SkillsProjects";
import EducationExperience from "../pages/EducationExperience";
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
        path: "education-experience",
        element: <EducationExperience />,
      },
      {
        path: "skills-projects",
        element: <SkillsProjects />,
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