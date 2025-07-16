import { useParams, Link } from "react-router-dom";
import projects from "../components/ProjectsData";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Import section components
import Gallery from "./ProjectDetails/Gallery";
import Features from "./ProjectDetails/Features";
import TechStack from "./ProjectDetails/TechStack";
import Skills from "./ProjectDetails/Skills";
// import Documentation from "./ProjectDetails/Documentation";
// import ReadmeInfo from "./ProjectDetails/ReadmeInfo";
import Problem from "./ProjectDetails/Problem";
import Objective from "./ProjectDetails/Objective";
import Scope from "./ProjectDetails/Scope";
// import Flowchart from "./ProjectDetails/Flowchart";
// import Architecture from "./ProjectDetails/Architecture";
import Challenges from "./ProjectDetails/Challenges";
import Limitations from "./ProjectDetails/Limitations";
import Contributions from "./ProjectDetails/Contributions";
// import FutureWork from "./ProjectDetails/FutureWork";
import Conclusion from "./ProjectDetails/Conclusion";
import Metrics from "./ProjectDetails/Metrics";

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <div className="text-center mt-20 text-red-500">Project not found.</div>;
  return (
    <section className="px-4 py-16 max-w-5xl mx-auto">
      <Link to="/" className="btn mb-6"><FaArrowLeft /> Back to Home</Link>

      <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">{project.description}</p>

      <div className="w-full flex justify-center mb-10">
        <div className="bg-gray-100 dark:bg-white/10 p-6 rounded-xl shadow-lg max-w-xs w-full">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>


      <Gallery images={project.media} />
      <Features features={project.features} />
      <TechStack techStack={project.techStack} />
      <Skills skills={project.skills} extras={project.extras} />

      <Problem text={project.problem} />
      <Objective text={project.objective} />
      <Scope text={project.scope} />
      <Challenges text={project.challenges} />
      <Limitations text={project.limitations} />
      <Contributions text={project.contributions} />
      <Conclusion text={project.conclusion} />
      <Metrics list={project.metrics} />

      {/* <Documentation doc={project.documentation} />
      <ReadmeInfo content={project.readme} />
      <Flowchart text={project.flowchart} />
      <FutureWork text={project.future} /> */}

      <div className="flex gap-4 mt-10">
        <a href={project.github} className="btn btn-outline" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
        <a href={project.live} className="btn btn-primary" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Live Demo</a>
      </div>
    </section>
  );
};

export default ProjectDetails;
