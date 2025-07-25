import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import projects from "../components/ProjectsData";

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">My Projects</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="card bg-base-200 shadow-md hover:shadow-xl border border-base-300"
            >
              <figure className="px-4 pt-4 bg-base-100 flex justify-center items-center h-48 sm:h-56 md:h-64">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full object-contain rounded-lg"
                />
              </figure>

              <div className="card-body p-4 md:p-6">
                <h3 className="card-title text-lg md:text-xl">{project.name}</h3>
                <p className="text-sm opacity-90">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="badge badge-outline badge-primary hover:badge-primary hover:text-primary-content"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="card-actions mt-4 flex flex-wrap gap-2">
                  <a 
                    href={project.github} 
                    className="btn btn-sm btn-outline gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> Github
                  </a>
                  <a 
                    href={project.live} 
                    className="btn btn-sm btn-primary gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Live
                  </a>
                  <Link 
                    to={`/projects/${project.slug}`} 
                    className="btn btn-sm btn-secondary"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}