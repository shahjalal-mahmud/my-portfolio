import { FaMapMarkerAlt, FaEnvelope, FaDownload, FaUserGraduate } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div
          className="w-full md:w-1/2 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img
            src="/profile.png"
            alt="Profile"
            className="w-60 h-60 object-cover rounded-xl shadow-lg border-4 border-primary"
          />
        </div>

        {/* Text */}
        <div
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          data-aos="fade-left"
        >
          <h2 className="text-4xl font-bold">About Me</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            I’m a passionate software enthusiast currently pursuing Computer Science. I love building sleek and modern apps for the web and mobile using the latest tech.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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
              <a href="/cv.pdf" className="underline hover:text-primary" download>
                Download CV
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="badge badge-outline">Kotlin</span>
              <span className="badge badge-outline">Jetpack Compose</span>
              <span className="badge badge-outline">Java</span>
              <span className="badge badge-outline">React</span>
              <span className="badge badge-outline">Tailwind CSS</span>
              <span className="badge badge-outline">Firebase</span>
              <span className="badge badge-outline">Git</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div
        className="max-w-4xl mx-auto mt-20"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 className="text-3xl font-bold text-center mb-10">Education & Experience</h3>
        <div className="relative border-l-4 border-primary pl-6 space-y-10">

          {/* Timeline Item */}
          {[
            { title: "MSc in Computer Science", year: "2025 - 2027", desc: "XYZ University (Coming Soon)" },
            { title: "BSc in Computer Science", year: "2021 - 2025", desc: "NUBTK University" },
            { title: "HSC (Science)", year: "2019 - 2021", desc: "ABC College, Dhaka" },
            { title: "SSC (Science)", year: "2017 - 2019", desc: "XYZ High School, Khulna" },
            { title: "Freelance Android Developer", year: "2023 - Present", desc: "Built & published several Kotlin-based apps" },
          ].map((item, idx) => (
            <div key={idx} className="timeline-item" data-aos="fade-right" data-aos-delay={idx * 150}>
              <div className="mb-1 text-sm text-primary font-semibold">{item.year}</div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
