// MobileDrawer — bottom-sheet "overflow" drawer hosting theme/font/social links.

import { FaGithub, FaLinkedin, FaFacebook, FaPhone } from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import M3Sheet from "./components/M3Sheet";
import M3ListItem from "./components/M3ListItem";
import ThemeSelector from "../components/ThemeSelector";
import InstallAppButton from "../shared/components/InstallAppButton";
import { FaPalette, FaFont } from "react-icons/fa";

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
    href: "https://www.facebook.com/ShahajalalMahmud100/",
  },
  {
    leading: <SiLeetcode />,
    title: "LeetCode",
    href: "https://leetcode.com/Shahajalal_Mahmud/",
  },
  {
    leading: <SiCodeforces />,
    title: "Codeforces",
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

export default function MobileDrawer({ open, onClose }) {
  return (
    <M3Sheet open={open} onClose={onClose} title="Menu">
      <div className="px-3 space-y-2">
        {/* Appearance section */}
        <div className="rounded-2xl bg-base-200/60 px-2 py-2">
          <div className="flex items-center gap-2 px-2 pt-1 pb-2 text-base-content/65">
            <FaPalette className="text-base" />
            <span className="m3-label-large">Appearance</span>
          </div>
          <ThemeSelector />
        </div>

        {/* Social links */}
        <div className="rounded-2xl bg-base-200/60 overflow-hidden">
          <div className="flex items-center gap-2 px-4 pt-3 pb-2 text-base-content/65">
            <span className="m3-label-large">Connect</span>
          </div>
          {SOCIALS.map((s, i) => (
            <M3ListItem
              key={s.title}
              leading={s.leading}
              title={s.title}
              subtitle={s.subtitle}
              href={s.href}
              divider={i < SOCIALS.length - 1}
            />
          ))}
        </div>

        {/* PWA install (renders nothing if already installed or unsupported) */}
        <div className="px-2 pt-2 flex justify-center">
          <InstallAppButton variant="mobile" />
        </div>

        <p className="text-center text-xs text-base-content/45 py-3">
          © {new Date().getFullYear()} MD Shahajalal Mahmud
        </p>
      </div>
    </M3Sheet>
  );
}