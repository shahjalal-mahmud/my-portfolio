import { useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { SiCodeforces, SiHackerrank, SiLeetcode } from "react-icons/si";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const formRef = useRef();

  const handleSendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9c09v8d",
        "template_z5hgwcs",
        formRef.current,
        "JLbxXRTE6OGFflAQB"
      )
      .then(
        () => {
          toast.success("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          toast.error("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="w-full py-16 md:py-20 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6">
            Get In Touch
          </h2>
          <p className="mb-6 md:mb-8 leading-relaxed opacity-90">
            I'm currently open to freelance projects and full-time opportunities.
            Whether you want to say hi, discuss a project, or collaborate, my inbox is always open.
          </p>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-primary text-xl flex-shrink-0" />
              <a href="mailto:shahjalal@gmail.com" className="link link-hover">
                mahmud.nubtk@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-primary text-xl flex-shrink-0" />
              <a href="tel:+880123456789" className="link link-hover">
                +880 18897-93146
              </a>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-primary text-xl flex-shrink-0" />
              <span>Khulna, Bangladesh</span>
            </div>

            <div className="flex items-center gap-6 mt-6">
              {[
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/md-shahajalal-mahmud-077b29231/", label: "LinkedIn" },
                { icon: <FaGithub />, href: "https://github.com/shahjalal-mahmud", label: "GitHub" },
                { icon: <FaFacebook />, href: "https://www.facebook.com/ShahjalalMahmud100/", label: "Facebook" },
                { icon: <SiCodeforces />, href: "https://codeforces.com/profile/mahmud.nubtk/" },
                { icon: <SiLeetcode />, href: "https://leetcode.com/Shahajalal_Mahmud/" },
                { icon: <SiHackerrank />, href: "https://www.hackerrank.com/profile/mahmud_nubtk/" },
                { icon: <MdEmail className="text-2xl" />, href: "mailto:mahmud.nubtk@gmail.com"},
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  className="text-2xl md:text-3xl hover:text-primary transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          ref={formRef}
          onSubmit={handleSendEmail}
          className="card bg-base-100 shadow-lg p-6 md:p-8"
        >
          <h3 className="text-2xl font-semibold mb-8 text-base-content">
            Send me a message
          </h3>

          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-medium text-base-content">
              Name
            </label>
            <input
              name="user_name"
              id="name"
              type="text"
              placeholder="Your full name"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium text-base-content">
              Email
            </label>
            <input
              name="user_email"
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Subject Field */}
          <div className="mb-6">
            <label htmlFor="subject" className="block mb-2 font-medium text-base-content">
              Subject
            </label>
            <input
              name="subject"
              id="subject"
              type="text"
              placeholder="Subject of your message"
              className="input input-bordered w-full"
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 font-medium text-base-content">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              placeholder="Write your message here..."
              required
              className="textarea textarea-bordered w-full resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;