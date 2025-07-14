import React from "react";
import { FaBriefcase } from "react-icons/fa";

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

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 px-6 bg-base-200 text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl font-extrabold text-center mb-14"
          data-aos="fade-up"
        >
          Experience
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-base-100 dark:bg-base-300 border border-primary shadow-lg rounded-2xl p-6 transition-all hover:-translate-y-2 hover:shadow-2xl duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary p-3 rounded-full text-white">
                  <FaBriefcase className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.company}
                  </p>
                </div>
              </div>

              <p className="text-xs font-medium text-primary mb-2">
                {exp.duration}
              </p>

              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-primary/10 text-primary dark:text-white dark:bg-primary/30 px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
