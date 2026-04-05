import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity, FaSchool, FaExternalLinkAlt, FaMedal } from "react-icons/fa";
import { useInView } from "framer-motion";
import { useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const EDUCATION_DATA = [
  {
    title: "BSc in Computer Science & Engineering",
    year: "2023 — 2027",
    institution: "Northern University of Business & Technology Khulna",
    link: "https://nubtkhulna.ac.bd/",
    result: "CGPA 3.975 / 4.00",
    grade: "A+",
    icon: <FaUniversity />,
    status: "Ongoing",
    highlights: [
      "Specializing in Software Engineering",
      "Software Development Focus",
      "Active in Competitive Programming",
    ],
  },
  {
    title: "Higher Secondary Certificate",
    year: "2019 — 2021",
    institution: "Govt. Brajalal College, Khulna",
    link: "https://www.blcollege.edu.bd/",
    result: "GPA 5.00 / 5.00",
    grade: "A+",
    icon: <FaSchool />,
    status: "Completed",
    highlights: [
      "Science Group",
      "Mathematics Focus",
      "Academic Excellence",
    ],
  },
  {
    title: "Secondary School Certificate",
    year: "2017 — 2019",
    institution: "Govt. Jalma Chakrakhali High School",
    link: "https://jalmachakrakhalisecondaryschool.jessoreboard.gov.bd/",
    result: "GPA 5.00 / 5.00",
    grade: "A+",
    icon: <FaGraduationCap />,
    status: "Completed",
    highlights: [
      "Science Group",
      "Top 1% in District",
      "Science Olympiad",
    ],
  },
];

const ease = [0.22, 1, 0.36, 1];

// ─── ANIMATED LINE ────────────────────────────────────────────────────────────
const AnimatedLine = ({ delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className="w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent origin-top"
      style={{ height: "100%" }}
    />
  );
};

// ─── EDUCATION CARD ───────────────────────────────────────────────────────────
const EducationCard = ({ item, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease, delay: 0.1 }}
      className="relative flex gap-6 group"
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          className="
            w-11 h-11 rounded-2xl bg-primary text-primary-content
            flex items-center justify-center text-lg
            shadow-lg shadow-primary/30
            group-hover:rotate-12 group-hover:scale-110
            transition-all duration-500 z-10 flex-shrink-0
          "
        >
          {item.icon}
        </motion.div>
        {idx < EDUCATION_DATA.length - 1 && (
          <div className="flex-1 mt-2 w-px min-h-[60px]">
            <AnimatedLine delay={0.3 + idx * 0.1} />
          </div>
        )}
      </div>

      {/* Card */}
      <div className="
        flex-1 mb-10 bg-base-200/50 border border-base-300/60
        rounded-3xl p-6 sm:p-7
        hover:bg-base-200 hover:border-primary/30
        hover:shadow-xl hover:shadow-primary/5
        hover:-translate-y-1
        transition-all duration-400
        relative overflow-hidden
      ">
        {/* Subtle inner glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/[0.04] blur-2xl pointer-events-none" />

        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className={`
              text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full
              ${item.status === "Ongoing"
                ? "bg-success/10 border border-success/25 text-success"
                : "bg-base-300/60 border border-base-300 text-base-content/40"}
            `}>
              {item.status === "Ongoing" && (
                <span className="relative inline-flex w-1.5 h-1.5 mr-1.5 align-middle">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-65" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                </span>
              )}
              {item.status}
            </span>
            <span className="text-[9px] text-base-content/30 font-semibold uppercase tracking-[0.16em]">
              {item.year}
            </span>
          </div>
          {/* Grade badge */}
          <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-xl px-3 py-1.5">
            <FaMedal className="text-primary text-[10px]" />
            <span className="text-[11px] font-extrabold text-primary">{item.result}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-base-content leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
          {item.title}
        </h3>

        {/* Institution */}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary/70 hover:text-primary transition-colors duration-200 group/link mb-4"
        >
          {item.institution}
          <FaExternalLinkAlt className="text-[8px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
        </a>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {item.highlights.map((h, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold text-base-content/50 bg-base-300/40 border border-base-300/60 rounded-lg px-2.5 py-1 group-hover:text-base-content/70 transition-colors duration-200"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Decorative number */}
        <div className="absolute bottom-5 right-7 text-7xl font-black opacity-[0.025] group-hover:opacity-[0.055] transition-opacity pointer-events-none select-none">
          0{idx + 1}
        </div>
      </div>
    </motion.div>
  );
};

// ─── EDUCATION ─────────────────────────────────────────────────────────────────
const Education = () => {
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
      id="education"
      className="
        relative w-full overflow-hidden
        bg-base-100 text-base-content
        py-20 lg:py-28
        px-5 sm:px-10 lg:px-16 xl:px-20
      "
    >
      {/* ══ BACKGROUND (mirrors hero/about) ═══════════════════════════════ */}
      <div className="pointer-events-none select-none absolute inset-0">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[130px]" />
        <div className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full bg-secondary/[0.05] blur-[110px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/[0.04] blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.028]">
          <defs>
            <pattern id="edu-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#edu-grid)" />
        </svg>
        <svg className="absolute inset-0 w-full h-full opacity-[0.018]">
          <defs>
            <pattern id="edu-diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#edu-diag)" />
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
          <span className="text-[10px] text-base-content/30 uppercase tracking-[0.24em] font-semibold">Academic Background</span>
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
              <FaGraduationCap className="text-[10px]" />
              Education
            </span>
          </motion.div>
          <motion.h2 variants={item} className="font-extrabold tracking-tight leading-[1.07] text-3xl sm:text-4xl xl:text-[2.8rem]">
            Academic{" "}
            <span className="relative inline-block">
              <span className="text-primary">Journey</span>
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
            Knowledge · Discipline · Excellence
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col">
          {EDUCATION_DATA.map((item, idx) => (
            <EducationCard key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;