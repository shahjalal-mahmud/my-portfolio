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
                className="underline hover:text-primary transition"
                download
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

      {/* Timeline Section */}
      <div
        className="max-w-6xl mx-auto mt-24 px-4"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 className="text-3xl font-bold text-center mb-14">
          Education & Experience
        </h3>

        <div className="relative">
          {/* Center Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-1 h-full bg-primary transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {[
              {
                title: "MSc in Computer Science",
                year: "2025 - 2027",
                desc: "XYZ University (Coming Soon)",
              },
              {
                title: "BSc in Computer Science & Engineering",
                year: "2021 - 2025",
                desc: "North Western University, Khulna",
              },
              {
                title: "Freelance Android Developer",
                year: "2023 - Present",
                desc: "Created and published Android apps using Kotlin & Jetpack Compose.",
              },
              {
                title: "Open Source Contributor",
                year: "2023 - Present",
                desc: "Contributed to GitHub projects related to Firebase Auth and UI components.",
              },
              {
                title: "HSC (Science)",
                year: "2019 - 2021",
                desc: "ABC College, Dhaka",
              },
              {
                title: "SSC (Science)",
                year: "2017 - 2019",
                desc: "XYZ High School, Khulna",
              },
            ].map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col lg:flex-row items-center ${isLeft ? "lg:justify-start" : "lg:justify-end"
                    }`}
                  data-aos={isLeft ? "fade-right" : "fade-left"}
                  data-aos-delay={idx * 100}
                >
                  {/* Dot */}
                  <div className="absolute top-5 lg:top-1/2 lg:-translate-y-1/2 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-base-100 z-20"></div>

                  {/* Timeline Content */}
                  <div
                    className={`bg-white dark:bg-base-300 shadow-lg rounded-lg p-6 w-full lg:w-[45%] z-10 ${isLeft ? "lg:mr-auto" : "lg:ml-auto"
                      }`}
                  >
                    <div className="text-sm text-primary font-semibold mb-1">
                      {item.year}
                    </div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
