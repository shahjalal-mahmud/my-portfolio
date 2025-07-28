import React from "react";
import { FaBriefcase } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
  {
    title: "Team Lead & App Developer – Prodorshok",
    company: "UIHP Cohort 3 (BHTPA)",
    duration: "March 2025 – July 2025",
    description:
      "Led a 5-member team to build Prodorshok, an AI-powered career guidance app for Bangladeshi students, under the national UIHP innovation program. Developed MVP with Kotlin, Jetpack Compose, Firebase & AI, featuring personalized roadmaps, mentor matching, and skill-based course recommendations. Validated product with 150+ students across 10 universities, ensuring problem-solution fit.",
    tags: ["Android","Kotlin & Compose", "AI Integration","Firebase","Startup", "Leadership", "Team Management"],
  },
  {
    title: "Freelance React Developer – Portfolio Project",
    company: "University Teacher (NUBTK)",
    duration: "Jun 2025 – Jul 2025",
    description:
      "Built a secure, admin-controlled portfolio platform with React, Firebase, and Tailwind CSS (DaisyUI). Implemented real-time CRUD operations, Firebase Auth, and Firestore rules to enable the client to dynamically manage their academic profile, publications, CV, and contact sections without coding. Key features included inline/modal editing, image uploads (imgBB), and responsive UX design.",
    tags: [
      "React", "Firebase Auth", "Firestore", "Tailwind CSS", "DaisyUI",
      "Fullstack", "UX Design", "Client Collaboration"
    ],
  },
   {
    title: "Fullstack Developer – Digital Portfolio Platform",
    company: "Self-Initiated Startup Project",
    duration: "July 2025 – Present",
    description:
      "Built a web platform enabling students and professionals to create and share personalized digital portfolios with editable templates, 30+ themes, 100+ fonts, and contact-saving features. Integrated secure login via email and student ID using Firebase Auth. Users can share their portfolio via QR-coded physical cards. Designed with monetization model and personalized branding. Includes promotional backlink to my own portfolio site for client reach.",
    tags: ["React", "Firebase", "Tailwind CSS", "Authentication", "Design Systems", "Startup", "Monetization"],
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