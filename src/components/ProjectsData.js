// Back-compat shim — single source of truth lives at src/shared/data/projects.js.
// This file preserves every existing `import projects from "../components/ProjectsData"`
// across the codebase without touching git history of importers.

export {
  default,
  getProjectBySlug,
  getProjectSlugs,
  getAdjacentProjects,
} from "../shared/data/projects";