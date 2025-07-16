// src/components/ProjectDetails/Metrics.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { FaCheckCircle } from "react-icons/fa";

const Metrics = ({ list }) => (
  <SectionWrapper title="📊 Project Metrics">
    <ul className="grid gap-3 sm:grid-cols-2">
      {list.map((metric, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-3 p-3 border rounded-lg bg-base-200 dark:bg-white/10"
        >
          <FaCheckCircle className="text-primary shrink-0" />
          <span className="text-sm">{metric}</span>
        </motion.li>
      ))}
    </ul>
  </SectionWrapper>
);

export default Metrics;
