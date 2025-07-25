import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TestimonialsCertificates = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Senior Developer @ TechCorp",
      feedback:
        "Shahjalal is one of the most passionate developers I've worked with. His dedication to Android and full-stack development is unmatched.",
      image: "/testimonials/person1.jpg",
    },
    {
      name: "Jane Smith",
      role: "Mentor @ CodeCamp",
      feedback:
        "Incredible work ethic and talent. He consistently delivers high-quality results and actively contributes to the community.",
      image: "/testimonials/person2.jpg",
    },
  ];

  const certificates = [
    {
      title: "Android App Development with Kotlin",
      issuer: "Coursera",
      date: "June 2024",
      link: "#",
      image: "/certificates/kotlin.jpg",
    },
    {
      title: "Full Stack Web Development (MERN)",
      issuer: "Udemy",
      date: "May 2024",
      link: "#",
      image: "/certificates/mern.avif",
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
        {/* Testimonials */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 md:mb-14">
            What People Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="card bg-base-100 shadow-lg hover:shadow-xl p-6 md:p-8 lg:p-10"
              >
                <FaQuoteLeft className="text-3xl md:text-4xl text-primary mb-4 md:mb-6" />
                <p className="italic leading-relaxed opacity-90">{t.feedback}</p>
                <FaQuoteRight className="text-2xl md:text-3xl text-primary absolute bottom-6 right-6 opacity-20" />
                <div className="mt-8 flex items-center gap-4 md:gap-5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-4 border-primary"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-base md:text-lg">{t.name}</p>
                    <p className="text-sm opacity-70">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 md:mb-14">
            Certificates & Achievements
          </h2>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {certificates.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="card bg-base-100 shadow-lg hover:shadow-xl p-6"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-4 md:mb-6">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg border-2 border-primary"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold text-lg md:text-xl">{c.title}</h3>
                    <p className="text-sm opacity-70">{c.issuer}</p>
                    <p className="text-sm opacity-50">{c.date}</p>
                  </div>
                </div>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline btn-primary"
                >
                  View Certificate
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCertificates;