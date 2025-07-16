// src/components/Projects.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projects from "./ProjectsData";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">My Projects</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="card bg-base-200 shadow-xl border border-primary hover:shadow-2xl transition-all"
            >
              <figure className="w-full bg-white dark:bg-white/10 flex justify-center items-center p-4 h-72 rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full object-contain"
                />
              </figure>

              <div className="card-body text-left">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.skills.map((skill, i) => (
                    <span key={i} className="badge badge-primary badge-outline">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <a
                    href={project.github}
                    className="btn btn-sm btn-outline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> Github
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      className="btn btn-sm btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> Live Link
                    </a>
                  )}
                  <Link
                    to={`/projects/${project.slug}`}
                    className="btn btn-sm btn-secondary"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
