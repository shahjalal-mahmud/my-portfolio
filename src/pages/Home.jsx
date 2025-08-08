// src/pages/Home.jsx
import Hero from "../sections/Hero";
import About from "../sections/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Home;