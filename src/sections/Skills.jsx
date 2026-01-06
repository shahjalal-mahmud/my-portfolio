import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAndroid, FaUsers, FaReact, FaRobot, FaBolt, FaTerminal } from "react-icons/fa";
import { MdArchitecture } from "react-icons/md";
import { SiTensorflow, SiTailwindcss, SiGit } from "react-icons/si";
import { GiClick } from "react-icons/gi";

const SKILLS_DATA = [
  { name: "Technical Leadership", icon: <FaUsers />, category: "Management", tag: "Expert", desc: "Leading teams to deliver high-performance digital products." },
  { name: "System Architecture", icon: <MdArchitecture />, category: "Management", tag: "Specialist", desc: "Designing scalable, maintainable software ecosystems." },
  { name: "Project Management", icon: <GiClick />, category: "Management", tag: "Advanced", desc: "Agile workflows and strategic technical execution." },
  { name: "Kotlin + Compose", icon: <FaAndroid />, category: "Android", tag: "Expert", desc: "Modern native Android with declarative UI patterns." },
  { name: "MVVM / WorkManager", icon: <MdArchitecture />, category: "Android", tag: "Expert", desc: "Enterprise-grade background task management." },
  { name: "TensorFlow Lite / AI", icon: <SiTensorflow />, category: "Android", tag: "Specialist", desc: "On-device machine learning and smart features." },
  { name: "DeepSeek AI", icon: <FaRobot />, category: "Android", tag: "Advanced", desc: "Integrating LLMs into mobile environments." },
  { name: "React.js", icon: <FaReact />, category: "Web", tag: "Advanced", desc: "Building responsive and dynamic web platforms." },
  { name: "Tailwind / DaisyUI", icon: <SiTailwindcss />, category: "Web", tag: "Expert", desc: "Rapid UI development with utility-first CSS." },
];

const CATEGORIES = ["All", "Management", "Android", "Web"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? SKILLS_DATA
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-24 px-4 bg-base-100 relative overflow-hidden text-base-content">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center justify-center md:justify-start gap-3 mb-4"
            >
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Expertise Arsenal</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Core <span className="text-primary">Competencies</span>
            </h2>
          </div>

          {/* Filter Tabs */}
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
          {/* Main Skills Grid */}
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
                      <div className="text-3xl md:text-4xl text-primary transition-transform duration-300 group-hover:scale-110">
                        {skill.icon}
                      </div>
                      <span className="badge badge-primary badge-outline font-bold text-[10px] uppercase tracking-tighter px-3">
                        {skill.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 tracking-tight">{skill.name}</h3>
                    <p className="text-sm opacity-70 leading-relaxed font-medium">
                      {skill.desc}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Sidebar Info */}
          <aside className="lg:col-span-4 flex flex-col gap-6 order-1 lg:order-2">
            <div className="p-8 bg-primary rounded-3xl text-primary-content shadow-xl shadow-primary/10 relative overflow-hidden group">
              <FaTerminal className="text-5xl mb-6 opacity-20" />
              <h3 className="text-2xl font-bold mb-3">Problem Solving</h3>
              <p className="text-sm opacity-90 mb-8 leading-relaxed">
                Expertise in Data Structures and Algorithms with a focus on C++, Java, and Firebase Cloud Architectures.
              </p>
              <div className="flex flex-wrap gap-2">
                {["C++", "DSA", "Firebase", "Logic"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-primary-content/20 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1 p-8 bg-base-200/80 border border-base-content/5 rounded-3xl">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-8">Workflow Architecture</h4>
               <div className="space-y-6">
                 {[
                   { label: "Clean Code", val: "SOLID / MVVM", icon: <FaBolt /> },
                   { label: "AI & ML", val: "TensorFlow / OpenCV", icon: <FaRobot /> },
                   { label: "Deployment", val: "Firebase / Git", icon: <SiGit /> }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center gap-4">
                     <div className="text-xl text-primary">{stat.icon}</div>
                     <div>
                        <p className="text-[10px] font-bold uppercase text-primary/70">{stat.label}</p>
                        <p className="text-lg font-bold leading-none">{stat.val}</p>
                     </div>
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