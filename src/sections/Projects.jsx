import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import projects from "../components/ProjectsData";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 md:py-24 px-4 bg-base-100 text-base-content relative overflow-hidden"
    >
      {/* Soft Background Accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center md:text-left mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-xs">
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <motion.article
              key={project.slug}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260 }}
              className="group bg-base-200/50 backdrop-blur-sm border border-base-content/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all"
            >
              {/* Image */}
              <div className="p-5">
                <div className="bg-base-100 rounded-2xl overflow-hidden flex items-center justify-center h-44 md:h-52">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <h3 className="text-xl font-bold tracking-tight mb-2">
                  {project.name}
                </h3>

                <p className="text-sm opacity-70 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-base-300/60 text-base-content/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-ghost gap-2"
                  >
                    <FaGithub /> Code
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline btn-primary gap-2"
                  >
                    <FaExternalLinkAlt /> Live
                  </a>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="ml-auto text-sm font-bold text-primary hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}