// src/components/ProjectDetails/Gallery.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const Gallery = ({ images }) => {
  return (
    <SectionWrapper title="📸 Media Gallery">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="bg-base-100 dark:bg-base-200 p-2 rounded-xl shadow hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
          >
            <img
              src={img}
              alt={`Screenshot ${idx + 1}`}
              className="w-full h-[500px] object-contain rounded-lg"
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Gallery;
