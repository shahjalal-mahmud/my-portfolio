import { useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const Contact = () => {
  const formRef = useRef();

  const handleSendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9c09v8d", // e.g., "service_xxxxx"
        "template_z5hgwcs", // e.g., "template_abcd"
        formRef.current,
        "JLbxXRTE6OGFflAQB" // e.g., "2QKexampleKEY"
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
    <section id="contact" className="w-full py-20 px-6 bg-base-200 dark:bg-gray-900" data-aos="fade-up">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="flex flex-col justify-center" data-aos="fade-right" data-aos-delay="200">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white transition-colors duration-500">
            Get In Touch
          </h2>
          <p className="mb-8 text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-500">
            I’m currently open to freelance projects and full-time opportunities. 
            Whether you want to say hi, discuss a project, or collaborate, my inbox is always open.
          </p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300 transition-colors duration-500">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-primary text-xl" />
              <a href="mailto:shahjalal@gmail.com" className="hover:text-primary underline transition-colors duration-300">
                mahmud.nubtk@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-primary text-xl" />
              <a href="tel:+880123456789" className="hover:text-primary underline transition-colors duration-300">
                +880 18897-93146
              </a>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <span>Khulna, Bangladesh</span>
            </div>

            <div className="flex items-center gap-6 mt-6">
              <a
                href="https://www.linkedin.com/in/md-shahajalal-mahmud-077b29231/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaLinkedin className="text-3xl" />
              </a>
              <a
                href="https://github.com/shahjalal-mahmud"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaGithub className="text-3xl" />
              </a>
              <a
                href="https://www.facebook.com/ShahjalalMahmud100/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaFacebook className="text-3xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSendEmail}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
            Send me a message
          </h3>

          {/* Input fields (same as before) */}
          {/* You must add name="fieldName" to each field to match EmailJS template */}

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              name="user_name"
              id="name"
              type="text"
              placeholder="Your full name"
              required
              className="w-full px-4 py-3 rounded-md border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="user_email"
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-md border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <input
              name="subject"
              id="subject"
              type="text"
              placeholder="Subject of your message"
              className="w-full px-4 py-3 rounded-md border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              placeholder="Write your message here..."
              required
              className="w-full px-4 py-3 rounded-md border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
