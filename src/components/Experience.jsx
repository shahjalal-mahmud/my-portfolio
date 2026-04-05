import React from "react";
import {
  FaBriefcase, FaCode, FaRocket, FaUserTie,
  FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    title: "Founder & Technical Project Manager",
    company: "Appriyo",
    link: "https://appriyo.com",
    duration: "Jan 2026 – Present",
    type: "Hybrid",
    location: "Khulna, BD",
    icon: <FaRocket />,
    description:
      "Leading an agile team of 4 to deliver end-to-end IT solutions. Architecting scalable MVPs and overseeing technical execution from Jetpack Compose to React ecosystems.",
    achievements: [
      "Launched NFC Networking solutions",
      "Reduced MVP dev time by 30%",
      "Leading UI/UX & Marketing synergy",
    ],
    status: "Active",
    accentClass: "bg-primary text-primary-content shadow-primary/30",
    dotClass: "bg-primary",
    badgeClass: "bg-success/10 border-success/25 text-success",
    hoverBorder: "hover:border-primary/30",
    glow: "bg-primary/[0.04]",
  },
  {
    title: "Android Developer",
    company: "Independent Product",
    link: "https://drive.google.com/file/d/1m7_lfMzOZHbpO7EsQEGvl3I9crFPEuTQ/view?usp=sharing",
    duration: "Jul 2025 – Jan 2026",
    type: "Active Product",
    location: "Remote",
    icon: <FaCode />,
    description:
      "Engineered a complete POS & Management system for repair shops. Actively used by 5 owners for stock management and financial reporting.",
    achievements: [
      "Integrated Bluetooth POS Printing",
      "Built automated SMS reminders",
      "Full inventory & Talikhata systems",
    ],
    status: "Deployed",
    accentClass: "bg-secondary text-secondary-content shadow-secondary/30",
    dotClass: "bg-secondary",
    badgeClass: "bg-info/10 border-info/25 text-info",
    hoverBorder: "hover:border-secondary/30",
    glow: "bg-secondary/[0.04]",
  },
  {
    title: "Freelance React Developer",
    company: "University Client",
    link: "https://anindyanag.netlify.app/",
    duration: "Jun 2025 – Jul 2025",
    type: "Client Project",
    location: "Remote",
    icon: <FaUserTie />,
    description:
      "Developed a secure, admin-controlled portfolio platform for university faculty to manage academic publications and dynamic CV generation.",
    achievements: [
      "Real-time CRUD with Firestore",
      "Responsive UI with modal editing",
      "Secure image hosting integration",
    ],
    status: "Completed",
    accentClass: "bg-accent text-accent-content shadow-accent/30",
    dotClass: "bg-accent",
    badgeClass: "bg-base-300/70 border-base-300 text-base-content/40",
    hoverBorder: "hover:border-accent/30",
    glow: "bg-accent/[0.04]",
  },
];

const ease = [0.22, 1, 0.36, 1];

// ─── EXPERIENCE CARD ──────────────────────────────────────────────────────────
const ExperienceCard = ({ item, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease, delay: 0.1 + idx * 0.05 }}
      className="relative flex gap-6 group"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 + idx * 0.05 }}
          className={`
            w-11 h-11 rounded-2xl flex items-center justify-center text-lg
            shadow-lg z-10 flex-shrink-0
            group-hover:rotate-12 group-hover:scale-110
            transition-all duration-500
            ${item.accentClass}
          `}
        >
          {item.icon}
        </motion.div>
        {idx < EXPERIENCES.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 + idx * 0.1, ease }}
            className="flex-1 mt-2 w-px min-h-[60px] bg-gradient-to-b from-base-300 via-base-300/40 to-transparent origin-top"
          />
        )}
      </div>

      {/* Card */}
      <div className={`
        flex-1 mb-10 bg-base-200/50 border border-base-300/60
        rounded-3xl p-6 sm:p-7
        hover:bg-base-200
        hover:shadow-xl hover:shadow-primary/5
        hover:-translate-y-1
        transition-all duration-400 relative overflow-hidden
        ${item.hoverBorder}
      `}>
        {/* Inner glow */}
        <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl pointer-events-none ${item.glow}`} />

        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center flex-wrap gap-2">
            {/* Status badge */}
            <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${item.badgeClass}`}>
              {item.status === "Active" && (
                <span className="relative inline-flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-65" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                </span>
              )}
              {item.status}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-base-content/30 uppercase tracking-[0.16em]">
              <FaMapMarkerAlt className="text-[8px]" />
              {item.location}
            </span>
          </div>
          {/* Duration */}
          <span className="text-[9px] text-base-content/30 font-semibold uppercase tracking-[0.14em] shrink-0">
            {item.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-base-content leading-tight mb-1.5 group-hover:text-primary transition-colors duration-300">
          {item.title}
        </h3>

        {/* Company */}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary/70 hover:text-primary transition-colors duration-200 group/link mb-3"
        >
          {item.company}
          <FaExternalLinkAlt className="text-[8px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
        </a>

        {/* Type badge */}
        <div className="mb-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-base-content/35 border border-base-300/60 rounded-lg px-2.5 py-1 bg-base-300/30">
            {item.type}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-base-content/55 leading-[1.72] mb-4">
          {item.description}
        </p>

        {/* Achievements */}
        <div>
          <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-base-content/30 mb-2.5">
            Key Contributions
          </p>
          <ul className="space-y-1.5">
            {item.achievements.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-base-content/55 group-hover:text-base-content/75 transition-colors duration-200">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${item.dotClass}`} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative number */}
        <div className="absolute bottom-5 right-7 text-7xl font-black opacity-[0.025] group-hover:opacity-[0.055] transition-opacity pointer-events-none select-none">
          0{idx + 1}
        </div>
      </div>
    </motion.div>
  );
};

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
const Experience = () => {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } },
  };

  return (
    <section
      id="experience"
      className="
        relative w-full overflow-hidden
        bg-base-100 text-base-content
        py-20 lg:py-28
        px-5 sm:px-10 lg:px-16 xl:px-20
      "
    >
      {/* ══ BACKGROUND (mirrors hero/about) ═══════════════════════════════ */}
      <div className="pointer-events-none select-none absolute inset-0">
        <div className="absolute -top-32 -right-48 w-[560px] h-[560px] rounded-full bg-primary/[0.06] blur-[130px]" />
        <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-secondary/[0.05] blur-[110px]" />
        <div className="absolute top-1/2 left-1/3 w-[280px] h-[280px] rounded-full bg-accent/[0.04] blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.028]">
          <defs>
            <pattern id="exp-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#exp-grid)" />
        </svg>
        <svg className="absolute inset-0 w-full h-full opacity-[0.018]">
          <defs>
            <pattern id="exp-diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#exp-diag)" />
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

      {/* ══ CONTENT ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-base-300" />
          <span className="text-[10px] text-base-content/30 uppercase tracking-[0.24em] font-semibold">Professional Journey</span>
          <div className="h-px w-8 bg-base-300" />
        </motion.div>

        {/* Section heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.13em] uppercase bg-primary/10 border border-primary/25 text-primary mb-4">
              <FaBriefcase className="text-[10px]" />
              Experience
            </span>
          </motion.div>
          <motion.h2 variants={item} className="font-extrabold tracking-tight leading-[1.07] text-3xl sm:text-4xl xl:text-[2.8rem]">
            Work &amp;{" "}
            <span className="relative inline-block">
              <span className="text-primary">Projects</span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary/40 origin-left"
              />
            </span>
          </motion.h2>
          <motion.p variants={item} className="text-[10px] uppercase tracking-[0.22em] text-base-content/30 font-medium mt-2">
            Builder · Founder · Engineer
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col">
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceCard key={idx} item={exp} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;