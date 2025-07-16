// src/components/ProjectDetails/TechStack.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const TechStack = ({ stack }) => {
  return (
    <SectionWrapper title="💻 Tech Stack">
      <div className="flex flex-wrap gap-3">
        {stack.map((tech, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="px-4 py-2 rounded-full border border-primary text-primary dark:text-white dark:border-white bg-primary/10 dark:bg-white/10 hover:bg-primary hover:text-white transition-all cursor-default"
          >
            <span className="text-sm font-medium">{tech}</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TechStack;
