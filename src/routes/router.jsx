// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import SkillsProjects from "../pages/SkillsProjects";
import EducationExperience from "../pages/EducationExperience";
import Services from "../pages/Services";
import Blog from "../pages/Blog";
import ProjectDetails from "../components/ProjectDetails";
import Statistics from "../pages/Statistics";

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
        path: "services",
        element: <Services />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "blog",
        element: <Blog />,
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