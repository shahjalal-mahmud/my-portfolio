import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaDownload,
  FaUserGraduate,
  FaCode,
  FaAndroid,
  FaRocket,
} from "react-icons/fa";
import { FiServer, FiExternalLink } from "react-icons/fi";
import { MdArchitecture, MdSecurity } from "react-icons/md";
import { TbTopologyStar3, TbBrandKotlin } from "react-icons/tb";
import { SiNodedotjs, SiPostgresql, SiFirebase } from "react-icons/si";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IoClose } from "react-icons/io5";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ABOUT_DATA = {
  cvPath: "/cv.pdf",
  cvFileName: "Shahjalal_CV.pdf",

  shortBio: `Founder of Appriyo & CSE student building scalable Android and backend systems. I specialize in multi-tenant architectures, secure financial workflows, and offline-first mobile apps — turning complex engineering into production-ready products.`,

  expandedBio: (
    <>
      I design and build <strong>production-grade software systems</strong> with a strong focus on{" "}
      <strong>scalability, security, and reliability</strong>. My core expertise lies in{" "}
      <strong>Android development (Kotlin + Jetpack Compose)</strong> and{" "}
      <strong>backend engineering (Node.js, REST APIs, PostgreSQL)</strong>, where I develop
      end-to-end solutions for real-world applications.
      <br /><br />
      I have hands-on experience building <strong>multi-tenant SaaS systems</strong> with strict{" "}
      <strong>data isolation</strong>, as well as implementing <strong>secure financial workflows</strong>{" "}
      using <strong>RBAC and JWT-based authentication</strong>. My approach emphasizes{" "}
      <strong>consistency, concurrency safety, and clean architecture</strong>.
      <br /><br />
      I also specialize in <strong>offline-first mobile systems</strong> using Room and optimized
      local databases, ensuring seamless UX in low-connectivity environments.
      <br /><br />
      Beyond development, I have a strong academic foundation in{" "}
      <strong>Data Structures & Algorithms, Operating Systems, DBMS, and Networking</strong>.
      <br /><br />
      Currently focused on building systems in the <strong>FinTech domain</strong> and solving
      high-impact engineering problems at scale.
    </>
  ),

  techStack: [
    { label: "Kotlin", icon: <TbBrandKotlin />, color: "text-[#7F52FF]" },
    { label: "Jetpack", icon: <FaAndroid />, color: "text-success" },
    { label: "Node.js", icon: <SiNodedotjs />, color: "text-[#68A063]" },
    { label: "PostgreSQL", icon: <SiPostgresql />, color: "text-[#336791]" },
    { label: "Firebase", icon: <SiFirebase />, color: "text-[#FFCA28]" },
    { label: "REST APIs", icon: <FiServer />, color: "text-info" },
    { label: "RBAC Auth", icon: <MdSecurity />, color: "text-error" },
    { label: "Sys Design", icon: <MdArchitecture />, color: "text-warning" },
    { label: "MVVM", icon: <TbTopologyStar3 />, color: "text-secondary" },
    { label: "C++ DSA", icon: <FaCode />, color: "text-primary" },
  ],

  pillars: [
    { icon: <FaAndroid />, title: "Android", desc: "Kotlin · Jetpack · Room DB", accent: "text-success", bg: "bg-success/10 border-success/20" },
    { icon: <FiServer />, title: "Backend", desc: "Node.js · REST · PostgreSQL", accent: "text-info", bg: "bg-info/10 border-info/20" },
    { icon: <MdArchitecture />, title: "Architecture", desc: "SaaS · FinTech · Scale", accent: "text-warning", bg: "bg-warning/10 border-warning/20" },
  ],

  stats: [
    { value: 3, suffix: "+", label: "Years" },
    { value: 10, suffix: "+", label: "Projects" },
    { value: 2, suffix: "", label: "Domains" },
  ],

  info: [
    { icon: <FaMapMarkerAlt />, label: "Location", value: "Khulna, Bangladesh", color: "text-error", bg: "bg-error/10 border-error/20" },
    { icon: <FaEnvelope />, label: "Email", value: "mahmud.nubtk@gmail.com", color: "text-info", bg: "bg-info/10 border-info/20", href: "mailto:mahmud.nubtk@gmail.com", truncate: true },
    { icon: <FaUserGraduate />, label: "Role", value: "SWE · Android & Backend", color: "text-warning", bg: "bg-warning/10 border-warning/20" },
    { icon: <FaDownload />, label: "Resume", value: "Download CV", color: "text-success", bg: "bg-success/10 border-success/20", href: "/cv.pdf", download: "Shahjalal_CV.pdf", isLink: true },
  ],

  extras: [
    { label: "Available for", value: "Freelance & Full-time", dot: "bg-success" },
    { label: "Response time", value: "Within 24 hours", dot: "bg-info" },
    { label: "Work style", value: "Remote & Hybrid", dot: "bg-warning" },
    { label: "Languages", value: "Bengali & English", dot: "bg-secondary" },
  ],
};

const ease = [0.22, 1, 0.36, 1];

// ─── COUNT UP ─────────────────────────────────────────────────────────────────
const CountUp = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 36;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 28);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── TECH BADGE ───────────────────────────────────────────────────────────────
const TechBadge = ({ label, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-base-200/80 border border-base-300/60 rounded-lg hover:border-primary/40 hover:bg-base-200 transition-all duration-200 cursor-default group"
  >
    <span className={`text-sm flex-shrink-0 ${color} group-hover:scale-110 transition-transform duration-200`}>{icon}</span>
    <span className="text-[11px] font-semibold text-base-content/75 whitespace-nowrap">{label}</span>
  </motion.div>
);

// ─── EXPANDED MODAL ───────────────────────────────────────────────────────────
const ExpandedModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-base-300/70 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.94, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.94, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onClick={(e) => e.stopPropagation()}
      className="relative bg-base-100 rounded-3xl p-7 sm:p-10 max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-base-300/50"
    >
      <svg className="absolute top-4 left-4 w-7 h-7 opacity-[0.12]" viewBox="0 0 48 48" fill="none">
        <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="2" />
      </svg>
      <button onClick={onClose} className="absolute top-5 right-5 btn btn-circle btn-sm btn-ghost hover:bg-error/10 hover:text-error z-10">
        <IoClose className="text-xl" />
      </button>
      <div className="flex items-center gap-4 mb-7">
        <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/30">
          <FaCode className="text-lg" />
        </div>
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight">Building with Purpose</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mt-0.5">The Full Vision</p>
        </div>
      </div>
      <div className="text-sm sm:text-[15px] leading-[1.85] text-base-content/75">{ABOUT_DATA.expandedBio}</div>
      <div className="mt-7 pt-6 border-t border-base-300/40">
        <p className="text-[10px] uppercase tracking-[0.2em] text-base-content/35 font-bold mb-3">Technical Arsenal</p>
        <div className="flex flex-wrap gap-2">
          {ABOUT_DATA.techStack.map((t, i) => <TechBadge key={i} {...t} />)}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } },
  };

  return (
    <>
      <section
        id="about"
        className="
          relative w-full overflow-hidden
          bg-base-100 text-base-content
          lg:h-screen lg:flex lg:items-center
          py-20 lg:py-0
          px-5 sm:px-10 lg:px-16 xl:px-20
        "
      >
        {/* ══ BACKGROUND ══════════════════════════════════════════════════ */}
        <div className="pointer-events-none select-none absolute inset-0">
          <div className="absolute -top-32 -right-48 w-[560px] h-[560px] rounded-full bg-primary/[0.06] blur-[130px]" />
          <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-secondary/[0.05] blur-[110px]" />
          <div className="absolute top-1/2 left-1/3 w-[280px] h-[280px] rounded-full bg-accent/[0.04] blur-[80px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.028]">
            <defs>
              <pattern id="about-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
          <svg className="absolute inset-0 w-full h-full opacity-[0.018]">
            <defs>
              <pattern id="about-diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-diag)" />
          </svg>
          <div className="absolute left-0 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          <div className="absolute right-0 top-1/3 w-px h-72 bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent" />
          <svg className="absolute top-5 left-5 w-9 h-9 opacity-[0.10]" viewBox="0 0 48 48" fill="none"><path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="2" /></svg>
          <svg className="absolute top-5 right-5 w-9 h-9 opacity-[0.10]" viewBox="0 0 48 48" fill="none"><path d="M48 16 L48 0 L32 0" stroke="currentColor" strokeWidth="2" /></svg>
          <svg className="absolute bottom-5 left-5 w-9 h-9 opacity-[0.10]" viewBox="0 0 48 48" fill="none"><path d="M0 32 L0 48 L16 48" stroke="currentColor" strokeWidth="2" /></svg>
          <svg className="absolute bottom-5 right-5 w-9 h-9 opacity-[0.10]" viewBox="0 0 48 48" fill="none"><path d="M48 32 L48 48 L32 48" stroke="currentColor" strokeWidth="2" /></svg>
        </div>

        {/* ══ CONTENT ════════════════════════════════════════════════════ */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">

          {/* Section eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-8"
          >
            <div className="h-px w-8 bg-base-300" />
            <span className="text-[10px] text-base-content/30 uppercase tracking-[0.24em] font-semibold">Who I Am</span>
            <div className="h-px w-8 bg-base-300" />
          </motion.div>

          {/* ── THREE-COLUMN LAYOUT ─────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-6 xl:gap-10">

            {/* ── LEFT: Text + stats + pillars + CTAs ───────────────── */}
            <motion.div
              className="w-full lg:flex-1 flex flex-col gap-3.5 items-center text-center lg:items-start lg:text-left"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Badge */}
              <motion.div variants={item}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.13em] uppercase bg-primary/10 border border-primary/25 text-primary">
                  <FaCode className="text-[10px]" />
                  Software Engineer
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div variants={item} className="space-y-0.5">
                <h2 className="font-extrabold tracking-tight leading-[1.07] text-3xl sm:text-4xl xl:text-[2.6rem]">
                  About{" "}
                  <span className="relative inline-block">
                    <span className="text-primary">Me</span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary/40 origin-left"
                    />
                  </span>
                </h2>
                <p className="text-[10px] uppercase tracking-[0.22em] text-base-content/30 font-medium">
                  Engineer · Builder · Problem Solver
                </p>
              </motion.div>

              {/* Bio */}
              <motion.p variants={item} className="text-sm opacity-60 leading-[1.75] max-w-md lg:max-w-none">
                {ABOUT_DATA.shortBio}
              </motion.p>

              {/* Read more */}
              <motion.div variants={item}>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="inline-flex items-center gap-2 text-[12px] font-bold text-primary hover:gap-3 transition-all duration-200 group"
                >
                  Read Full Vision
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </button>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                variants={item}
                className="w-full flex items-center justify-center lg:justify-start gap-6 py-3.5 px-5 bg-base-200/50 border border-base-300/50 rounded-2xl"
              >
                {ABOUT_DATA.stats.map((s, i) => (
                  <div key={i} className="contents">
                    {i > 0 && <div className="w-px h-7 bg-base-300" />}
                    <div className="flex flex-col items-center gap-0.5">
                      <p className="text-2xl font-extrabold text-primary tracking-tight">
                        <CountUp target={s.value} suffix={s.suffix} />
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-base-content/35 font-semibold">{s.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Pillars */}
              <motion.div variants={item} className="w-full flex flex-wrap gap-2 justify-center lg:justify-start">
                {ABOUT_DATA.pillars.map((p, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 border rounded-xl ${p.bg}`}>
                    <span className={`text-sm ${p.accent}`}>{p.icon}</span>
                    <div>
                      <p className="text-[11px] font-bold text-base-content leading-none">{p.title}</p>
                      <p className="text-[9px] text-base-content/40 mt-0.5 leading-none">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={item} className="flex flex-row gap-2.5 justify-center lg:justify-start">
                <a
                  href={ABOUT_DATA.cvPath}
                  download={ABOUT_DATA.cvFileName}
                  className="btn btn-primary btn-sm px-5 gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <FaDownload className="text-xs" />
                  Resume
                </a>

                {/* Updated Link below */}
                <a
                  href="/skills-projects"
                  className="btn btn-outline btn-sm px-5 gap-2 hover:border-primary/50 hover:bg-primary/8 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <FaRocket className="text-xs" />
                  Projects
                </a>
              </motion.div>
            </motion.div>

            {/* ── CENTER: Photo ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease, delay: 0.1 }}
              className="flex-shrink-0 flex justify-center order-first lg:order-none"
            >
              <div className="relative group">
                {/* Spin ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                  style={{
                    inset: "-16px",
                    background: "conic-gradient(from 0deg, transparent 55%, oklch(var(--p)/0.45) 100%)",
                    borderRadius: "26px",
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-dashed border-base-300/30"
                  style={{ inset: "-32px", borderRadius: "30px" }}
                />

                {/* Float */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="absolute inset-2 rounded-2xl bg-primary/15 blur-3xl group-hover:bg-primary/28 transition-all duration-700" />

                  <img
                    src="/img/about_photo.jpg"
                    alt="Shahajalal Mahmud"
                    className="
                      relative z-10 rounded-3xl object-cover object-top
                      border-[3px] border-primary/55 ring-[8px] ring-primary/8
                      group-hover:border-primary group-hover:scale-[1.02]
                      transition-all duration-500
                      w-44 h-52
                      sm:w-52 sm:h-60
                      lg:w-[200px] lg:h-[240px]
                      xl:w-[230px] xl:h-[272px]
                    "
                  />

                  {/* Chip: Role */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: -14, y: -8 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.75, type: "spring", stiffness: 200, damping: 16 }}
                    className="absolute top-4 -left-12 z-20 flex items-center gap-2 bg-primary text-primary-content rounded-2xl px-2.5 py-2 shadow-lg shadow-primary/40"
                  >
                    <FaUserGraduate className="text-[11px] opacity-90 flex-shrink-0" />
                    <div className="leading-tight">
                      <p className="text-[8px] opacity-60 uppercase tracking-wider font-medium">Role</p>
                      <p className="text-[10px] font-bold mt-0.5">Android & Backend</p>
                    </div>
                  </motion.div>

                  {/* Chip: Stack */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 14, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.95, type: "spring", stiffness: 200, damping: 16 }}
                    className="absolute -bottom-3 -right-10 z-20 flex items-center gap-1.5 bg-base-100 border border-base-300 rounded-2xl px-2.5 py-2 shadow-[0_8px_28px_rgba(0,0,0,0.16)]"
                  >
                    <TbBrandKotlin className="text-[#7F52FF] text-[14px]" />
                    <span className="text-base-content/20 text-[9px]">+</span>
                    <SiNodedotjs className="text-[#68A063] text-[12px]" />
                    <div className="leading-tight ml-1">
                      <p className="text-[8px] text-base-content/35 uppercase tracking-wider font-medium">Stack</p>
                      <p className="text-[10px] font-bold text-base-content mt-0.5">Kotlin · Node.js</p>
                    </div>
                  </motion.div>

                  {/* Chip: Location */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: -10, y: 6 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 16 }}
                    className="absolute bottom-12 -left-10 z-20 flex items-center gap-1.5 bg-base-200 border border-base-300 rounded-xl px-2.5 py-1.5 shadow-md"
                  >
                    <FaMapMarkerAlt className="text-error text-xs flex-shrink-0" />
                    <div className="leading-tight">
                      <p className="text-[8px] text-base-content/35 uppercase tracking-wider font-medium">Based in</p>
                      <p className="text-[10px] font-bold text-base-content mt-0.5">Khulna, BD</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* ── RIGHT: Info + Tech + Extras ────────────────────────── */}
            <motion.div
              className="w-full lg:flex-1 flex flex-col gap-3.5 items-center text-center lg:items-start lg:text-left"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Info grid */}
              <motion.div variants={item} className="w-full grid grid-cols-2 gap-2">
                {ABOUT_DATA.info.map((info, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 p-2.5 bg-base-200/60 border border-base-300/50 rounded-xl hover:border-primary/25 hover:bg-base-200/90 transition-all duration-200 group"
                  >
                    <div className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs flex-shrink-0 border ${info.bg} ${info.color} group-hover:scale-110 transition-transform duration-200`}>
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] uppercase tracking-[0.14em] text-base-content/35 font-semibold">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          download={info.download}
                          target={!info.download ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={`text-[11px] font-bold mt-0.5 block ${info.isLink ? "text-primary hover:underline" : "text-base-content/80 hover:text-primary"} ${info.truncate ? "truncate" : ""} transition-colors duration-150`}
                        >
                          {info.value}{info.isLink && <FiExternalLink className="inline ml-0.5 text-[8px]" />}
                        </a>
                      ) : (
                        <p className={`text-[11px] font-bold text-base-content/80 mt-0.5 ${info.truncate ? "truncate" : ""}`}>{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Divider */}
              <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-3 w-full">
                <div className="h-px w-8 bg-base-300" />
                <span className="text-[9px] text-base-content/25 uppercase tracking-[0.22em] flex-shrink-0">Core Expertise</span>
                <div className="h-px flex-1 max-w-[60px] bg-base-300" />
              </motion.div>

              {/* Tech stack */}
              <motion.div variants={item} className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                {ABOUT_DATA.techStack.map((tech, i) => (
                  <TechBadge key={i} {...tech} />
                ))}
              </motion.div>

              {/* Divider */}
              <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-3 w-full">
                <div className="h-px w-8 bg-base-300" />
                <span className="text-[9px] text-base-content/25 uppercase tracking-[0.22em] flex-shrink-0">Availability</span>
                <div className="h-px flex-1 max-w-[60px] bg-base-300" />
              </motion.div>

              {/* Extra chips */}
              <motion.div variants={item} className="w-full grid grid-cols-2 gap-2">
                {ABOUT_DATA.extras.map((chip, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 bg-base-200/40 border border-base-300/40 rounded-xl">
                    <span className={`w-1.5 h-1.5 rounded-full ${chip.dot} mt-1.5 flex-shrink-0`} />
                    <div>
                      <p className="text-[8px] text-base-content/35 uppercase tracking-wider font-semibold">{chip.label}</p>
                      <p className="text-[11px] font-bold text-base-content/80 mt-0.5">{chip.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isExpanded && <ExpandedModal onClose={() => setIsExpanded(false)} />}
      </AnimatePresence>
    </>
  );
};

export default About;