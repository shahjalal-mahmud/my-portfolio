// src/routes/router.jsx
//
// Routes are shared between desktop and mobile — ExperienceSwitch picks the
// right chrome at the layout boundary, and per-route ExperienceSwitches cover
// pages whose layouts fundamentally differ (timeline, project details, contact).

import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ExperienceSwitch from "../shared/components/ExperienceSwitch";
import MobileLoading from "../mobile/MobileLoading";
import DesktopLayout from "../layouts/Layout";
import DesktopHome from "../pages/Home";
import DesktopSkillsProjects from "../pages/SkillsProjects";
import DesktopEducationExperience from "../pages/EducationExperience";
import DesktopProjectDetails from "../components/ProjectDetails";
import DesktopNotFound from "../pages/NotFound";
import DesktopContact from "../sections/Contact";

// Mobile bundles are lazy-loaded so desktop users don't pay for them.
const MobileLayout = lazy(() => import("../mobile/MobileLayout"));
const MobileHome = lazy(() => import("../mobile/pages/MobileHome"));
const MobileSkillsProjects = lazy(() => import("../mobile/pages/MobileSkillsProjects"));
const MobileJourney = lazy(() => import("../mobile/pages/MobileJourney"));
const MobileProjectDetails = lazy(() => import("../mobile/pages/MobileProjectDetails"));
const MobileContact = lazy(() => import("../mobile/pages/MobileContact"));
const MobileNotFound = lazy(() => import("../mobile/pages/MobileNotFound"));

const withMobile = (mobile, desktop) => (
  <Suspense fallback={<MobileLoading />}>
    <ExperienceSwitch mobile={mobile} desktop={desktop} />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<MobileLoading />}>
        <ExperienceSwitch mobile={MobileLayout} desktop={DesktopLayout} />
      </Suspense>
    ),
    children: [
      { index: true, element: withMobile(MobileHome, DesktopHome) },
      { path: "skills-projects", element: withMobile(MobileSkillsProjects, DesktopSkillsProjects) },
      { path: "education-experience", element: withMobile(MobileJourney, DesktopEducationExperience) },
      { path: "projects/:slug", element: withMobile(MobileProjectDetails, DesktopProjectDetails) },
      { path: "contact", element: withMobile(MobileContact, DesktopContact) },
    ],
  },
  {
    path: "*",
    element: withMobile(MobileNotFound, DesktopNotFound),
  },
]);

export default router;