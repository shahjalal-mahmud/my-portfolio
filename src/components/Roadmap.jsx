// src/components/Roadmap.jsx
import React from "react";

const steps = [
  {
    year: "2021",
    title: "Started BSc in CSE",
    desc: "Enrolled at NUBTK, focusing on core programming and algorithms.",
  },
  {
    year: "2022",
    title: "Explored Android Development",
    desc: "Built my first Android app using Java. Later shifted to Kotlin.",
  },
  {
    year: "2023",
    title: "Mastered Jetpack Compose",
    desc: "Built real-world Android projects, learned MVVM, Firebase, and Git.",
  },
  {
    year: "2024",
    title: "Learning Full-Stack Web Dev",
    desc: "Started React, Tailwind, and Firebase to expand into web development.",
  },
  {
    year: "2025",
    title: "Ready for Internships & Freelancing",
    desc: "Building portfolio, applying for internships, and working on startup ideas.",
  },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-20 px-6 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">My Career Roadmap</h2>
        <div className="relative border-l-4 border-primary pl-6 space-y-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[27px] top-1"></div>
              <div className="mb-1 text-sm text-primary font-semibold">{step.year}</div>
              <h4 className="text-xl font-bold">{step.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
