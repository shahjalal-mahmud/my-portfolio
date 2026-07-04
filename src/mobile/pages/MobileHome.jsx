// MobileHome — entry point on mobile. A condensed hero card + featured
// projects + a "see more" link to the Skills/Journey tabs.

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  FaRocket, FaArrowRight, FaGithub, FaLinkedin, FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import projects from "../../shared/data/projects";
import M3Card from "../components/M3Card";
import M3Button from "../components/M3Button";
import M3Chip from "../components/M3Chip";

const TYPING_WORDS = [
  "Android Engineer",
  "Backend Engineer",
  "Founder @ Appriyo",
  "SaaS Systems Builder",
];

const SOCIALS = [
  { icon: <FaGithub />, href: "https://github.com/shahajalal-mahmud" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/md-shahajalal-mahmud/" },
  { icon: <FaPhone />,     href: "tel:+8801889793146"},
  { icon: <FaEnvelope />, href: "mailto:mahmud.nubtk@gmail.com" },
];

export default function MobileHome() {
  return (
    <div className="px-4 py-4 space-y-4">
      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <M3Card elevation={1} className="overflow-hidden">
          <div className="flex items-start gap-3">
            <img
              src="/img/about_photo.jpg"
              alt="Shahajalal Mahmud"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/40"
            />
            <div className="min-w-0 flex-1">
              <p className="m3-label-large text-base-content/55">Hi, I'm</p>
              <h2 className="m3-title-large text-base-content">Shahajalal</h2>
              <p className="m3-body-medium text-primary font-medium h-5">
                <Typewriter
                  words={TYPING_WORDS}
                  loop cursor
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1800}
                />
              </p>
            </div>
          </div>

          <p className="m3-body-medium text-base-content/75 mt-3">
            Founder of <span className="text-primary font-semibold">Appriyo</span> & CSE student
            specializing in native Android & scalable backend systems. Designing multi-tenant SaaS,
            offline-first mobile apps, and secure REST APIs.
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            <M3Chip label="Android" variant="assist" />
            <M3Chip label="Spring Boot" variant="assist" />
            <M3Chip label="Multi-tenant SaaS" variant="assist" />
          </div>

          <div className="flex gap-2 mt-4">
            <M3Button
              variant="filled"
              icon={<FaRocket />}
              href="#projects"
              fullWidth
            >
              View Projects
            </M3Button>
            <M3Button
              variant="outlined"
              href="https://appriyo.com"
              iconRight={<FaArrowRight />}
              fullWidth
            >
              Appriyo
            </M3Button>
          </div>

          {/* Social row */}
          <div className="flex items-center gap-2 mt-4">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="m3-tap w-10 h-10 rounded-full flex items-center justify-center text-base-content/65 bg-base-200/70 hover:text-primary transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </M3Card>
      </motion.div>

      {/* Featured projects */}
      <div>
        <div className="flex items-center justify-between px-1 pb-2">
          <h3 className="m3-title-large text-base-content">Featured Projects</h3>
          <Link
            to="/skills-projects"
            className="text-sm text-primary font-semibold m3-tap"
          >
            See all →
          </Link>
        </div>
        <div className="space-y-3">
          {projects.slice(0, 3).map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="block">
              <M3Card elevation={1} className="flex gap-3 items-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 rounded-xl object-contain bg-base-200 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="m3-body-large text-base-content font-semibold truncate">
                    {p.name.split(" - ")[0]}
                  </h4>
                  <p className="m3-body-medium text-base-content/65 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {p.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-base-200 text-base-content/65"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </M3Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/skills-projects">
          <M3Card elevation={1} className="text-center">
            <p className="m3-title-large text-primary">Skills</p>
            <p className="m3-body-medium text-base-content/65 mt-1">Stack & expertise</p>
          </M3Card>
        </Link>
        <Link to="/education-experience">
          <M3Card elevation={1} className="text-center">
            <p className="m3-title-large text-primary">Journey</p>
            <p className="m3-body-medium text-base-content/65 mt-1">Edu + experience</p>
          </M3Card>
        </Link>
      </div>
    </div>
  );
}