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

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience/>
      <Roadmap/>
      <Skills />
      <Projects />
      <GitHubStats/>
      <Contact />
      <Footer />
    </>
  );
}

export default App;
