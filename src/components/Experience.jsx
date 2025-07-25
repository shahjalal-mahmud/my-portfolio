import React from "react";
import { FaBriefcase } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      title: "Android App Developer",
      company: "Freelancer",
      duration: "2023 - Present",
      description:
        "Developed and published multiple Android apps with Kotlin and Jetpack Compose, focusing on performance, animations, and Firebase integration.",
      tags: ["Kotlin", "Jetpack Compose", "Firebase"],
    },
    {
      title: "Frontend Intern",
      company: "Tech Firm XYZ",
      duration: "June 2024 - Sept 2024",
      description:
        "Built responsive UIs using React and Tailwind CSS. Improved component reusability and accessibility across dashboards.",
      tags: ["React", "Tailwind CSS", "UI/UX"],
    },
    {
      title: "Campus Ambassador",
      company: "Dev Community Bangladesh",
      duration: "2022 - 2023",
      description:
        "Organized workshops, promoted developer tools, and supported the community by bridging student developers with professionals.",
      tags: ["Community", "Leadership", "Event Management"],
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 md:mb-16">
          Experience
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="card bg-base-100 shadow-lg hover:shadow-xl rounded-2xl overflow-hidden border border-primary/20"
            >
              <div className="card-body p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary text-primary-content p-3 rounded-full">
                    <FaBriefcase className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-sm opacity-80">{exp.company}</p>
                  </div>
                </div>

                <p className="text-xs font-medium text-primary mb-2">
                  {exp.duration}
                </p>

                <p className="text-sm leading-relaxed opacity-90 mb-4">
                  {exp.description}
                </p>

                <div className="card-actions flex flex-wrap gap-2">
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="badge badge-outline badge-primary hover:badge-primary hover:text-primary-content"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;