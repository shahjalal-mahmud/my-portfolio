import { useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { SiCodeforces, SiHackerrank, SiLeetcode } from "react-icons/si";
import { MdEmail } from "react-icons/md";

const CONTACT_DATA = {
  title: "Get In Touch",
  subtitle: "Whether you're a founder looking for an MVP, a business needing a digital overhaul, or a developer wanting to collaborate at Appriyo—my inbox is always open.",
  email: "mahmud.nubtk@gmail.com",
  phone: "+880 18897-93146",
  location: "Khulna, Bangladesh",
  socials: [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/md-shahajalal-mahmud-077b29231/", label: "LinkedIn" },
    { icon: <FaGithub />, href: "https://github.com/shahjalal-mahmud", label: "GitHub" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/ShahjalalMahmud100/", label: "Facebook" },
    { icon: <SiCodeforces />, href: "https://codeforces.com/profile/mahmud.nubtk/", label: "Codeforces" },
    { icon: <SiLeetcode />, href: "https://leetcode.com/Shahajalal_Mahmud/", label: "LeetCode" },
    { icon: <SiHackerrank />, href: "https://www.hackerrank.com/profile/mahmud_nubtk/", label: "HackerRank" },
    { icon: <MdEmail />, href: "mailto:mahmud.nubtk@gmail.com", label: "Email Me" },
  ],
  emailjs: {
    serviceId: "service_9c09v8d",
    templateId: "template_z5hgwcs",
    publicKey: "JLbxXRTE6OGFflAQB"
  }
};

const Contact = () => {
  const formRef = useRef();

  const handleSendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        CONTACT_DATA.emailjs.serviceId,
        CONTACT_DATA.emailjs.templateId,
        formRef.current,
        CONTACT_DATA.emailjs.publicKey
      )
      .then(
        () => {
          toast.success("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          toast.error("❌ Failed to send message.");
        }
      );
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24 px-4 sm:px-6 bg-base-200 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-center lg:text-left order-2 lg:order-1"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-base-content">
              {CONTACT_DATA.title}
            </h2>
            <p className="mb-8 text-base sm:text-lg opacity-80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {CONTACT_DATA.subtitle}
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: <FaEnvelope />, text: CONTACT_DATA.email, link: `mailto:${CONTACT_DATA.email}` },
                { icon: <FaPhone />, text: CONTACT_DATA.phone, link: `tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}` },
                { icon: <FaMapMarkerAlt />, text: CONTACT_DATA.location, link: null }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center lg:justify-start gap-4 group">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  {item.link ? (
                    <a href={item.link} className="text-md sm:text-lg font-semibold hover:text-primary transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-md sm:text-lg font-semibold">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-base-300">
              <p className="text-xs uppercase tracking-[0.2em] font-bold mb-6 opacity-50">Social Ecosystem</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-5">
                {CONTACT_DATA.socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-base-100 rounded-lg shadow-sm text-2xl text-primary hover:shadow-md transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="card bg-base-100 shadow-2xl border border-primary/10 overflow-hidden">
              <div className="bg-primary p-4 sm:p-6 text-white text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold">Send a Message</h3>
                <p className="text-sm opacity-80 mt-1">I'll get back to you within 24 hours.</p>
              </div>

              <form ref={formRef} onSubmit={handleSendEmail} className="p-5 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-60">Full Name</label>
                    <input
                      name="user_name"
                      type="text"
                      placeholder="e.g. Shahajalal"
                      required
                      className="input input-bordered w-full focus:outline-primary bg-base-200/50"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-60">Email Address</label>
                    <input
                      name="user_email"
                      type="email"
                      placeholder="example@mail.com"
                      required
                      className="input input-bordered w-full focus:outline-primary bg-base-200/50"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label text-xs font-bold uppercase opacity-60">Subject</label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="Project Inquiry / Hiring"
                    className="input input-bordered w-full focus:outline-primary bg-base-200/50"
                  />
                </div>

                <div className="form-control">
                  <label className="label text-xs font-bold uppercase opacity-60">Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell me about your project or vision..."
                    required
                    className="textarea textarea-bordered w-full focus:outline-primary bg-base-200/50 leading-relaxed"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn btn-primary w-full text-lg font-bold mt-4 h-14"
                >
                  Send Inquiry
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;