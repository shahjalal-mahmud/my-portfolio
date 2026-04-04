import { useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaLinkedin, FaGithub, FaFacebook,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { SiCodeforces, SiHackerrank, SiLeetcode } from "react-icons/si";
import { TbBrandKotlin } from "react-icons/tb";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef as useHoverRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CONTACT_DATA = {
  email: "mahmud.nubtk@gmail.com",
  phone: "+880 18897-93146",
  location: "Khulna, Bangladesh",
  subtitle:
    "Whether you're a founder looking for an MVP, a business needing a digital overhaul, or a developer wanting to collaborate at Appriyo — my inbox is always open.",
  socials: [
    { icon: <FaGithub />,     href: "https://github.com/shahjalal-mahmud",                  label: "GitHub"     },
    { icon: <FaLinkedin />,   href: "https://www.linkedin.com/in/md-shahajalal-mahmud/",    label: "LinkedIn"   },
    { icon: <FaFacebook />,   href: "https://www.facebook.com/ShahjalalMahmud100/",         label: "Facebook"   },
    { icon: <SiLeetcode />,   href: "https://leetcode.com/Shahajalal_Mahmud/",              label: "LeetCode"   },
    { icon: <SiCodeforces />, href: "https://codeforces.com/profile/mahmud.nubtk/",         label: "Codeforces" },
    { icon: <MdEmail />,      href: "mailto:mahmud.nubtk@gmail.com",                        label: "Email Me"   },
    { icon: <FaPhone />,     href: "tel:+8801889793146",                                label: "Phone"      },
  ],
  emailjs: {
    serviceId:  "service_9c09v8d",
    templateId: "template_z5hgwcs",
    publicKey:  "JLbxXRTE6OGFflAQB",
  },
};

const ease = [0.22, 1, 0.36, 1];

// ─── MAGNETIC SOCIAL ──────────────────────────────────────────────────────────
const MagneticSocial = ({ icon, href, label }) => {
  const ref = useHoverRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 17 });
  const sy = useSpring(y, { stiffness: 220, damping: 17 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.38);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.22 }}
      whileTap={{ scale: 0.92 }}
      className="
        w-10 h-10 flex items-center justify-center rounded-xl text-lg
        bg-base-100 border border-base-300
        text-base-content/50
        hover:text-primary hover:border-primary/50 hover:bg-primary/10
        transition-colors duration-200 relative group
      "
    >
      {icon}
      <span className="
        absolute -top-8 left-1/2 -translate-x-1/2
        text-[9px] font-semibold uppercase tracking-wider
        bg-base-300 text-base-content px-2 py-0.5 rounded-md
        opacity-0 group-hover:opacity-100 pointer-events-none
        transition-opacity duration-150 whitespace-nowrap z-10
      ">
        {label}
      </span>
    </motion.a>
  );
};

// ─── INFO ROW ─────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, text, href, color, bg }) => (
  <motion.div
    whileHover={{ x: 4 }}
    className="flex items-center gap-3 group"
  >
    <div className={`
      w-9 h-9 flex items-center justify-center rounded-xl text-sm flex-shrink-0
      border ${bg} ${color}
      group-hover:scale-110 transition-transform duration-200
    `}>
      {icon}
    </div>
    {href ? (
      <a href={href} className="text-[13px] font-semibold text-base-content/70 hover:text-primary transition-colors duration-150">
        {text}
      </a>
    ) : (
      <span className="text-[13px] font-semibold text-base-content/70">{text}</span>
    )}
  </motion.div>
);

// ─── FIELD ────────────────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-base-content/35">{label}</label>
    {children}
  </div>
);

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const Contact = () => {
  const formRef = useRef();

  const handleSend = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        CONTACT_DATA.emailjs.serviceId,
        CONTACT_DATA.emailjs.templateId,
        formRef.current,
        CONTACT_DATA.emailjs.publicKey
      )
      .then(
        () => { toast.success("✅ Message sent successfully!"); formRef.current.reset(); },
        (err) => { console.error(err); toast.error("❌ Failed to send. Try again."); }
      );
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <section
      id="contact"
      className="
        relative w-full overflow-hidden
        bg-base-200 text-base-content
        py-24 lg:py-32
        px-5 sm:px-10 lg:px-16 xl:px-20
      "
    >
      {/* ══ BACKGROUND ════════════════════════════════════════════════════ */}
      <div className="pointer-events-none select-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[580px] h-[580px] rounded-full bg-primary/[0.07] blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full bg-secondary/[0.05] blur-[110px]" />
        <div className="absolute top-1/3 right-1/4 w-[280px] h-[280px] rounded-full bg-accent/[0.04] blur-[80px]" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.022]">
          <defs>
            <pattern id="contact-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>

        <svg className="absolute inset-0 w-full h-full opacity-[0.015]">
          <defs>
            <pattern id="contact-diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-diag)" />
        </svg>

        <div className="absolute left-0 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-primary/18 to-transparent" />
        <div className="absolute right-0 top-1/3 w-px h-72 bg-gradient-to-b from-transparent via-primary/14 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-base-300/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-base-300/60 to-transparent" />

        <svg className="absolute top-5 left-5 w-9 h-9 opacity-[0.10]" viewBox="0 0 48 48" fill="none"><path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="2"/></svg>
        <svg className="absolute top-5 right-5 w-9 h-9 opacity-[0.10]" viewBox="0 0 48 48" fill="none"><path d="M48 16 L48 0 L32 0" stroke="currentColor" strokeWidth="2"/></svg>
        <svg className="absolute bottom-5 left-5 w-9 h-9 opacity-[0.10]" viewBox="0 0 48 48" fill="none"><path d="M0 32 L0 48 L16 48" stroke="currentColor" strokeWidth="2"/></svg>
        <svg className="absolute bottom-5 right-5 w-9 h-9 opacity-[0.10]" viewBox="0 0 48 48" fill="none"><path d="M48 32 L48 48 L32 48" stroke="currentColor" strokeWidth="2"/></svg>
      </div>

      {/* ══ CONTENT ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="flex items-center justify-center lg:justify-start gap-3 mb-14"
        >
          <div className="h-px w-8 bg-base-300" />
          <span className="text-[10px] text-base-content/30 uppercase tracking-[0.24em] font-semibold">Let's Talk</span>
          <div className="h-px w-8 bg-base-300" />
        </motion.div>

        {/* ── Two-column grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Info ────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-left order-2 lg:order-1"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.13em] uppercase bg-success/10 border border-success/25 text-success">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-65" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                </span>
                Available for Work
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={item} className="space-y-1">
              <h2 className="font-extrabold tracking-tight leading-[1.07] text-4xl sm:text-5xl xl:text-[3.2rem]">
                Get In{" "}
                <span className="relative inline-block">
                  <span className="text-primary">Touch</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary/40 origin-left"
                  />
                </span>
              </h2>
              <p className="text-[11px] uppercase tracking-[0.22em] text-base-content/30 font-medium">
                Let's Build Something Great
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={item} className="text-sm sm:text-[15px] opacity-60 leading-[1.78] max-w-md">
              {CONTACT_DATA.subtitle}
            </motion.p>

            {/* Info rows */}
            <motion.div variants={item} className="flex flex-col gap-3 w-full max-w-sm mx-auto lg:mx-0">
              <InfoRow
                icon={<FaEnvelope />}
                text={CONTACT_DATA.email}
                href={`mailto:${CONTACT_DATA.email}`}
                color="text-primary"
                bg="bg-primary/10 border-primary/20"
              />
              <InfoRow
                icon={<FaPhone />}
                text={CONTACT_DATA.phone}
                href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, "")}`}
                color="text-success"
                bg="bg-success/10 border-success/20"
              />
              <InfoRow
                icon={<FaMapMarkerAlt />}
                text={CONTACT_DATA.location}
                color="text-error"
                bg="bg-error/10 border-error/20"
              />
            </motion.div>

            {/* Divider */}
            <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-3 w-full">
              <div className="h-px w-8 bg-base-300" />
              <span className="text-[9px] text-base-content/25 uppercase tracking-[0.22em] flex-shrink-0">Connect</span>
              <div className="h-px flex-1 max-w-[80px] bg-base-300" />
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-2">
              {CONTACT_DATA.socials.map((s) => (
                <MagneticSocial key={s.label} {...s} />
              ))}
            </motion.div>
            
          </motion.div>

          {/* ── RIGHT: Form ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            {/* Card */}
            <div className="
              relative overflow-hidden
              bg-base-100 border border-base-300/60
              rounded-3xl shadow-2xl
            ">
              {/* Subtle glow inside card top */}
              <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/[0.08] blur-[60px]" />

              {/* Card header */}
              <div className="relative px-7 pt-7 pb-5 border-b border-base-300/40">
                {/* Corner brackets */}
                <svg className="absolute top-3 left-3 w-6 h-6 opacity-[0.15]" viewBox="0 0 48 48" fill="none">
                  <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <svg className="absolute top-3 right-3 w-6 h-6 opacity-[0.15]" viewBox="0 0 48 48" fill="none">
                  <path d="M48 16 L48 0 L32 0" stroke="currentColor" strokeWidth="2"/>
                </svg>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/30">
                    <FiSend className="text-base" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-extrabold tracking-tight">Send a Message</h3>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-base-content/35 font-semibold mt-0.5">
                      I'll reply within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <form ref={formRef} onSubmit={handleSend} className="relative px-7 py-6 space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name">
                    <input
                      name="user_name"
                      type="text"
                      placeholder="e.g. Shahajalal"
                      required
                      className="
                        w-full px-4 py-2.5 text-[13px] font-medium
                        bg-base-200/60 border border-base-300/60 rounded-xl
                        placeholder:text-base-content/30
                        focus:outline-none focus:border-primary/50 focus:bg-base-200
                        transition-all duration-200
                      "
                    />
                  </Field>
                  <Field label="Email Address">
                    <input
                      name="user_email"
                      type="email"
                      placeholder="example@mail.com"
                      required
                      className="
                        w-full px-4 py-2.5 text-[13px] font-medium
                        bg-base-200/60 border border-base-300/60 rounded-xl
                        placeholder:text-base-content/30
                        focus:outline-none focus:border-primary/50 focus:bg-base-200
                        transition-all duration-200
                      "
                    />
                  </Field>
                </div>

                <Field label="Subject">
                  <input
                    name="subject"
                    type="text"
                    placeholder="Project Inquiry / Collaboration / Hiring"
                    className="
                      w-full px-4 py-2.5 text-[13px] font-medium
                      bg-base-200/60 border border-base-300/60 rounded-xl
                      placeholder:text-base-content/30
                      focus:outline-none focus:border-primary/50 focus:bg-base-200
                      transition-all duration-200
                    "
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or vision..."
                    required
                    className="
                      w-full px-4 py-2.5 text-[13px] font-medium
                      bg-base-200/60 border border-base-300/60 rounded-xl
                      placeholder:text-base-content/30
                      focus:outline-none focus:border-primary/50 focus:bg-base-200
                      transition-all duration-200 resize-none leading-relaxed
                    "
                  />
                </Field>

                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="
                    w-full flex items-center justify-center gap-2.5
                    py-3.5 px-6 rounded-xl
                    bg-primary text-primary-content
                    text-[13px] font-bold tracking-wide
                    shadow-lg shadow-primary/30
                    hover:shadow-xl hover:shadow-primary/40
                    transition-all duration-200
                  "
                >
                  <FiSend className="text-sm" />
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