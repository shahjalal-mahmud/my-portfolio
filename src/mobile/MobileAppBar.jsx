// MobileAppBar — top app bar that hosts the menu trigger, page title, and a
// theme/font overflow button. Title is provided by the route; this component
// just provides the chrome.

import { useLocation } from "react-router-dom";
import { FaPalette } from "react-icons/fa";
import profilePic from "/img/about_photo.jpg";
import M3TopAppBar from "./components/M3TopAppBar";

const TITLE_BY_PATH = {
  "/": "Home",
  "/skills-projects": "Skills & Projects",
  "/education-experience": "Journey",
  "/projects": "Projects",
  "/contact": "Contact",
};

function deriveTitle(pathname) {
  if (TITLE_BY_PATH[pathname]) return TITLE_BY_PATH[pathname];
  if (pathname.startsWith("/projects/")) return "Project";
  return "Shahajalal";
}

export default function MobileAppBar({ onOpenDrawer }) {
  const { pathname } = useLocation();
  const title = deriveTitle(pathname);

  return (
    <M3TopAppBar
      title={title}
      leading={
        <button
          onClick={onOpenDrawer}
          aria-label="Open menu"
          className="m3-tap w-10 h-10 rounded-full overflow-hidden flex items-center justify-center m3-state-hover ring-1 ring-base-300/60"
        >
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </button>
      }
      trailing={
        <button
          onClick={onOpenDrawer}
          aria-label="Theme & settings"
          className="m3-tap w-10 h-10 rounded-full flex items-center justify-center text-base-content m3-state-hover"
        >
          <FaPalette className="text-lg" />
        </button>
      }
    />
  );
}