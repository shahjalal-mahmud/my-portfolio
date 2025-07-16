// src/components/ProjectDetails/Scope.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const Scope = ({ text }) => (
  <SectionWrapper title="📌 Project Scope">
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

export default Scope;
