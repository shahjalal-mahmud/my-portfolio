import { FaGithub, FaLinkedin, FaFacebook, FaExternalLinkAlt } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";
import profilePic from "/img/profile.jpg";
import { SiCodeforces, SiHackerrank, SiLeetcode } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/md-shahajalal-mahmud-077b29231/", label: "LinkedIn" },
    { icon: <FaGithub />, href: "https://github.com/shahjalal-mahmud", label: "GitHub" },
    { icon: <SiCodeforces />, href: "https://codeforces.com/profile/mahmud.nubtk/", label: "CodeForces" },
    { icon: <SiLeetcode />, href: "https://leetcode.com/Shahajalal_Mahmud/", label: "LeetCode" },
    { icon: <SiHackerrank />, href: "https://www.hackerrank.com/profile/mahmud_nubtk/", label: "HackerRank" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/ShahjalalMahmud100/", label: "Facebook" },
  ];

  const quickLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const handleQuickLinkClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => scrollToSection(id), 100);
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
    <footer className="w-full bg-base-300 text-base-content border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Mission */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="avatar">
                <div className="w-20 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-4 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img src={profilePic} alt="Shahjalal Mahmud" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Shahajalal <span className="text-primary">Mahmud</span>
                </h2>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">Founder & Technical Leader</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Architecting scalable digital products and leading high-performance teams to turn complex ideas into reality.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 text-primary uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleQuickLinkClick(link.id)}
                    className="hover:text-primary transition-colors text-sm font-medium opacity-80 hover:opacity-100"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Appriyo Venture Section */}
          <div className="text-center md:text-left bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h3 className="text-lg font-bold mb-4 text-primary uppercase tracking-widest text-xs">Our Venture</h3>
            <div className="space-y-4">
              <h4 className="text-xl font-black italic">Appriyo</h4>
              <p className="text-sm opacity-80">
                A specialized IT farm focused on Android MVPs and scalable web ecosystems.
              </p>
              <a 
                href="https://appriyo.com" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary btn-sm gap-2 normal-case shadow-lg"
              >
                Visit appriyo.com <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>

          {/* Connect & Socials */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-6 text-primary uppercase tracking-widest text-xs">Get in Touch</h3>
            <div className="space-y-4 mb-8">
              <a href="mailto:mahmud.nubtk@gmail.com" className="flex items-center justify-center md:justify-start gap-3 hover:text-primary transition-colors text-sm">
                <MdEmail className="text-xl text-primary" /> mahmud.nubtk@gmail.com
              </a>
              <p className="flex items-center justify-center md:justify-start gap-3 text-sm">
                <MdPhone className="text-xl text-primary" /> +880 18897-93146
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3 text-sm">
                <MdLocationOn className="text-xl text-primary" /> Khulna, Bangladesh
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="p-2 bg-base-100 rounded-lg text-xl hover:text-primary shadow-sm"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        <div className="divider opacity-10 my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <p className="text-xs font-medium">
            © {currentYear} Shahajalal Mahmud • Built with React & Tailwind
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-tighter">
            <span>Discipline</span>
            <span className="text-primary">●</span>
            <span>Consistency</span>
            <span className="text-primary">●</span>
            <span>Growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;