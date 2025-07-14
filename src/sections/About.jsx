// src/components/About.jsx
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaDownload,
  FaUserGraduate,
} from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-base-100 dark:bg-base-200 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Profile Image */}
        <div
          className="w-full md:w-1/2 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img
            src="/profile.png"
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
            I'm a curious and passionate software developer currently pursuing my Bachelor's in Computer Science. I specialize in Android development using <span className="text-primary font-semibold">Kotlin & Jetpack Compose</span>, and I’m expanding into full-stack development using modern web technologies.
          </p>

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

          {/* Tech Stack */}
          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {[
                "Kotlin",
                "Jetpack Compose",
                "Java",
                "React",
                "Tailwind CSS",
                "Firebase",
                "Git",
                "Node.js",
                "MongoDB",
                "Figma",
              ].map((tech, idx) => (
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
    </section>
  );
};

export default About;
