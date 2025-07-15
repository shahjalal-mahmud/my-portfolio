import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaDownload,
  FaUserGraduate,
} from "react-icons/fa";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

  return (
    <section
      id="about"
      className="py-24 px-6 bg-base-100 dark:bg-base-200 text-gray-900 dark:text-white relative"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Profile Image */}
        <div
          className="w-full md:w-1/2 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img
            src="/img/profile.jpg"
            alt="Profile"
            className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-2xl shadow-2xl border-4 border-primary"
          />
        </div>

        {/* About Text */}
        <div
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          data-aos="fade-left"
        >
          <h2 className="text-4xl font-extrabold">About Me</h2>

          <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I’m a 2nd-year Computer Science student at Northern University of
            Business & Technology, Khulna, with a deep love for Android app
            development. Currently, I’m mastering Kotlin and Jetpack Compose to
            build intuitive, high-performance mobile apps.
            {!isDesktop && isExpanded && (
              <>
                <br /><br />
                To sharpen my problem-solving skills, I regularly practice Data
                Structures & Algorithms on LeetCode and CodeForces. I believe in
                learning by doing, so I constantly work on real-world projects
                that challenge me and add value.
                <br /><br />
                I initially explored the MERN stack, but Android development
                truly captivated me—where creativity meets functionality. Now,
                I’m fully committed to becoming a skilled Android Developer,
                crafting apps that simplify and enhance daily life.
                <br /><br />
                When I’m not coding, I’m either learning new tech, collaborating
                on projects, or brainstorming solutions to interesting problems.
                Let’s connect and build something impactful together!
              </>
            )}
          </p>

          <button
            onClick={toggleExpanded}
            className="text-primary underline text-sm font-medium transition hover:text-secondary"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
            <div className="flex items-center gap-3">
              <FaUserGraduate className="text-primary" />
              <span>2nd Year CSE Student</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" />
              <span>Khulna, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <span>mahmud.nubtk@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaDownload className="text-primary" />
              <a
                href="/cv.pdf"
                download="Shahjalal_CV.pdf"
                className="underline hover:text-primary transition"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Tech Stack Always Visible */}
          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["Kotlin", "Jetpack Compose", "Java", "XML", "Firebase", "Git", "LeetCode", "CodeForces", "Android Studio", "Figma"].map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 dark:bg-gray-700 dark:text-white text-sm px-3 py-1 rounded-full shadow-sm hover:bg-primary hover:text-white transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Card Popup - Only on Desktop */}
      <AnimatePresence>
        {isExpanded && isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId="about-popup"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-base-100 rounded-2xl p-6 max-w-2xl w-full text-left space-y-6 shadow-xl overflow-auto max-h-[90vh] relative"
            >
              <button
                onClick={toggleExpanded}
                className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500 transition"
              >
                <IoClose />
              </button>
              <h3 className="text-2xl font-bold">About Me</h3>
              <p className="text-base leading-relaxed dark:text-gray-300">
                To sharpen my problem-solving skills, I regularly practice Data
                Structures & Algorithms on LeetCode and CodeForces. I believe in
                learning by doing, so I constantly work on real-world projects
                that challenge me and add value.
                <br /><br />
                I initially explored the MERN stack, but Android development
                truly captivated me—where creativity meets functionality. Now,
                I’m fully committed to becoming a skilled Android Developer,
                crafting apps that simplify and enhance daily life.
                <br /><br />
                When I’m not coding, I’m either learning new tech, collaborating
                on projects, or brainstorming solutions to interesting problems.
                Let’s connect and build something impactful together!
              </p>
              <div>
                <h4 className="text-xl font-semibold mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {["Kotlin", "Jetpack Compose", "Java", "XML", "Firebase", "Git", "LeetCode", "CodeForces", "Android Studio", "Figma"].map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 dark:bg-gray-700 dark:text-white text-sm px-3 py-1 rounded-full shadow-sm hover:bg-primary hover:text-white transition"
                    >
                      {tech}
                    </span>
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
