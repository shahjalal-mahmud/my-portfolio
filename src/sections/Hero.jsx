import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-base-200 to-base-100 pt-24 px-6">

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Text Content */}
        <div
          className="flex-1 text-center lg:text-left space-y-6"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Hi, I’m <span className="text-primary">ShahJalal</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Android App Developer using Kotlin & Jetpack Compose. Learning Web Dev to become a Full-Stack Creator.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start gap-6 text-2xl pt-4">
            <a href="https://github.com/" target="_blank" className="hover:text-primary"><FaGithub /></a>
            <a href="https://linkedin.com/" target="_blank" className="hover:text-primary"><FaLinkedin /></a>
            <a href="https://twitter.com/" target="_blank" className="hover:text-primary"><FaTwitter /></a>
          </div>
        </div>

        {/* Profile Image */}
        <div
          className="flex-1 flex justify-center"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          <div className="relative group animate-float">
            <img
              src="/src/assets/img/profile.jpg"
              alt="Profile"
              className="w-64 h-64 rounded-full shadow-xl border-4 border-primary object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-full">
              Kotlin + Jetpack
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
