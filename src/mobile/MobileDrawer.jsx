// MobileDrawer — modal bottom sheet that opens from any app-bar trigger.
//
// Three modes, controlled by the `mode` prop:
//   • "menu"    (default) — full menu: profile + Connect + Appearance + PWA
//                            install + footer.
//   • "alerts"            — everything in the menu EXCEPT the Appearance
//                            section (triggered by the notification pill).
//   • "theme"             — ONLY the Appearance section (triggered by the
//                            palette / theme icon).
//
// The M3Sheet itself becomes a small focused modal in `theme` mode.

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaPhone,
  FaPalette,
  FaCheckCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  SiLeetcode,
  SiCodeforces,
} from "react-icons/si";
import { MdEmail } from "react-icons/md";
import M3Sheet from "./components/M3Sheet";
import M3ListItem from "./components/M3ListItem";
import ThemeSelector from "../components/ThemeSelector";
import InstallAppButton from "../shared/components/InstallAppButton";
import profilePic from "/img/about_photo.jpg";

const SOCIALS = [
  {
    leading: <FaGithub />,
    title: "GitHub",
    subtitle: "github.com/shahajalal-mahmud",
    href: "https://github.com/shahajalal-mahmud",
  },
  {
    leading: <FaLinkedin />,
    title: "LinkedIn",
    subtitle: "MD Shahajalal Mahmud",
    href: "https://www.linkedin.com/in/md-shahajalal-mahmud/",
  },
  {
    leading: <FaFacebook />,
    title: "Facebook",
    subtitle: "ShahajalalMahmud100",
    href: "https://www.facebook.com/ShahajalalMahmud100/",
  },
  {
    leading: <SiLeetcode />,
    title: "LeetCode",
    subtitle: "Shahajalal_Mahmud",
    href: "https://leetcode.com/Shahajalal_Mahmud/",
  },
  {
    leading: <SiCodeforces />,
    title: "Codeforces",
    subtitle: "mahmud.nubtk",
    href: "https://codeforces.com/profile/mahmud.nubtk/",
  },
  {
    leading: <MdEmail />,
    title: "Email",
    subtitle: "mahmud.nubtk@gmail.com",
    href: "mailto:mahmud.nubtk@gmail.com",
  },
  {
    leading: <FaPhone />,
    title: "Phone",
    subtitle: "+880 18897-93146",
    href: "tel:+8801889793146",
  },
];

// ─── Sections (memoized as standalone components for clarity) ───────────────

function ProfileCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-base-300/60 bg-base-100 m3-elev-1">
      {/* Subtle accent strip on the left edge */}
      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-primary" />

      <div className="p-4 pl-5">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent opacity-90" />
            <img
              src={profilePic}
              alt="Shahajalal Mahmud"
              className="relative w-14 h-14 rounded-full object-cover ring-2 ring-base-100"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-content flex items-center justify-center ring-2 ring-base-100">
              <FaCheckCircle className="text-[10px]" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="m3-title-medium text-base-content leading-tight truncate">
              Shahajalal Mahmud
            </p>
            <p className="m3-body-medium text-base-content/65 truncate">
              Android & Backend Engineer
            </p>

            {/* Identity chips */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full bg-primary/12 text-primary m3-label-medium">
                Founder @ Appriyo
              </span>
              <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full bg-success/12 border border-success/30 text-success m3-label-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectSection() {
  return (
    <section>
      <div className="flex items-center justify-between px-1 mb-2">
        <div className="flex items-center gap-2">
          <p className="m3-label-large uppercase tracking-[0.14em] text-primary">
            Connect
          </p>
          <span className="m3-label-medium text-base-content/45">
            {SOCIALS.length} links
          </span>
        </div>
        <span className="m3-label-medium text-base-content/40">
          Opens in new tab
        </span>
      </div>

      <div className="rounded-3xl border border-base-300/60 bg-base-100 m3-elev-1 overflow-hidden divide-y divide-base-300/50">
        {SOCIALS.map((s) => (
          <a
            key={s.title}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="m3-tap block group active:bg-base-200/60 transition-colors"
            aria-label={`Open ${s.title} in a new tab`}
          >
            <M3ListItem
              leading={
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg group-hover:bg-primary/15 transition-colors">
                  {s.leading}
                </div>
              }
              title={s.title}
              subtitle={s.subtitle}
              trailing={
                <FaExternalLinkAlt className="text-base-content/40 text-[11px] group-hover:text-primary transition-colors" />
              }
            />
          </a>
        ))}
      </div>
    </section>
  );
}

function AppearanceSection() {
  return (
    <section>
      <div className="flex items-center gap-2 px-1 mb-2">
        <FaPalette className="text-sm text-primary" />
        <p className="m3-label-large uppercase tracking-[0.14em] text-primary">
          Appearance
        </p>
      </div>
      <div className="rounded-3xl border border-base-300/60 bg-base-100 m3-elev-1 overflow-hidden p-3">
        <ThemeSelector />
      </div>
    </section>
  );
}

function PwaInstallSection() {
  return (
    <section className="px-1 pt-1 flex justify-center">
      <InstallAppButton variant="mobile" />
    </section>
  );
}

function DrawerFooter() {
  return (
    <p className="text-center text-xs text-base-content/45 py-2">
      © {new Date().getFullYear()} MD Shahajalal Mahmud · v1.0.0
    </p>
  );
}

// ─── Drawer ─────────────────────────────────────────────────────────────────

export default function MobileDrawer({ open, onClose, mode = "menu" }) {
  const isTheme = mode === "theme";
  const isAlerts = mode === "alerts";
  const isMenu = mode === "menu";

  // Theme mode needs a "small focused modal" feel — just Appearance, in a
// content-sized sheet with a title. The other modes use the default
// tall bottom-sheet chrome.

  return (
    <M3Sheet
      open={open}
      onClose={onClose}
      title={isTheme ? "Appearance" : undefined}
    >
      <div className="px-4 pb-2 space-y-5">
        {isMenu && (
          <>
            <ProfileCard />
            <ConnectSection />
            <AppearanceSection />
            <PwaInstallSection />
            <DrawerFooter />
          </>
        )}

        {isAlerts && (
          <>
            <ProfileCard />
            <ConnectSection />
            <PwaInstallSection />
            <DrawerFooter />
          </>
        )}

        {isTheme && <AppearanceSection />}
      </div>
    </M3Sheet>
  );
}