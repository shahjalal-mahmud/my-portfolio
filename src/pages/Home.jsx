import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Experience from "../components/Experience";
import Roadmap from "../components/Roadmap";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import GitHubStats from "../components/GitHubStats";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";
import TestimonialsCertificates from "../sections/TestimonialsCertificates";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Roadmap />
      <Skills />
      <Projects />
      <TestimonialsCertificates/>
      <GitHubStats />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
