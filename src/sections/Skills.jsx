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
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SkillMatrix from "../components/SkillMatrix";

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

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <>
      <section
        id="skills"
        className="py-24 px-6 bg-base-200 text-gray-900 dark:text-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12" data-aos="fade-up">
            My Skills
          </h2>

          {/* Animated Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
            {categories.map((cat, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className={`px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-300 shadow-sm backdrop-blur-md
                ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent"
                    : "bg-base-100 dark:bg-base-300 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-primary hover:text-white"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Animated Skill Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
            data-aos="fade-up"
            data-aos-delay="100"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {filteredSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-base-100 dark:bg-base-300 border border-primary rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-4xl text-primary"
                  >
                    {skill.icon}
                  </motion.div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold">{skill.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-in-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1 text-primary font-semibold">
                  {skill.level}%
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="skill-matrix">
        <SkillMatrix />
      </section>
    </>
  );
};

export default Skills;
