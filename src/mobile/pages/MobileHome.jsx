// MobileHome — flagship native-Android dashboard.

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  FaAndroid, FaServer, FaLayerGroup, FaRocket, FaEnvelope, FaPhone,
  FaGithub, FaLinkedin, FaDownload, FaArrowRight, FaCodeBranch, FaUsers,
  FaTrophy, FaStar, FaGraduationCap, FaCheckCircle, FaShieldAlt, FaBolt,
  FaMobileAlt, FaCloud, FaCogs, FaBrain, FaChevronRight, FaPlay,
  FaCertificate, FaAward, FaTimes, FaPlus,
} from "react-icons/fa";
import { SiLeetcode, SiFirebase, SiSpringboot, SiKotlin, SiTensorflow } from "react-icons/si";
import projects from "../../shared/data/projects";
import M3Card from "../components/M3Card";
import M3Button from "../components/M3Button";
import M3Chip from "../components/M3Chip";
import M3ListItem from "../components/M3ListItem";

// ─── Motion tokens (Material Motion) ─────────────────────────────────────────

const SPRING = { type: "spring", stiffness: 320, damping: 30 };
const EASE_OUT = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE_OUT } },
};

// ─── Data ────────────────────────────────────────────────────────────────────

// Instagram-style counters (semantic, not stat-card).
const COUNTERS = [
  { value: "12+", label: "Projects" },
  { value: "4",   label: "Apps"     },
  { value: "1+",  label: "Years"    },
  { value: "3",   label: "Awards"   },
];

// "Now" banner — a present-tense, single-row statement.
const NOW = {
  title: "Appriyo SaaS dashboard",
  subtitle: "Multi-tenant admin panel for repair-shop ERP",
  meta: "Shipping this quarter",
};

// Current focus — 4 small Android-style tiles.
const FOCUS = [
  { icon: <FaAndroid />,    label: "Native Android", sub: "Kotlin · Compose"      },
  { icon: <FaServer />,     label: "Backend",        sub: "Spring Boot"           },
  { icon: <FaLayerGroup />, label: "Architecture",   sub: "Multi-tenant SaaS"     },
  { icon: <FaBolt />,       label: "Offline-first",  sub: "Sync & resilience"     },
];

// Quick actions — 4-up grid of icon tiles.
const ACTIONS = [
  { icon: <FaDownload />, label: "CV",       to: null,                href: "https://drive.google.com/file/d/1m7_lfMzOZHbpO7EsQEGvl3I9crFPEuTQ/view?usp=sharing" },
  { icon: <FaEnvelope />, label: "Contact",  to: "/contact",          href: null                },
  { icon: <FaRocket />,   label: "Appriyo",  to: null,                href: "https://appriyo.com" },
  { icon: <FaCodeBranch />, label: "GitHub", to: null,                href: "https://github.com/shahajalal-mahmud" },
];

// Social list rows.
const SOCIALS = [
  { leading: <FaGithub className="text-base" />,    title: "GitHub",    subtitle: "@shahajalal-mahmud",          href: "https://github.com/shahajalal-mahmud" },
  { leading: <FaLinkedin className="text-base" />,  title: "LinkedIn",  subtitle: "md-shahajalal-mahmud",        href: "https://www.linkedin.com/in/md-shahajalal-mahmud/" },
  { leading: <SiLeetcode className="text-base" />,  title: "LeetCode",  subtitle: "Shahajalal_Mahmud",           href: "https://leetcode.com/Shahajalal_Mahmud/" },
  { leading: <FaEnvelope className="text-base" />,  title: "Email",     subtitle: "mahmud.nubtk@gmail.com",      href: "mailto:mahmud.nubtk@gmail.com" },
  { leading: <FaPhone className="text-base" />,     title: "Phone",     subtitle: "+880 1889-793146",            href: "tel:+8801889793146" },
];

// Achievements — designed to be the visual "wow" alongside the carousel.
// Each card has a gradient (theme-aware), a metric, and an event label.
const ACHIEVEMENTS = [
  {
    icon: <FaTrophy />,
    badge: "Gold",
    metric: "98.7%",
    title: "Model Accuracy",
    event: "CashGuard AI · SOLVIO 2025",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: <FaAward />,
    badge: "Top 100",
    metric: "Global",
    title: "AI Hackathon",
    event: "SOLVIO 2025 · Team Drishty",
    color: "from-primary to-secondary",
  },
  {
    icon: <FaCertificate />,
    badge: "Pilot",
    metric: "5 shops",
    title: "Active Beta",
    event: "Repair Store Manager",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: <FaStar />,
    badge: "Survey",
    metric: "150+",
    title: "Students",
    event: "Prodorshok · 10 universities",
    color: "from-sky-400 to-indigo-500",
  },
];

// Helper — pick a category for each project.
function projectCategory(p) {
  if (p.slug === "repair-store-manager") return "Tools · ERP";
  if (p.slug === "prodorshok")           return "Education · AI";
  if (p.slug === "cashguard-ai")         return "FinTech · AI";
  if (p.slug === "teacher-portfolio")    return "Web · Portfolio";
  return "Project";
}

// Helper — pick a status pill for each project.
function projectStatus(p) {
  if (p.slug === "repair-store-manager") return { label: "In production", tone: "success" };
  if (p.slug === "prodorshok")           return { label: "Live",          tone: "primary" };
  if (p.slug === "cashguard-ai")         return { label: "Hackathon",     tone: "warning" };
  if (p.slug === "teacher-portfolio")    return { label: "Deployed",      tone: "info"    };
  return { label: "Project", tone: "primary" };
}

// ─── Subcomponents (page-scoped) ─────────────────────────────────────────────

/**
 * Play-Store-style snap carousel.
 * - 85% width per slide
 * - peek of next card
 * - dot indicator
 * - per-card scale/opacity shift while scrolling (driven by scroll progress)
 */
function FeaturedCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      // Each card width is 85% of viewport. Compute the nearest snap index.
      const cardW = el.clientWidth * 0.85;
      const idx = Math.round(el.scrollLeft / cardW);
      setActive(Math.max(0, Math.min(projects.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.clientWidth * 0.85;
    el.scrollTo({ left: i * cardW, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 -mx-4 px-4 pb-2"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to project ${i + 1}`}
            className="m3-tap p-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-base-content/25"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * One slide inside the carousel.
 * Each card scales & fades slightly based on its own scroll progress, giving
 * the "peeking neighbor" feel without needing a parallax library.
 */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [progress, setProgress] = useState(index === 0 ? 0 : 1); // 0 = centered, 1 = far

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const track = el.parentElement;
    if (!track) return;
    const onScroll = () => {
      const cardW = track.clientWidth * 0.85 + 12; // 0.85 + gap-3
      const center = track.scrollLeft + track.clientWidth / 2;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter) / cardW;
      setProgress(Math.min(1.2, distance));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Scale & opacity shift driven by distance from center.
  const scale = 1 - Math.min(progress, 1) * 0.08;       // 1.0 → 0.92
  const opacity = 1 - Math.min(progress, 1) * 0.35;     // 1.0 → 0.65
  const status = projectStatus(project);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="snap-center shrink-0 w-[85%]"
    >
      <Link to={`/projects/${project.slug}`} className="block m3-tap active:scale-[0.99] transition-transform">
        <M3Card elevation={2} className="m3-shape-xl overflow-hidden">
          {/* Top: icon + meta */}
          <div className="flex items-start gap-3">
            <div className="relative w-16 h-16 rounded-2xl bg-base-200 ring-1 ring-base-300/60 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="m3-label-medium uppercase tracking-wider text-primary">
                {projectCategory(project)}
              </p>
              <h3 className="m3-title-large text-base-content leading-tight truncate">
                {project.name.split(" - ")[0]}
              </h3>
              <p className="m3-body-medium text-base-content/65 line-clamp-2 mt-0.5">
                {project.description}
              </p>
            </div>
          </div>

          {/* Screenshot hero (16:9-ish banner) */}
          {project.media?.[0] && (
            <div className="mt-3 -mx-4">
              <img
                src={project.media[0]}
                alt=""
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <M3Chip label={status.label} variant="assist" />
            {project.skills?.slice(0, 2).map((s) => (
              <M3Chip key={s} label={s} variant="assist" />
            ))}
          </div>

          {/* Action */}
          <div className="flex items-center justify-between mt-4">
            <span className="m3-label-medium text-base-content/55">
              {project.metrics?.[0] || "View project"}
            </span>
            <M3Button
              variant="filled"
              size="small"
              iconRight={<FaArrowRight />}
            >
              Open
            </M3Button>
          </div>
        </M3Card>
      </Link>
    </motion.div>
  );
}

/**
 * Award card — used in the achievements horizontal scroller.
 * Visual: gradient ring + icon badge + metric headline + event label.
 */
function AwardCard({ a }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className="snap-start shrink-0 w-[68%] m3-tap"
    >
      <M3Card elevation={2} className="m3-shape-xl overflow-hidden p-0">
        {/* Gradient top banner */}
        <div className={`relative h-24 bg-gradient-to-br ${a.color}`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -bottom-6 left-4 w-14 h-14 rounded-2xl bg-base-100 ring-4 ring-base-100 flex items-center justify-center text-2xl text-primary m3-elev-2">
            {a.icon}
          </div>
          <span className="absolute top-3 right-3 m3-label-medium uppercase tracking-wider text-white/90 bg-black/20 backdrop-blur-sm rounded-full px-2.5 py-1">
            {a.badge}
          </span>
        </div>

        {/* Body */}
        <div className="pt-9 px-4 pb-4">
          <p className="m3-headline-medium text-base-content leading-none">
            {a.metric}
          </p>
          <p className="m3-title-medium text-base-content mt-1.5 font-semibold">
            {a.title}
          </p>
          <p className="m3-body-medium text-base-content/60 mt-0.5 line-clamp-2">
            {a.event}
          </p>
        </div>
      </M3Card>
    </motion.div>
  );
}

/**
 * Compact focus tile — used in the "Current focus" grid.
 * Different shape from every other card on screen.
 */
function FocusTile({ icon, label, sub }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className="m3-tap"
    >
      <M3Card
        elevation={0}
        className="m3-shape-lg border border-base-300/60 p-3 h-full"
      >
        <span className="text-primary text-lg flex items-center">{icon}</span>
        <p className="m3-label-large text-base-content mt-2 leading-tight">
          {label}
        </p>
        <p className="m3-label-medium text-base-content/55 mt-0.5 leading-tight">
          {sub}
        </p>
      </M3Card>
    </motion.div>
  );
}

/**
 * Quick action tile — used in the icon grid.
 * A different layout again: square tile, centered icon, label below.
 */
function ActionTile({ icon, label, to, href }) {
  const inner = (
    <M3Card
      elevation={0}
      className="m3-shape-xl border border-base-300/60 flex flex-col items-center justify-center text-center py-4 px-1 min-h-[92px] m3-tap"
    >
      <span className="text-primary text-2xl flex items-center mb-1.5">
        {icon}
      </span>
      <p className="m3-label-large text-base-content leading-tight">
        {label}
      </p>
    </M3Card>
  );
  if (to) {
    return <Link to={to} className="block active:scale-[0.97] transition-transform">{inner}</Link>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block active:scale-[0.97] transition-transform"
    >
      {inner}
    </a>
  );
}

/**
 * Subtle parallax wrapper for the page (cards lift slightly while scrolling).
 * Optional but adds a premium "breathing" feel.
 */
function ParallaxSection({ children, offset = 20 }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -offset]);
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MobileHome() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-8"
    >
      {/* ════════════════════════════════════════════════════════════════════
          1. PROFILE HEADER (Instagram-inspired, no surrounding card)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={itemVariants} className="px-4 pt-2 pb-5">
        <div className="flex flex-col items-center text-center">
          {/* Avatar with gradient ring */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent opacity-90" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent blur-md opacity-50" />
            <img
              src="/img/about_photo.jpg"
              alt="Shahajalal Mahmud"
              className="relative w-24 h-24 rounded-full object-cover ring-4 ring-base-100"
            />
            {/* Verified-style dot */}
            <span className="absolute -bottom-1 right-1 w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center ring-4 ring-base-100">
              <FaCheckCircle className="text-sm" />
            </span>
          </motion.div>

          {/* Name + role */}
          <h1 className="m3-headline-medium text-base-content mt-4 leading-tight">
            Shahajalal Mahmud
          </h1>
          <p className="m3-body-large text-base-content/70 mt-0.5">
            Android & Backend Engineer
          </p>

          {/* Identity pills */}
          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-primary/12 text-primary m3-label-large">
              <FaRocket className="text-xs" />
              Founder @ Appriyo
            </span>
            <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-success/12 border border-success/30 text-success m3-label-large">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              Available
            </span>
          </div>

          {/* Compact bio */}
          <p className="m3-body-medium text-base-content/65 mt-3 max-w-xs">
            CSE student building production-grade Android apps, multi-tenant SaaS,
            and offline-first systems.
          </p>

          {/* Instagram-style counters (no card) */}
          <div className="flex items-stretch mt-5 w-full max-w-sm">
            {COUNTERS.map((c, i) => (
              <div
                key={c.label}
                className={`flex-1 flex flex-col items-center px-2 ${
                  i < COUNTERS.length - 1 ? "border-r border-base-300/60" : ""
                }`}
              >
                <p className="m3-title-large text-base-content leading-none">
                  {c.value}
                </p>
                <p className="m3-label-medium uppercase tracking-wider text-base-content/55 mt-1">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          2. CURRENTLY BUILDING (single full-width banner, NOW pulse)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={itemVariants} className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/10 border border-primary/20 p-4">
          {/* Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

          <div className="relative flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-primary text-primary-content flex items-center justify-center flex-shrink-0 m3-elev-1">
              <FaRocket />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-success ring-2 ring-base-100">
                <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="m3-label-medium uppercase tracking-[0.12em] text-primary">
                Now building
              </p>
              <p className="m3-title-large text-base-content leading-tight truncate">
                {NOW.title}
              </p>
              <p className="m3-body-medium text-base-content/65 line-clamp-1">
                {NOW.subtitle}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          3. FEATURED PROJECTS — Play-Store snap carousel
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={itemVariants} className="mb-7">
        <div className="flex items-end justify-between px-4 pb-3">
          <div>
            <p className="m3-label-medium uppercase tracking-[0.14em] text-primary">
              Showcase
            </p>
            <h2 className="m3-headline-medium text-base-content leading-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/skills-projects#projects"
            className="m3-tap m3-label-large text-primary flex items-center gap-1"
          >
            See all
            <FaChevronRight className="text-xs" />
          </Link>
        </div>

        <FeaturedCarousel />
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          4. ACHIEVEMENTS — award cards in a horizontal scroller
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={itemVariants} className="mb-7">
        <div className="flex items-end justify-between px-4 pb-3">
          <div>
            <p className="m3-label-medium uppercase tracking-[0.14em] text-primary">
              Highlights
            </p>
            <h2 className="m3-headline-medium text-base-content leading-tight">
              Achievements
            </h2>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-1">
          {ACHIEVEMENTS.map((a) => (
            <AwardCard key={a.title} a={a} />
          ))}
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          5. CURRENT FOCUS — compact Android-style tiles (2x2 grid)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={itemVariants} className="px-4 mb-7">
        <div className="pb-3">
          <p className="m3-label-medium uppercase tracking-[0.14em] text-primary">
            Daily stack
          </p>
          <h2 className="m3-headline-medium text-base-content leading-tight">
            Current Focus
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {FOCUS.map((f) => (
            <FocusTile key={f.label} {...f} />
          ))}
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          6. QUICK ACTIONS — 4-up icon tile grid
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={itemVariants} className="px-4 mb-7">
        <div className="pb-3">
          <p className="m3-label-medium uppercase tracking-[0.14em] text-primary">
            Quick
          </p>
          <h2 className="m3-headline-medium text-base-content leading-tight">
            Actions
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {ACTIONS.map((a) => (
            <ActionTile key={a.label} {...a} />
          ))}
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          7. CONNECT — Android list (card)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={itemVariants} className="px-4">
        <div className="flex items-end justify-between pb-3">
          <div>
            <p className="m3-label-medium uppercase tracking-[0.14em] text-primary">
              Reach out
            </p>
            <h2 className="m3-headline-medium text-base-content leading-tight">
              Connect
            </h2>
          </div>
        </div>

        <M3Card elevation={1} className="m3-shape-xl overflow-hidden p-0">
          {SOCIALS.map((s, i) => (
            <M3ListItem
              key={s.title}
              leading={
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {s.leading}
                </div>
              }
              title={s.title}
              subtitle={s.subtitle}
              href={s.href}
              divider={i < SOCIALS.length - 1}
            />
          ))}
        </M3Card>
      </motion.section>
    </motion.div>
  );
}