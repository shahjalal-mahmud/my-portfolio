// MobileProjectDetails — M3-styled project detail page.

import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getProjectBySlug, getAdjacentProjects } from "../../shared/data/projects";
import M3Card from "../components/M3Card";
import M3Button from "../components/M3Button";
import M3Chip from "../components/M3Chip";

export default function MobileProjectDetails() {
  const { slug } = useParams();
  const project = useMemo(() => getProjectBySlug(slug), [slug]);
  const { prev, next } = useMemo(() => getAdjacentProjects(slug), [slug]);

  if (!project) {
    return (
      <div className="px-4 py-8 text-center">
        <h2 className="m3-headline-medium text-base-content">Project not found</h2>
        <Link to="/skills-projects" className="text-primary font-semibold mt-3 inline-block">
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.32 }}
      >
        <M3Card elevation={2} className="!p-3 bg-base-200/40">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-44 object-contain rounded-xl"
          />
        </M3Card>
      </motion.div>

      {/* Title */}
      <div>
        <h2 className="m3-headline-medium text-base-content">{project.name}</h2>
        <p className="m3-body-medium text-base-content/70 mt-1">{project.description}</p>
      </div>

      {/* Skills */}
      <div>
        <p className="m3-label-large text-base-content/55 mb-2">Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((s) => (
            <M3Chip key={s} label={s} />
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-2">
        <M3Button
          variant="tonal"
          icon={<FaGithub />}
          href={project.github}
          size="small"
        >
          Code
        </M3Button>
        {project.live && (
          <M3Button
            variant="filled"
            icon={<FaExternalLinkAlt />}
            iconRight={<FaArrowRight />}
            href={project.live}
            size="small"
          >
            Live
          </M3Button>
        )}
      </div>

      {/* Story */}
      <M3Card elevation={1}>
        <p className="m3-label-large text-base-content/55 mb-1">Story</p>
        <p className="m3-body-medium text-base-content/85">{project.story}</p>
      </M3Card>

      {/* Features */}
      <M3Card elevation={1}>
        <p className="m3-label-large text-base-content/55 mb-2">Features</p>
        <ul className="space-y-1.5">
          {project.features.map((f, i) => (
            <li key={i} className="flex gap-2 m3-body-medium text-base-content/85">
              <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </M3Card>

      {/* Problem / objective */}
      <div className="grid grid-cols-1 gap-3">
        <M3Card elevation={0} className="bg-primary/8 border border-primary/20">
          <p className="m3-label-large text-primary mb-1">Problem</p>
          <p className="m3-body-medium text-base-content/85">{project.problem}</p>
        </M3Card>
        <M3Card elevation={0} className="bg-secondary/8 border border-secondary/20">
          <p className="m3-label-large text-secondary mb-1">Objective</p>
          <p className="m3-body-medium text-base-content/85">{project.objective}</p>
        </M3Card>
      </div>

      {/* Architecture / challenges */}
      <M3Card elevation={1}>
        <p className="m3-label-large text-base-content/55 mb-1">Architecture</p>
        <p className="m3-body-medium text-base-content/85">{project.architecture}</p>
      </M3Card>

      <M3Card elevation={1}>
        <p className="m3-label-large text-base-content/55 mb-2">Challenges</p>
        <ul className="space-y-1.5">
          {project.challenges.map((c, i) => (
            <li key={i} className="flex gap-2 m3-body-medium text-base-content/80">
              <span className="text-warning mt-1.5 w-1.5 h-1.5 rounded-full bg-warning flex-shrink-0" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </M3Card>

      {/* Tech stack grouped */}
      {project.techStack && (
        <M3Card elevation={1}>
          <p className="m3-label-large text-base-content/55 mb-2">Tech Stack</p>
          <div className="space-y-2">
            {Object.entries(project.techStack).map(([group, items]) => (
              <div key={group}>
                <p className="m3-label-medium text-base-content/45 capitalize">{group}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {items.map((i) => (
                    <M3Chip key={i} label={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </M3Card>
      )}

      {/* Metrics */}
      <M3Card elevation={0} className="bg-primary text-primary-content !border-0">
        <p className="m3-label-large opacity-80 mb-2">Key Metrics</p>
        <ul className="space-y-1">
          {project.metrics.map((m, i) => (
            <li key={i} className="flex gap-2 m3-body-medium">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-content flex-shrink-0" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </M3Card>

      {/* Prev / next */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        {prev && (
          <Link to={`/projects/${prev.slug}`}>
            <M3Card elevation={1} className="text-left">
              <p className="m3-label-medium text-base-content/55 flex items-center gap-1">
                <FaArrowLeft className="text-[10px]" /> Previous
              </p>
              <p className="m3-body-large font-semibold text-base-content truncate mt-0.5">
                {prev.name.split(" - ")[0]}
              </p>
            </M3Card>
          </Link>
        )}
        {next && (
          <Link to={`/projects/${next.slug}`}>
            <M3Card elevation={1} className="text-left">
              <p className="m3-label-medium text-base-content/55 flex items-center justify-end gap-1">
                Next <FaArrowRight className="text-[10px]" />
              </p>
              <p className="m3-body-large font-semibold text-base-content truncate mt-0.5 text-right">
                {next.name.split(" - ")[0]}
              </p>
            </M3Card>
          </Link>
        )}
      </div>
    </div>
  );
}