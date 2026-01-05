import {
  FaAndroid, FaJava, FaGithub, FaBolt, FaCloud, FaLaptopCode,
  FaUsers, FaPuzzlePiece, FaReact, FaEdit, FaRobot, FaPrint
} from "react-icons/fa";
import { BiPlug, BiData } from "react-icons/bi";
import { MdArchitecture, MdDevices, MdBusinessCenter } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiCplusplus, SiJavascript, SiTailwindcss, SiTensorflow, SiOpencv } from "react-icons/si";
import { GiClick } from "react-icons/gi";
import { RiRouteFill } from "react-icons/ri";

// 1. DATA CONFIGURATION - Synchronized with your LinkedIn Skills
const SKILLS_DATA = [
  // 🏛️ Management & Leadership (New Category for Founder Branding)
  { name: "Technical Leadership", icon: <FaUsers />, category: "Management", level: 95 },
  { name: "System Architecture", icon: <MdArchitecture />, category: "Management", level: 90 },
  { name: "Project Management", icon: <GiClick />, category: "Management", level: 85 },
  { name: "Business Development", icon: <MdBusinessCenter />, category: "Management", level: 80 },

  // 🤖 Advanced Android & ML
  { name: "Kotlin + Compose", icon: <FaAndroid />, category: "Android", level: 95 },
  { name: "MVVM / WorkManager", icon: <MdArchitecture />, category: "Android", level: 90 },
  { name: "TensorFlow Lite / AI", icon: <SiTensorflow />, category: "Android", level: 85 },
  { name: "OpenCV / CameraX", icon: <SiOpencv />, category: "Android", level: 80 },
  { name: "DeepSeek AI Integration", icon: <FaRobot />, category: "Android", level: 85 },
  { name: "Thermal Printer (POS)", icon: <FaPrint />, category: "Android", level: 90 },

  // 🌐 Web Development
  { name: "React.js", icon: <FaReact />, category: "Web", level: 85 },
  { name: "Tailwind / DaisyUI", icon: <SiTailwindcss />, category: "Web", level: 90 },
  { name: "JavaScript (ES6+)", icon: <SiJavascript />, category: "Web", level: 85 },
  { name: "Responsive UI/UX", icon: <MdDevices />, category: "Web", level: 90 },

  // 💻 Problem Solving
  { name: "Data Structures (DSA)", icon: <FaBolt />, category: "Problem Solving", level: 85 },
  { name: "C++ / Java", icon: <SiCplusplus />, category: "Problem Solving", level: 90 },
  { name: "Firebase (Full)", icon: <FaCloud />, category: "Problem Solving", level: 85 },
];

const CATEGORIES = ["All", "Management", "Android", "Web", "Problem Solving"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? SKILLS_DATA
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-24 px-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Core Expertise</h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            From technical leadership and system design to advanced AI integration and mobile development.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm md:btn-md rounded-full px-6 transition-all ${
                activeCategory === cat ? 'btn-primary shadow-lg shadow-primary/20' : 'btn-ghost bg-base-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -8 }}
              className="card bg-base-100 shadow-sm border border-base-300 hover:border-primary/30 transition-colors"
            >
              <div className="card-body p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/5 rounded-xl text-3xl text-primary">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-md leading-tight">{skill.name}</h3>
                    <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Modern Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="opacity-60">Proficiency</span>
                    <span className="text-primary font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;