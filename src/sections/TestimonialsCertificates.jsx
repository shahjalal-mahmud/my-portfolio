// src/sections/TestimonialsCertificates.jsx
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    role: "Senior Developer @ TechCorp",
    feedback:
      "Shahjalal is one of the most passionate developers I’ve worked with. His dedication to Android and full-stack development is unmatched.",
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

const TestimonialsCertificates = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-base-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Testimonials */}
        <div>
          <h2
            className="text-4xl font-extrabold text-center mb-14 text-gray-900 dark:text-white"
            data-aos="fade-up"
          >
            What People Say
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg relative overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <FaQuoteLeft className="text-4xl text-primary mb-6" />
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">{t.feedback}</p>
                <FaQuoteRight className="text-3xl text-primary absolute bottom-8 right-8 opacity-20" />
                <div className="mt-10 flex items-center gap-5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h2
            className="text-4xl font-extrabold text-center mb-14 text-gray-900 dark:text-white"
            data-aos="fade-up"
          >
            Certificates & Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {certificates.map((c, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-20 h-20 object-contain rounded-lg border-2 border-primary"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{c.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{c.issuer}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{c.date}</p>
                  </div>
                </div>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn btn-sm btn-outline text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  View Certificate
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCertificates;
