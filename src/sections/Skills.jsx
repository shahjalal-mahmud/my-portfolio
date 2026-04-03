import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAndroid, FaReact, FaServer, FaDatabase, FaLock, FaCode, FaTerminal } from "react-icons/fa";
import { MdArchitecture } from "react-icons/md";
import { SiTailwindcss, SiGit, SiFirebase, SiPostgresql } from "react-icons/si";
import { GiClick } from "react-icons/gi";

const SKILLS_DATA = [
  // Android
  { name: "Kotlin + Jetpack Compose", icon: <FaAndroid />, category: "Android", tag: "Expert", desc: "Building modern Android apps with declarative UI, state management, and scalable architecture." },
  { name: "MVVM + Coroutines", icon: <MdArchitecture />, category: "Android", tag: "Expert", desc: "Structured architecture with reactive programming and lifecycle-aware components." },
  { name: "Room + WorkManager", icon: <FaDatabase />, category: "Android", tag: "Advanced", desc: "Offline-first storage and background task scheduling in production apps." },

  // Web
  { name: "React.js", icon: <FaReact />, category: "Web", tag: "Advanced", desc: "Building dynamic, responsive web interfaces with modern React patterns." },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Web", tag: "Advanced", desc: "Utility-first styling for fast and consistent UI development." },

  // Backend
  { name: "Node.js + REST APIs", icon: <FaServer />, category: "Backend", tag: "Advanced", desc: "Designing scalable APIs with proper architecture and clean code practices." },
  { name: "JWT Authentication", icon: <FaLock />, category: "Backend", tag: "Advanced", desc: "Secure authentication systems with access/refresh tokens." },
  { name: "Prisma ORM", icon: <FaDatabase />, category: "Backend", tag: "Advanced", desc: "Type-safe database access and schema management using Prisma." },

  // Database
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database", tag: "Advanced", desc: "Relational database design, queries, and optimization." },
  { name: "Firebase", icon: <SiFirebase />, category: "Database", tag: "Advanced", desc: "Realtime database, Firestore, authentication, and cloud integrations." },

  // Core CS
  { name: "Data Structures & Algorithms", icon: <FaCode />, category: "Core", tag: "Advanced", desc: "Strong problem-solving skills with efficient algorithms in C++ and Java." },
  { name: "Operating Systems", icon: <FaCode />, category: "Core", tag: "Intermediate", desc: "Process management, memory, scheduling, and system fundamentals." },
  { name: "DBMS", icon: <FaDatabase />, category: "Core", tag: "Advanced", desc: "Database design, normalization, and transaction management." },
  { name: "Computer Networks", icon: <FaServer />, category: "Core", tag: "Intermediate", desc: "Networking fundamentals, TCP/IP, and communication models." },

  // Security
  { name: "RBAC & API Security", icon: <FaLock />, category: "Security", tag: "Advanced", desc: "Role-based access control and secure API design practices." },

  // Tools
  { name: "Git & Version Control", icon: <SiGit />, category: "Tools", tag: "Advanced", desc: "Efficient collaboration, branching strategies, and code management." },
  { name: "Linux & CLI", icon: <FaTerminal />, category: "Tools", tag: "Advanced", desc: "Command-line tools, scripting, and development workflows." },
];

const CATEGORIES = ["All", "Android", "Web", "Backend", "Database", "Core", "Security", "Tools"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? SKILLS_DATA
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-24 px-4 bg-base-100 relative overflow-hidden text-base-content">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="text-center md:text-left">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Technical Skills</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              My <span className="text-primary">Tech Stack</span>
            </h2>
          </div>

          <div className="flex bg-base-200 p-1.5 rounded-2xl border border-base-content/5 overflow-x-auto no-scrollbar self-center md:self-end">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-primary text-primary-content shadow-md"
                    : "hover:bg-base-300 opacity-70 hover:opacity-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    layout
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group p-6 md:p-8 bg-base-200/50 backdrop-blur-sm border border-base-content/5 rounded-3xl hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-3xl md:text-4xl text-primary group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </div>
                      <span className="badge badge-primary badge-outline font-bold text-[10px] uppercase px-3">
                        {skill.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">
                      {skill.desc}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-6 order-1 lg:order-2">
            <div className="p-8 bg-primary rounded-3xl text-primary-content shadow-xl">
              <FaTerminal className="text-5xl mb-6 opacity-20" />
              <h3 className="text-2xl font-bold mb-3">Problem Solving</h3>
              <p className="text-sm opacity-90 mb-6">
                Strong foundation in Data Structures & Algorithms with focus on writing efficient and optimized solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                {["C++", "Java", "DSA", "Logic"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-primary-content/20 rounded-lg text-[10px] font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1 p-8 bg-base-200/80 border border-base-content/5 rounded-3xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-8">Workflow</h4>
              <div className="space-y-6">
                {[
                  { label: "Architecture", val: "MVVM / Clean Code" },
                  { label: "Backend", val: "Node.js / APIs" },
                  { label: "Database", val: "PostgreSQL / Firebase" }
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold uppercase text-primary/70">{stat.label}</p>
                    <p className="text-lg font-bold">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Skills;