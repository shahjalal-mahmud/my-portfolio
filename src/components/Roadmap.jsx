import React, { useState } from "react";
import { FaFlagCheckered } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Roadmap = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

  const steps = [
    {
      year: "2021",
      title: "Started BSc in CSE",
      desc: "Began Computer Science studies at NUBTK with a passion for solving problems and exploring programming fundamentals.",
    },
    {
      year: "2022",
      title: "Explored Android Development",
      desc: "Built my first Android app using Java, later transitioning to Kotlin and gaining familiarity with Android Studio.",
    },
    {
      year: "2023",
      title: "Mastered Jetpack Compose",
      desc: "Built modern Android apps with MVVM architecture, integrated Firebase, and improved UI/UX using Jetpack Compose.",
    },
    {
      year: "2024",
      title: "Learning Full-Stack Web Dev",
      desc: "Started working with React, Tailwind, Firebase, and MongoDB to build full-stack web applications and dashboards.",
    },
    {
      year: "2025",
      title: "Internships & Startup Projects",
      desc: "Actively applying for internships, building a solid portfolio, and working on real-world startup ideas with a team.",
    },
  ];

  return (
    <section id="roadmap" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 md:mb-16">
          My Career Roadmap
        </h2>

        <div className="relative">
          {/* Vertical line (Mobile) */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-primary/30 transform -translate-x-1/2 lg:hidden z-0"></div>

          {/* Horizontal line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-primary/30 z-0"></div>

          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-5 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center text-center px-4 pt-10 pb-6 bg-base-100 shadow-md border border-primary/20 rounded-2xl cursor-pointer"
                whileHover={isDesktop ? { scale: 1.03 } : {}}
                whileTap={!isDesktop ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => setSelectedStep(step)}
              >
                <div className="absolute -top-5 lg:top-12 lg:-left-5 w-10 h-10 bg-primary text-primary-content flex items-center justify-center rounded-full shadow-lg z-10">
                  <FaFlagCheckered className="text-sm" />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="text-sm font-semibold text-primary">
                    {step.year}
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Card */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-base-100 rounded-2xl p-6 max-w-xl w-full text-left shadow-xl relative overflow-auto max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStep(null)}
                className="absolute top-3 right-3 btn btn-circle btn-sm btn-ghost"
              >
                <IoClose className="text-xl" />
              </button>
              <div className="text-sm font-semibold text-primary mb-1">
                {selectedStep.year}
              </div>
              <h3 className="text-xl font-bold mb-3">{selectedStep.title}</h3>
              <p className="text-base opacity-90 leading-relaxed">
                {selectedStep.desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Roadmap;