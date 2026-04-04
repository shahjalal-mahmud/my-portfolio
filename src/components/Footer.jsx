import {
  FaGithub, FaLinkedin, FaFacebook,
  FaAndroid, FaRocket,
} from "react-icons/fa";
import { FiServer, FiExternalLink } from "react-icons/fi";
import { MdEmail, MdPhone, MdLocationOn, MdArchitecture } from "react-icons/md";
import { SiCodeforces, SiHackerrank, SiLeetcode } from "react-icons/si";
import { TbBrandKotlin } from "react-icons/tb";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import profilePic from "/img/profile.jpg";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const FOOTER_DATA = {
  name: "Shahajalal Mahmud",
  role: "Founder & Software Engineer",
  tagline: "Discipline · Consistency · Growth",
  bio: "Architecting scalable Android & backend systems. Founder of Appriyo — turning complex engineering into production-ready products.",

  navLinks: [
    { label: "Home",       href: "/" },
    { label: "About",      href: "/#about" },
    { label: "Skills",     href: "/skills-projects#skills" },
    { label: "Projects",   href: "/skills-projects#projects" },
    { label: "Education",  href: "/education-experience#education" },
    { label: "GitHub",     href: "/github" },
    { label: "Contact",    href: "/#contact" },
  ],

  venture: {
    name: "Appriyo",
    desc: "A specialized IT firm focused on Android MVPs and scalable web ecosystems for startups and enterprises.",
    href: "https://appriyo.com",
    pills: [
      { icon: <FaAndroid className="text-success" />, label: "Android Dev" },
      { icon: <FiServer className="text-info" />,     label: "Backend"      },
      { icon: <MdArchitecture className="text-warning" />, label: "SaaS Arch" },
    ],
  },

  contact: {
    email:    "mahmud.nubtk@gmail.com",
    phone:    "+880 18897-93146",
    location: "Khulna, Bangladesh",
  },

  socials: [
    { icon: <FaLinkedin />,   href: "https://www.linkedin.com/in/md-shahajalal-mahmud/",  label: "LinkedIn"   },
    { icon: <FaGithub />,     href: "https://github.com/shahjalal-mahmud",                label: "GitHub"     },
    { icon: <FaFacebook />,   href: "https://www.facebook.com/ShahjalalMahmud100/",       label: "Facebook"   },
    { icon: <SiCodeforces />, href: "https://codeforces.com/profile/mahmud.nubtk/",       label: "Codeforces" },
    { icon: <SiLeetcode />,   href: "https://leetcode.com/Shahajalal_Mahmud/",            label: "LeetCode"   },
    { icon: <SiHackerrank />, href: "https://www.hackerrank.com/profile/mahmud_nubtk/",   label: "HackerRank" },
  ],
};

const ease = [0.22, 1, 0.36, 1];

// ─── MAGNETIC SOCIAL ──────────────────────────────────────────────────────────
const MagneticSocial = ({ icon, href, label }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 17 });
  const sy = useSpring(y, { stiffness: 220, damping: 17 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.38);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.92 }}
      className="
        w-9 h-9 flex items-center justify-center rounded-xl text-base
        bg-base-200 border border-base-300/60
        text-base-content/45
        hover:text-primary hover:border-primary/50 hover:bg-primary/10
        transition-colors duration-200 relative group
      "
    >
      {icon}
      <span className="
        absolute -top-7 left-1/2 -translate-x-1/2
        text-[8px] font-semibold uppercase tracking-wider
        bg-base-200 text-base-content px-1.5 py-0.5 rounded-md border border-base-300/40
        opacity-0 group-hover:opacity-100 pointer-events-none
        transition-opacity duration-150 whitespace-nowrap z-10
      ">
        {label}
      </span>
    </motion.a>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-base-300 text-base-content">

      {/* ══ BACKGROUND ══════════════════════════════════════════════════════ */}
      <div className="pointer-events-none select-none absolute inset-0">
        <div className="absolute -top-32 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[120px]" />
        <div className="absolute -bottom-24 -right-32 w-[400px] h-[400px] rounded-full bg-secondary/[0.04] blur-[100px]" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.020]">
          <defs>
            <pattern id="footer-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>

        <svg className="absolute inset-0 w-full h-full opacity-[0.013]">
          <defs>
            <pattern id="footer-diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-diag)" />
        </svg>

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-base-300/80 to-transparent" />

        <svg className="absolute top-4 left-4 w-8 h-8 opacity-[0.08]" viewBox="0 0 48 48" fill="none"><path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="2"/></svg>
        <svg className="absolute top-4 right-4 w-8 h-8 opacity-[0.08]" viewBox="0 0 48 48" fill="none"><path d="M48 16 L48 0 L32 0" stroke="currentColor" strokeWidth="2"/></svg>
      </div>

      {/* ══ MAIN CONTENT ════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 pt-16 pb-8">

        {/* ── Top: Brand strip ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-12 pb-10 border-b border-base-content/[0.08]"
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
            <img
              src={profilePic}
              alt="Shahajalal Mahmud"
              className="
                relative z-10 w-16 h-16 rounded-2xl object-cover object-top
                border-2 border-primary/50 ring-4 ring-primary/10
              "
            />
            {/* Online dot */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-base-300 z-20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-success-content animate-ping" />
            </span>
          </div>

          {/* Name + role */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-extrabold tracking-tight">
              {FOOTER_DATA.name.split(" ")[0]}{" "}
              <span className="text-primary">{FOOTER_DATA.name.split(" ")[1]}</span>
              <span className="text-primary">.</span>
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-base-content/40 font-semibold mt-0.5">
              {FOOTER_DATA.role}
            </p>
            <p className="text-[12px] text-base-content/55 mt-1.5 max-w-xs">{FOOTER_DATA.bio}</p>
          </div>

          {/* Spacer + CTA */}
          <div className="sm:ml-auto flex flex-col sm:items-end gap-3">
            <a
              href="/#contact"
              className="
                btn btn-primary btn-sm gap-2 px-5
                shadow-lg shadow-primary/25
                hover:shadow-xl hover:shadow-primary/35
                hover:-translate-y-0.5 transition-all duration-200
              "
            >
              <FaRocket className="text-xs" />
              Hire Me
            </a>
            <a
              href={FOOTER_DATA.venture.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                btn btn-outline btn-sm gap-2 px-5
                hover:border-primary/50 hover:bg-primary/8
                hover:-translate-y-0.5 transition-all duration-200
              "
            >
              <FiExternalLink className="text-xs" />
              Visit Appriyo ↗
            </a>
          </div>
        </motion.div>

        {/* ── Main grid: 4 columns ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0 }}
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-base-content/30 font-bold mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {FOOTER_DATA.navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="
                      text-[13px] font-medium text-base-content/55
                      hover:text-primary hover:translate-x-1
                      transition-all duration-150 inline-flex items-center gap-1.5 group
                    "
                  >
                    <span className="w-1 h-1 rounded-full bg-base-content/20 group-hover:bg-primary transition-colors duration-150" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 2 — Appriyo venture */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.08 }}
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-base-content/30 font-bold mb-4">Our Venture</p>

            <div className="
              relative overflow-hidden
              bg-base-200/60 border border-base-300/50 rounded-2xl p-4
              hover:border-primary/25 transition-all duration-300 group
            ">
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-content text-xs font-black shadow-md shadow-primary/30">
                  A
                </div>
                <div>
                  <p className="text-[13px] font-extrabold tracking-tight">{FOOTER_DATA.venture.name}</p>
                  <p className="text-[9px] uppercase tracking-wider text-primary font-bold opacity-70">IT Firm</p>
                </div>
              </div>

              <p className="text-[11px] text-base-content/55 leading-relaxed mb-3">
                {FOOTER_DATA.venture.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {FOOTER_DATA.venture.pills.map((pill, i) => (
                  <div key={i} className="flex items-center gap-1 px-2 py-1 bg-base-300/60 rounded-lg border border-base-content/10">
                    <span className="text-xs">{pill.icon}</span>
                    <span className="text-[10px] font-semibold text-base-content/60">{pill.label}</span>
                  </div>
                ))}
              </div>

              <a
                href={FOOTER_DATA.venture.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-1.5 text-[11px] font-bold text-primary
                  hover:gap-2.5 transition-all duration-200
                "
              >
                appriyo.com <FiExternalLink className="text-[10px]" />
              </a>
            </div>
          </motion.div>

          {/* Col 3 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.16 }}
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-base-content/30 font-bold mb-4">Contact</p>
            <div className="space-y-3">
              {[
                { icon: <MdEmail />, text: FOOTER_DATA.contact.email, href: `mailto:${FOOTER_DATA.contact.email}`, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
                { icon: <MdPhone />, text: FOOTER_DATA.contact.phone, href: `tel:${FOOTER_DATA.contact.phone.replace(/\s+/g, "")}`, color: "text-success", bg: "bg-success/10 border-success/20" },
                { icon: <MdLocationOn />, text: FOOTER_DATA.contact.location, color: "text-error", bg: "bg-error/10 border-error/20" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 group">
                  <div className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs flex-shrink-0 border ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-[12px] font-medium text-base-content/55 hover:text-primary transition-colors duration-150 break-all">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-[12px] font-medium text-base-content/55">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Tech stack mini */}
            <div className="mt-5">
              <p className="text-[9px] uppercase tracking-[0.18em] text-base-content/25 font-bold mb-2.5">Tech</p>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { icon: <TbBrandKotlin />, color: "text-[#7F52FF]", label: "Kotlin" },
                  { icon: <FiServer />, color: "text-info", label: "Node.js" },
                  { icon: <FaAndroid />, color: "text-success", label: "Android" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-1 px-2 py-1 bg-base-200/60 border border-base-300/50 rounded-lg">
                    <span className={`text-xs ${t.color}`}>{t.icon}</span>
                    <span className="text-[10px] font-semibold text-base-content/55">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Col 4 — Socials + status */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.24 }}
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-base-content/30 font-bold mb-4">Socials</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {FOOTER_DATA.socials.map((s) => (
                <MagneticSocial key={s.label} {...s} />
              ))}
            </div>

            {/* Status card */}
            <div className="
              flex flex-col gap-3 p-3.5
              bg-base-200/60 border border-base-300/50 rounded-2xl
            ">
              {[
                { dot: "bg-success", label: "Status", value: "Open to Work" },
                { dot: "bg-info",    label: "Work",   value: "Remote & Hybrid" },
                { dot: "bg-warning", label: "Reply",  value: "Within 24 hrs" },
              ].map((chip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${chip.dot} flex-shrink-0`} />
                  <span className="text-[9px] uppercase tracking-wider text-base-content/30 font-semibold w-10 flex-shrink-0">{chip.label}</span>
                  <span className="text-[11px] font-bold text-base-content/65">{chip.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="
            flex flex-col sm:flex-row items-center justify-between gap-4
            pt-7 border-t border-base-content/[0.07]
          "
        >
          <p className="text-[11px] font-medium text-base-content/35">
            © {currentYear} Md Shahajalal Mahmud. All rights reserved.
          </p>

          {/* Tagline pills */}
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em]">
            {FOOTER_DATA.tagline.split(" · ").map((word, i, arr) => (
              <span key={i} className="contents">
                <span className="text-base-content/30 hover:text-primary transition-colors duration-200 cursor-default">
                  {word}
                </span>
                {i < arr.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                )}
              </span>
            ))}
          </div>

          {/* Back to top */}
          <motion.a
            href="#hero"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-base-200/60 border border-base-300/50
              text-[10px] font-bold uppercase tracking-wider text-base-content/40
              hover:text-primary hover:border-primary/30 hover:bg-primary/5
              transition-all duration-200
            "
          >
            ↑ Back to top
          </motion.a>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;