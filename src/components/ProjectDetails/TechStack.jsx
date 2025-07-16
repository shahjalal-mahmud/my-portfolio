// src/components/ProjectDetails/TechStack.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categoryColors = {
  frontend: "from-blue-500 to-purple-500",
  backend: "from-green-500 to-emerald-500",
  ai: "from-yellow-500 to-pink-500",
  networking: "from-red-500 to-orange-500",
  utilities: "from-indigo-500 to-cyan-500",
};

const TechStack = ({ techStack }) => {
  return (
    <SectionWrapper title="💻 Tech Stack">
      <div className="space-y-6">
        {Object.entries(techStack).map(([category, techs]) => (
          <div key={category}>
            <h4 className="text-lg font-semibold capitalize mb-2 text-primary dark:text-white">
              {category}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {techs.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className={`text-sm font-medium text-center px-4 py-2 rounded-xl border shadow-sm bg-primary/10 dark:bg-white/10 text-primary dark:text-white border-primary/30 dark:border-white/20 transition-all duration-300 hover:bg-gradient-to-r ${categoryColors[category]} hover:text-white cursor-default`}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TechStack;
