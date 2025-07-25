import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/shahjalal-mahmud", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/md-shahajalal-mahmud-077b29231/", label: "LinkedIn" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/ShahjalalMahmud100/", label: "Facebook" }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="w-full bg-base-300 text-base-content">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
      >
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-primary">Shahjalal Mahmud</h2>
          <p className="mt-2 text-sm opacity-90">
            Passionate full-stack developer with a love for clean code and modern design.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3 text-primary">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="link link-hover opacity-90 hover:opacity-100"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3 text-primary">Follow Me</h3>
          <div className="flex justify-center md:justify-start gap-5 text-xl">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -3 }}
                className="hover:text-primary transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="text-center py-4 border-t border-base-200 text-sm">
        <p className="flex justify-center items-center gap-1">
          © {currentYear} Shahjalal Mahmud. Built with ❤️ using{" "}
          <span className="text-primary font-medium">React</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;