import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-4 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h2 className="text-sm sm:text-md lg:text-xl xl:text-2xl tracking-wider uppercase font-bold opacity-100">
              <Typewriter
                words={["Android App Developer", "DSA Problem Solver", "Tech Explorer"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h2>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Hi, I'm <span className="text-primary">ShahaJalal</span>
            </h1>

            <p className="text-md sm:text-lg opacity-90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A passionate <strong className="text-primary">Android Developer</strong> and CSE student at Northern University of Business & Technology Khulna. I build sleek
              apps with <strong className="text-primary">Kotlin</strong> & <strong className="text-primary">Jetpack Compose</strong>, solve problems with <strong className="text-primary">DSA</strong>,
              and thrive on turning ideas into reality. Let's create something amazing!
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-sm">
              {["Kotlin", "Jetpack Compose", "Firebase", "DSA"].map((tech, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="badge badge-primary text-primary-content hover:bg-primary-focus"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#projects" className="btn btn-primary btn-wide shadow-md">
                View My Work
              </a>
              <a href="#contact" className="btn btn-outline btn-wide">
                Contact Me
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-6 text-2xl pt-6">
              {[
                { icon: <FaGithub />, href: "https://github.com/shahjalal-mahmud" },
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/md-shahajalal-mahmud-077b29231/" },
                { icon: <FaFacebook />, href: "https://www.facebook.com/ShahjalalMahmud100/" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
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
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/img/profile.jpg"
                  alt="Profile"
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-104 xl:h-104 2xl:w-112 2xl:h-112 rounded-full shadow-2xl border-4 border-primary object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 badge badge-primary text-primary-content">
                  Kotlin + Jetpack
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