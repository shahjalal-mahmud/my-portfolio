import React from "react";
import { FaBriefcase, FaCode, FaRocket, FaUserTie, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    title: "Founder & Technical Project Manager",
    company: "Appriyo",
    link: "https://appriyo.com",
    duration: "Jan 2026 – Present",
    type: "Hybrid",
    location: "Khulna, BD",
    icon: <FaRocket />,
    description: "Leading an agile team of 4 to deliver end-to-end IT solutions. Architecting scalable MVPs and overseeing technical execution from Jetpack Compose to React ecosystems.",
    achievements: [
      "Launched NFC Networking solutions",
      "Reduced MVP dev time by 30%",
      "Leading UI/UX & Marketing synergy"
    ],
    color: "primary",
  },
  {
    title: "Android Developer",
    company: "Independent Product",
    link: "https://drive.google.com/file/d/1m7_lfMzOZHbpO7EsQEGvl3I9crFPEuTQ/view?usp=sharing",
    duration: "July 2025 – Jan 2026",
    type: "Active Product",
    location: "Remote",
    icon: <FaCode />,
    description: "Engineered a complete POS & Management system for repair shops. Actively used by 5 owners for stock management and financial reporting.",
    achievements: [
      "Integrated Bluetooth POS Printing",
      "Built automated SMS reminders",
      "Full inventory & Talikhata systems"
    ],
    color: "secondary",
  },
  {
    title: "Freelance React Developer",
    company: "University Client",
    link: "https://anindyanag.netlify.app/",
    duration: "Jun 2025 – July 2025",
    type: "Client Project",
    location: "Remote",
    icon: <FaUserTie />,
    description: "Developed a secure, admin-controlled portfolio platform for university faculty to manage academic publications and dynamic CV generation.",
    achievements: [
      "Real-time CRUD with Firestore",
      "Responsive UI with modal editing",
      "Secure image hosting integration"
    ],
    color: "accent",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-base-100 relative overflow-hidden">
      {/* Decorative Background Elements - matching Education */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-primary"></div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Professional Journey</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-base-content italic"
          >
            Experience <span className="text-primary not-italic">.</span>
          </motion.h2>
        </header>

        {/* Card Grid - Matching Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full bg-base-200/50 backdrop-blur-md border border-base-content/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-base-200 hover:border-primary/30 shadow-sm hover:shadow-2xl hover:shadow-primary/5">
                
                {/* Top Section: Icon & Year */}
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl bg-${item.color} text-${item.color}-content text-2xl shadow-lg shadow-${item.color}/20 group-hover:rotate-12 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                      {item.duration}
                    </span>
                    <span className="text-[9px] opacity-60 font-bold">{item.location}</span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex flex-col gap-2">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`text-sm font-bold text-${item.color} flex items-center gap-2 hover:underline decoration-2 underline-offset-4 group/link`}
                    >
                      {item.company}
                      <FaExternalLinkAlt className="text-[10px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-outline badge-sm opacity-70 font-bold">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="pt-6">
                    <h4 className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40 mb-3">Key Contributions</h4>
                    <ul className="space-y-2">
                      {item.achievements.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                          <span className={`w-1.5 h-1.5 rounded-full bg-${item.color} mt-1.5 shrink-0`}></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Decorative Number - consistent with Education */}
                <div className="absolute bottom-6 right-10 text-6xl font-black opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                  0{idx + 1}
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