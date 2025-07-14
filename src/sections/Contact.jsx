import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full py-20 px-6 bg-base-200 dark:bg-gray-900 transition-colors duration-500"
      data-aos="fade-up"
    >
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
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaLinkedin className="text-3xl" />
              </a>
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaGithub className="text-3xl" />
              </a>
              <a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaTwitter className="text-3xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-500"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks for reaching out! I'll get back to you soon.");
          }}
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white transition-colors duration-500">
            Send me a message
          </h3>

          {[
            { id: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
            { id: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
            { id: "subject", label: "Subject", type: "text", placeholder: "Subject of your message", required: false },
          ].map(({ id, label, type, placeholder, required }) => (
            <div className="mb-6" key={id}>
              <label htmlFor={id} className="block mb-2 font-medium text-gray-700 dark:text-gray-300 transition-colors duration-500">
                {label}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
              />
            </div>
          ))}

          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700 dark:text-gray-300 transition-colors duration-500">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message here..."
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-colors duration-300"
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
