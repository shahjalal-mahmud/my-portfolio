// src/pages/ProjectDetails.jsx
import { useParams, Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import projects from "../components/ProjectsData";

const ease = [0.22, 1, 0.36, 1];

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="h-px w-4 bg-primary/50" />
    <span className="text-[9px] font-black text-primary/60 uppercase tracking-[0.26em]">{text}</span>
  </div>
);

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
const Lightbox = ({ images, startIndex, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  const go = (dir) => setIdx((p) => (p + dir + images.length) % images.length);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all duration-200"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); go(1); }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all duration-200"
      >
        <FaChevronRight />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt=""
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.28, ease }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
        />
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className={`h-1 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/30"}`}
          />
        ))}
      </div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all duration-200 text-lg"
      >
        ✕
      </button>
    </motion.div>
  );
};

// ─── GALLERY STRIP ────────────────────────────────────────────────────────────
const GalleryStrip = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((dir) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((p) => (p + dir + images.length) % images.length);
    setTimeout(() => setAnimating(false), 320);
  }, [animating, images.length]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 3200);
    return () => clearInterval(t);
  }, [go, paused]);

  return (
    <>
      <div
        className="relative overflow-hidden rounded-2xl bg-base-300/20 border border-base-300/50"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Main viewer */}
        <div
          className="relative h-56 sm:h-72 md:h-[400px] overflow-hidden cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt=""
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.32, ease }}
              className="absolute inset-0 w-full h-full object-contain p-6"
            />
          </AnimatePresence>

          {/* Expand hint */}
          <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold tracking-wide border border-white/10">
              <MdArrowOutward className="text-xs" /> Expand
            </div>
          </div>

          {/* Counter */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-sm text-white text-[9px] font-black tracking-wider border border-white/10">
            {current + 1} / {images.length}
          </div>

          {/* Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/55 transition-all duration-200 backdrop-blur-sm"
          >
            <FaChevronLeft className="text-[9px]" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/55 transition-all duration-200 backdrop-blur-sm"
          >
            <FaChevronRight className="text-[9px]" />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 p-3 overflow-x-auto border-t border-base-300/30 bg-base-200/20">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                if (!animating) { setAnimating(true); setCurrent(i); setTimeout(() => setAnimating(false), 320); }
              }}
              className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === current
                  ? "border-primary ring-2 ring-primary/20 scale-[1.06]"
                  : "border-transparent opacity-40 hover:opacity-70"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox images={images} startIndex={current} onClose={() => setLightboxOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── PILL ─────────────────────────────────────────────────────────────────────
const Pill = ({ label, variant = "default" }) => {
  const styles = {
    default: "bg-base-300/50 border-base-300/50 text-base-content/55",
    primary: "bg-primary/10 border-primary/25 text-primary",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${styles[variant]}`}>
      {label}
    </span>
  );
};

// ─── FEATURE ROW ─────────────────────────────────────────────────────────────
const FeatureRow = ({ text, i }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.055, duration: 0.36 }}
    className="flex items-start gap-3.5 px-4 py-3.5 border-b border-base-300/25 last:border-none hover:bg-base-200/30 transition-colors duration-200 group"
  >
    <div className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-200">
      <span className="text-primary text-[7px] font-black">{String(i + 1).padStart(2, "0")}</span>
    </div>
    <p className="text-[13px] text-base-content/68 leading-relaxed">{text}</p>
  </motion.div>
);

// ─── TECH CATEGORY BLOCK ──────────────────────────────────────────────────────
const categoryColors = {
  frontend: "text-info", backend: "text-success", ai_ml: "text-warning",
  ai: "text-warning", camera: "text-error", hardware: "text-secondary",
  image_processing: "text-accent", logic: "text-primary",
  utilities: "text-base-content/40", networking: "text-info",
};

const TechCategoryBlock = ({ category, techs, i }) => {
  const color = categoryColors[category] || "text-primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.065 }}
      className="flex flex-col gap-2"
    >
      <p className={`text-[8px] uppercase tracking-[0.22em] font-black ${color}`}>
        {category.replace(/_/g, " ")}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {techs.map((t, j) => (
          <span
            key={j}
            className="px-2.5 py-1 rounded-lg bg-base-300/40 border border-base-300/35 text-[10.5px] font-semibold text-base-content/65 hover:border-primary/25 hover:text-base-content/90 transition-all duration-150 cursor-default"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ─── INSIGHT CARD ─────────────────────────────────────────────────────────────
const accentMap = {
  error: { dot: "bg-error", border: "border-error/18", bg: "bg-error/[0.04]", label: "text-error/70" },
  warning: { dot: "bg-warning", border: "border-warning/18", bg: "bg-warning/[0.04]", label: "text-warning/70" },
  success: { dot: "bg-success", border: "border-success/18", bg: "bg-success/[0.04]", label: "text-success/70" },
};

const InsightCard = ({ title, items, icon, accent }) => {
  const s = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.46, ease }}
      className={`rounded-2xl p-5 border ${s.border} ${s.bg} flex flex-col gap-3`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm">{icon}</span>
        <p className={`text-[8.5px] uppercase tracking-[0.2em] font-black ${s.label}`}>{title}</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className={`w-1 h-1 rounded-full ${s.dot} mt-[7px] flex-shrink-0`} />
            <p className="text-[12px] text-base-content/62 leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// ─── METRIC CARD ──────────────────────────────────────────────────────────────
const MetricCard = ({ metric, i }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.93 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 20 }}
    className="relative overflow-hidden rounded-xl p-4 bg-base-200/40 border border-base-300/45 hover:border-primary/22 hover:bg-base-200/70 transition-all duration-200 group"
  >
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
    </div>
    <p className="text-[12px] font-bold text-base-content/75 leading-snug">{metric}</p>
  </motion.div>
);

// ─── PROJECT DETAILS ─────────────────────────────────────────────────────────
const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[projectIndex - 1];
  const nextProject = projects[projectIndex + 1];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 gap-4">
        <p className="text-2xl font-extrabold text-error">Project not found.</p>
        <Link to="/skills-projects" className="btn btn-primary btn-sm gap-2">← Projects</Link>
      </div>
    );
  }

  const techEntries = project.techStack ? Object.entries(project.techStack) : null;
  const allTechs = project.techStack ? Object.values(project.techStack).flat() : project.skills;

  return (
    <div className="relative min-h-screen bg-base-100 text-base-content">

      {/* ── FIXED AMBIENT BACKGROUND ──────────────────────────────────── */}
      <div className="pointer-events-none select-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-64 -left-48 w-[650px] h-[650px] rounded-full bg-primary/[0.055] blur-[150px]" />
        <div className="absolute top-1/2 -right-48 w-[550px] h-[550px] rounded-full bg-secondary/[0.04] blur-[130px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="bg-dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-dot-grid)" />
        </svg>
      </div>

      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative overflow-hidden">
        <motion.div style={{ y: heroY }} className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 pt-20 pb-12 lg:pb-16">

            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="flex items-center gap-2 mb-12"
            >
              <Link
                to="/skills-projects"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-base-content/30 hover:text-primary transition-colors duration-200 group"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
                All Projects
              </Link>
              <span className="text-base-content/15 text-[11px]">/</span>
              <span className="text-[11px] font-semibold text-base-content/50 truncate max-w-xs">{project.name}</span>
            </motion.div>

            {/* Hero grid */}
            <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 items-center lg:items-start">

              {/* Text side */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.07 }}
                className="flex-1 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start"
              >
                {/* Project label */}
                <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                  <span className="text-[9px] font-black text-primary/45 uppercase tracking-[0.32em]">
                    Project {String(projectIndex + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px w-5 bg-base-300" />
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black text-success uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    Live
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-black tracking-[-0.025em] leading-[1.05] text-3xl sm:text-4xl lg:text-5xl xl:text-[3.3rem]">
                  {project.name}
                </h1>

                {/* Description */}
                <p className="text-[14px] sm:text-[15px] text-base-content/55 leading-[1.8] max-w-lg">
                  {project.description}
                </p>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                  {project.skills.map((s, i) => <Pill key={i} label={s} variant="primary" />)}
                  {project.extras?.map((e, i) => <Pill key={`e-${i}`} label={e} variant="default" />)}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {project.github && (
                    <a
                      href={project.github} target="_blank" rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-base-content text-base-100 text-[12px] font-bold hover:bg-primary hover:text-primary-content hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-base-content/10"
                    >
                      <FaGithub /> View Source
                      <MdArrowOutward className="text-[10px] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live} target="_blank" rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-base-300/60 bg-base-200/40 text-[12px] font-bold text-base-content/65 hover:border-primary/40 hover:bg-primary/8 hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <FaExternalLinkAlt className="text-[10px]" /> Live Demo
                      <MdArrowOutward className="text-[10px] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Logo/Image side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.72, ease, delay: 0.14 }}
                className="flex-shrink-0 flex justify-center"
              >
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute inset-[-28px] rounded-[40px] bg-primary/[0.09] blur-3xl" />
                  {/* Slow spin ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-[32px]"
                    style={{
                      inset: "-14px",
                      background: "conic-gradient(from 0deg, transparent 70%, oklch(var(--p)/0.4) 100%)",
                      borderRadius: "36px",
                    }}
                  />
                  {/* Card */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-[220px] lg:h-[220px] rounded-3xl bg-base-200/70 border border-base-300/60 flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden">
                    {/* Corner brackets */}
                    {[["top-3 left-3", "M0 8 L0 0 L8 0"], ["top-3 right-3", "M20 8 L20 0 L12 0"], ["bottom-3 left-3", "M0 12 L0 20 L8 20"], ["bottom-3 right-3", "M20 12 L20 20 L12 20"]].map(([pos, d], i) => (
                      <svg key={i} className={`absolute ${pos} w-5 h-5 opacity-20`} viewBox="0 0 20 20" fill="none">
                        <path d={d} stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    ))}
                    <img src={project.image} alt={project.name} className="w-3/4 h-3/4 object-contain" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* Fade out bottom */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-base-100 to-transparent pointer-events-none" />
      </div>

      {/* ── BODY ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 pb-24">

        {/* GALLERY */}
        {project.media?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-5">
              <SectionLabel text="Gallery" />
              <span className="text-[8px] text-base-content/20 font-bold ml-1">— {project.media.length} screenshots · click to expand</span>
            </div>
            <GalleryStrip images={project.media} />
          </motion.div>
        )}

        {/* TWO-COLUMN BODY */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* ─ LEFT: Main content ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-12">

            {/* STORY */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <SectionLabel text="Origin Story" />
              <div className="mt-5 relative pl-5">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
                <p className="text-[14px] sm:text-[15px] leading-[1.92] text-base-content/62 italic">
                  "{project.story}"
                </p>
              </div>
            </motion.section>

            {/* FEATURES */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <SectionLabel text="Key Features" />
              <div className="mt-5 rounded-2xl border border-base-300/35 bg-base-200/20 overflow-hidden">
                {project.features.map((f, i) => <FeatureRow key={i} text={f} i={i} />)}
              </div>
            </motion.section>

            {/* PROBLEM / SOLUTION */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <SectionLabel text="Challenge & Solution" />
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 bg-error/[0.04] border border-error/15">
                  <p className="text-[8.5px] font-black text-error/65 uppercase tracking-[0.22em] mb-3">The Problem</p>
                  <p className="text-[13px] text-base-content/65 leading-relaxed">{project.problem}</p>
                </div>
                <div className="rounded-2xl p-5 bg-success/[0.04] border border-success/15">
                  <p className="text-[8.5px] font-black text-success/65 uppercase tracking-[0.22em] mb-3">Our Solution</p>
                  <p className="text-[13px] text-base-content/65 leading-relaxed">{project.objective}</p>
                </div>
              </div>
            </motion.section>

            {/* DEV INSIGHTS */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <SectionLabel text="Development Insights" />
              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                <InsightCard title="Challenges" accent="error" icon="⚠" items={project.challenges} />
                <InsightCard title="Limitations" accent="warning" icon="⛔" items={project.limitations} />
                <InsightCard title="Future Plans" accent="success" icon="🚀" items={project.future} />
              </div>
            </motion.section>

            {/* CONCLUSION */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <SectionLabel text="Conclusion" />
              <div className="mt-5 relative rounded-2xl p-6 overflow-hidden border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-base-200/25 to-secondary/[0.04]">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <svg className="absolute bottom-4 right-4 w-8 h-8 opacity-[0.08]" viewBox="0 0 48 48" fill="none">
                  <path d="M48 32 L48 48 L32 48" stroke="currentColor" strokeWidth="2" />
                </svg>
                <p className="text-[14px] leading-[1.85] text-base-content/68">{project.conclusion}</p>
              </div>
            </motion.section>

            {/* BOTTOM CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-base-content text-base-100 text-[12px] font-bold hover:bg-primary hover:text-primary-content hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-base-content/8">
                  <FaGithub /> View Full Code
                  <MdArrowOutward className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-base-300/55 bg-base-200/30 text-[12px] font-bold text-base-content/65 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5 transition-all duration-200">
                  <FaExternalLinkAlt className="text-[10px]" /> Try Live Demo
                </a>
              )}
            </motion.div>
          </div>

          {/* ─ RIGHT: Sidebar ─────────────────────────────────────────── */}
          <div className="w-full lg:w-60 xl:w-[270px] flex-shrink-0 flex flex-col gap-7 lg:sticky lg:top-24 lg:self-start">

            {/* METRICS */}
            {project.metrics && (
              <motion.div
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
              >
                <SectionLabel text="Impact" />
                <div className="mt-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {project.metrics.map((m, i) => <MetricCard key={i} metric={m} i={i} />)}
                </div>
              </motion.div>
            )}

            {/* TECH STACK */}
            {techEntries && (
              <motion.div
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.07 }}
              >
                <SectionLabel text="Tech Stack" />
                <div className="mt-4 rounded-2xl border border-base-300/35 bg-base-200/20 p-4 flex flex-col gap-4">
                  {techEntries.map(([cat, techs], i) => (
                    <TechCategoryBlock key={cat} category={cat} techs={techs} i={i} />
                  ))}
                  <div className="pt-3 border-t border-base-300/25">
                    <p className="text-[9px] text-base-content/22 font-black uppercase tracking-wider">
                      {allTechs.length} total technologies
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* QUICK LINKS */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.13 }}
              className="flex flex-col gap-2"
            >
              <SectionLabel text="Links" />
              <div className="mt-3 flex flex-col gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-base-200/40 border border-base-300/35 hover:border-primary/28 hover:bg-base-200/70 transition-all duration-200 group">
                    <span className="flex items-center gap-2.5 text-[12px] font-bold text-base-content/60 group-hover:text-base-content transition-colors duration-200">
                      <FaGithub className="text-sm" /> GitHub
                    </span>
                    <MdArrowOutward className="text-[11px] text-base-content/25 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/8 border border-primary/18 hover:bg-primary/14 hover:border-primary/32 transition-all duration-200 group">
                    <span className="flex items-center gap-2.5 text-[12px] font-bold text-primary">
                      <FaExternalLinkAlt className="text-[10px]" /> Live Demo
                    </span>
                    <MdArrowOutward className="text-[11px] text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── PROJECT NAVIGATION ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mt-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-base-300/35" />
            <span className="text-[8.5px] font-black text-base-content/18 uppercase tracking-[0.32em]">More Projects</span>
            <div className="h-px flex-1 bg-base-300/35" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link to={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-base-300/35 bg-base-200/15 hover:border-primary/22 hover:bg-base-200/40 transition-all duration-200">
                <div className="w-8 h-8 rounded-xl border border-base-300/45 flex items-center justify-center text-base-content/25 group-hover:text-primary group-hover:border-primary/25 group-hover:-translate-x-0.5 transition-all duration-200 flex-shrink-0">
                  <FaChevronLeft className="text-[9px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-base-content/25 uppercase tracking-wider mb-1">Previous</p>
                  <p className="text-[12.5px] font-bold text-base-content/60 group-hover:text-primary transition-colors duration-200 truncate">{prevProject.name}</p>
                </div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link to={`/projects/${nextProject.slug}`}
                className="group flex items-center justify-end gap-4 p-5 rounded-2xl border border-base-300/35 bg-base-200/15 hover:border-primary/22 hover:bg-base-200/40 transition-all duration-200 text-right">
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-base-content/25 uppercase tracking-wider mb-1">Next</p>
                  <p className="text-[12.5px] font-bold text-base-content/60 group-hover:text-primary transition-colors duration-200 truncate">{nextProject.name}</p>
                </div>
                <div className="w-8 h-8 rounded-xl border border-base-300/45 flex items-center justify-center text-base-content/25 group-hover:text-primary group-hover:border-primary/25 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0">
                  <FaChevronRight className="text-[9px]" />
                </div>
              </Link>
            ) : <div />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;