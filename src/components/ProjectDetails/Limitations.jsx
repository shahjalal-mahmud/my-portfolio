// src/components/ProjectDetails/Limitations.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const Limitations = ({ text }) => (
  <SectionWrapper title="🚧 Current Limitations">
    <ul className="space-y-2 list-disc ml-5">
      {text.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="text-base"
        >
          {item}
        </motion.li>
      ))}
    </ul>
  </SectionWrapper>
);

export default Limitations;
