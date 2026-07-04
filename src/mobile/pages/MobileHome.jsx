// MobileHome — flagship native-Android dashboard.

import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaAndroid, FaServer, FaLayerGroup, FaRocket, FaEnvelope, FaPhone,
  FaGithub, FaLinkedin, FaDownload, FaArrowRight, FaCodeBranch,
  FaTrophy, FaStar, FaGraduationCap, FaCheckCircle, FaShieldAlt, FaBolt,
  FaMobileAlt, FaCloud, FaCogs, FaBrain, FaChevronRight, FaPlay,
  FaCertificate, FaAward, FaHeart, FaCode,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
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
  progress: 72,
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
  { icon: <FaDownload />, label: "CV",       to: null,                href: "/cv.pdf" },
  { icon: <FaEnvelope />, label: "Contact",  to: "/contact",          href: null                },
  { icon: <FaRocket />,   label: "Appriyo",  to: null,                href: "https://appriyo.com" },
  { icon: <FaCodeBranch />, label: "GitHub", to: null,                href: "https://github.com/shahjalal-mahmud" },
];

// Social list rows. Each item is clickable and opens in a new tab.
const SOCIALS = [
  { leading: <FaGithub className="text-base" />,    title: "GitHub",    subtitle: "@shahjalal-mahmud",          href: "https://github.com/shahajalal-mahmud" },
  { leading: <FaLinkedin className="text-base" />,  title: "LinkedIn",  subtitle: "md-shahajalal-mahmud",        href: "https://www.linkedin.com/in/md-shahajalal-mahmud/" },
  { leading: <SiLeetcode className="text-base" />,  title: "LeetCode",  subtitle: "Shahajalal_Mahmud",           href: "https://leetcode.com/Shahajalal_Mahmud/" },
  { leading: <FaEnvelope className="text-base" />,  title: "Email",     subtitle: "mahmud.nubtk@gmail.com",      href: "mailto:mahmud.nubtk@gmail.com" },
  { leading: <FaPhone className="text-base" />,     title: "Phone",     subtitle: "+880 1889-793146",            href: "tel:+8801889793146" },
];

// Achievements — clean outline cards, no gradient backgrounds.
// Designed in pure Material 3 expressive style: tonal surface + accent number.
const ACHIEVEMENTS = [
  {
    icon: <FaTrophy />,
    badge: "Gold",
    metric: "98.7%",
    title: "Model Accuracy",
    event: "CashGuard AI · SOLVIO 2025",
  },
  {
    icon: <FaAward />,
    badge: "Top 100",
    metric: "Global",
    title: "AI Hackathon",
    event: "SOLVIO 2025 · Team Drishty",
  },
  {
    icon: <FaCertificate />,
    badge: "Pilot",
    metric: "5 shops",
    title: "Active Beta",
    event: "Repair Store Manager",
  },
  {
    icon: <FaStar />,
    badge: "Survey",
    metric: "150+",
    title: "Students",
    event: "Prodorshok · 10 universities",
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
 * Play-Store-style snap carousel with infinite-loop behaviour.
 *
 * Strategy: render a cloned copy of the projects list at the start and end
 * so the user can swipe past the boundaries and we silently jump back to
 * the real item without animation. The visible "active index" is mapped
 * back to the original array (modulo length) for the dot indicator.
 *
 * The carousel lives inside an `overflow-hidden` clip-frame so the page
 * itself never scrolls horizontally — only the inner track moves.
 */
function FeaturedCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [cloned] = useState(() => [
    projects[projects.length - 1], // clone of last at start
    ...projects,
    projects[0], // clone of first at end
  ]);
  const realCount = projects.length;
  const isJumpingRef = useRef(false);

  // Compute slide width (85% of container + gap-3 = 12px).
  const getCardW = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    return el.clientWidth * 0.85 + 12;
  }, []);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = getCardW();
    if (!cardW) return;
    const idx = Math.round(el.scrollLeft / cardW);
    // Map back to original index (offset by 1 because of the leading clone).
    const realIdx = ((idx - 1) % realCount + realCount) % realCount;
    setActive(realIdx);
  }, [getCardW, realCount]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Infinite-loop wrap: after a scroll settles near a clone, jump to the real slide.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handleScrollEnd = () => {
      const cardW = getCardW();
      if (!cardW) return;
      const idx = Math.round(el.scrollLeft / cardW);
      // idx 0 == clone of last, idx (realCount+1) == clone of first.
      if (idx === 0) {
        isJumpingRef.current = true;
        el.scrollTo({ left: realCount * cardW, behavior: "auto" });
      } else if (idx === realCount + 1) {
        isJumpingRef.current = true;
        el.scrollTo({ left: 1 * cardW, behavior: "auto" });
      }
      // Clear the jump flag after a frame.
      requestAnimationFrame(() => {
        isJumpingRef.current = false;
      });
    };
    let scrollTimer;
    const onScrollWrap = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScrollEnd, 90);
    };
    el.addEventListener("scroll", onScrollWrap, { passive: true });
    return () => {
      clearTimeout(scrollTimer);
      el.removeEventListener("scroll", onScrollWrap);
    };
  }, [getCardW, realCount]);

  const go = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = getCardW();
    if (!cardW) return;
    // +1 because of the leading clone.
    el.scrollTo({ left: (i + 1) * cardW, behavior: "smooth" });
  };

  return (
    <div>
      {/* Outer clip-frame: this is the key to stopping horizontal page-scroll. */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 -mx-4 px-4 pb-2"
        >
          {cloned.map((p, i) => (
            <ProjectCard key={`${p.slug}-${i}`} project={p} index={i} />
          ))}
        </div>
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
  const [progress, setProgress] = useState(index === 1 ? 0 : 1); // 0 = centered, 1 = far

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
 * Award card — clean outline design with no gradient background.
 * Material 3 "expressive" style: tonal surface + accent number.
 */
function AwardCard({ a }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className="snap-start shrink-0 w-[72%] m3-tap"
    >
      <M3Card
        elevation={0}
        className="m3-shape-xl border border-base-300/70 bg-base-100 p-4 h-full"
      >
        {/* Top row: icon badge + pill badge */}
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">
            {a.icon}
          </div>
          <span className="m3-label-medium uppercase tracking-wider text-base-content/55 bg-base-200/70 rounded-full px-2.5 py-1">
            {a.badge}
          </span>
        </div>

        {/* Metric + title */}
        <div className="mt-4">
          <p className="m3-headline-medium text-primary leading-none">
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
      // The wrapper itself clips any horizontal overflow — this is the page-level
      // safety net that complements the carousel's inner clip-frame.
      className="pb-8 overflow-x-hidden"
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
          2. CURRENTLY BUILDING — Modern Material You "Now Playing" card.
          Layered surface, pulsing live dot, progress rail, accent hero icon.
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={itemVariants} className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-3xl bg-base-100 border border-base-300/70 m3-elev-1">
          {/* Subtle accent strip on the left edge — modern Android "side rail" feel. */}
          <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary" />

          <div className="relative p-4 pl-5">
            {/* Header row: LIVE pill + meta */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-primary/10 text-primary m3-label-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                NOW BUILDING
              </div>
              <span className="m3-label-medium uppercase tracking-wider text-base-content/45">
                {NOW.meta}
              </span>
            </div>

            {/* Body row: icon + title + subtitle */}
            <div className="relative flex items-center gap-3 mt-3">
              <div className="relative w-12 h-12 rounded-2xl bg-primary text-primary-content flex items-center justify-center flex-shrink-0 m3-elev-1">
                <FaRocket className="text-lg" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="m3-title-large text-base-content leading-tight truncate">
                  {NOW.title}
                </p>
                <p className="m3-body-medium text-base-content/65 line-clamp-1">
                  {NOW.subtitle}
                </p>
              </div>
            </div>

            {/* Progress rail — Android "linear progress" */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="m3-label-medium uppercase tracking-wider text-base-content/55">
                  Progress
                </span>
                <span className="m3-label-large text-primary tabular-nums">
                  {NOW.progress}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-base-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${NOW.progress}%` }}
                  transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.2 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          3. FEATURED PROJECTS — Play-Store snap carousel (infinite loop)
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
          4. ACHIEVEMENTS — clean outline cards, no gradients.
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

        {/* Same overflow-hidden clip-frame trick as the carousel so this section
            can scroll horizontally without making the page scroll. */}
        <div className="overflow-hidden">
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-1">
            {ACHIEVEMENTS.map((a) => (
              <AwardCard key={a.title} a={a} />
            ))}
          </div>
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
          Each item is wrapped in an <a target="_blank"> so it opens in a
          new tab. M3ListItem also accepts an `href` and becomes an <a>.
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
            <a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="m3-tap block"
              aria-label={`Open ${s.title} in a new tab`}
            >
              <M3ListItem
                leading={
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    {s.leading}
                  </div>
                }
                title={s.title}
                subtitle={s.subtitle}
                divider={i < SOCIALS.length - 1}
              />
            </a>
          ))}
        </M3Card>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          8. FOOTER — Android-app-style. Divider, brand mark, links row,
          version chip, safe-area padding.
      ════════════════════════════════════════════════════════════════════ */}
      <motion.footer
        variants={itemVariants}
        className="mt-8 m3-safe-bottom"
      >
        {/* Top divider */}
        <div className="px-4">
          <div className="h-px w-full bg-base-300/70" />
        </div>

        <div className="px-4 pt-5 pb-2">
          {/* Brand row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-primary-content flex items-center justify-center m3-elev-1">
              <FaCode className="text-base" />
            </div>
            <div className="min-w-0">
              <p className="m3-title-medium text-base-content leading-tight">
                Shahajalal Mahmud
              </p>
              <p className="m3-label-medium text-base-content/55">
                Built with care · 2025
              </p>
            </div>
          </div>

          {/* Link row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              to="/"
              className="m3-tap m3-label-large text-base-content/75 hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/skills-projects"
              className="m3-tap m3-label-large text-base-content/75 hover:text-primary"
            >
              Projects
            </Link>
            <Link
              to="/education-experience"
              className="m3-tap m3-label-large text-base-content/75 hover:text-primary"
            >
              Journey
            </Link>
            <Link
              to="/contact"
              className="m3-tap m3-label-large text-base-content/75 hover:text-primary"
            >
              Contact
            </Link>
          </div>

          {/* Bottom meta row */}
          <div className="mt-5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 m3-label-medium text-base-content/55">
              <FaHeart className="text-error text-xs" />
              Crafted with passion
            </span>
            <span className="m3-label-medium text-base-content/40 tabular-nums">
              v1.0.0
            </span>
          </div>

          <p className="mt-3 m3-label-medium text-base-content/40">
            © {new Date().getFullYear()} MD Shahajalal Mahmud · All rights reserved.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}