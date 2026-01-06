import { FaMapMarkerAlt, FaEnvelope, FaDownload, FaUserGraduate, FaCode } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const ABOUT_DATA = {
  title: "About Me",
  role: "3rd Year CSE Student",
  location: "Khulna, Bangladesh",
  email: "mahmud.nubtk@gmail.com",
  cvPath: "/cv.pdf",
  cvFileName: "Shahjalal_CV.pdf",
  
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
  const [isDesktop, setIsDesktop] = useState(false);

  // Safe check for window width to handle SSR/Hydration
  useEffect(() => {
    const checkRes = () => setIsDesktop(window.innerWidth >= 1024);
    checkRes();
    window.addEventListener('resize', checkRes);
    return () => window.removeEventListener('resize', checkRes);
  }, []);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const TechBadge = ({ tech }) => (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="badge badge-outline border-primary/30 text-base-content hover:bg-primary hover:text-primary-content hover:border-primary cursor-default py-4 px-4 text-xs sm:text-sm transition-colors duration-300"
    >
      {tech}
    </motion.span>
  );

  return (
    <section id="about" className="py-20 lg:py-32 px-6 bg-base-100 text-base-content transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Profile Image - Optimized for all screens */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background Decorative Element */}
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10 animate-pulse"></div>
            
            <img
              src="/img/about_photo.jpg"
              alt="Shahjalal Mahmud"
              className="w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl border-4 border-primary ring-8 ring-primary/5 transition-all duration-500"
            />
          </motion.div>
        </div>

        {/* About Text Content */}
        <div className="w-full lg:w-7/12 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight italic">
              {ABOUT_DATA.title.split(' ')[0]} <span className="text-primary">{ABOUT_DATA.title.split(' ')[1]}</span>
            </h2>
            <div className="h-1.5 w-20 bg-primary mx-auto lg:mx-0 rounded-full"></div>
          </div>

          <div className="text-base sm:text-lg opacity-80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            <p>
              {ABOUT_DATA.shortBio}
            </p>
            
            <AnimatePresence>
              {!isDesktop && isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-4 text-sm sm:text-base text-left bg-base-200 p-4 rounded-xl border border-primary/10"
                >
                  {ABOUT_DATA.expandedBio}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleExpanded}
            className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 font-bold normal-case group"
          >
            {isExpanded ? "Show Less" : "Read Full Vision"}
            <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
          </button>

          {/* Info Grid - Fully Responsive Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm sm:text-base border-t border-base-content/10 pt-8">
            <div className="flex items-center gap-4 justify-center lg:justify-start group">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <FaUserGraduate />
              </div>
              <span className="font-medium">{ABOUT_DATA.role}</span>
            </div>
            <div className="flex items-center gap-4 justify-center lg:justify-start group">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <FaMapMarkerAlt />
              </div>
              <span className="font-medium">{ABOUT_DATA.location}</span>
            </div>
            <div className="flex items-center gap-4 justify-center lg:justify-start group">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <FaEnvelope />
              </div>
              <span className="font-medium break-all">{ABOUT_DATA.email}</span>
            </div>
            <div className="flex items-center gap-4 justify-center lg:justify-start group">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <FaDownload />
              </div>
              <a href={ABOUT_DATA.cvPath} download={ABOUT_DATA.cvFileName} className="link link-primary no-underline hover:underline font-bold">
                Download Resume
              </a>
            </div>
          </div>

          {/* Tech Stack Branding */}
          <div className="pt-4">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold opacity-50 mb-4">Core Expertise</h3>
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {ABOUT_DATA.techStack.slice(0, 8).map((tech, idx) => (
                <TechBadge key={idx} tech={tech} />
              ))}
              <span className="text-xs self-center opacity-60 ml-2 italic">+ more tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Modal - Theme Adaptive */}
      <AnimatePresence>
        {isExpanded && isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-base-300/80 backdrop-blur-md"
            onClick={toggleExpanded}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-base-100 rounded-3xl p-10 max-w-3xl w-full shadow-2xl border border-primary/20 relative"
            >
              <button onClick={toggleExpanded} className="absolute top-6 right-6 btn btn-circle btn-sm btn-ghost hover:bg-error/10 hover:text-error">
                <IoClose className="text-2xl" />
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary rounded-2xl text-primary-content shadow-lg shadow-primary/20">
                  <FaCode className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-3xl font-black">Building with Purpose</h3>
                  <p className="text-primary font-bold text-sm tracking-widest uppercase">The Appriyo Vision</p>
                </div>
              </div>
              
              <div className="text-lg leading-relaxed opacity-90 space-y-6 text-base-content/80">
                {ABOUT_DATA.expandedBio}
              </div>

              <div className="mt-10 pt-8 border-t border-base-content/10">
                <h4 className="text-sm font-black uppercase tracking-widest mb-4 opacity-50">Technical Arsenal</h4>
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