import React, { useState } from "react";
import { FaFlagCheckered, FaRocket, FaCode, FaLaptopCode, FaMobileAlt, FaBrain } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Roadmap = () => {
  const [selectedStep, setSelectedStep] = useState(null);

  const steps = [
    {
      year: "August 2023",
      title: "The Beginning",
      subtitle: "BSc in CSE at NUBTK",
      icon: <FaRocket />,
      color: "primary",
      desc: "Admitted into the CSE program at NUBTK with a deep interest in learning technology and solving real-world problems.",
    },
    {
      year: "January 2024",
      title: "Web Exploration",
      subtitle: "Fullstack Development",
      icon: <FaLaptopCode />,
      color: "secondary",
      desc: "Completed a fullstack MERN course and built several web projects using React, Node.js, and Firebase. This phase was crucial for understanding system architecture.",
    },
    {
      year: "December 2024",
      title: "The Pivot",
      subtitle: "Shift to Android",
      icon: <FaMobileAlt />,
      color: "accent",
      desc: "Built my first Android app using Java/XML for a repair store. This hands-on experience revealed my true passion for the mobile ecosystem.",
    },
    {
      year: "February 2025",
      title: "Modern Stack",
      subtitle: "Kotlin & Compose",
      icon: <FaCode />,
      color: "primary",
      desc: "Transitioned to Kotlin and Jetpack Compose. Started applying enterprise-grade practices like MVVM, Room DB, and clean architecture.",
    },
    {
      year: "May 2025",
      title: "AI Integration",
      subtitle: "UIHP AI Project",
      icon: <FaBrain />,
      color: "secondary",
      desc: "Collaborated in the UIHP Cohort to develop an AI-powered career guidance platform, merging modern Android UI with intelligent features.",
    },
  ];

  return (
    <section id="roadmap" className="py-24 px-6 bg-base-100 relative overflow-hidden">
      {/* Decorative Background Elements - matching Education/Experience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-primary"></div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Strategic Growth</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-base-content italic"
          >
            Career Roadmap <span className="text-primary not-italic">.</span>
          </motion.h2>
        </header>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedStep(step)}
              className="group cursor-pointer"
            >
              <div className="h-full bg-base-200/50 backdrop-blur-md border border-base-content/10 rounded-[2rem] p-6 transition-all duration-500 hover:border-primary/40 hover:bg-base-200">
                
                {/* Year Label */}
                <span className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-4 block group-hover:text-primary group-hover:opacity-100">
                  {step.year}
                </span>

                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-xl bg-${step.color}/10 text-${step.color} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  {step.icon}
                </div>

                <h3 className="text-lg font-black leading-tight mb-1">{step.title}</h3>
                <p className="text-xs font-bold opacity-60 mb-4">{step.subtitle}</p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <FaFlagCheckered />
                </div>

                {/* Bottom Decorative Number */}
                <div className="absolute bottom-4 right-6 text-4xl font-black opacity-[0.03] group-hover:opacity-[0.07] pointer-events-none">
                  {idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal - Theme Adaptive */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-base-300/80 backdrop-blur-md"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-base-100 rounded-[2.5rem] p-8 md:p-12 max-w-xl w-full shadow-2xl border border-primary/20 relative"
            >
              <button 
                onClick={() => setSelectedStep(null)} 
                className="absolute top-6 right-6 btn btn-circle btn-sm btn-ghost"
              >
                <IoClose className="text-2xl" />
              </button>
              
              <span className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-2 block">
                {selectedStep.year}
              </span>
              <h3 className="text-3xl font-black mb-2">{selectedStep.title}</h3>
              <p className="text-lg font-bold opacity-60 mb-6">{selectedStep.subtitle}</p>
              
              <div className="h-px w-full bg-base-content/10 mb-6"></div>
              
              <p className="text-base-content/80 leading-relaxed text-lg italic">
                "{selectedStep.desc}"
              </p>

              <div className={`mt-8 p-4 rounded-2xl bg-${selectedStep.color}/5 border border-${selectedStep.color}/10 flex items-center gap-4`}>
                <div className={`text-2xl text-${selectedStep.color}`}>{selectedStep.icon}</div>
                <span className="text-sm font-bold opacity-70 italic">Milestone Reached</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Roadmap;