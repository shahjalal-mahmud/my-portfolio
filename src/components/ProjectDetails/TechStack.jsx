// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categoryThemes = {
  frontend: {
    bg: "bg-gradient-to-r from-blue-500 to-purple-500",
    badge: "badge-primary",
  },
  backend: {
    bg: "bg-gradient-to-r from-green-500 to-emerald-500",
    badge: "badge-success",
  },
  ai: {
    bg: "bg-gradient-to-r from-yellow-500 to-pink-500",
    badge: "badge-warning",
  },
  networking: {
    bg: "bg-gradient-to-r from-red-500 to-orange-500",
    badge: "badge-error",
  },
  utilities: {
    bg: "bg-gradient-to-r from-indigo-500 to-cyan-500",
    badge: "badge-info",
  },
};

const TechStack = ({ techStack }) => {
  return (
    <SectionWrapper title="💻 Tech Stack">
      <div className="space-y-8">
        {Object.entries(techStack).map(([category, techs]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-8 rounded-full ${categoryThemes[category].bg}`} />
              <h4 className="text-xl font-bold capitalize text-base-content">
                {category}
              </h4>
              <span className={`${categoryThemes[category].badge} badge-sm`}>
                {techs.length} {techs.length === 1 ? "item" : "items"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {techs.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className={`relative group overflow-hidden rounded-box p-0.5 ${categoryThemes[category].bg}`}
                >
                  <div className="bg-base-100 hover:bg-base-200 transition-all duration-300 rounded-box p-3 h-full flex items-center justify-center">
                    <span className="font-medium text-base-content group-hover:text-base-content/80">
                      {tech}
                    </span>
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${categoryThemes[category].bg} transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100`} />
                  </div>
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