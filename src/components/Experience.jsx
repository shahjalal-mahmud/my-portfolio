// src/components/Experience.jsx
import React from "react";
import { FaBriefcase } from "react-icons/fa";

const experiences = [
  {
    title: "Android App Developer",
    company: "Freelancer",
    duration: "2023 - Present",
    description: "Built and published several Android apps using Kotlin and Jetpack Compose.",
  },
  {
    title: "Frontend Intern",
    company: "Tech Firm XYZ",
    duration: "June 2024 - Sept 2024",
    description: "Worked on responsive React-based dashboards and user interface improvements.",
  },
  {
    title: "Campus Ambassador",
    company: "Dev Community Bangladesh",
    duration: "2022 - 2023",
    description: "Promoted events and built awareness about developer tools among students.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-base-200 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Experience</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-primary"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="card-body space-y-3">
                <FaBriefcase className="text-2xl text-primary" />
                <h3 className="card-title">{exp.title}</h3>
                <p className="text-sm text-gray-500">{exp.company}</p>
                <p className="text-xs">{exp.duration}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
