import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiKotlin, SiReact, SiFirebase, SiMongodb, SiNodedotjs, SiAndroid, SiTailwindcss, SiFigma, SiGit, SiPostman } from "react-icons/si";
import { FaCode, FaTerminal, FaLayerGroup } from "react-icons/fa";

const TechArsenal = () => {
  const [activeTab, setActiveTab] = useState("Mobile");

  const techData = {
    Mobile: [
      { name: "Kotlin", icon: <SiKotlin />, level: "Advanced", desc: "Native Android development with deep logic." },
      { name: "Jetpack Compose", icon: <SiAndroid />, level: "Advanced", desc: "Modern declarative UI architectures." },
      { name: "Firebase", icon: <SiFirebase />, level: "Intermediate", desc: "Real-time DB, Auth, and Cloud Messaging." },
    ],
    Web: [
      { name: "React.js", icon: <SiReact />, level: "Advanced", desc: "Building scalable SPA and web ecosystems." },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, level: "Advanced", desc: "Utility-first modern styling." },
      { name: "DaisyUI", icon: <FaLayerGroup />, level: "Expert", desc: "Theme-driven component architecture." },
    ],
    Backend: [
      { name: "Node.js", icon: <SiNodedotjs />, level: "Intermediate", desc: "Asynchronous server-side logic." },
      { name: "MongoDB", icon: <SiMongodb />, level: "Intermediate", desc: "NoSQL schema design & optimization." },
      { name: "Postman", icon: <SiPostman />, level: "Advanced", desc: "API testing and documentation." },
    ],
  };

  const tabs = Object.keys(techData);

  return (
    <section id="skills" className="py-24 px-6 bg-base-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Technical Arsenal</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-base-content italic leading-none"
            >
              Expertise <span className="text-primary not-italic">&</span> Tools
            </motion.h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-base-200 p-1.5 rounded-2xl border border-base-content/5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl text-sm font-black transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab 
                  ? "bg-primary text-primary-content shadow-lg shadow-primary/20" 
                  : "hover:bg-base-300 opacity-60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Display Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {techData[activeTab].map((skill, idx) => (
                  <div 
                    key={idx}
                    className="group relative p-8 bg-base-200/40 backdrop-blur-xl border border-base-content/10 rounded-[2.5rem] hover:border-primary/40 transition-all duration-500 overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-4xl text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        {skill.icon}
                      </div>
                      <span className="badge badge-primary font-black italic text-[10px] uppercase px-3 py-3">
                        {skill.level}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black mb-2">{skill.name}</h3>
                    <p className="text-sm opacity-60 font-medium leading-relaxed">
                      {skill.desc}
                    </p>
                    
                    {/* Decorative Corner Icon */}
                    <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                      {skill.icon}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side Bento Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-8 bg-primary rounded-[2.5rem] text-primary-content relative overflow-hidden group shadow-2xl shadow-primary/20">
              <FaTerminal className="text-5xl mb-6 opacity-20 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black italic mb-4 leading-tight">Problem Solving & Logic</h3>
              <p className="text-sm opacity-90 font-medium">
                Advanced DSA proficiency with a focus on optimization and clean, readable logic.
              </p>
              <div className="mt-8 flex gap-3">
                <span className="px-4 py-2 bg-primary-content/10 rounded-xl text-xs font-bold">Git</span>
                <span className="px-4 py-2 bg-primary-content/10 rounded-xl text-xs font-bold">DSA</span>
                <span className="px-4 py-2 bg-primary-content/10 rounded-xl text-xs font-bold">Figma</span>
              </div>
            </div>

            <div className="flex-1 p-8 bg-base-200 border border-base-content/10 rounded-[2.5rem] flex flex-col justify-center">
               <h4 className="text-sm font-black uppercase tracking-widest opacity-40 mb-6">Development Workflow</h4>
               <div className="space-y-6">
                 {[
                   { label: "Clean Architecture", val: "MVVM / Solid" },
                   { label: "Project Mgmt", val: "Agile / ClickUp" },
                   { label: "Design Tools", val: "Figma / Canva" }
                 ].map((stat, i) => (
                   <div key={i}>
                     <p className="text-[10px] font-black uppercase text-primary mb-1">{stat.label}</p>
                     <p className="text-lg font-black">{stat.val}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechArsenal;