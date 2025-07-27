// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import EducationTimeline from "../components/EducationTimeline";
import Experience from "../components/Experience";
import Roadmap from "../components/Roadmap";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import GitHubStats from "../components/GitHubStats";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";
// import TestimonialsCertificates from "../sections/TestimonialsCertificates";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <EducationTimeline />
      <Experience />
      <Roadmap />
      <Skills />
      <Projects />
      {/* <TestimonialsCertificates /> */}
      <GitHubStats />
      <Contact />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Home;
