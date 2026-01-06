import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity, FaSchool, FaExternalLinkAlt } from "react-icons/fa";

const Education = () => {
  const educationItems = [
    {
      title: "BSc in Computer Science & Engineering",
      year: "2023 — 2027",
      institution: "Northern University of Business and Technology, Khulna",
      link: "https://nubtk.ac.bd/",
      result: "CGPA 3.975 / 4.00",
      icon: <FaUniversity />,
      highlights: ["Specializing in Software Engineering", "Departmental Topper", "Active in Competitive Programming"]
    },
    {
      title: "Higher Secondary Certificate",
      year: "2019 — 2021",
      institution: "Govt. Brajalal College, Khulna",
      link: "http://nsc.blcollege.gov.bd/",
      result: "GPA 5.00 / 5.00",
      icon: <FaSchool />,
      highlights: ["Science Group", "Mathematics focus", "Academic Excellence"]
    },
    {
      title: "Secondary School Certificate",
      year: "2017 — 2019",
      institution: "Govt. Jalma Chakrakhali High School",
      link: "https://www.facebook.com/GZCHSOfficial/",
      result: "GPA 5.00 / 5.00",
      icon: <FaGraduationCap />,
      highlights: ["Science Group", "Top 1% in District", "Science Olympiad"]
    }
  ];

  return (
    <section id="education" className="py-24 px-6 bg-base-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-primary"></div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Academic Background</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-base-content italic"
          >
            Education <span className="text-primary not-italic">.</span>
          </motion.h2>
        </header>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationItems.map((item, idx) => (
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
                  <div className="p-4 rounded-2xl bg-primary text-primary-content text-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                    {item.year}
                  </span>
                </div>

                {/* Main Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black leading-tight">
                    {item.title}
                  </h3>
                  
                  <div className="flex flex-col gap-2">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-primary flex items-center gap-2 hover:underline decoration-2 underline-offset-4 group/link"
                    >
                      {item.institution}
                      <FaExternalLinkAlt className="text-[10px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-outline badge-primary font-black text-[10px] px-3">
                        {item.result}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Reveal on Hover (Desktop) or Always Visible (Mobile) */}
                  <div className="pt-6">
                    <h4 className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40 mb-3">Key Achievments</h4>
                    <ul className="space-y-2">
                      {item.highlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Decorative Number */}
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

export default Education;