import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="w-full bg-base-300 dark:bg-gray-800 text-base-content dark:text-gray-300 transition-colors duration-500"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-primary">Shahjalal Mahmud</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Passionate full-stack developer with a love for clean code and modern design.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-primary transition-colors">Skills</a></li>
            <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Follow Me</h3>
          <div className="flex justify-center md:justify-start gap-5 mt-2 text-xl">
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-primary transition-colors"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-200 dark:border-gray-700 text-sm">
        <p className="flex justify-center items-center gap-1">
          © {new Date().getFullYear()} Shahjalal Mahmud. Built with ❤️ using{" "}
          <span className="text-primary font-medium">React</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
