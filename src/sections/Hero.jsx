import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { SiCodeforces, SiHackerrank, SiLeetcode } from "react-icons/si";
import { MdEmail } from "react-icons/md";

// 1. DATA CONFIGURATION - Change these values to update your site easily
const HERO_CONTENT = {
  name: "ShahaJalal",
  university: "NUBTK",
  company: "Appriyo",
  typewriterWords: ["Founder @ Appriyo", "Android Developer", "Technical Leader"],
  description: (
    <>
      Founder of <strong className="text-primary">Appriyo</strong> and a 3rd-year CSE student. 
      I lead a specialized team to build scalable systems, from high-performance 
      <strong className="text-primary"> Android Apps</strong> to modern web platforms. 
      I focus on architecture, discipline, and turning complex ideas into digital reality.
    </>
  ),
  techStack: ["Kotlin", "Jetpack Compose", "React", "System Architecture", "Git"],
  imageLabel: "Founder & Project Lead",
  socials: [
    { icon: <FaGithub />, href: "https://github.com/shahjalal-mahmud" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/md-shahajalal-mahmud-077b29231/" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/ShahjalalMahmud100/" },
    { icon: <SiCodeforces />, href: "https://codeforces.com/profile/mahmud.nubtk/" },
    { icon: <SiLeetcode />, href: "https://leetcode.com/Shahajalal_Mahmud/" },
    { icon: <SiHackerrank />, href: "https://www.hackerrank.com/profile/mahmud_nubtk/" },
    { icon: <MdEmail className="text-2xl" />, href: "mailto:mahmud.nubtk@gmail.com" },
  ]
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-4 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h2 className="text-sm sm:text-md lg:text-xl xl:text-2xl tracking-wider uppercase font-bold opacity-100 min-h-[1.5em]">
              <Typewriter
                words={HERO_CONTENT.typewriterWords}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h2>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Hi, I'm <span className="text-primary">{HERO_CONTENT.name}</span>
            </h1>

            <p className="text-md sm:text-lg opacity-90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {HERO_CONTENT.description}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-sm">
              {HERO_CONTENT.techStack.map((tech, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="badge badge-primary text-primary-content hover:bg-primary-focus cursor-default px-4 py-3"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#projects" className="btn btn-primary btn-wide shadow-md">
                View Projects
              </a>
              <a href="https://appriyo.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-wide">
                Visit Appriyo
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-6 text-2xl pt-6">
              {HERO_CONTENT.socials.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-primary hover:text-primary-focus transition"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative group">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/img/profile.jpg"
                  alt="Profile"
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-2xl border-4 border-primary object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 right-4 badge badge-primary p-4 font-bold shadow-lg">
                  {HERO_CONTENT.imageLabel}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;