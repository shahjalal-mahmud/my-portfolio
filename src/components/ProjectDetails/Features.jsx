// src/components/ProjectDetails/Features.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const Features = ({ features }) => {
  return (
    <SectionWrapper title="✨ Features">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureVariants}
            className="bg-white dark:bg-base-200 text-gray-800 dark:text-gray-200 p-4 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-primary"
          >
            <p className="text-sm font-medium">{feature}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Features;
