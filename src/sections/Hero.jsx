import { FaFacebook, FaGithub, FaLinkedin, FaPhone, FaBriefcase } from "react-icons/fa";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { FiServer, FiBriefcase} from "react-icons/fi";
import { FaAndroid, FaRocket } from "react-icons/fa";
import { MdEmail, MdArchitecture } from "react-icons/md";
import { TbTopologyStar3 } from "react-icons/tb";
import { useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const HERO_CONTENT = {
  name: "Shahajalal",
  title: "Shahajalal Mahmud",
  typewriterWords: [
    "Android Engineer (Kotlin)",
    "Backend Engineer (Node.js)",
    "Founder @ Appriyo",
    "FinTech Systems Builder",
    "System Design Enthusiast",
  ],
  tagline: "Founder · Engineer · Builder",
  description: (
    <>
      Founder of{" "}
      <strong className="text-primary font-semibold"><a href="https://appriyo.com" target="_blank" rel="noopener noreferrer">Appriyo</a></strong> & 3rd-year CSE student
      specializing in{" "}
      <strong className="text-primary font-semibold">
        high-performance Android & backend systems
      </strong>
      . I design multi-tenant architectures, secure financial workflows, and
      offline-first applications — turning complex engineering challenges into
      production-ready, revenue-generating products at scale.
    </>
  ),
  badges: [
    { icon: <FaAndroid className="text-success" />, label: "Android", sub: "Kotlin · Jetpack" },
    { icon: <FiServer className="text-info" />,     label: "Backend",  sub: "Node.js · REST" },
    { icon: <MdArchitecture className="text-warning" />, label: "Architecture", sub: "Multi-tenant" },
  ],
  socials: [
    { icon: <FaGithub />,    href: "https://github.com/shahjalal-mahmud",                label: "GitHub"     },
    { icon: <FaLinkedin />,  href: "https://www.linkedin.com/in/md-shahajalal-mahmud/", label: "LinkedIn"   },
    { icon: <FaFacebook />,  href: "https://www.facebook.com/ShahjalalMahmud100/",      label: "Facebook"   },
    { icon: <SiLeetcode />,  href: "https://leetcode.com/Shahajalal_Mahmud/",           label: "LeetCode"   },
    { icon: <SiCodeforces />,href: "https://codeforces.com/profile/mahmud.nubtk/",      label: "Codeforces" },
    { icon: <MdEmail />,     href: "mailto:mahmud.nubtk@gmail.com",                     label: "Email"      },
    { icon: <FaPhone />,     href: "tel:+8801889793146",                                label: "Phone"      },
  ],
};

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
      ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      aria-label={label} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      whileHover={{ scale: 1.22 }}
      whileTap={{ scale: 0.92 }}
      className="
        w-10 h-10 flex items-center justify-center rounded-xl text-lg
        bg-base-200 border border-base-300
        text-base-content/50
        hover:text-primary hover:border-primary/50 hover:bg-primary/10
        transition-colors duration-200 relative group
      "
    >
      {icon}
      {/* Tooltip */}
      <span className="
        absolute -top-8 left-1/2 -translate-x-1/2
        text-[9px] font-semibold uppercase tracking-wider
        bg-base-300 text-base-content px-2 py-0.5 rounded-md
        opacity-0 group-hover:opacity-100 pointer-events-none
        transition-opacity duration-150 whitespace-nowrap
      ">
        {label}
      </span>
    </motion.a>
  );
};

// ─── STAT CHIP ────────────────────────────────────────────────────────────────
const StatChip = ({ icon, label, sub }) => (
  <div className="
    flex items-center gap-2.5
    bg-base-200/80 border border-base-300/60
    rounded-xl px-3.5 py-2.5
    hover:border-primary/30 hover:bg-base-200
    transition-all duration-200
  ">
    <span className="text-xl flex-shrink-0">{icon}</span>
    <div>
      <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-wider leading-none">{sub}</p>
      <p className="text-[13px] font-bold text-base-content leading-tight mt-0.5">{label}</p>
    </div>
  </div>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const ease = [0.22, 1, 0.36, 1];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.10, delayChildren: 0.08 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease } },
  };

  return (
    <section
      id="hero"
      className="
        relative w-full overflow-hidden
        bg-base-100 text-base-content
        lg:h-screen lg:flex lg:items-center
        flex items-center
        px-5 sm:px-10 lg:px-16 xl:px-20
        pt-24 pb-14
        lg:pt-0 lg:pb-0
      "
    >

      {/* ══ BACKGROUND ══════════════════════════════════════════════════════ */}
      <div className="pointer-events-none select-none absolute inset-0">

        {/* Multi-layer glow system */}
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-primary/[0.07] blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-secondary/[0.06] blur-[110px]" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/[0.04] blur-[90px]" />

        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.028]">
          <defs>
            <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Diagonal lines accent */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.018]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal)" />
        </svg>

        {/* Edge accent lines */}
        <div className="absolute left-0 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
        <div className="absolute right-0 top-1/3 w-px h-72 bg-gradient-to-b from-transparent via-primary/18 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent" />

        {/* Corner decorative brackets */}
        <svg className="absolute top-6 left-6 w-12 h-12 opacity-[0.12]" viewBox="0 0 48 48" fill="none">
          <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="absolute top-6 right-6 w-12 h-12 opacity-[0.12]" viewBox="0 0 48 48" fill="none">
          <path d="M48 16 L48 0 L32 0" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-6 left-6 w-12 h-12 opacity-[0.12]" viewBox="0 0 48 48" fill="none">
          <path d="M0 32 L0 48 L16 48" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-6 right-6 w-12 h-12 opacity-[0.12]" viewBox="0 0 48 48" fill="none">
          <path d="M48 32 L48 48 L32 48" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      {/* ══ CONTENT ═════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="
          flex flex-col-reverse items-center
          gap-14 sm:gap-16
          lg:flex-row lg:gap-12 lg:items-center
          xl:gap-20
        ">

          {/* ────────────────────────────────────────────────────────────────
              LEFT  —  Text content
          ──────────────────────────────────────────────────────────────── */}
          <motion.div
            className="
              flex-1 flex flex-col items-center text-center
              lg:items-start lg:text-left
              gap-5 lg:gap-4.5 xl:gap-5
            "
            variants={container} initial="hidden" animate="visible"
          >

            {/* Status badge */}
            <motion.div variants={item}>
              <span className="
                inline-flex items-center gap-2.5 px-4 py-1.5
                rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase
                bg-success/10 border border-success/25 text-success
              ">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-65" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                </span>
                Open to opportunities
              </span>
            </motion.div>

            {/* Typewriter role */}
            <motion.p
              variants={item}
              className="font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-bold text-primary/70 min-h-[1.4em]"
            >
              <Typewriter
                words={HERO_CONTENT.typewriterWords}
                loop cursor cursorStyle="|"
                typeSpeed={65} deleteSpeed={40} delaySpeed={2000}
              />
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="
                font-extrabold tracking-tight leading-[1.06]
                text-4xl sm:text-5xl md:text-6xl
                lg:text-5xl xl:text-[3.8rem] 2xl:text-7xl
              "
            >
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="text-primary">{HERO_CONTENT.name}</span>
                {/* Underline accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary/40 origin-left"
                />
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p variants={item} className="text-[11px] uppercase tracking-[0.22em] text-base-content/35 font-medium -mt-1">
              {HERO_CONTENT.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-sm sm:text-[15px] opacity-60 leading-[1.75] max-w-md lg:max-w-none lg:max-w-[500px]"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* Mini stat chips */}
            <motion.div variants={item} className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {HERO_CONTENT.badges.map((b) => (
                <StatChip key={b.label} {...b} />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="
                  btn btn-primary w-full sm:w-auto px-8 gap-2
                  shadow-lg shadow-primary/25
                  hover:shadow-xl hover:shadow-primary/35
                  hover:-translate-y-0.5 transition-all duration-200
                "
              >
                <FaRocket className="text-sm" />
                View Projects
              </a>
              <a
                href="https://appriyo.com" target="_blank" rel="noopener noreferrer"
                className="
                  btn btn-outline w-full sm:w-auto px-8 gap-2
                  hover:border-primary/50 hover:bg-primary/8
                  hover:-translate-y-0.5 transition-all duration-200
                "
              >
                <FiBriefcase className="text-sm" />
                Visit Appriyo ↗
              </a>
            </motion.div>

            {/* Divider */}
            <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-3 w-full">
              <div className="h-px w-8 bg-base-300" />
              <span className="text-[9px] text-base-content/25 uppercase tracking-[0.22em] flex-shrink-0">Connect</span>
              <div className="h-px flex-1 max-w-[80px] bg-base-300" />
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={item}
              className="flex justify-center lg:justify-start gap-2 flex-wrap"
            >
              {HERO_CONTENT.socials.map((s) => (
                <MagneticSocial key={s.label} {...s} />
              ))}
            </motion.div>

          </motion.div>

          {/* ────────────────────────────────────────────────────────────────
              RIGHT  —  Profile photo
          ──────────────────────────────────────────────────────────────── */}
          <motion.div
            className="flex-shrink-0 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.82, x: 36 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.80, ease, delay: 0.10 }}
          >
            <div className="relative group">

              {/* Outer slow-spin ring with gradient */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full"
                style={{
                  inset: "-22px",
                  background: "conic-gradient(from 0deg, transparent 60%, oklch(var(--p)/0.5) 100%)",
                  borderRadius: "50%",
                }}
              />

              {/* Second ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full border border-dashed border-base-300/40"
                style={{ inset: "-46px" }}
              />

              {/* Floating dots on outer ring */}
              {[0, 90, 180, 270].map((deg, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute rounded-full"
                  style={{
                    inset: "-22px",
                    transformOrigin: "center center",
                  }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_3px] shadow-primary/40"
                    style={{
                      top: i === 0 ? "-6px" : i === 2 ? "calc(100% - 6px)" : "calc(50% - 6px)",
                      left: i === 3 ? "-6px" : i === 1 ? "calc(100% - 6px)" : "calc(50% - 6px)",
                    }}
                  />
                </motion.div>
              ))}

              {/* Float animation */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glow backdrop */}
                <div className="
                  absolute inset-2 rounded-full bg-primary/20 blur-3xl
                  group-hover:bg-primary/35 transition-all duration-700
                " />

                {/* Photo */}
                <img
                  src="/img/about_photo.jpg"
                  alt="Shahajalal Mahmud — Android & Backend Engineer"
                  className="
                    relative z-10 rounded-full object-cover object-top
                    border-[3px] border-primary/60
                    ring-[10px] ring-primary/10
                    group-hover:border-primary group-hover:scale-[1.025]
                    transition-all duration-500
                    w-56 h-56
                    sm:w-64 sm:h-64
                    md:w-72 md:h-72
                    lg:w-[290px] lg:h-[290px]
                    xl:w-[330px] xl:h-[330px]
                    2xl:w-[370px] 2xl:h-[370px]
                  "
                />

                {/* ── Floating chip: Stack (bottom-right) ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: 20, y: 12 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 16 }}
                  className="
                    absolute -bottom-4 -right-6 z-20
                    flex items-center gap-2.5
                    bg-base-100 border border-base-300
                    rounded-2xl px-3.5 py-2.5
                    shadow-[0_8px_32px_rgba(0,0,0,0.18)]
                  "
                >
                  <div className="flex items-center gap-0.5">
                    <FaAndroid className="text-success text-[17px]" />
                    <span className="text-base-content/25 text-xs">+</span>
                    <FiServer className="text-info text-[14px]" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[9px] text-base-content/35 uppercase tracking-wider font-medium">Tech Stack</p>
                    <p className="text-[11px] font-bold text-base-content mt-0.5">Kotlin · Node.js</p>
                  </div>
                </motion.div>

                {/* ── Floating chip: Founder (top-left) ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: -20, y: -12 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 16 }}
                  className="
                    absolute top-4 -left-10 z-20
                    flex items-center gap-2.5
                    bg-primary text-primary-content
                    rounded-2xl px-3.5 py-2.5
                    shadow-lg shadow-primary/40
                  "
                >
                  <FaBriefcase className="text-[15px] flex-shrink-0 opacity-90" />
                  <div className="text-left leading-tight">
                    <p className="text-[9px] opacity-60 uppercase tracking-wider font-medium">Founder & CEO</p>
                    <p className="text-[11px] font-bold mt-0.5">Appriyo</p>
                  </div>
                </motion.div>

                {/* ── Floating chip: Architecture (left-bottom area) ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: -20, y: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.3, type: "spring", stiffness: 200, damping: 16 }}
                  className="
                    absolute bottom-16 -left-12 z-20
                    flex items-center gap-2
                    bg-base-200 border border-base-300
                    rounded-xl px-3 py-2
                    shadow-md
                  "
                >
                  <TbTopologyStar3 className="text-warning text-base flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <p className="text-[9px] text-base-content/35 uppercase tracking-wider font-medium">Focus</p>
                    <p className="text-[11px] font-bold text-base-content mt-0.5">FinTech · Scale</p>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* ── Scroll indicator (desktop only) ─────────────────────────────── */}
        <motion.div
          className="hidden lg:flex justify-center mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-base-content/20 hover:text-base-content/50 transition-colors duration-200"
          >
            <div className="w-5 h-8 rounded-full border-[1.5px] border-current flex items-start justify-center pt-1.5">
              <motion.div
                animate={{ opacity: [1, 0], y: [0, 10] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeIn" }}
                className="w-0.5 h-1.5 rounded-full bg-current"
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.24em]">Scroll</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;