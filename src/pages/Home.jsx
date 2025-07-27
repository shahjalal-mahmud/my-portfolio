// src/pages/Home.jsx
import Hero from "../sections/Hero";
import About from "../sections/About";
import EducationTimeline from "../components/EducationTimeline";
import Experience from "../components/Experience";
import Roadmap from "../components/Roadmap";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import GitHubStats from "../components/GitHubStats";
// import TestimonialsCertificates from "../sections/TestimonialsCertificates";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CodeforcesStats from "../components/CodeforcesStats";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <EducationTimeline />
      <Experience />
      <Roadmap />
      <Skills />
      <Projects />
      {/* <TestimonialsCertificates /> */}
      <GitHubStats />
      <CodeforcesStats />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Home;
