// src/components/ProjectDetails/Skills.jsx
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const badgeBaseStyles =
  "text-sm px-4 py-2 rounded-full border shadow-sm transition-all duration-300 cursor-default";
const badgeHoverStyles =
  "hover:bg-gradient-to-r from-primary to-secondary hover:text-white";

const Skills = ({ skills = [], extras = [] }) => {
  const [showMore, setShowMore] = useState(false);
  const visibleSkills = showMore ? [...skills, ...extras] : skills;

  return (
    <SectionWrapper title="🚀 Skills">
      <div className="flex flex-wrap gap-3">
        <AnimatePresence>
          {visibleSkills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={`${badgeBaseStyles} ${badgeHoverStyles} 
                text-primary border-primary/30 bg-primary/10
                dark:text-white dark:border-white/20 dark:bg-white/10`}
            >
              {skill}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => setShowMore(!showMore)}
          className="btn btn-sm btn-outline text-sm mt-2"
        >
          {showMore ? (
            <>
              See Less <FaChevronUp className="ml-1" />
            </>
          ) : (
            <>
              See More <FaChevronDown className="ml-1" />
            </>
          )}
        </button>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
