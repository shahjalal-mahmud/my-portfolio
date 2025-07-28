import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import profilePic from "/img/profile.jpg";
import { SiCodeforces, SiHackerrank, SiLeetcode } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    { icon: <FaGithub className="text-2xl" />, href: "https://github.com/shahjalal-mahmud", label: "GitHub" },
    { icon: <FaLinkedin className="text-2xl" />, href: "https://www.linkedin.com/in/md-shahajalal-mahmud-077b29231/", label: "LinkedIn" },
    { icon: <FaFacebook className="text-2xl" />, href: "https://www.facebook.com/ShahjalalMahmud100/", label: "Facebook" },
    { icon: <MdEmail className="text-2xl" />, href: "mailto:mahmud.nubtk@gmail.com", label: "Email" },
    { icon: <SiCodeforces />, href: "https://codeforces.com/profile/mahmud.nubtk/", label: "CodeForces" },
    { icon: <SiLeetcode />, href: "https://leetcode.com/Shahajalal_Mahmud/", label: "LeetCode" },
    { icon: <SiHackerrank />, href: "https://www.hackerrank.com/profile/mahmud_nubtk/", label: "HackerRank" },
  ];

  const quickLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Statistics", id: "github" },
  ];

  const handleQuickLinkClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      // Wait for the navigation to complete before scrolling
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-base-300 text-base-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12"
        >
          {/* Brand Section */}
          <div className="space-y-4 col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={profilePic} alt="Shahjalal Mahmud" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MD Shahajalal Mahmud
              </h2>
            </motion.div>
            <p className="text-base-content/80 text-sm sm:text-base">
              Crafting digital experiences with clean code and modern design.
            </p>

            {/* Email Button */}
            <div className="mt-4">
              <motion.a
                href="mailto:mahmud.nubtk@gmail.com"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary gap-2 w-full sm:w-auto text-sm sm:text-base"
              >
                <MdEmail /> Email Me
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 md:mt-0">
            <h3 className="text-lg font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <button
                    onClick={() => handleQuickLinkClick(link.id)}
                    className="link link-hover text-base-content/80 hover:text-primary text-sm sm:text-base text-left w-full"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="mt-6 lg:mt-0 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-primary">Connect With Me</h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-circle btn-ghost hover:bg-primary/10 hover:text-primary"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 lg:mt-0 col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-primary">Contact Info</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-base-content/80 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                018897-93146
              </p>
              <p className="flex items-center gap-2 text-base-content/80 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                mahmud.nubtk@gmail.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="divider my-0"></div>

        {/* Copyright Section */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs sm:text-sm text-base-content/70 text-center md:text-left">
              © {currentYear} Md Shahajalal Mahmud. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-base-content/70 text-center md:text-left">
              Made with ❤️ and React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;