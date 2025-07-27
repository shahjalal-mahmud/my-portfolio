// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const TechStack = ({ techStack }) => {
  if (!techStack) return null;

  // Flatten all technologies into a single array
  const allTechs = Object.values(techStack).flat();

  // Color gradients for the badges
  const gradients = [
    "bg-gradient-to-r from-blue-500 to-indigo-600",
    "bg-gradient-to-r from-emerald-500 to-teal-600",
    "bg-gradient-to-r from-amber-500 to-orange-600",
    "bg-gradient-to-r from-red-500 to-pink-600",
    "bg-gradient-to-r from-purple-500 to-fuchsia-600",
    "bg-gradient-to-r from-cyan-500 to-sky-600",
    "bg-gradient-to-r from-violet-500 to-purple-600",
    "bg-gradient-to-r from-rose-500 to-red-600",
    "bg-gradient-to-r from-green-600 to-lime-600",
    "bg-gradient-to-r from-gray-600 to-slate-700",
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
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-xl ${getRandomGradient(index)} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300`} />
                <div className="relative bg-base-100 dark:bg-base-200 rounded-xl px-4 py-2 border border-base-300 dark:border-base-300 group-hover:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <span className="font-medium text-base-content group-hover:text-white z-10 relative">
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