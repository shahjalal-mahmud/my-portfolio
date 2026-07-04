// MobileSkillsProjects — Android-product-style "Stack" screen.
//
// Rethought as a continuous-scroll dashboard instead of a tabbed list:
//   • Hero summary card
//   • Daily drivers (Android tech chip rail)
//   • Backend stack (expandable large cards)
//   • Architecture & system design (timeline-style rows)
//   • Databases & cloud (tonal 3-up icon grid)
//   • Featured Products (Play-Store snap carousel)
//   • Production Apps (compact 2-col tile grid)
//   • Open Source (Settings-style list rows)
//   • Research Projects (single highlight card)
//   • Hackathon Projects (compact stack)
//   • Developer Tools (chip grid)
//   • Currently Learning (animated progress list)
//
// Each section has a unique layout, density and motion vocabulary —
// mirroring the variety of native Android apps like Play Store,
// Wallet and the M3 Showcase.

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaAndroid, FaServer, FaDatabase, FaCode, FaTerminal,
  FaShieldAlt, FaArrowRight, FaRocket, FaCloud, FaCogs, FaBrain,
  FaLayerGroup, FaBolt, FaCodeBranch,
  FaNetworkWired, FaToolbox, FaChartLine, FaLightbulb,
  FaFlask, FaTrophy, FaUsers, FaMobileAlt,
  FaExternalLinkAlt, FaStar, FaArrowDown,
} from "react-icons/fa";
import {
  SiGit, SiFirebase, SiPostgresql, SiKotlin,
  SiSpringboot, SiDocker, SiTensorflow,
  SiLinux, SiGraphql, SiRedis,
  SiAmazonwebservices, SiVercel, SiNetlify,
} from "react-icons/si";
import { MdArchitecture, MdStorage, MdCloudQueue } from "react-icons/md";
import projects from "../../shared/data/projects";
import M3Card from "../components/M3Card";
import M3Chip from "../components/M3Chip";

// ─── Motion tokens ───────────────────────────────────────────────────────────

const SPRING = { type: "spring", stiffness: 320, damping: 30 };
const EASE_OUT = [0.22, 1, 0.36, 1];

// Section-level container variants — independent staggered children per group.
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
};

const itemRise = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

const itemFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

const itemScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

// ─── Section header ─────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, description, icon }) {
  return (
    <motion.header variants={itemRise} className="px-1 mb-3 mt-2">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="w-7 h-7 rounded-xl bg-primary/12 text-primary flex items-center justify-center text-sm">
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="m3-label-medium uppercase tracking-[0.14em] text-primary leading-tight">
            {eyebrow}
          </p>
          <h2 className="m3-headline-medium text-base-content leading-tight">
            {title}
          </h2>
        </div>
      </div>
      {description && (
        <p className="m3-body-medium text-base-content/65 mt-1.5 max-w-md">
          {description}
        </p>
      )}
    </motion.header>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────

// Daily drivers — Android stack as a horizontal chip rail.
const DAILY_DRIVERS = [
  { name: "Kotlin", icon: <SiKotlin /> },
  { name: "Jetpack Compose", icon: <FaAndroid /> },
  { name: "Coroutines + Flow", icon: <FaCode /> },
  { name: "MVVM", icon: <MdArchitecture /> },
  { name: "Room", icon: <FaDatabase /> },
  { name: "WorkManager", icon: <FaCogs /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "CameraX", icon: <FaMobileAlt /> },
  { name: "Material 3", icon: <FaLayerGroup /> },
];

// Backend stack — large expandable cards.
const BACKEND_STACK = [
  {
    icon: <SiSpringboot />,
    title: "Spring Boot + Kotlin",
    summary: "REST APIs with JWT auth, multi-tenant scoping and audit logs.",
    detail:
      "Designing the backend for Appriyo's repair-shop ERP — request validation, role-based access control, and Spring Security with method-level guards.",
    chips: ["REST", "JPA", "Spring Security", "Liquibase"],
  },
  {
    icon: <FaServer />,
    title: "Multi-tenant SaaS",
    summary: "Tenant-scoped data isolation, billing hooks, and rate-limited APIs.",
    detail:
      "Built a tenant-resolver interceptor and row-level security patterns so each repair-shop tenant only sees their own data. Designed subscription tiers and metering.",
    chips: ["Tenancy", "RBAC", "Rate-limit", "Billing"],
  },
  {
    icon: <FaBrain />,
    title: "AI Integrations",
    summary: "On-device TFLite and cloud LLM APIs wired into Android clients.",
    detail:
      "Shipped a TFLite counterfeit detector (98.7%) on Android and integrated Deepseek-R1 for the Prodorshok career-companion app. Care about offline-first inference where possible.",
    chips: ["TFLite", "Deepseek", "CameraX", "OpenCV"],
  },
];

// Architecture & system design — timeline rows.
const ARCHITECTURE_NOTES = [
  {
    icon: <FaLayerGroup />,
    title: "Clean Architecture",
    body: "Domain ← Data ← Presentation with a one-way dependency flow.",
  },
  {
    icon: <FaUsers />,
    title: "Multi-tenant SaaS",
    body: "Tenant resolver → scoped repositories → row-level guards.",
  },
  {
    icon: <FaShieldAlt />,
    title: "API Security",
    body: "JWT rotation, refresh-token revocation and rate-limit gates.",
  },
  {
    icon: <FaBolt />,
    title: "Offline-first sync",
    body: "WorkManager + Room + Firestore resolver for resilient devices.",
  },
];

// Databases & cloud — tonal 3-up grid.
const DATA_CLOUD = [
  { icon: <SiPostgresql />, label: "PostgreSQL", note: "Primary OLTP" },
  { icon: <SiFirebase />, label: "Firestore", note: "Realtime sync" },
  { icon: <MdStorage />, label: "Room", note: "On-device cache" },
  { icon: <SiRedis />, label: "Redis", note: "Caching layer" },
  { icon: <SiAmazonwebservices />, label: "AWS", note: "S3 + EC2" },
  { icon: <MdCloudQueue />, label: "Cloud Functions", note: "Event hooks" },
];

// Developer tools — chip grid.
const TOOLS = [
  { name: "Git", icon: <SiGit /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Linux", icon: <SiLinux /> },
  { name: "VS Code", icon: <FaCode /> },
  { name: "Postman", icon: <FaTerminal /> },
  { name: "Figma", icon: <FaMobileAlt /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Netlify", icon: <SiNetlify /> },
  { name: "GraphQL", icon: <SiGraphql /> },
];

// Currently learning — animated progress list.
const LEARNING = [
  { name: "Kotlin Multiplatform", progress: 42, icon: <SiKotlin /> },
  { name: "System Design interviews", progress: 68, icon: <FaNetworkWired /> },
  { name: "Advanced TFLite / quantization", progress: 55, icon: <SiTensorflow /> },
  { name: "RevenueCat + subscription billing", progress: 30, icon: <FaChartLine /> },
];

// Project categorization helpers — derive grouping from project data.
function projectCategoryGroup(p) {
  if (p.slug === "repair-store-manager") return "production";
  if (p.slug === "cashguard-ai") return "hackathon";
  if (p.slug === "prodorshok") return "research";
  if (p.slug === "teacher-portfolio") return "opensource";
  return "other";
}

const PROJECT_GROUP_LABEL = {
  production: "Production Apps",
  hackathon: "Hackathon Projects",
  research: "Research Projects",
  opensource: "Open Source",
  other: "Other",
};

const PROJECT_GROUP_DESCRIPTION = {
  production: "Apps real users are using every day.",
  hackathon: "Built under pressure, validated by juries.",
  research: "Experimental builds with field studies.",
  opensource: "Maintained public repos and contributions.",
  other: "Side experiments and explorations.",
};

// ─── Featured Projects carousel (Play-Store style snap, infinite loop) ─────

function FeaturedCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [cloned] = useState(() => [
    projects[projects.length - 1],
    ...projects,
    projects[0],
  ]);
  const realCount = projects.length;

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

  // Silent wrap-around when reaching clones.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let timer;
    const onScrollWrap = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const cardW = getCardW();
        if (!cardW) return;
        const idx = Math.round(el.scrollLeft / cardW);
        if (idx === 0) el.scrollTo({ left: realCount * cardW, behavior: "auto" });
        else if (idx === realCount + 1) el.scrollTo({ left: 1 * cardW, behavior: "auto" });
      }, 90);
    };
    el.addEventListener("scroll", onScrollWrap, { passive: true });
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", onScrollWrap);
    };
  }, [getCardW, realCount]);

  const go = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = getCardW();
    if (!cardW) return;
    el.scrollTo({ left: (i + 1) * cardW, behavior: "smooth" });
  };

  return (
    <div>
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 -mx-4 px-4 pb-2"
        >
          {cloned.map((p, i) => (
            <FeaturedCard key={`${p.slug}-${i}`} project={p} index={i} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to featured project ${i + 1}`}
            className="m3-tap p-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-base-content/25"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ project, index }) {
  const cardRef = useRef(null);
  const [progress, setProgress] = useState(index === 1 ? 0 : 1);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const track = el.parentElement;
    if (!track) return;
    const onScroll = () => {
      const cardW = track.clientWidth * 0.85 + 12;
      const center = track.scrollLeft + track.clientWidth / 2;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter) / cardW;
      setProgress(Math.min(1.2, distance));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scale = 1 - Math.min(progress, 1) * 0.08;
  const opacity = 1 - Math.min(progress, 1) * 0.35;

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="snap-center shrink-0 w-[85%]"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="block active:scale-[0.99] transition-transform"
      >
        <M3Card elevation={2} className="m3-shape-xl overflow-hidden p-0">
          {/* Hero preview */}
          {project.media?.[0] && (
            <div className="relative h-44 overflow-hidden bg-base-200">
              <img
                src={project.media[0]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Bottom gradient for legibility */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-3 left-4 right-4 m3-label-medium uppercase tracking-wider text-white/90">
                {PROJECT_GROUP_LABEL[projectCategoryGroup(project)]}
              </span>
            </div>
          )}

          {/* Body */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-base-100 ring-1 ring-base-300/60 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-9 h-9 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="m3-title-large text-base-content leading-tight truncate">
                  {project.name.split(" - ")[0]}
                </h3>
                <p className="m3-body-medium text-base-content/65 line-clamp-2 mt-0.5">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.skills?.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center h-6 px-2 rounded-md bg-base-200 text-base-content/75 text-[11px] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between mt-4">
              <span className="m3-label-medium text-base-content/55">
                {project.metrics?.[0] || "Open case study"}
              </span>
              <motion.span
                whileTap={{ scale: 0.96 }}
                transition={SPRING}
                className="m3-tap inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-primary text-primary-content m3-label-large m3-elev-1"
              >
                Open
                <FaArrowRight className="text-xs" />
              </motion.span>
            </div>
          </div>
        </M3Card>
      </Link>
    </motion.div>
  );
}

// ─── Reusable section primitives ─────────────────────────────────────────────

function ChipRail({ items }) {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-1">
        {items.map((it) => (
          <motion.div
            key={it.name}
            variants={itemFade}
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
            className="snap-start shrink-0 m3-tap"
          >
            <span className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-base-100 border border-base-300/60 text-base-content m3-label-large active:bg-base-200/70 transition-colors">
              <span className="text-primary text-base flex items-center">
                {it.icon}
              </span>
              {it.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BackendCard({ icon, title, summary, detail, chips }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={itemRise}>
      <M3Card
        elevation={1}
        onClick={() => setOpen((v) => !v)}
        className={`m3-shape-xl p-4 ${open ? "m3-elev-2" : ""}`}
      >
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary/12 text-primary flex items-center justify-center text-xl flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="m3-title-medium text-base-content leading-tight">
              {title}
            </h3>
            <p className="m3-body-medium text-base-content/65 mt-1">
              {summary}
            </p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={SPRING}
            className="text-base-content/55 flex-shrink-0"
          >
            <FaArrowDown className="text-xs" />
          </motion.span>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
            marginTop: open ? 12 : 0,
          }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <p className="m3-body-medium text-base-content/80">{detail}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {chips.map((c) => (
              <M3Chip key={c} label={c} variant="assist" />
            ))}
          </div>
        </motion.div>
      </M3Card>
    </motion.div>
  );
}

function TimelineRow({ icon, title, body, isLast }) {
  return (
    <motion.li variants={itemRise} className="relative pl-9 pb-5 last:pb-0">
      {/* Connector line */}
      {!isLast && (
        <span className="absolute left-[14px] top-7 bottom-0 w-px bg-base-300/70" />
      )}
      {/* Dot */}
      <span className="absolute left-0 top-1 w-7 h-7 rounded-full bg-primary/12 text-primary flex items-center justify-center text-sm ring-2 ring-base-100">
        {icon}
      </span>
      <div className="bg-base-100 border border-base-300/60 rounded-2xl p-3 m3-elev-1">
        <p className="m3-title-medium text-base-content leading-tight">
          {title}
        </p>
        <p className="m3-body-medium text-base-content/65 mt-0.5">{body}</p>
      </div>
    </motion.li>
  );
}

function CloudTile({ icon, label, note }) {
  return (
    <motion.div
      variants={itemScale}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className="m3-tap"
    >
      <div className="rounded-2xl border border-base-300/60 bg-base-100 p-3 flex flex-col items-center text-center h-full m3-elev-1">
        <span className="w-10 h-10 rounded-2xl bg-primary/12 text-primary flex items-center justify-center text-xl">
          {icon}
        </span>
        <p className="m3-label-large text-base-content mt-2 leading-tight">
          {label}
        </p>
        <p className="m3-label-medium text-base-content/55 mt-0.5 leading-tight">
          {note}
        </p>
      </div>
    </motion.div>
  );
}

function ProductionTile({ project }) {
  return (
    <motion.div variants={itemRise} whileTap={{ scale: 0.97 }} transition={SPRING}>
      <Link
        to={`/projects/${project.slug}`}
        className="block active:scale-[0.98] transition-transform"
      >
        <div className="rounded-2xl border border-base-300/60 bg-base-100 p-3 flex flex-col h-full m3-elev-1">
          <div className="aspect-square rounded-xl bg-base-200 mb-2.5 flex items-center justify-center overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-3/5 h-3/5 object-contain"
              loading="lazy"
            />
          </div>
          <p className="m3-label-large text-base-content leading-tight truncate">
            {project.name.split(" - ")[0]}
          </p>
          <p className="m3-label-medium text-base-content/55 truncate mt-0.5">
            {project.skills?.[0]}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function OpenSourceRow({ project }) {
  return (
    <motion.div variants={itemRise} className="m3-tap">
      <Link
        to={`/projects/${project.slug}`}
        className="block active:scale-[0.99] transition-transform"
      >
        <div className="rounded-2xl border border-base-300/60 bg-base-100 p-3 flex items-center gap-3 m3-elev-1">
          <div className="w-11 h-11 rounded-xl bg-base-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-7 h-7 object-contain"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="m3-body-large font-medium text-base-content leading-tight truncate">
              {project.name.split(" - ")[0]}
            </p>
            <p className="m3-body-medium text-base-content/60 truncate mt-0.5">
              {project.description}
            </p>
          </div>
          <FaArrowRight className="text-base-content/45 text-sm flex-shrink-0" />
        </div>
      </Link>
    </motion.div>
  );
}

function ResearchHighlight({ project }) {
  if (!project) return null;
  return (
    <motion.div variants={itemRise} whileTap={{ scale: 0.985 }} transition={SPRING}>
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden rounded-3xl border border-base-300/60 bg-base-100 m3-elev-2">
          {project.media?.[0] && (
            <div className="relative h-40 overflow-hidden bg-base-200">
              <img
                src={project.media[0]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100/95 via-base-100/40 to-transparent" />
            </div>
          )}
          <div className="p-4">
            <p className="m3-label-medium uppercase tracking-[0.14em] text-primary">
              Research project
            </p>
            <h3 className="m3-headline-medium text-base-content leading-tight mt-0.5">
              {project.name.split(" - ")[0]}
            </h3>
            <p className="m3-body-medium text-base-content/65 mt-2 line-clamp-3">
              {project.description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="m3-label-medium text-base-content/55">
                {project.metrics?.[1] || project.metrics?.[0] || "Read case study"}
              </span>
              <span className="m3-tap inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-primary text-primary-content m3-label-large m3-elev-1">
                Read study
                <FaExternalLinkAlt className="text-xs" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function HackathonCard({ project }) {
  return (
    <motion.div variants={itemRise} whileTap={{ scale: 0.985 }} transition={SPRING}>
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="rounded-2xl border border-base-300/60 bg-base-100 p-3.5 flex items-center gap-3 m3-elev-1">
          <div className="w-12 h-12 rounded-xl bg-primary/12 text-primary flex items-center justify-center text-xl flex-shrink-0">
            <FaTrophy />
          </div>
          <div className="min-w-0 flex-1">
            <p className="m3-body-large font-medium text-base-content leading-tight truncate">
              {project.name.split(" - ")[0]}
            </p>
            <p className="m3-body-medium text-base-content/60 line-clamp-2 mt-0.5">
              {project.metrics?.find((m) => m.toLowerCase().includes("top")) ||
                project.metrics?.[0] ||
                "Hackathon build"}
            </p>
          </div>
          <FaArrowRight className="text-base-content/45 text-sm flex-shrink-0" />
        </div>
      </Link>
    </motion.div>
  );
}

function ToolChip({ name, icon }) {
  return (
    <motion.div variants={itemFade} whileTap={{ scale: 0.95 }} transition={SPRING} className="m3-tap">
      <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-base-200/70 border border-base-300/50 text-base-content m3-label-large">
        <span className="text-primary text-base flex items-center">{icon}</span>
        {name}
      </span>
    </motion.div>
  );
}

function LearningRow({ name, progress, icon }) {
  return (
    <motion.li
      variants={itemRise}
      className="rounded-2xl border border-base-300/60 bg-base-100 p-3 m3-elev-1"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-xl bg-primary/12 text-primary flex items-center justify-center text-sm flex-shrink-0">
            {icon}
          </span>
          <p className="m3-body-large font-medium text-base-content leading-tight truncate">
            {name}
          </p>
        </div>
        <span className="m3-label-large text-primary tabular-nums">{progress}%</span>
      </div>
      <div className="h-1.5 mt-3 w-full rounded-full bg-base-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </motion.li>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function MobileSkillsProjects() {
  // Group projects once.
  const grouped = useMemo(() => {
    const out = { production: [], hackathon: [], research: [], opensource: [], other: [] };
    for (const p of projects) {
      const key = projectCategoryGroup(p);
      out[key].push(p);
    }
    return out;
  }, []);

  return (
    <div className="overflow-x-hidden pb-10">
      {/* ═══ Hero header ═══════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="px-4 pt-2 pb-5"
      >
        <motion.p
          variants={itemFade}
          className="m3-label-medium uppercase tracking-[0.18em] text-primary"
        >
          The Stack
        </motion.p>
        <motion.h1
          variants={itemRise}
          className="m3-display-large text-base-content leading-none tracking-tight text-[2.6rem] mt-1"
        >
          Skills &
          <br />
          <span className="text-primary">Projects</span>
        </motion.h1>
        <motion.p
          variants={itemRise}
          className="m3-body-large text-base-content/70 mt-3 max-w-sm"
        >
          The tools, ideas and shipped builds that make up my work as an
          Android &amp; backend engineer.
        </motion.p>

        {/* Quick stats — Instagram-style mini counters */}
        <motion.div
          variants={itemRise}
          className="grid grid-cols-3 gap-2 mt-5"
        >
          {[
            { value: "12+", label: "Builds" },
            { value: "4", label: "Apps shipped" },
            { value: "3", label: "Awards" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-base-300/60 bg-base-100 p-3 text-center m3-elev-1"
            >
              <p className="m3-title-large text-base-content leading-none">{s.value}</p>
              <p className="m3-label-medium uppercase tracking-wider text-base-content/55 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══ 1. Daily drivers — Android chip rail ════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-8"
      >
        <div className="px-4">
          <SectionHeader
            eyebrow="Android"
            title="Daily drivers"
            description="The languages, frameworks and libraries I reach for every day."
            icon={<FaAndroid />}
          />
        </div>
        <ChipRail items={DAILY_DRIVERS} />
      </motion.section>

      {/* ═══ 2. Backend stack — expandable cards ════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="px-4 mb-8"
      >
        <SectionHeader
          eyebrow="Backend"
          title="The stack behind it all"
          description="Server-side systems I've designed and shipped for production apps."
          icon={<FaServer />}
        />
        <div className="space-y-3">
          {BACKEND_STACK.map((c) => (
            <BackendCard key={c.title} {...c} />
          ))}
        </div>
      </motion.section>

      {/* ═══ 3. Architecture & system design — timeline ═══════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="px-4 mb-8"
      >
        <SectionHeader
          eyebrow="System design"
          title="How I think about systems"
          description="Patterns I lean on when designing APIs, modules and feature work."
          icon={<MdArchitecture />}
        />
        <ul className="relative">
          {ARCHITECTURE_NOTES.map((n, i) => (
            <TimelineRow
              key={n.title}
              {...n}
              isLast={i === ARCHITECTURE_NOTES.length - 1}
            />
          ))}
        </ul>
      </motion.section>

      {/* ═══ 4. Databases & cloud — 3-up tonal grid ══════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="px-4 mb-8"
      >
        <SectionHeader
          eyebrow="Data"
          title="Databases & cloud"
          description="Where the data lives, how it syncs, and what runs the workloads."
          icon={<FaCloud />}
        />
        <div className="grid grid-cols-3 gap-2.5">
          {DATA_CLOUD.map((c) => (
            <CloudTile key={c.label} {...c} />
          ))}
        </div>
      </motion.section>

      {/* ═══ 5. Featured Products — Play-Store carousel ═════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mb-8"
      >
        <div className="px-4">
          <SectionHeader
            eyebrow="Spotlight"
            title="Featured products"
            description="The builds I'm most proud of — swipe through."
            icon={<FaStar />}
          />
        </div>
        <FeaturedCarousel />
      </motion.section>

      {/* ═══ 6. Production Apps — compact 2-col tile grid ═══════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-4 mb-8"
      >
        <SectionHeader
          eyebrow={PROJECT_GROUP_LABEL.production}
          description={PROJECT_GROUP_DESCRIPTION.production}
          icon={<FaRocket />}
        />
        <div className="grid grid-cols-2 gap-2.5">
          {grouped.production.map((p) => (
            <ProductionTile key={p.slug} project={p} />
          ))}
        </div>
      </motion.section>

      {/* ═══ 7. Open Source — list rows ═════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-4 mb-8"
      >
        <SectionHeader
          eyebrow={PROJECT_GROUP_LABEL.opensource}
          description={PROJECT_GROUP_DESCRIPTION.opensource}
          icon={<FaCodeBranch />}
        />
        <div className="space-y-2.5">
          {grouped.opensource.map((p) => (
            <OpenSourceRow key={p.slug} project={p} />
          ))}
        </div>
      </motion.section>

      {/* ═══ 8. Research Projects — single highlight ═══════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 mb-8"
      >
        <SectionHeader
          eyebrow="Research"
          title="In-the-field studies"
          description="Projects validated with real users and surveys."
          icon={<FaFlask />}
        />
        <ResearchHighlight project={grouped.research[0]} />
      </motion.section>

      {/* ═══ 9. Hackathon Projects — compact stack ═════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-4 mb-8"
      >
        <SectionHeader
          eyebrow="Hackathons"
          title="Built under pressure"
          description="Weekend builds validated by juries and communities."
          icon={<FaTrophy />}
        />
        <div className="space-y-2.5">
          {grouped.hackathon.map((p) => (
            <HackathonCard key={p.slug} project={p} />
          ))}
        </div>
      </motion.section>

      {/* ═══ 10. Developer Tools — chip grid ══════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-4 mb-8"
      >
        <SectionHeader
          eyebrow="Tools"
          title="Developer tools"
          description="What's on my dock every day."
          icon={<FaToolbox />}
        />
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <ToolChip key={t.name} {...t} />
          ))}
        </div>
      </motion.section>

      {/* ═══ 11. Currently Learning — progress list ═══════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-4"
      >
        <SectionHeader
          eyebrow="Now"
          title="Currently exploring"
          description="Topics I'm actively learning right now."
          icon={<FaLightbulb />}
        />
        <ul className="space-y-2.5">
          {LEARNING.map((l) => (
            <LearningRow key={l.name} {...l} />
          ))}
        </ul>
      </motion.section>
    </div>
  );
}