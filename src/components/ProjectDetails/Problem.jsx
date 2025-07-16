// src/components/ProjectDetails/Problem.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const Problem = ({ text }) => (
  <SectionWrapper title="❗ The Problem">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-base leading-relaxed"
    >
      {text}
    </motion.p>
  </SectionWrapper>
);

export default Problem;
