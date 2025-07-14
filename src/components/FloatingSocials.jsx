import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const FloatingSocials = () => {
  return (
    <div
      className="hidden md:flex flex-col fixed left-6 top-1/3 z-40 space-y-4"
      data-aos="fade-right"
      data-aos-delay="300"
    >
      <a
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 text-2xl"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
      <a
        href="https://linkedin.com/"
        target="_blank"
        rel="noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 text-2xl"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 text-2xl"
        aria-label="Twitter"
      >
        <FaTwitter />
      </a>

      {/* Optional: Add a vertical line */}
      <span className="w-px h-24 bg-gray-300 dark:bg-gray-600 mx-auto mt-2"></span>
    </div>
  );
};

export default FloatingSocials;
