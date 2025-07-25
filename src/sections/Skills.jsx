import {
  FaAndroid,
  FaJava,
  FaGithub,
  FaBolt,
  FaCloud,
  FaLaptopCode,
  FaUsers,
  FaPuzzlePiece,
} from "react-icons/fa";
import { BiPlug, BiData } from "react-icons/bi";
import { MdArchitecture } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const Skills = () => {
  const skills = [
    { name: "Kotlin", icon: <FaAndroid />, category: "Android Development", level: 90 },
    { name: "Jetpack Compose", icon: <FaAndroid />, category: "Android Development", level: 85 },
    { name: "Android SDK", icon: <FaAndroid />, category: "Android Development", level: 80 },
    { name: "Room Database", icon: <BiData />, category: "Android Development", level: 75 },
    { name: "Retrofit", icon: <BiPlug />, category: "Android Development", level: 80 },
    { name: "Coroutines/Flow", icon: <FaBolt />, category: "Android Development", level: 75 },
    { name: "MVVM Architecture", icon: <MdArchitecture />, category: "Android Development", level: 80 },
    { name: "Java", icon: <FaJava />, category: "Programming & Problem Solving", level: 80 },
    { name: "Data Structures", icon: <FaBolt />, category: "Programming & Problem Solving", level: 85 },
    { name: "Algorithms", icon: <FaBolt />, category: "Programming & Problem Solving", level: 80 },
    { name: "Git & GitHub", icon: <FaGithub />, category: "Tools & Collaboration", level: 85 },
    { name: "Firebase", icon: <FaCloud />, category: "Tools & Collaboration", level: 75 },
    { name: "Android Studio", icon: <FaLaptopCode />, category: "Tools & Collaboration", level: 90 },
    { name: "Problem Solving", icon: <FaPuzzlePiece />, category: "Tools & Collaboration", level: 90 },
    { name: "Collaboration", icon: <FaUsers />, category: "Tools & Collaboration", level: 85 },
  ];

  const categories = [
    "All",
    "Android Development",
    "Programming & Problem Solving",
    "Tools & Collaboration",
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-24 px-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 md:mb-12">
          My Skills
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {categories.map((cat, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`btn btn-sm md:btn-md ${activeCategory === cat
                ? 'btn-primary'
                : 'btn-ghost'}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skill Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="card bg-base-100 shadow-md hover:shadow-xl border border-base-300"
            >
              <div className="card-body p-4 md:p-6">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-3xl text-primary"
                  >
                    {skill.icon}
                  </motion.div>
                  <div>
                    <h3 className="card-title text-lg">{skill.name}</h3>
                    <p className="text-xs opacity-70">{skill.category}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-base-200 rounded-full h-2 mb-1">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right text-primary font-semibold">
                  {skill.level}%
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;