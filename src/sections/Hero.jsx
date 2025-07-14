import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f3f4f6] to-white dark:from-base-200 dark:to-base-100 text-gray-900 dark:text-white pt-24 px-6 relative overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">

        {/* Text Content */}
        <div
          className="flex-1 text-center lg:text-left space-y-6"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <h2 className="text-md sm:text-lg tracking-wider uppercase text-primary font-semibold">
            Android & Web Developer
          </h2>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white drop-shadow-sm">
            Hi, I’m <span className="text-primary">ShahJalal</span>
          </h1>

          <p className="text-md sm:text-lg text-gray-800 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            I build modern Android apps using <strong className="text-primary">Kotlin</strong> & <strong className="text-primary">Jetpack Compose</strong>. Currently diving into full-stack development to create powerful digital products from end to end.
          </p>

          {/* Tags or Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-sm">
            <span className="bg-primary text-white px-3 py-1 rounded-full">Kotlin</span>
            <span className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full">Jetpack Compose</span>
            <span className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full">Web Dev</span>
            <span className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full">React</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="#projects" className="btn btn-primary btn-wide shadow-md">View My Work</a>
            <a href="#contact" className="btn btn-outline btn-wide">Contact Me</a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start gap-6 text-2xl pt-6 text-gray-700 dark:text-gray-300">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><FaGithub /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><FaLinkedin /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><FaTwitter /></a>
          </div>
        </div>

        {/* Profile Image Section */}
        <div
          className="flex-1 flex justify-center"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          <div className="relative group animate-float">
            <img
              src="/src/assets/img/profile.jpg"
              alt="Profile"
              className="w-64 h-64 sm:w-72 sm:h-72 rounded-full shadow-2xl border-4 border-primary object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-2 right-2 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-md">
              Kotlin + Jetpack
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-500 dark:text-gray-300 text-sm">↓ Scroll Down</a>
      </div>
    </div>
  );
};

export default Hero;
