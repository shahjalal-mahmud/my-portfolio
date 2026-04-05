import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAndroid, FaReact, FaServer, FaDatabase, FaLock,
  FaCode, FaTerminal, FaShieldAlt,
} from "react-icons/fa";
import { MdArchitecture } from "react-icons/md";
import { SiTailwindcss, SiGit, SiFirebase, SiPostgresql, SiKotlin, SiNodedotjs, SiPrisma } from "react-icons/si";
import { TbTopologyStar3 } from "react-icons/tb";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKILLS_DATA = [
  { name: "Kotlin + Jetpack Compose", icon: <SiKotlin />, category: "Android", tag: "Expert", tagColor: "text-success bg-success/10 border-success/25", desc: "Modern Android UI with declarative patterns, state management, and scalable architecture." },
  { name: "MVVM + Coroutines", icon: <MdArchitecture />, category: "Android", tag: "Expert", tagColor: "text-success bg-success/10 border-success/25", desc: "Structured reactive architecture with lifecycle-aware components and async flows." },
  { name: "Room + WorkManager", icon: <FaDatabase />, category: "Android", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Offline-first storage and background task scheduling in production apps." },

  { name: "React.js", icon: <FaReact />, category: "Web", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Dynamic, responsive web interfaces with modern hooks and component patterns." },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Web", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Utility-first styling for fast, consistent, and scalable UI development." },

  { name: "Node.js + REST APIs", icon: <SiNodedotjs />, category: "Backend", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Scalable API design with proper architecture, middleware, and clean code principles." },
  { name: "JWT Authentication", icon: <FaLock />, category: "Backend", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Secure auth systems with access/refresh tokens and session management." },
  { name: "Prisma ORM", icon: <SiPrisma />, category: "Backend", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Type-safe database access and schema management with auto migrations." },

  { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Relational database design, complex queries, indexing, and optimization." },
  { name: "Firebase", icon: <SiFirebase />, category: "Database", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Realtime database, Firestore, cloud functions, and authentication integrations." },

  { name: "Data Structures & Algorithms", icon: <FaCode />, category: "Core CS", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Efficient problem-solving with optimized algorithms in C++ and Java." },
  { name: "Operating Systems", icon: <FaTerminal />, category: "Core CS", tag: "Intermediate", tagColor: "text-warning bg-warning/10 border-warning/25", desc: "Process management, memory, scheduling, and system-level fundamentals." },
  { name: "DBMS", icon: <FaDatabase />, category: "Core CS", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Database design, normalization, ACID properties, and transaction management." },
  { name: "Computer Networks", icon: <FaServer />, category: "Core CS", tag: "Intermediate", tagColor: "text-warning bg-warning/10 border-warning/25", desc: "Networking fundamentals, TCP/IP stack, and communication protocols." },

  { name: "RBAC & API Security", icon: <FaShieldAlt />, category: "Security", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Role-based access control, API hardening, and secure design patterns." },

  { name: "Git & Version Control", icon: <SiGit />, category: "Tools", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Collaborative workflows, branching strategies, and codebase management." },
  { name: "Linux & CLI", icon: <FaTerminal />, category: "Tools", tag: "Advanced", tagColor: "text-info bg-info/10 border-info/25", desc: "Command-line tools, bash scripting, and efficient dev environment workflows." },
];

const CATEGORIES = ["All", "Android", "Web", "Backend", "Database", "Core CS", "Security", "Tools"];

const CATEGORY_META = {
  Android:  { icon: <FaAndroid />,    color: "text-success", bg: "bg-success/10 border-success/20" },
  Web:      { icon: <FaReact />,      color: "text-info",    bg: "bg-info/10 border-info/20" },
  Backend:  { icon: <FaServer />,     color: "text-warning", bg: "bg-warning/10 border-warning/20" },
  Database: { icon: <FaDatabase />,   color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  "Core CS":{ icon: <FaCode />,       color: "text-secondary",bg: "bg-secondary/10 border-secondary/20" },
  Security: { icon: <FaShieldAlt />,  color: "text-error",   bg: "bg-error/10 border-error/20" },
  Tools:    { icon: <SiGit />,        color: "text-accent",  bg: "bg-accent/10 border-accent/20" },
};

const SIDEBAR_STATS = [
  { label: "Architecture", value: "MVVM / Clean", icon: <MdArchitecture /> },
  { label: "Backend",      value: "Node.js / REST", icon: <SiNodedotjs /> },
  { label: "Database",     value: "PostgreSQL / Firebase", icon: <FaDatabase /> },
  { label: "Security",     value: "RBAC / JWT", icon: <FaLock /> },
];

const ease = [0.22, 1, 0.36, 1];

// ─── SKILL CARD ───────────────────────────────────────────────────────────────
const SkillCard = ({ skill, idx }) => {
  const meta = CATEGORY_META[skill.category] ?? { color: "text-primary", bg: "bg-primary/10 border-primary/20" };
  return (
    <motion.div
      layout
      key={skill.name}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: -8 }}
      transition={{ duration: 0.35, ease, delay: idx * 0.03 }}
      whileHover={{ y: -4 }}
      className="group relative bg-base-200/50 border border-base-300/60 rounded-3xl p-5 sm:p-6
        hover:bg-base-200 hover:border-primary/30
        hover:shadow-xl hover:shadow-primary/5
        transition-all duration-300 overflow-hidden"
    >
      {/* Subtle card glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/[0.04] blur-2xl pointer-events-none group-hover:bg-primary/[0.08] transition-all duration-500" />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 flex items-center justify-center rounded-2xl border text-lg flex-shrink-0 ${meta.bg} ${meta.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-400`}>
          {skill.icon}
        </div>
        <span className={`text-[9px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border ${skill.tagColor}`}>
          {skill.tag}
        </span>
      </div>

      {/* Category pill */}
      <div className="mb-2">
        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-base-content/30">
          {skill.category}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-[14px] sm:text-[15px] font-extrabold text-base-content leading-snug mb-2 group-hover:text-primary transition-colors duration-300">
        {skill.name}
      </h3>

      {/* Desc */}
      <p className="text-[11px] sm:text-[12px] text-base-content/50 leading-[1.7] group-hover:text-base-content/65 transition-colors duration-300">
        {skill.desc}
      </p>

      {/* Decorative number */}
      <div className="absolute bottom-3 right-5 text-5xl font-black opacity-[0.025] group-hover:opacity-[0.055] transition-opacity pointer-events-none select-none">
        {String(idx + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } },
  };

  return (
    <section
      id="skills"
      className="
        relative w-full overflow-hidden
        bg-base-100 text-base-content
        py-20 lg:py-28
        px-5 sm:px-10 lg:px-16 xl:px-20
      "
    >
      {/* ══ BACKGROUND ════════════════════════════════════════════════════ */}
      <div className="pointer-events-none select-none absolute inset-0">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[130px]" />
        <div className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full bg-secondary/[0.05] blur-[110px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/[0.04] blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.028]">
          <defs>
            <pattern id="skills-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skills-grid)" />
        </svg>
        <svg className="absolute inset-0 w-full h-full opacity-[0.018]">
          <defs>
            <pattern id="skills-diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skills-diag)" />
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
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-base-300" />
          <span className="text-[10px] text-base-content/30 uppercase tracking-[0.24em] font-semibold">Technical Skills</span>
          <div className="h-px w-8 bg-base-300" />
        </motion.div>

        {/* Heading row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.13em] uppercase bg-primary/10 border border-primary/25 text-primary mb-4">
                <TbTopologyStar3 className="text-[10px]" />
                Tech Stack
              </span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="font-extrabold tracking-tight leading-[1.07] text-3xl sm:text-4xl xl:text-[2.8rem]"
            >
              My{" "}
              <span className="relative inline-block">
                <span className="text-primary">Expertise</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary/40 origin-left"
                />
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[10px] uppercase tracking-[0.22em] text-base-content/30 font-medium mt-2">
              Android · Backend · Architecture · Security
            </motion.p>
          </motion.div>

          {/* Category filter — scrollable on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease, delay: 0.15 }}
            className="w-full lg:w-auto overflow-x-auto pb-1 no-scrollbar"
          >
            <div className="flex gap-1.5 bg-base-200/70 border border-base-300/60 p-1.5 rounded-2xl min-w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 py-2 rounded-xl text-[11px] font-bold tracking-[0.08em] uppercase
                    transition-all duration-250 whitespace-nowrap
                    ${activeCategory === cat
                      ? "bg-primary text-primary-content shadow-lg shadow-primary/25"
                      : "text-base-content/45 hover:text-base-content/80 hover:bg-base-300/50"}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main grid + sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">

          {/* ── Skills grid ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} idx={idx} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Count pill */}
            <motion.div
              layout
              className="mt-6 flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="h-px w-6 bg-base-300" />
              <span className="text-[9px] text-base-content/25 uppercase tracking-[0.2em] font-semibold">
                Showing {filtered.length} of {SKILLS_DATA.length} skills
              </span>
              <div className="h-px w-6 bg-base-300" />
            </motion.div>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="w-full lg:w-72 xl:w-80 flex flex-col gap-5 lg:sticky lg:top-24"
          >
            {/* Problem-solving card */}
            <div className="relative bg-primary rounded-3xl p-6 sm:p-7 text-primary-content overflow-hidden shadow-xl shadow-primary/25">
              {/* Inner decorative */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary-content/[0.07] blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-3xl" />

              <div className="relative z-10">
                <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-primary-content/15 mb-5">
                  <FaCode className="text-lg" />
                </div>
                <h3 className="text-lg font-extrabold mb-1.5">Problem Solving</h3>
                <p className="text-[12px] opacity-80 leading-[1.7] mb-5">
                  Strong DSA foundation with focus on writing efficient, optimized solutions under constraints.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["C++", "Java", "DSA", "Algorithms", "Logic"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-primary-content/15 rounded-lg text-[9px] font-bold uppercase tracking-[0.12em]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Workflow card */}
            <div className="bg-base-200/60 border border-base-300/60 rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-5 bg-base-300" />
                <span className="text-[9px] text-base-content/30 uppercase tracking-[0.22em] font-semibold">Core Workflow</span>
              </div>
              <div className="space-y-4">
                {SIDEBAR_STATS.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.15em] text-base-content/30 font-bold">{stat.label}</p>
                      <p className="text-[13px] font-extrabold text-base-content/80 mt-0.5">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category breakdown */}
            <div className="bg-base-200/60 border border-base-300/60 rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-5 bg-base-300" />
                <span className="text-[9px] text-base-content/30 uppercase tracking-[0.22em] font-semibold">By Category</span>
              </div>
              <div className="space-y-2.5">
                {Object.entries(CATEGORY_META).map(([cat, meta]) => {
                  const count = SKILLS_DATA.filter((s) => s.category === cat).length;
                  const pct = Math.round((count / SKILLS_DATA.length) * 100);
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="w-full group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`flex items-center gap-1.5 text-[10px] font-bold ${meta.color}`}>
                          <span className="text-[11px]">{meta.icon}</span>
                          {cat}
                        </span>
                        <span className="text-[9px] text-base-content/30 font-semibold">{count} skills</span>
                      </div>
                      <div className="h-1.5 w-full bg-base-300/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease, delay: 0.1 }}
                          className={`h-full rounded-full ${meta.color.replace("text-", "bg-")}`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Skills;