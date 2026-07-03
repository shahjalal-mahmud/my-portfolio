// MobileSkillsProjects — categorized skills + a projects tab toggle.

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaAndroid, FaReact, FaServer, FaDatabase, FaLock, FaCode, FaTerminal, FaShieldAlt,
} from "react-icons/fa";
import { SiTailwindcss, SiGit, SiFirebase, SiPostgresql, SiKotlin, SiSpringboot, SiDocker } from "react-icons/si";
import { MdArchitecture } from "react-icons/md";
import projects from "../../shared/data/projects";
import M3Chip from "../components/M3Chip";
import M3Card from "../components/M3Card";
import M3ListItem from "../components/M3ListItem";

const SKILLS = [
  { name: "Kotlin + Jetpack Compose", icon: <SiKotlin />, category: "Android", level: "Expert" },
  { name: "MVVM + Clean Architecture", icon: <MdArchitecture />, category: "Android", level: "Expert" },
  { name: "Coroutines + Flow", icon: <SiKotlin />, category: "Android", level: "Advanced" },
  { name: "Room + WorkManager", icon: <FaDatabase />, category: "Android", level: "Advanced" },
  { name: "React.js", icon: <FaReact />, category: "Web", level: "Advanced" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Web", level: "Advanced" },
  { name: "Spring Boot + Kotlin", icon: <SiSpringboot />, category: "Backend", level: "Intermediate" },
  { name: "JWT Authentication", icon: <FaLock />, category: "Backend", level: "Advanced" },
  { name: "Multi-tenant Architecture", icon: <MdArchitecture />, category: "Backend", level: "Advanced" },
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database", level: "Advanced" },
  { name: "Firebase", icon: <SiFirebase />, category: "Database", level: "Advanced" },
  { name: "DSA (C++/Kotlin)", icon: <FaCode />, category: "Core CS", level: "Advanced" },
  { name: "Operating Systems", icon: <FaTerminal />, category: "Core CS", level: "Intermediate" },
  { name: "DBMS", icon: <FaDatabase />, category: "Core CS", level: "Advanced" },
  { name: "Computer Networks", icon: <FaServer />, category: "Core CS", level: "Intermediate" },
  { name: "RBAC & API Security", icon: <FaShieldAlt />, category: "Security", level: "Advanced" },
  { name: "Git & Version Control", icon: <SiGit />, category: "Tools", level: "Advanced" },
  { name: "Linux & CLI", icon: <FaTerminal />, category: "Tools", level: "Intermediate" },
  { name: "Docker Basics", icon: <SiDocker />, category: "Tools", level: "Beginner" },
];

const CATEGORIES = ["All", "Android", "Web", "Backend", "Database", "Core CS", "Security", "Tools"];

export default function MobileSkillsProjects() {
  const [tab, setTab] = useState("skills");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = useMemo(
    () =>
      activeCategory === "All"
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Segmented control */}
      <div className="bg-base-200/70 rounded-full p-1 flex">
        {[
          { key: "skills", label: "Skills" },
          { key: "projects", label: "Projects" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`
              flex-1 h-9 rounded-full m3-label-large
              transition-all duration-200
              ${tab === t.key
                ? "bg-primary text-primary-content m3-elev-1"
                : "text-base-content/65"}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "skills" && (
        <div className="space-y-3">
          {/* Category chips - horizontal scroll */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {CATEGORIES.map((cat) => (
                <M3Chip
                  key={cat}
                  variant="filter"
                  label={cat}
                  selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </div>

          {/* Skills list */}
          <M3Card elevation={0} className="!p-0 overflow-hidden divide-y divide-base-300/60">
            {filteredSkills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(i, 6) * 0.02 }}
              >
                <M3ListItem
                  leading={s.icon}
                  title={s.name}
                  subtitle={`${s.category} · ${s.level}`}
                />
              </motion.div>
            ))}
          </M3Card>
        </div>
      )}

      {tab === "projects" && (
        <div className="space-y-3">
          {projects.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="block">
              <M3Card elevation={1}>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-xl object-contain bg-base-200"
                  />
                  <div className="min-w-0">
                    <h4 className="m3-body-large font-semibold text-base-content truncate">
                      {p.name.split(" - ")[0]}
                    </h4>
                    <p className="m3-body-medium text-base-content/65 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.skills.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-base-200 text-base-content/65"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </M3Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}