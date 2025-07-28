// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool, FaUniversity } from "react-icons/fa";

const EducationTimeline = () => {
  const timelineItems = [
    {
      title: "BSc in Computer Science & Engineering",
      year: "2023 - 2027",
      institution: "Northern University of Business and Technology, Khulna",
      result: "CGPA 3.975 out of 4",
      icon: <FaUniversity className="text-2xl" />,
      highlights: [
        "Specializing in Software Engineering",
        "Active in competitive programming",
        "Coursework includes AI, ML, and Data Structures"
      ]
    },
    {
      title: "Higher Secondary Certificate (Science)",
      year: "2019 - 2021",
      institution: "Govt. Brajalal College, Khulna",
      result: "GPA 5 out of 5",
      icon: <FaSchool className="text-2xl" />,
      highlights: [
        "Mathematics & Physics focus",
        "Participated in science fairs",
        "Class representative"
      ]
    },
    {
      title: "Secondary School Certificate (Science)",
      year: "2017 - 2019",
      institution: "Govt. Jalma Chakrakhali High School",
      result: "GPA 5 out of 5",
      icon: <FaSchool className="text-2xl" />,
      highlights: [
        "Top 1% in district",
        "Science Olympiad participant",
        "Debate team captain"
      ]
    },
  ];

  return (
    <section id="education" className="py-16 md:py-24 px-4 sm:px-6 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 md:mb-6">
            Education Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2"></div>

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
                  {/* Timeline dot with icon */}
                  <div className="absolute top-6 lg:top-1/2 lg:-translate-y-1/2 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary border-4 border-base-100 z-20 flex items-center justify-center text-white">
                    {item.icon}
                  </div>

                  {/* Timeline Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-base-200 shadow-xl hover:shadow-2xl rounded-2xl p-6 w-full lg:w-[45%] z-10 transition-all duration-300 relative overflow-hidden ${
                      isLeft ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                  >
                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <span className="text-sm font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {item.year}
                      </span>
                      <span className="text-sm font-medium px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                        {item.result}
                      </span>
                    </div>
                    
                    <h4 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h4>
                    <p className="text-primary/90 font-medium mb-3">{item.institution}</p>
                    
                    {/* <div className="mt-4 space-y-2">
                      <h5 className="font-semibold text-sm opacity-80">Key Highlights:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm opacity-90">
                        {item.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </div> */}
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