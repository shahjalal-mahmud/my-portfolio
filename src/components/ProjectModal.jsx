// src/components/Projects.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    slug: "studysync",
    name: "StudySync App",
    description: "An Android productivity app for students to manage tasks, notes, and study plans efficiently.",
    skills: ["Kotlin", "Jetpack Compose", "Firebase"],
    extras: ["MVVM", "Room", "Coroutines", "Retrofit"],
    image: "/projects/prodorshok/prodorshok_logo.png",
    github: "https://github.com/yourusername/studysync-app",
    live: "https://play.google.com/store/apps/details?id=com.yourdomain.studysync",
    story: "This app was created to help students organize their study habits during my second year of university when I noticed how disorganized my peers were with their study materials.",
    features: ["Task Management", "Note Taking", "Daily Reminders", "Pomodoro Timer", "Grade Tracker"],
    documentation: "Available on GitHub wiki with detailed setup instructions.",
    readme: "See README.md in repo for basic setup and features overview.",
    problem: "Students often lose track of notes, deadlines, and struggle with time management between classes.",
    objective: "Provide one unified platform for all academic productivity tools with cloud sync capabilities.",
    scope: "Focus on university students using Android phones with potential iOS expansion later.",
    flowchart: "Diagram available in the docs folder showing data flow and architecture.",
    architecture: "MVVM with repository pattern, Room DB for local storage, and Firebase for cloud sync.",
    challenges: "Sync issues with Firebase real-time updates and conflict resolution between devices.",
    limitations: "Currently Android-only, lacks tablet optimization, and has basic UI customization.",
    contributions: "Solo Project - Designed UI, implemented features, and handled deployment.",
    future: "Add AI study plan recommender, collaborative study groups, and PDF annotation features.",
    conclusion: "Early beta tests with 50 students showed 78% reported improved organization and time management.",
  }
];
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
              <figure className="w-full h-48 overflow-hidden rounded-t-xl">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body text-left">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.skills.map((skill, i) => (
                    <span key={i} className="badge badge-primary badge-outline">{skill}</span>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <a href={project.github} className="btn btn-sm btn-outline" target="_blank"><FaGithub /></a>
                  <a href={project.live} className="btn btn-sm btn-primary" target="_blank"><FaExternalLinkAlt /></a>
                  <Link to={`/projects/${project.slug}`} className="btn btn-sm btn-secondary">See More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
