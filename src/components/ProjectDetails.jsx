import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import projects from "../components/ProjectsData";
import TechStack from "./ProjectDetails/TechStack";
import Gallery from "./ProjectDetails/Gallery";

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <div className="text-center mt-20 text-red-500">Project not found.</div>;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const SectionWrapper = ({ title, children, className = "" }) => (
    <motion.div
      variants={itemVariants}
      className={`mb-8 ${className}`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-4 sm:px-6 lg:px-8 py-12 w-full mx-auto max-w-7xl"
    >
      {/* Back button and header */}
      <div className="mb-12">
        <Link
          to="/hero"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors duration-200 group mb-8"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -5 }}
            className="inline-block"
          >
            <FaArrowLeft />
          </motion.span>
          <span className="group-hover:underline">Back to Projects</span>
        </Link>

        {/* Project Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {/* Cover Image */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="bg-base-200 rounded-xl aspect-square flex items-center justify-center p-6 shadow-sm border border-base-300 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.name} 
                className="object-contain max-h-full max-w-full"
              />
            </div>
          </div>
          
          {/* Project Info */}
          <div className="flex-grow">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {project.name}
                  </h1>
                  <div className="badge badge-primary badge-lg">{project.skills[0]}</div>
                </div>
                
                <p className="text-lg text-base-content/80 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill, index) => (
                    <div key={index} className="badge badge-outline">{skill}</div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                {project.github && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    className="btn btn-primary gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> View Code
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.live}
                    className="btn btn-secondary gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery images={project.media} />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Left sidebar - quick facts */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            variants={itemVariants}
            className="bg-base-200 p-6 rounded-xl shadow-sm border border-base-300"
          >
            <h3 className="text-xl font-semibold mb-4">Project Details</h3>
            <ul className="space-y-3">
              {project.date && (
                <li className="flex items-start">
                  <span className="font-medium mr-2">Date:</span>
                  <span>{project.date}</span>
                </li>
              )}
              {project.role && (
                <li className="flex items-start">
                  <span className="font-medium mr-2">Role:</span>
                  <span>{project.role}</span>
                </li>
              )}
              {project.team && (
                <li className="flex items-start">
                  <span className="font-medium mr-2">Team:</span>
                  <span>{project.team}</span>
                </li>
              )}
              {project.duration && (
                <li className="flex items-start">
                  <span className="font-medium mr-2">Duration:</span>
                  <span>{project.duration}</span>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <SectionWrapper title="Tech Stack">
            <TechStack techStack={project.techStack} />
          </SectionWrapper>

          {/* Skills */}
          <SectionWrapper title="Skills Applied">
            <div className="space-y-3">
              {project.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={featureVariants}
                  className="flex items-start"
                >
                  <span className="mr-2 text-primary">•</span>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>

        {/* Right main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Features */}
          <SectionWrapper title="Features">
            <div className="grid sm:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={featureVariants}
                  className="bg-base-100 p-4 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-base-300"
                >
                  <p className="font-medium">{feature}</p>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>

          {/* Project Story */}
          <SectionWrapper title="Project Story">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-base leading-relaxed"
            >
              {project.story}
            </motion.p>
          </SectionWrapper>

          {/* Problem Statement */}
          <SectionWrapper title="The Problem">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-base leading-relaxed"
            >
              {project.problem}
            </motion.p>
          </SectionWrapper>

          {/* Project Objective */}
          <SectionWrapper title="Project Objective">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-base leading-relaxed"
            >
              {project.objective}
            </motion.p>
          </SectionWrapper>

          {/* Key Challenges */}
          <SectionWrapper title="Key Challenges">
            <ul className="space-y-3">
              {project.challenges.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 bg-base-200 p-4 rounded-lg"
                >
                  <span className="text-error mt-1">⚠️</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </SectionWrapper>

          {/* Current Limitations */}
          <SectionWrapper title="Current Limitations">
            <ul className="space-y-3">
              {project.limitations.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 bg-base-200 p-4 rounded-lg"
                >
                  <span className="text-warning mt-1">⛔</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </SectionWrapper>

          {/* Future Plans */}
          <SectionWrapper title="Future Plans">
            <ul className="space-y-3">
              {project.future.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 bg-base-200 p-4 rounded-lg"
                >
                  <span className="text-success mt-1">🚀</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </SectionWrapper>

          {/* Metrics */}
          {project.metrics && (
            <SectionWrapper title="Key Metrics">
              <div className="grid sm:grid-cols-2 gap-4">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={featureVariants}
                    className="bg-base-100 p-4 rounded-xl shadow border border-base-300"
                  >
                    <p className="text-base-content/80">{metric}</p>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {/* Conclusion */}
          <SectionWrapper title="Conclusion">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-base leading-relaxed"
            >
              {project.conclusion}
            </motion.p>
          </SectionWrapper>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-base-300"
          >
            <h3 className="text-2xl font-bold mb-6">Want to see more?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              {project.github && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.github}
                  className="btn btn-primary gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> View Full Code
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.live}
                  className="btn btn-secondary gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt /> Try Live Demo
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;