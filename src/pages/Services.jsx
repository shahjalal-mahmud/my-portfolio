// src/pages/Services.jsx
import { useState, useRef, useEffect } from "react";
import { FaMobileAlt, FaCode, FaPalette, FaTools, FaRocket, FaArrowRight } from 'react-icons/fa';
import { MdDevices, MdDesignServices, MdBusiness } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef();
const services = [
  {
    title: "Android App Development",
    icon: <FaMobileAlt className="text-4xl" />,
    description: "Custom Android applications built with Kotlin and Jetpack Compose. From MVVM architecture to Room database integration, I create performant mobile solutions.",
    features: [
      "Kotlin-based development",
      "Jetpack Compose UI",
      "MVVM Architecture",
      "Room Database",
      "Retrofit API integration",
      "Coroutines/Flow"
    ],
    category: "development",
    price: "Starting at $120"
  },
  {
    title: "Web Development",
    icon: <FaCode className="text-4xl" />,
    description: "Modern responsive websites using React, Tailwind CSS, and Firebase. Whether you need a portfolio, business site, or web application.",
    features: [
      "React.js applications",
      "Tailwind CSS & DaisyUI",
      "Firebase integration",
      "Responsive design",
      "CRUD operations",
      "Authentication systems"
    ],
    category: "development",
    price: "Starting at $100"
  },
  {
    title: "Business Management Systems",
    icon: <MdBusiness className="text-4xl" />,
    description: "Custom solutions for small businesses like repair shops, with both Android and web interfaces for complete management.",
    features: [
      "Customer management",
      "Inventory tracking",
      "Order processing",
      "Automated notifications",
      "Multi-platform access",
      "Data analytics"
    ],
    category: "business",
    price: "Starting at $150"
  },
  {
    title: "Dynamic Portfolio Websites",
    icon: <MdDesignServices className="text-4xl" />,
    description: "Fully editable portfolio templates for professionals with admin dashboards for easy content management.",
    features: [
      "Firebase backend",
      "Real-time updates",
      "Admin dashboard",
      "Image/CV upload",
      "Publication management",
      "Responsive design"
    ],
    category: "web",
    price: "One-time license: $30"
  },
  {
    title: "UI/UX Design",
    icon: <FaPalette className="text-4xl" />,
    description: "Clean, intuitive interfaces designed with user experience in mind. From wireframes to final implementation.",
    features: [
      "Mobile-first design",
      "User flow mapping",
      "Prototyping",
      "Accessibility focus",
      "Theme customization",
      "Component libraries"
    ],
    category: "design",
    price: "Starting at $50"
  },
  {
    title: "Upcoming: Student NFC Portfolio",
    icon: <MdDevices className="text-4xl" />,
    description: "Digital portfolio with NFC card integration for students to share their profiles physically and digitally.",
    features: [
      "NFC card integration",
      "Web portfolio",
      "Profile sharing",
      "Achievement tracking",
      "Project showcase",
      "Contactless networking"
    ],
    category: "future",
    price: "Pre-order: $25"
  }
];

  const handleOrderClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_9c09v8d",
      "template_z5hgwcs",
      formRef.current,
      "JLbxXRTE6OGFflAQB"
    ).then(
      () => {
        toast.success("✅ Order request sent successfully!");
        setIsModalOpen(false);
        formRef.current.reset();
      },
      (error) => {
        console.error(error);
        toast.error("❌ Failed to send order request. Please try again.");
      }
    );
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section - Minimal & Professional */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <span className="text-sm font-semibold tracking-wider text-primary uppercase">
              What I Offer
            </span>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold text-base-content">
              Professional <span className="text-primary">Services</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            Custom digital solutions designed to solve real business problems with clean, efficient code and modern technologies.
          </p>
        </div>

        {/* Services Grid - Improved Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-base-200 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="card-body p-6">
                {/* Icon & Price */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${service.category === 'development' ? 'bg-accent/10 text-accent' :
                    service.category === 'business' ? 'bg-secondary/10 text-secondary' :
                      service.category === 'design' ? 'bg-primary/10 text-primary' :
                        'bg-info/10 text-info'
                    }`}>
                    {service.icon}
                  </div>
                  <span className="badge badge-lg badge-ghost font-medium px-3 py-2">
                    {service.price}
                  </span>
                </div>

                {/* Title & Description */}
                <h2 className="card-title text-xl md:text-2xl mb-2">{service.title}</h2>
                <p className="text-base-content/70 mb-4">{service.description}</p>

                {/* Features */}
                <div className="mt-2 mb-5">
                  <h3 className="text-sm font-semibold text-base-content/70 mb-3 uppercase tracking-wider">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className={`mt-1 mr-2 ${service.category === 'development' ? 'text-accent' :
                          service.category === 'business' ? 'text-secondary' :
                            service.category === 'design' ? 'text-primary' :
                              'text-info'
                          }`}>✓</span>
                        <span className="text-base-content/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons */}
                <div className="card-actions mt-auto">
                  {service.category === 'future' ? (
                    <button className="btn btn-block btn-disabled">
                      <FaRocket className="mr-2" /> Coming Soon
                    </button>
                  ) : (
                    <div className="flex gap-3 w-full">
                      <button
                        className="btn btn-primary flex-1"
                        onClick={() => handleOrderClick(service)}
                      >
                        Order Now
                      </button>
                      <a
                        href="#contact"
                        className="btn btn-outline btn-primary flex-1 flex items-center gap-2"
                      >
                        Contact <FaArrowRight />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Responsive Modal */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box w-full max-w-md md:max-w-2xl relative">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  document.body.style.overflow = 'auto';
                }}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </button>

              {/* Modal content */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-base-content mb-1">
                    Order {selectedService?.title}
                  </h3>
                  <p className="text-base-content/70">{selectedService?.description}</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmitOrder}>
                  <input type="hidden" name="service" value={selectedService?.title} />

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="user_name"
                          placeholder="Full name"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-base-content/80 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="user_email"
                          placeholder="your@email.com"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content/80 mb-1">
                        Project Details
                      </label>
                      <textarea
                        name="message"
                        className="textarea textarea-bordered w-full h-32"
                        placeholder="Tell me about your project requirements, timeline, and budget..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="modal-action mt-6">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => {
                        setIsModalOpen(false);
                        document.body.style.overflow = 'auto';
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="mt-24 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            My <span className="text-primary">Development</span> Process
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
          </h2>

          <div className="relative">
            {/* Progress line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-base-300 -translate-y-1/2 z-0">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full w-full"></div>
            </div>

            {/* Mobile progress dots */}
            <div className="md:hidden flex justify-between px-8 mb-8 relative">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="relative">
                  <div className="w-6 h-6 rounded-full bg-primary z-10 relative"></div>
                  {step < 4 && (
                    <div className="absolute top-1/2 left-6 right-0 h-1 bg-base-300 -translate-y-1/2 w-16"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1: Consultation */}
              <div className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-2">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <BiSupport className="text-2xl" />
                    </div>
                    <h3 className="card-title text-xl">1. Consultation</h3>
                    <p className="text-base-content/70 mb-4">Understand your requirements through detailed discussions</p>
                    <div className="hidden group-hover:block transition-all duration-300">
                      <div className="text-sm text-left space-y-2">
                        <p className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Initial discovery call</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Business needs analysis</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Project scope definition</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Planning */}
              <div className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-2">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                      <FaTools className="text-2xl" />
                    </div>
                    <h3 className="card-title text-xl">2. Planning</h3>
                    <p className="text-base-content/70 mb-4">Create wireframes and set project milestones</p>
                    <div className="hidden group-hover:block transition-all duration-300">
                      <div className="text-sm text-left space-y-2">
                        <p className="flex items-start">
                          <span className="text-secondary mr-2">✓</span>
                          <span>User flow mapping</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-secondary mr-2">✓</span>
                          <span>Technical architecture</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-secondary mr-2">✓</span>
                          <span>Project timeline creation</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Development */}
              <div className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-2">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                      <FaCode className="text-2xl" />
                    </div>
                    <h3 className="card-title text-xl">3. Development</h3>
                    <p className="text-base-content/70 mb-4">Build solution with clean code and updates</p>
                    <div className="hidden group-hover:block transition-all duration-300">
                      <div className="text-sm text-left space-y-2">
                        <p className="flex items-start">
                          <span className="text-accent mr-2">✓</span>
                          <span>Agile development sprints</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-accent mr-2">✓</span>
                          <span>Weekly progress reports</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-accent mr-2">✓</span>
                          <span>Code quality assurance</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Testing & Delivery */}
              <div className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-2">
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-info/10 text-info flex items-center justify-center mb-4 group-hover:bg-info/20 transition-colors duration-300">
                      <MdDevices className="text-2xl" />
                    </div>
                    <h3 className="card-title text-xl">4. Testing & Delivery</h3>
                    <p className="text-base-content/70 mb-4">Rigorous testing before final deployment</p>
                    <div className="hidden group-hover:block transition-all duration-300">
                      <div className="text-sm text-left space-y-2">
                        <p className="flex items-start">
                          <span className="text-info mr-2">✓</span>
                          <span>Cross-platform testing</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-info mr-2">✓</span>
                          <span>User acceptance testing</span>
                        </p>
                        <p className="flex items-start">
                          <span className="text-info mr-2">✓</span>
                          <span>Deployment & documentation</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-primary-content">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl mb-6">Let's discuss how I can help bring your digital ideas to life.</p>
          <a href="#contact" className="btn btn-outline btn-primary-content hover:bg-primary-content hover:text-primary">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;