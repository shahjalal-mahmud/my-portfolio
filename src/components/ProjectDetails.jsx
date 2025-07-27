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

  if (!project) return <div className="text-center mt-20 text-error">Project not found.</div>;

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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-4 sm:px-6 lg:px-8 py-12 w-full mx-auto max-w-6xl"
    >
      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 mb-12 border border-primary/20"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="bg-base-100 rounded-2xl aspect-square flex items-center justify-center p-6 shadow-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {project.name}
            </h1>
            <p className="text-xl text-base-content/80 mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              {project.skills.map((skill, index) => (
                <span key={index} className="badge badge-lg badge-outline border-primary/30 text-primary">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {project.github && (
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.github}
                  className="btn btn-primary btn-lg gap-2 shadow-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> View Code
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.live}
                  className="btn btn-secondary btn-lg gap-2 shadow-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt /> Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gallery Section */}
      <motion.div variants={itemVariants} className="mb-16">
        <Gallery images={project.media} />
      </motion.div>

      {/* Project Story */}
      <motion.div
        variants={fadeIn}
        className="bg-base-100 rounded-3xl p-8 mb-12 shadow-sm border border-base-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-primary">Project Story</h2>
        <p className="text-lg leading-relaxed text-base-content/80">{project.story}</p>
      </motion.div>

      {/* Features & Tech Stack */}
      <motion.div
        variants={fadeIn}
        className="grid md:grid-cols-2 gap-8 mb-12"
      >
        <div className="bg-base-100 rounded-3xl p-8 shadow-sm border border-base-200">
          <h2 className="text-3xl font-bold mb-6 text-primary">Key Features</h2>
          <ul className="space-y-4">
            {project.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="text-primary mt-1">✦</span>
                <span className="text-base-content/80">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-base-100 rounded-3xl p-8 shadow-sm border border-base-200">
          <h2 className="text-3xl font-bold mb-6 text-primary">Tech Stack</h2>
          <TechStack techStack={project.techStack} />
        </div>
      </motion.div>

      {/* Problem & Solution */}
      <motion.div
        variants={fadeIn}
        className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 mb-12 border border-primary/20"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">The Challenge</h2>
            <p className="text-lg leading-relaxed text-base-content/80">{project.problem}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">My Solution</h2>
            <p className="text-lg leading-relaxed text-base-content/80">{project.objective}</p>
          </div>
        </div>
      </motion.div>

      {/* Development Insights */}
      <motion.div variants={fadeIn} className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Development Insights</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-error">⚠️</span> Challenges
            </h3>
            <ul className="space-y-3">
              {project.challenges.map((item, i) => (
                <li key={i} className="text-base-content/80">• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-warning">⛔</span> Limitations
            </h3>
            <ul className="space-y-3">
              {project.limitations.map((item, i) => (
                <li key={i} className="text-base-content/80">• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-success">🚀</span> Future Plans
            </h3>
            <ul className="space-y-3">
              {project.future.map((item, i) => (
                <li key={i} className="text-base-content/80">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      {project.metrics && (
        <motion.div
          variants={fadeIn}
          className="bg-base-100 rounded-3xl p-8 mb-12 shadow-sm border border-base-200"
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Project Impact</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-primary/5 p-4 rounded-xl border border-primary/10"
              >
                <p className="text-base-content/80">{metric}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Conclusion */}
      <motion.div
        variants={fadeIn}
        className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 mb-12 border border-primary/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion</h2>
        <p className="text-lg leading-relaxed text-base-content/80">{project.conclusion}</p>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        variants={itemVariants}
        className="text-center"
      >
        <h3 className="text-2xl font-bold mb-6">Want to explore further?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {project.github && (
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={project.github}
              className="btn btn-primary btn-lg gap-2 shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> View Full Code
            </motion.a>
          )}
          {project.live && (
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={project.live}
              className="btn btn-secondary btn-lg gap-2 shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt /> Try Live Demo
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;