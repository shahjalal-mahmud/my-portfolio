// MobileJourney — Education + Experience combined as a single M3 Timeline.

import { useState } from "react";
import {
  FaGraduationCap, FaUniversity, FaSchool, FaBriefcase, FaCode, FaUserTie, FaMapMarkerAlt, FaRocket,
} from "react-icons/fa";
import M3Card from "../components/M3Card";
import M3Timeline, { M3TimelineItem } from "../components/M3Timeline";
import M3Chip from "../components/M3Chip";

const EDUCATION = [
  {
    title: "BSc in Computer Science & Engineering",
    org: "Northern University of Business & Technology Khulna",
    period: "2023 — 2027",
    location: "Khulna, BD",
    result: "CGPA 3.90 / 4.00",
    icon: <FaUniversity />,
    color: "primary",
    highlights: ["Software Engineering", "Active in CP"],
  },
  {
    title: "Higher Secondary Certificate",
    org: "Govt. Brajalal College, Khulna",
    period: "2019 — 2021",
    location: "Khulna, BD",
    result: "GPA 5.00 / 5.00",
    icon: <FaSchool />,
    color: "secondary",
    highlights: ["Science Group", "Mathematics"],
  },
  {
    title: "Secondary School Certificate",
    org: "Govt. Jalma Chakrakhali High School",
    period: "2017 — 2019",
    location: "Khulna, BD",
    result: "GPA 5.00 / 5.00",
    icon: <FaGraduationCap />,
    color: "info",
    highlights: ["Top 1% in District", "Science Olympiad"],
  },
];

const EXPERIENCE = [
  {
    title: "Founder & TPM",
    org: "Appriyo",
    period: "Jan 2026 — Present",
    location: "Hybrid · Khulna, BD",
    icon: <FaRocket />,
    color: "primary",
    summary: "Leading a team of 4 to deliver end-to-end IT solutions and MVPs.",
    bullets: ["Launched NFC Networking solutions", "Reduced MVP dev time by 30%", "Leading UI/UX & Marketing"],
  },
  {
    title: "Android Developer",
    org: "Independent Product",
    period: "Jul 2025 — Jan 2026",
    location: "Remote",
    icon: <FaCode />,
    color: "secondary",
    summary: "POS & Management system used by 5 active shop owners.",
    bullets: ["Bluetooth POS Printing", "Automated SMS reminders", "Talikhata & inventory"],
  },
  {
    title: "Freelance React Developer",
    org: "University Client",
    period: "Jun 2025 — Jul 2025",
    location: "Remote",
    icon: <FaUserTie />,
    color: "info",
    summary: "Dynamic academic portfolio with admin dashboard.",
    bullets: ["Real-time Firestore CRUD", "Modal editing", "Secure image hosting"],
  },
];

export default function MobileJourney() {
  const [tab, setTab] = useState("education");

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Segmented control */}
      <div className="bg-base-200/70 rounded-full p-1 flex">
        {[
          { key: "education", label: "Education" },
          { key: "experience", label: "Experience" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`
              flex-1 h-9 rounded-full m3-label-large
              transition-all duration-200
              ${tab === t.key
                ? "bg-primary text-primary-content m3-elev-1"
                : "text-base-content/65"}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "education" && (
        <M3Timeline>
          {EDUCATION.map((e, i) => (
            <M3TimelineItem
              key={i}
              icon={e.icon}
              color={e.color}
              title={e.title}
              subtitle={`${e.org} · ${e.period}`}
              trailing={
                <span className="m3-label-large text-primary">{e.result}</span>
              }
            >
              <div className="flex items-center gap-2 text-base-content/65 m3-body-medium mb-2">
                <FaMapMarkerAlt className="text-xs" />
                <span>{e.location}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {e.highlights.map((h) => (
                  <M3Chip key={h} label={h} />
                ))}
              </div>
            </M3TimelineItem>
          ))}
        </M3Timeline>
      )}

      {tab === "experience" && (
        <M3Timeline>
          {EXPERIENCE.map((x, i) => (
            <M3TimelineItem
              key={i}
              icon={x.icon}
              color={x.color}
              title={x.title}
              subtitle={`${x.org} · ${x.period}`}
              trailing={
                <span className="text-base-content/55 text-xs flex items-center gap-1">
                  <FaMapMarkerAlt /> {x.location}
                </span>
              }
            >
              <p className="m3-body-medium text-base-content/75 mb-2">{x.summary}</p>
              <ul className="space-y-1">
                {x.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="m3-body-medium text-base-content/70 flex gap-2"
                  >
                    <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </M3TimelineItem>
          ))}
        </M3Timeline>
      )}

      {/* Bottom CTA card */}
      <M3Card elevation={0} className="bg-primary text-primary-content !border-0">
        <div className="flex items-center gap-3">
          <FaBriefcase className="text-2xl flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="m3-title-large">Open to opportunities</h4>
            <p className="m3-body-medium opacity-90">
              Available for full-time, contract, and freelance roles.
            </p>
          </div>
        </div>
      </M3Card>
    </div>
  );
}