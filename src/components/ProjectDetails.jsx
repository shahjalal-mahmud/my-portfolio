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
      className={`mb-12 ${className}`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
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
      className="px-12 py-12 w-full mx-auto"
    >
      <div className="w-full mx-auto">
        {/* Back button and header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors duration-200 group"
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

          <div className="mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {project.name}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  {project.tagline || project.description}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github}
                  className="btn btn-outline px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> Code
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.live}
                  className="btn bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt /> Live Demo
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <Gallery images={project.media} />
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - quick facts */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
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
                    <span className="mr-2">•</span>
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>
          </div>

          {/* Right main content */}
          <div className="lg:col-span-2 space-y-12">
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
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-sm font-medium">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* Project Details Sections */}
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

            <SectionWrapper title="Project Scope">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-base leading-relaxed"
              >
                {project.scope}
              </motion.p>
            </SectionWrapper>

            <SectionWrapper title="Key Challenges">
              <ul className="space-y-3 list-disc ml-5">
                {project.challenges.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-base"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </SectionWrapper>

            <SectionWrapper title="Current Limitations">
              <ul className="space-y-3 list-disc ml-5">
                {project.limitations.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-base"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </SectionWrapper>

            <SectionWrapper title="My Contributions">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-base leading-relaxed"
              >
                {project.contributions}
              </motion.p>
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
                      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-100 dark:border-gray-700"
                    >
                      <h4 className="font-bold text-primary">{metric.title}</h4>
                      <p className="text-sm mt-1">{metric.value}</p>
                    </motion.div>
                  ))}
                </div>
              </SectionWrapper>
            )}

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
              className="pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-6">Want to see more?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.github}
                  className="btn btn-outline px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> View Full Code
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.live}
                  className="btn bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt /> Try Live Demo
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;