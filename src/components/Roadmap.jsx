import React from "react";
import { FaFlagCheckered } from "react-icons/fa";

const steps = [
  {
    year: "2021",
    title: "Started BSc in CSE",
    desc: "Began Computer Science studies at NUBTK with a passion for solving problems and exploring programming fundamentals.",
  },
  {
    year: "2022",
    title: "Explored Android Development",
    desc: "Built my first Android app using Java, later transitioning to Kotlin and gaining familiarity with Android Studio.",
  },
  {
    year: "2023",
    title: "Mastered Jetpack Compose",
    desc: "Built modern Android apps with MVVM architecture, integrated Firebase, and improved UI/UX using Jetpack Compose.",
  },
  {
    year: "2024",
    title: "Learning Full-Stack Web Dev",
    desc: "Started working with React, Tailwind, Firebase, and MongoDB to build full-stack web applications and dashboards.",
  },
  {
    year: "2025",
    title: "Internships & Startup Projects",
    desc: "Actively applying for internships, building a solid portfolio, and working on real-world startup ideas with a team.",
  },
];

const Roadmap = () => {
  return (
    <section
      id="roadmap"
      className="py-24 px-6 bg-base-100 dark:bg-base-200 text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl font-extrabold text-center mb-20"
          data-aos="fade-up"
        >
          My Career Roadmap
        </h2>

        <div className="relative">
          {/* Vertical line (Mobile) */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-primary/30 dark:bg-primary/40 transform -translate-x-1/2 lg:hidden z-0"></div>

          {/* Horizontal line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-primary/30 dark:bg-primary/40 z-0"></div>

          <div className="flex flex-col gap-16 lg:grid lg:grid-cols-5 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center px-4 pt-10 pb-6 bg-base-100 dark:bg-base-300 shadow-md border border-primary rounded-2xl transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Connector Dot */}
                <div className="absolute -top-5 lg:top-12 lg:-left-5 w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full shadow-lg z-10">
                  <FaFlagCheckered className="text-sm" />
                </div>

                <div className="mt-6 space-y-2">
                  <div className="text-sm font-semibold text-primary">
                    {step.year}
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
