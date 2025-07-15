// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const EducationTimeline = () => {
  return (
    <section
      id="education"
      className="bg-base-100 dark:bg-base-200 text-gray-900 dark:text-white px-6 pt-12 pb-24"
    >
      <div
        className="max-w-6xl mx-auto px-4"
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
                year: "2027 - 2029",
                desc: "Khulna University (Coming Soon)",
              },
              {
                title: "BSc in Computer Science & Engineering",
                year: "2022 - 2027",
                desc: "Northern University of Business and Technology, Khulna",
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
                desc: "Govt. Brajalal College, Khulna",
              },
              {
                title: "SSC (Science)",
                year: "2017 - 2019",
                desc: "Govt. Jalma Chakrakhali High School",
              },
            ].map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  }`}
                  data-aos={isLeft ? "fade-right" : "fade-left"}
                  data-aos-delay={idx * 100}
                >
                  {/* Dot */}
                  <div className="absolute top-5 lg:top-1/2 lg:-translate-y-1/2 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-base-100 z-20"></div>

                  {/* Timeline Content with animation */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`bg-white dark:bg-base-300 shadow-lg hover:shadow-2xl rounded-xl p-6 w-full lg:w-[45%] z-10 transition-all duration-300 ease-in-out ${
                      isLeft ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                  >
                    <div className="text-sm text-primary font-semibold mb-1">
                      {item.year}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-gray-800 dark:text-gray-300">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
