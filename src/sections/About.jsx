import { FaMapMarkerAlt, FaEnvelope, FaDownload, FaUserGraduate, FaCode } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

// 1. DATA CONFIGURATION - Update your details here
const ABOUT_DATA = {
  title: "About Me",
  role: "3rd Year CSE Student",
  location: "Khulna, Bangladesh",
  email: "mahmud.nubtk@gmail.com",
  cvPath: "/cv.pdf",
  cvFileName: "Shahjalal_CV.pdf",
  
  // The summary is split for the "See More" functionality
  shortBio: `I am a 3rd-year CSE student at NUBTK and the Founder of Appriyo. I’ve transitioned from being a developer to a technical leader, focusing on building scalable digital products that solve real-world business problems.`,
  
  expandedBio: (
    <>
      At <strong>Appriyo</strong>, I lead a team of four, overseeing everything from system architecture to final deployment. My technical core lies in <strong>Android Development (Kotlin + Jetpack Compose)</strong>, but my passion extends to high-level system design and project management.
      <br /><br />
      I am a firm believer in discipline—evidenced by my growth into the Top 5% of global contributors in 2025. I use tools like ClickUp for project management and Figma for collaboration to ensure my team delivers polished, market-ready MVPs.
      <br /><br />
      When I'm not architecting systems, I'm sharpening my problem-solving skills on LeetCode or exploring innovative tech like AI integration and NFC solutions. Let’s collaborate to turn your vision into a robust digital reality.
    </>
  ),

  techStack: [
    "Kotlin", "Jetpack Compose", "Firebase", "System Architecture", 
    "React", "Tailwind CSS", "Git", "Room DB", "Retrofit", 
    "Coroutines", "Android Studio", "ClickUp", "Figma"
  ]
};

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

  const TechBadge = ({ tech }) => (
    <motion.span
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="badge badge-outline hover:badge-primary hover:text-primary-content cursor-default py-3 px-4"
    >
      {tech}
    </motion.span>
  );

  return (
    <section id="about" className="py-16 md:py-24 px-6 relative bg-base-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-16">
        
        {/* Profile Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/img/profile.jpg"
              alt="Profile"
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl border-4 border-primary"
            />
          </motion.div>
        </div>

        {/* About Text */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold">{ABOUT_DATA.title}</h2>

          <p className="text-md sm:text-lg opacity-90 leading-relaxed">
            {ABOUT_DATA.shortBio}
            {!isDesktop && isExpanded && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <br /><br />
                {ABOUT_DATA.expandedBio}
              </motion.span>
            )}
          </p>

          <button
            onClick={toggleExpanded}
            className="btn btn-link btn-sm text-primary hover:text-primary-focus font-bold no-underline p-0"
          >
            {isExpanded ? "See Less" : "See More About My Vision"}
          </button>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaUserGraduate className="text-primary" />
              <span>{ABOUT_DATA.role}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaMapMarkerAlt className="text-primary" />
              <span>{ABOUT_DATA.location}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaEnvelope className="text-primary" />
              <span>{ABOUT_DATA.email}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaDownload className="text-primary" />
              <a href={ABOUT_DATA.cvPath} download={ABOUT_DATA.cvFileName} className="link link-primary font-semibold">
                Download CV
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-3">Expertise & Tools</h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {ABOUT_DATA.techStack.map((tech, idx) => (
                <TechBadge key={idx} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Modal - Desktop Only */}
      <AnimatePresence>
        {isExpanded && isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={toggleExpanded}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-base-100 rounded-2xl p-8 max-w-2xl w-full text-left space-y-6 shadow-2xl overflow-auto max-h-[90vh] relative border border-primary/20"
            >
              <button onClick={toggleExpanded} className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost">
                <IoClose className="text-2xl" />
              </button>
              
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <FaCode className="text-primary" /> Building the Future at Appriyo
              </h3>
              
              <div className="text-base leading-relaxed opacity-90 space-y-4">
                {ABOUT_DATA.expandedBio}
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3 border-b border-primary/10 pb-2">Full Technical Toolkit</h4>
                <div className="flex flex-wrap gap-2">
                  {ABOUT_DATA.techStack.map((tech, idx) => (
                    <TechBadge key={idx} tech={tech} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;