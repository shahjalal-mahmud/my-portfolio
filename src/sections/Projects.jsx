// src/components/Projects.jsx
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    name: "StudySync App",
    description: "An Android productivity app for students to manage tasks, notes, and study plans efficiently.",
    skills: ["Kotlin", "Jetpack Compose", "Firebase"],
    extras: ["MVVM", "Room", "Coroutines", "Retrofit"],
    image: "/projects/studysync.png",
    github: "https://github.com/yourusername/studysync-app",
    live: "https://play.google.com/store/apps/details?id=com.yourdomain.studysync",
  },
  {
    name: "Health Tracker",
    description: "A health monitoring app with step counter, calorie tracker, and daily goals. Uses sensors & Firebase.",
    skills: ["Kotlin", "Firebase", "Sensor API"],
    extras: ["MVVM", "LiveData", "Jetpack Navigation"],
    image: "/projects/healthtracker.avif",
    github: "https://github.com/yourusername/health-tracker",
    live: "#",
  },
  {
    name: "JobFinder BD",
    description: "Android app for fresh graduates to search local jobs. Integrated job API with filters and bookmarks.",
    skills: ["Kotlin", "Jetpack Compose", "REST API"],
    extras: ["Retrofit", "Hilt", "MVVM"],
    image: "/projects/jobfinder.webp",
    github: "https://github.com/yourusername/jobfinder-bd",
    live: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-base-100 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">My Projects</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-xl border border-primary hover:shadow-2xl transition-all duration-300"
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
            >
              <figure className="w-full h-48 overflow-hidden rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-center"
                />
              </figure>

              <div className="card-body text-left">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>

                {/* Main Skills */}
                <div className="pt-2">
                  <h4 className="text-sm font-semibold mb-1">Main Tech</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, i) => (
                      <span key={i} className="badge badge-primary badge-outline">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Additional Skills */}
                <div className="pt-2">
                  <h4 className="text-sm font-semibold mb-1">Other Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.extras.map((tool, i) => (
                      <span key={i} className="badge badge-outline">{tool}</span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="pt-4 flex gap-4">
                  <a
                    href={project.github}
                    className="btn btn-sm btn-outline flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href={project.live}
                    className="btn btn-sm btn-primary flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
