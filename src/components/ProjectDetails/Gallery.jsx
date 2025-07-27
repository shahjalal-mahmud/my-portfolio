import { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 300); // Reduced from 500ms
  }, [isAnimating, images.length]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 300); // Reduced from 500ms
  }, [isAnimating, images.length]);

  useEffect(() => {
    if (isHovered || isAnimating) return;
    const interval = setInterval(goNext, 2000);
    return () => clearInterval(interval);
  }, [goNext, isHovered, isAnimating]);

  const getImageStyle = (index) => {
    const total = images.length;
    const diff = (index - currentIndex + total) % total;
    if (diff === 0) {
      return {
        transform: "translateZ(50px) scale(1.1)",
        zIndex: 10,
        opacity: 1,
      };
    } else if (diff === 1 || (diff === -total + 1)) {
      return {
        transform: "translateX(60%) rotateY(-35deg) scale(0.9)",
        zIndex: 5,
        opacity: 0.6,
      };
    } else if (diff === total - 1 || diff === -1) {
      return {
        transform: "translateX(-60%) rotateY(35deg) scale(0.9)",
        zIndex: 5,
        opacity: 0.6,
      };
    } else {
      return {
        transform: "scale(0.7)",
        zIndex: 1,
        opacity: 0,
      };
    }
  };

  return (
    <SectionWrapper title="Media Gallery">
      <div
        className="relative w-full h-[400px] md:h-[600px] overflow-hidden flex items-center justify-center"
        style={{ perspective: "1000px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-sm md:btn-md glass hover:scale-110 transition-transform duration-100" // Added hover effect
        >
          ❮
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-sm md:btn-md glass hover:scale-110 transition-transform duration-100" // Added hover effect
        >
          ❯
        </button>

        {/* 3D Carousel */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((src, index) => {
            const style = getImageStyle(index);
            return (
              <motion.div
                key={index}
                animate={style}
                transition={{ duration: 0.4, ease: "easeInOut" }} // Reduced from 0.6s
                className="absolute w-[60%] sm:w-[40%] h-[60%] md:h-[80%] rounded-xl overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  ...style,
                }}
              >
                <img
                  src={src}
                  alt={`Image ${index}`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx ? "bg-primary w-6" : "bg-base-content opacity-30"
                }`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Gallery;