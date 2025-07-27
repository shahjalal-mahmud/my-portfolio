// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const TechStack = ({ techStack }) => {
  if (!techStack) return null;

  // Flatten all technologies into a single array
  const allTechs = Object.values(techStack).flat();

  // Color gradients using DaisyUI theme colors
  const gradients = [
    "bg-gradient-to-r from-primary to-primary-focus",
    "bg-gradient-to-r from-secondary to-secondary-focus",
    "bg-gradient-to-r from-accent to-accent-focus",
    "bg-gradient-to-r from-info to-info-focus",
    "bg-gradient-to-r from-success to-success-focus",
    "bg-gradient-to-r from-warning to-warning-focus",
    "bg-gradient-to-r from-error to-error-focus",
    // Fallback gradients using primary with different opacities
    "bg-gradient-to-r from-primary/80 to-primary-focus/80",
    "bg-gradient-to-r from-primary/60 to-primary-focus/60",
    "bg-gradient-to-r from-primary/40 to-primary-focus/40",
  ];

  // Get a random gradient for each tech
  const getRandomGradient = (index) => gradients[index % gradients.length];

  return (
    <SectionWrapper title="🛠️ Technology Stack">
      <div className="flex flex-col items-center">
        {/* Tech Cloud */}
        <div className="w-full max-w-4xl">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 p-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {allTechs.map((tech, index) => (
              <motion.div
                key={`${tech}-${index}`}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }
                }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-xl ${getRandomGradient(index)} opacity-0 transition-opacity duration-300`} />
                <div className="relative bg-base-100 rounded-xl px-4 py-2 border border-base-300 transition-all duration-300 shadow-sm">
                  <span className="font-medium text-base-content z-10 relative">
                    {tech}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Count */}
        <motion.div 
          className="mt-6 text-sm text-base-content/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {allTechs.length} technologies powering this project
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default TechStack;