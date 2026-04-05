// src/sections/Projects.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaRocket } from "react-icons/fa";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import projects from "../components/ProjectsData";

const ease = [0.22, 1, 0.36, 1];

// ─── TILT CARD ─────────────────────────────────────────────────────────────
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(x, { stiffness: 180, damping: 22 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / (r.width / 2)) * 7);
    y.set(((e.clientY - cy) / (r.height / 2)) * -7);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.09 }}
    >
      <TiltCard className="h-full">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="
            group relative h-full flex flex-col
            bg-base-200/60 backdrop-blur-sm
            border border-base-300/60
            rounded-3xl overflow-hidden
            hover:border-primary/40
            transition-all duration-400
            shadow-[0_4px_24px_rgba(0,0,0,0.10)]
            hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)]
          "
        >
          {/* Glow overlay on hover */}
          <div className="
            absolute inset-0 opacity-0 group-hover:opacity-100
            bg-gradient-to-br from-primary/[0.05] via-transparent to-secondary/[0.04]
            transition-opacity duration-500 pointer-events-none
          " />

          {/* Index badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="
              flex items-center justify-center
              w-7 h-7 rounded-lg
              bg-base-300/80 border border-base-300
              text-[10px] font-bold text-base-content/40
              backdrop-blur-sm
            ">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Image container */}
          <div className="relative overflow-hidden bg-base-100/60 mx-4 mt-4 rounded-2xl h-44 sm:h-48 flex items-center justify-center">
            {/* Subtle dot grid inside image area */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
              <defs>
                <pattern id={`card-grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#card-grid-${index})`} />
            </svg>

            <motion.img
              src={project.image}
              alt={project.name}
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.5, ease }}
              className="relative z-10 h-full w-full object-contain p-4"
            />

            {/* Image glow */}
            <div className="absolute inset-0 bg-primary/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5 pt-4 gap-3">
            {/* Title */}
            <h3 className="text-[15px] font-extrabold tracking-tight leading-snug text-base-content group-hover:text-primary transition-colors duration-200">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-[12.5px] opacity-55 leading-relaxed line-clamp-3 flex-1">
              {project.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {project.skills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-base-300/60 text-base-content/55 border border-base-300/40"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 4 && (
                <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  +{project.skills.length - 4}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-base-300/50" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                  bg-base-300/60 border border-base-300/50
                  text-[11px] font-bold text-base-content/60
                  hover:text-base-content hover:bg-base-300
                  hover:-translate-y-0.5
                  transition-all duration-200
                "
              >
                <FaGithub className="text-xs" /> Code
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                    bg-primary/10 border border-primary/30
                    text-[11px] font-bold text-primary
                    hover:bg-primary hover:text-primary-content
                    hover:-translate-y-0.5
                    transition-all duration-200
                  "
                >
                  <FaExternalLinkAlt className="text-[9px]" /> Live
                </a>
              )}

              <Link
                to={`/projects/${project.slug}`}
                className="
                  ml-auto flex items-center gap-1.5
                  text-[11px] font-bold text-base-content/40
                  hover:text-primary
                  transition-colors duration-200 group/link
                "
              >
                Details
                <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────
const Projects = () => {
  return (
    <section
      id="projects"
      className="
        relative w-full overflow-hidden
        bg-base-100 text-base-content
        py-20 lg:py-28
        px-5 sm:px-10 lg:px-16 xl:px-20
      "
    >
      {/* ── BACKGROUND ────────────────────────────────────────────────── */}
      <div className="pointer-events-none select-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[130px]" />
        <div className="absolute -bottom-32 right-1/4 w-[480px] h-[480px] rounded-full bg-secondary/[0.05] blur-[110px]" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.026]">
          <defs>
            <pattern id="proj-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#proj-grid)" />
        </svg>

        <svg className="absolute inset-0 w-full h-full opacity-[0.016]">
          <defs>
            <pattern id="proj-diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#proj-diag)" />
        </svg>

        <div className="absolute left-0 top-1/3 w-px h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute right-0 top-1/2 w-px h-72 bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent" />

        <svg className="absolute top-6 left-6 w-11 h-11 opacity-[0.10]" viewBox="0 0 48 48" fill="none">
          <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="absolute top-6 right-6 w-11 h-11 opacity-[0.10]" viewBox="0 0 48 48" fill="none">
          <path d="M48 16 L48 0 L32 0" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-6 left-6 w-11 h-11 opacity-[0.10]" viewBox="0 0 48 48" fill="none">
          <path d="M0 32 L0 48 L16 48" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-6 right-6 w-11 h-11 opacity-[0.10]" viewBox="0 0 48 48" fill="none">
          <path d="M48 32 L48 48 L32 48" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="flex items-center justify-center lg:justify-start gap-3 mb-8"
        >
          <div className="h-px w-8 bg-base-300" />
          <span className="text-[10px] text-base-content/30 uppercase tracking-[0.24em] font-semibold">Selected Work</span>
          <div className="h-px w-8 bg-base-300" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.05 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <h2 className="font-extrabold tracking-tight leading-[1.06] text-4xl sm:text-5xl xl:text-[3.2rem]">
              Featured{" "}
              <span className="relative inline-block">
                <span className="text-primary">Projects</span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary/40 origin-left"
                />
              </span>
            </h2>
            <p className="text-[10px] uppercase tracking-[0.22em] text-base-content/30 font-medium mt-2">
              Production-grade · Real-world Impact
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="
              inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              text-[11px] font-semibold tracking-[0.12em] uppercase
              bg-primary/10 border border-primary/25 text-primary
            ">
              <FaRocket className="text-[9px]" />
              {projects.length} Projects
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mt-16"
        >
          <div className="h-px flex-1 max-w-[80px] bg-base-300" />
          <a
            href="https://github.com/shahjalal-mahmud"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2.5 px-6 py-2.5
              rounded-2xl text-[12px] font-bold
              bg-base-200 border border-base-300
              text-base-content/60
              hover:text-base-content hover:border-primary/40 hover:bg-base-200
              hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            <FaGithub /> View all on GitHub
          </a>
          <div className="h-px flex-1 max-w-[80px] bg-base-300" />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;