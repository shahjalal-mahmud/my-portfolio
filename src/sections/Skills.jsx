import {
  FaAndroid,
  FaReact,
  FaNode,
  FaCode,
  FaDatabase,
  FaJava,
  FaGithub,
  FaCss3,
  FaHtml5,
  FaPython,
  FaCuttlefish,
  FaLaptopCode,
  FaUsers,
  FaCloud,
  FaBolt,
} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SkillMatrix from "../components/SkillMatrix";

const skills = [
  { name: "Kotlin", icon: <FaAndroid />, category: "App Development", level: 90 },
  { name: "Jetpack Compose", icon: <FaAndroid />, category: "App Development", level: 85 },
  { name: "Java", icon: <FaJava />, category: "Programming", level: 80 },
  { name: "C", icon: <FaCuttlefish />, category: "Programming", level: 75 },
  { name: "C++", icon: <FaCode />, category: "Programming", level: 70 },
  { name: "Python", icon: <FaPython />, category: "Programming", level: 65 },
  { name: "DSA", icon: <FaBolt />, category: "Problem Solving", level: 80 },
  { name: "HTML", icon: <FaHtml5 />, category: "Frontend", level: 95 },
  { name: "CSS", icon: <FaCss3 />, category: "Frontend", level: 90 },
  { name: "Tailwind CSS", icon: <FaCss3 />, category: "Frontend", level: 85 },
  { name: "React.js", icon: <FaReact />, category: "Frontend", level: 80 },
  { name: "Node.js", icon: <FaNode />, category: "Backend", level: 70 },
  { name: "Express.js", icon: <FaNode />, category: "Backend", level: 70 },
  { name: "MongoDB", icon: <FaDatabase />, category: "Backend", level: 65 },
  { name: "Firebase", icon: <FaCloud />, category: "Backend", level: 75 },
  { name: "Git & GitHub", icon: <FaGithub />, category: "Tools", level: 85 },
  { name: "VS Code", icon: <FaLaptopCode />, category: "Tools", level: 90 },
  { name: "Communication", icon: <FaUsers />, category: "Soft Skills", level: 80 },
  { name: "Teamwork", icon: <FaUsers />, category: "Soft Skills", level: 85 },
];

const Skills = () => {
  return (
    <>
      <section
        id="skills"
        className="py-24 px-6 bg-base-200 text-gray-900 dark:text-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-extrabold text-center mb-16"
            data-aos="fade-up"
          >
            My Skills
          </h2>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {skills.map((skill, index) => (
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
          </div>
        </div>
      </section>

      <section id="skill-matrix">
        <SkillMatrix />
      </section>
    </>
  );
};

export default Skills;
