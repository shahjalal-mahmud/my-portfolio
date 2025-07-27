// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const EducationTimeline = () => {
  const timelineItems = [
    {
      title: "BSc in Computer Science & Engineering",
      year: "2022 - 2027",
      desc: "Northern University of Business and Technology, Khulna",
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
  ];

  return (
    <section id="education" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          Education & Experience
        </h3>

        <div className="relative">
          {/* Center Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-1 h-full bg-primary transform -translate-x-1/2"></div>

          <div className="space-y-8 md:space-y-12">
            {timelineItems.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute top-6 lg:top-1/2 lg:-translate-y-1/2 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-base-100 z-20"></div>

                  {/* Timeline Content */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`bg-base-100 shadow-lg hover:shadow-xl rounded-xl p-6 w-full lg:w-[45%] z-10 transition-all duration-300 ${
                      isLeft ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                  >
                    <div className="text-sm text-primary font-semibold mb-1">
                      {item.year}
                    </div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="opacity-90">{item.desc}</p>
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