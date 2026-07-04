// MobileAppBar — Material 3 top app bar styled like a modern Android chrome.
// Hosts the menu trigger (profile avatar with status dot), a large title with
// subtitle meta, and a pill-shaped trailing action cluster (notifications /
// theme).

import { useLocation } from "react-router-dom";
import { FaPalette, FaBell } from "react-icons/fa";
import profilePic from "/img/about_photo.jpg";
import M3TopAppBar from "./components/M3TopAppBar";

const TITLE_BY_PATH = {
  "/": { title: "Home", subtitle: "Welcome back" },
  "/skills-projects": { title: "Skills & Projects", subtitle: "Stack & builds" },
  "/education-experience": { title: "Journey", subtitle: "Learning path" },
  "/projects": { title: "Projects", subtitle: "All work" },
  "/contact": { title: "Contact", subtitle: "Let's connect" },
};

function deriveTitle(pathname) {
  if (TITLE_BY_PATH[pathname]) return TITLE_BY_PATH[pathname];
  if (pathname.startsWith("/projects/")) return { title: "Project", subtitle: "Case study" };
  return { title: "Shahajalal", subtitle: "Android · Backend" };
}

export default function MobileAppBar({ onOpenDrawer }) {
  const { pathname } = useLocation();
  const { title, subtitle } = deriveTitle(pathname);

  return (
    <M3TopAppBar
      title={title}
      subtitle={subtitle}
      titleClassName="text-[1.05rem] tracking-tight"
      leading={
        <button
          onClick={onOpenDrawer}
          aria-label="Open menu"
          className="m3-tap relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center m3-state-hover ring-2 ring-primary/20 active:scale-95 transition-transform"
        >
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          {/* Tiny status dot — Android "active" indicator */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success ring-2 ring-base-100" />
        </button>
      }
      trailing={
        <div className="flex items-center gap-0.5">
          {/* Notifications pill (decorative — opens drawer) */}
          <button
            onClick={onOpenDrawer}
            aria-label="Notifications"
            className="m3-tap relative w-10 h-10 rounded-full flex items-center justify-center text-base-content m3-state-hover active:scale-95 transition-transform"
          >
            <FaBell className="text-base" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-error" />
          </button>
          {/* Theme / settings */}
          <button
            onClick={onOpenDrawer}
            aria-label="Theme & settings"
            className="m3-tap w-10 h-10 rounded-full flex items-center justify-center text-base-content m3-state-hover active:scale-95 transition-transform"
          >
            <FaPalette className="text-base" />
          </button>
        </div>
      }
    />
  );
}