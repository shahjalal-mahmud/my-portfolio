// MobileHome — entry point on mobile.
//
// Designed as a personalized dashboard (GitHub Mobile / LinkedIn Mobile feel)
// rather than a responsive website. Nine sections, each with its own card
// shape, elevation, and entrance delay. Reuses M3 primitives — no new
// components, no logic duplication.

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaAndroid, FaServer, FaLayerGroup, FaRocket, FaEnvelope, FaPhone,
  FaGithub, FaLinkedin, FaDownload, FaArrowRight, FaCodeBranch, FaUsers,
  FaTrophy, FaStar, FaGraduationCap, FaCheckCircle,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import projects from "../../shared/data/projects";
import M3Card from "../components/M3Card";
import M3Button from "../components/M3Button";
import M3Chip from "../components/M3Chip";
import M3ListItem from "../components/M3ListItem";
import { M3Timeline, M3TimelineItem } from "../components/M3Timeline";

// ─── Motion ──────────────────────────────────────────────────────────────────
// Subtle, native-feeling stagger — same easing as the rest of mobile.

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: <FaRocket />,        value: "12+", label: "Projects"      },
  { icon: <FaCodeBranch />,    value: "5+",  label: "Open Source"   },
  { icon: <FaUsers />,         value: "5",   label: "Beta Shops"    },
  { icon: <FaGraduationCap />, value: "3rd", label: "Year · CSE"    },
];

const SOCIALS = [
  {
    leading: <FaGithub className="text-base" />,
    title: "GitHub",
    subtitle: "@shahajalal-mahmud",
    href: "https://github.com/shahajalal-mahmud",
  },
  {
    leading: <FaLinkedin className="text-base" />,
    title: "LinkedIn",
    subtitle: "md-shahajalal-mahmud",
    href: "https://www.linkedin.com/in/md-shahajalal-mahmud/",
  },
  {
    leading: <SiLeetcode className="text-base" />,
    title: "LeetCode",
    subtitle: "Shahajalal_Mahmud",
    href: "https://leetcode.com/Shahajalal_Mahmud/",
  },
  {
    leading: <FaEnvelope className="text-base" />,
    title: "Email",
    subtitle: "mahmud.nubtk@gmail.com",
    href: "mailto:mahmud.nubtk@gmail.com",
  },
  {
    leading: <FaPhone className="text-base" />,
    title: "Phone",
    subtitle: "+880 1889-793146",
    href: "tel:+8801889793146",
  },
];

const TECH_FOCUS = [
  { icon: <FaAndroid />,  label: "Android · Kotlin"    },
  { icon: <FaServer />,   label: "Spring Boot"         },
  { icon: <FaLayerGroup />, label: "Multi-tenant SaaS" },
  { icon: <FaCodeBranch />, label: "Offline-first"     },
  { icon: <FaRocket />,   label: "System Design"       },
];

const QUICK_ACTIONS = [
  {
    icon: <FaDownload />,
    label: "CV",
    sub: "Download",
    href: "https://drive.google.com/file/d/1m7_lfMzOZHbpO7EsQEGvl3I9crFPEuTQ/view?usp=sharing",
  },
  {
    icon: <FaEnvelope />,
    label: "Contact",
    sub: "Reach out",
    to: "/contact",
  },
  {
    icon: <FaRocket />,
    label: "Appriyo",
    sub: "Visit site",
    href: "https://appriyo.com",
  },
];

// "Currently building" — a present-tense dashboard callout, not a hero paragraph.
const CURRENTLY_BUILDING = {
  chip: "NOW",
  title: "Appriyo SaaS dashboard",
  body:
    "Multi-tenant admin panel for repair-shop ERP — billing, branch analytics, and role-based access.",
};

// Featured project — the top-of-mind flagship, not a list item.
const FEATURED = projects[0]; // Repair Store Manager — POS & ERP

// Pull the two strongest metrics from the featured project for the timeline.
const FEATURED_METRICS = (FEATURED.metrics || []).slice(0, 2);

// ─── Local helpers (page-scoped; not exported) ───────────────────────────────

function StatTile({ icon, value, label }) {
  return (
    <div className="flex flex-col items-start gap-1.5 px-2 py-3">
      <span className="text-primary text-base flex items-center">{icon}</span>
      <p className="m3-title-large text-base-content leading-none">{value}</p>
      <p className="m3-label-medium uppercase tracking-wider text-base-content/55">
        {label}
      </p>
    </div>
  );
}

function SectionHeader({ label, trailing }) {
  return (
    <div className="flex items-center justify-between px-1 pb-2">
      <p className="m3-label-large uppercase tracking-[0.12em] text-base-content/55">
        {label}
      </p>
      {trailing}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MobileHome() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 pt-3 pb-6 space-y-5"
    >
      {/* 1. Greeting + compact profile ───────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <M3Card elevation={1} className="overflow-hidden m3-shape-xl">
          <div className="flex items-center gap-3">
            <img
              src="/img/about_photo.jpg"
              alt="Shahajalal Mahmud"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/40 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="m3-label-medium uppercase tracking-wider text-base-content/55">
                Welcome back
              </p>
              <h1 className="m3-headline-medium text-base-content leading-tight truncate">
                Hi, Shahajalal
              </h1>
              <p className="m3-body-medium text-base-content/70 truncate">
                Android & Backend Engineer
              </p>
            </div>
          </div>

          {/* 2. Availability status — inline pill, not its own card */}
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full bg-success/10 border border-success/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-65" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="m3-label-large text-success">
                Open to opportunities
              </span>
            </span>
            <M3Chip label="Founder @ Appriyo" variant="assist" />
          </div>
        </M3Card>
      </motion.section>

      {/* 3. Quick statistics ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <M3Card elevation={1} className="m3-shape-lg">
          <SectionHeader label="At a glance" />
          <div className="grid grid-cols-4 -mx-2">
            {STATS.map((s) => (
              <StatTile key={s.label} {...s} />
            ))}
          </div>
        </M3Card>
      </motion.section>

      {/* 4. Currently building ───────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <M3Card elevation={0} className="m3-shape-lg border border-base-300/60">
          <div className="flex items-center justify-between mb-1.5">
            <M3Chip
              label={CURRENTLY_BUILDING.chip}
              icon={<span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary" /></span>}
              variant="assist"
            />
            <span className="m3-label-medium uppercase tracking-wider text-base-content/40">
              Live
            </span>
          </div>
          <h2 className="m3-title-large text-base-content leading-tight">
            {CURRENTLY_BUILDING.title}
          </h2>
          <p className="m3-body-medium text-base-content/70 mt-1">
            {CURRENTLY_BUILDING.body}
          </p>
        </M3Card>
      </motion.section>

      {/* 5. Featured project (Play-Store-style) ──────────────────────────── */}
      <motion.section variants={itemVariants}>
        <SectionHeader label="Featured" />

        <Link to={`/projects/${FEATURED.slug}`} className="block">
          <M3Card elevation={2} className="m3-shape-xl overflow-hidden">
            {/* Top row: app icon + meta */}
            <div className="flex items-start gap-3">
              <img
                src={FEATURED.image}
                alt={FEATURED.name}
                className="w-16 h-16 rounded-2xl object-contain bg-base-200 ring-1 ring-base-300/60 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="m3-label-medium uppercase tracking-wider text-primary">
                    Appriyo · Tools
                  </span>
                </div>
                <h2 className="m3-title-large text-base-content leading-tight truncate">
                  {FEATURED.name.split(" - ")[0]}
                </h2>
                <p className="m3-body-medium text-base-content/65 line-clamp-2 mt-0.5">
                  {FEATURED.description}
                </p>
              </div>
            </div>

            {/* Rating + meta strip */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <M3Chip
                icon={<FaStar />}
                label="4.9 · 5+ testers"
                variant="assist"
              />
              <M3Chip label="Production" variant="assist" />
              <M3Chip label="Open source" variant="assist" />
            </div>

            {/* Screenshot strip */}
            {FEATURED.media?.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
                {FEATURED.media.slice(0, 4).map((src, i) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt=""
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.28, delay: i * 0.04 }}
                    className="h-20 w-auto rounded-lg object-cover ring-1 ring-base-300/60 flex-shrink-0"
                  />
                ))}
              </div>
            )}

            {/* Install / Open action */}
            <div className="flex items-center justify-between mt-4">
              <span className="m3-label-medium text-base-content/55">
                Tap to view project
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
      </motion.section>

      {/* 6. Recent achievement (timeline) ────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <SectionHeader label="Recent achievements" />

        <M3Timeline>
          {FEATURED_METRICS.map((metric, i) => (
            <M3TimelineItem
              key={metric}
              icon={<FaTrophy />}
              color={i === 0 ? "success" : "primary"}
              title={metric}
              subtitle={`From · ${FEATURED.name.split(" - ")[0]}`}
              trailing={<FaCheckCircle className="text-success" />}
            />
          ))}
        </M3Timeline>
      </motion.section>

      {/* 7. Technology focus ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <M3Card elevation={1} className="m3-shape-lg">
          <SectionHeader label="Tech focus" />
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
            {TECH_FOCUS.map((t) => (
              <M3Chip
                key={t.label}
                label={t.label}
                icon={t.icon}
                variant="assist"
              />
            ))}
          </div>
        </M3Card>
      </motion.section>

      {/* 8. Quick actions ────────────────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <SectionHeader label="Quick actions" />
        <div className="grid grid-cols-3 gap-2">
          {QUICK_ACTIONS.map((a) => {
            const inner = (
              <M3Card
                elevation={0}
                className="m3-shape-lg border border-base-300/60 flex flex-col items-center justify-center text-center py-3 px-1 min-h-[88px]"
              >
                <span className="text-primary text-xl flex items-center mb-1.5">
                  {a.icon}
                </span>
                <p className="m3-label-large text-base-content leading-tight">
                  {a.label}
                </p>
                <p className="m3-label-medium text-base-content/50 mt-0.5">
                  {a.sub}
                </p>
              </M3Card>
            );
            return a.to ? (
              <Link key={a.label} to={a.to}>{inner}</Link>
            ) : (
              <a
                key={a.label}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="m3-tap block active:scale-[0.98] transition-transform"
              >
                {inner}
              </a>
            );
          })}
        </div>
      </motion.section>

      {/* 9. Social links (Android list) ──────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <SectionHeader label="Connect" />
        <M3Card elevation={1} className="m3-shape-lg overflow-hidden p-0">
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
        </M3Card>
      </motion.section>

      {/* Continue exploring footer ───────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <SectionHeader label="Continue exploring" />
        <div className="flex gap-2">
          <Link to="/skills-projects" className="flex-1">
            <M3Card
              elevation={0}
              className="m3-shape-lg border border-base-300/60 flex items-center justify-center gap-2 py-3"
            >
              <FaAndroid className="text-primary" />
              <span className="m3-label-large text-base-content">Skills</span>
              <FaArrowRight className="text-base-content/40 text-sm" />
            </M3Card>
          </Link>
          <Link to="/education-experience" className="flex-1">
            <M3Card
              elevation={0}
              className="m3-shape-lg border border-base-300/60 flex items-center justify-center gap-2 py-3"
            >
              <FaGraduationCap className="text-primary" />
              <span className="m3-label-large text-base-content">Journey</span>
              <FaArrowRight className="text-base-content/40 text-sm" />
            </M3Card>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}