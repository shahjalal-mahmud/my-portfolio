import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Roadmap from "./components/Roadmap";
import GitHubStats from "./components/GitHubStats";
import EducationTimeline from './components/EducationTimeline';

function App() {
  const sections = [
    { component: <Hero key="hero" />, name: "Hero" },
    { component: <About key="about" />, name: "About" },
    { component: <EducationTimeline key="education"/>, name: "Education"},
    { component: <Experience key="experience" />, name: "Experience" },
    { component: <Roadmap key="roadmap" />, name: "Roadmap" },
    { component: <Skills key="skills" />, name: "Skills" },
    { component: <Projects key="projects" />, name: "Projects" },
    { component: <GitHubStats key="githubstats" />, name: "GitHubStats" },
    { component: <Contact key="contact" />, name: "Contact" },
  ];

  try {
    return (
      <div className="app">
        <Navbar />
        <main>
          {sections.map((section) => (
            <React.Fragment key={section.name}>
              {section.component}
            </React.Fragment>
          ))}
        </main>
        <Footer />
      </div>
    );
  } catch (err) {
    console.error("App rendering error:", err);
    return (
      <div className="error-fallback" style={{ 
        padding: '2rem',
        textAlign: 'center',
        color: 'red'
      }}>
        <h2>Something went wrong</h2>
        <p>Please refresh the page or try again later.</p>
        <details style={{ color: 'black', marginTop: '1rem' }}>
          <summary>Error details</summary>
          <pre>{err.message}</pre>
        </details>
      </div>
    );
  }
}

export default App;