import React from "react";
import { FaBriefcase, FaCode, FaRocket, FaUserTie, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// 1. DATA CONFIGURATION - Synchronized with your LinkedIn Experience
const EXPERIENCES = [
  {
    title: "Founder & Technical Project Manager",
    company: "Appriyo",
    duration: "Jan 2026 – Present",
    type: "Hybrid",
    location: "Khulna, BD",
    icon: <FaRocket />,
    description:
      "Leading an agile team of 4 to deliver end-to-end IT solutions. Architecting scalable MVPs, managing workflows via ClickUp, and overseeing technical execution from Jetpack Compose apps to React-based web ecosystems.",
    achievements: [
      "Launched appriyo.com and NFC Networking solutions.",
      "Reduced MVP development time by 30% via modular design.",
      "Leading UI/UX, QA, and Marketing synergy for client success."
    ],
    tags: ["Leadership", "System Architecture", "Project Management", "Business Development"],
    color: "primary",
  },
  {
    title: "Android Developer – Repair Store Manager",
    company: "Freelance / Independent Project",
    duration: "July 2025 – Jan 2026",
    type: "Real-world Active Product",
    location: "Remote",
    icon: <FaCode />,
    description:
      "Engineered a complete POS & Management system for repair shops. Actively used by 5 owners. Solves complex tracking, stock management, and financial reporting issues through a digital-first approach.",
    achievements: [
      "Integrated Bluetooth POS Thermal Printing (58/80mm).",
      "Built automated SMS reminders and WorkManager scheduling.",
      "Implemented full inventory, profit/loss, and Talikhata systems."
    ],
    tags: ["Jetpack Compose", "MVVM", "Bluetooth POS", "Firestore", "WorkManager"],
    color: "secondary",
  },
  {
    title: "Freelance React Developer",
    company: "NUBTK University Client",
    duration: "Jun 2025 – July 2025",
    type: "Remote Client Project",
    location: "Remote",
    icon: <FaUserTie />,
    description:
      "Developed a secure, admin-controlled portfolio platform for a university faculty member. Enabled dynamic management of academic publications and CVs via real-time Firestore integration.",
    achievements: [
      "Built real-time CRUD with secure Firebase Admin controls.",
      "Designed responsive UI with inline and modal editing.",
      "Integrated secure image hosting and dynamic CV generation."
    ],
    tags: ["React", "Firebase Auth", "Tailwind CSS", "DaisyUI", "Client Collab"],
    color: "accent",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <FaBriefcase className="text-xl sm:text-2xl text-primary" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary/70">
              Professional Journey
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            Building Digital <span className="text-primary">Solutions</span> That Matter
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-6 md:mb-8">
            "Bridging the gap between complex business ideas and high-performance digital reality."
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              {/* Timeline connector for desktop */}
              {index < EXPERIENCES.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-base-300 z-0 group-hover:bg-primary/30 transition-colors duration-300"></div>
              )}

              <div className="card bg-base-100 shadow-xl border border-base-300/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className={`absolute w-20 h-20 bg-${exp.color}/5 -top-10 -right-10 rotate-45`}></div>
                </div>

                <div className="card-body p-5 sm:p-6 md:p-8 flex flex-col h-full">
                  {/* Header with Icon and Date */}
                  <div className="flex items-start justify-between mb-5 sm:mb-6">
                    <div className={`p-3 sm:p-4 bg-${exp.color}/10 rounded-2xl text-2xl sm:text-3xl text-${exp.color}`}>
                      {exp.icon}
                    </div>
                    <div className="text-right">
                      <div className="badge badge-sm md:badge-md font-bold bg-base-300 border-0 text-xs sm:text-sm">
                        <FaCalendarAlt className="mr-1 text-xs" />
                        {exp.duration}
                      </div>
                    </div>
                  </div>

                  {/* Title and Company */}
                  <div className="mb-4 sm:mb-5">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-base sm:text-lg font-semibold text-primary mb-2">
                      {exp.company}
                    </p>
                    
                    {/* Type and Location */}
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm opacity-70">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-base-200 rounded-full">
                        <span className={`w-2 h-2 rounded-full bg-${exp.color}`}></span>
                        {exp.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaMapMarkerAlt className="text-xs" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-5 sm:mb-6 flex-grow">
                    <p className="text-sm sm:text-base leading-relaxed opacity-90">
                      {exp.description}
                    </p>
                  </div>

                  {/* Achievements List */}
                  <div className="space-y-3 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCheckCircle className="text-primary" />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-primary/80">
                        Key Contributions
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {exp.achievements.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex gap-3 items-start text-sm"
                        >
                          <div className={`mt-1.5 w-2 h-2 rounded-full bg-${exp.color} flex-shrink-0`}></div>
                          <span className="opacity-90">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-auto pt-4 sm:pt-5 border-t border-base-300/50">
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className={`text-xs font-medium px-3 py-1.5 bg-base-200 hover:bg-${exp.color}/10 rounded-full transition-colors duration-200 cursor-default`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;