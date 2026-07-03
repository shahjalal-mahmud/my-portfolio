// MobileContact — M3-styled contact form + quick-info cards. Uses the shared
// EmailJS config so the form behaves identically on both shells.

import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane,
} from "react-icons/fa";
import M3Card from "../components/M3Card";
import M3Button from "../components/M3Button";
import M3Chip from "../components/M3Chip";
import { EMAILJS_CONFIG, CONTACT_INFO } from "../../shared/data/contact";

const FIELDS = [
  { name: "user_name", label: "Full name", placeholder: "e.g. Shahajalal", type: "text", colSpan: 1 },
  { name: "user_email", label: "Email", placeholder: "example@mail.com", type: "email", colSpan: 1 },
  { name: "subject", label: "Subject", placeholder: "Hiring / Collaboration", type: "text", colSpan: 2 },
  { name: "message", label: "Message", placeholder: "Tell me about your project…", type: "textarea", colSpan: 2 },
];

export default function MobileContact() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    emailjs
      .sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      )
      .then(
        () => {
          toast.success("✅ Message sent successfully!");
          formRef.current?.reset();
          setSending(false);
        },
        (err) => {
          console.error(err);
          toast.error("❌ Failed to send. Try again.");
          setSending(false);
        }
      );
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Hero */}
      <M3Card elevation={1}>
        <h2 className="m3-headline-medium text-base-content">Get in touch</h2>
        <p className="m3-body-medium text-base-content/70 mt-1">
          {CONTACT_INFO.subtitle}
        </p>
        <div className="mt-3">
          <M3Chip
            variant="assist"
            label="Available for Work"
            icon={<span className="w-2 h-2 rounded-full bg-success animate-ping" />}
          />
        </div>
      </M3Card>

      {/* Quick info */}
      <M3Card elevation={0} className="!p-0 divide-y divide-base-300/60">
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="m3-tap flex items-center gap-3 px-4 py-3.5 m3-state-hover"
        >
          <span className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center text-lg">
            <FaEnvelope />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block m3-body-medium text-base-content/55">Email</span>
            <span className="block m3-body-large text-base-content truncate">{CONTACT_INFO.email}</span>
          </span>
        </a>
        <a
          href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
          className="m3-tap flex items-center gap-3 px-4 py-3.5 m3-state-hover"
        >
          <span className="w-10 h-10 rounded-2xl bg-success/15 text-success flex items-center justify-center text-lg">
            <FaPhone />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block m3-body-medium text-base-content/55">Phone</span>
            <span className="block m3-body-large text-base-content">{CONTACT_INFO.phone}</span>
          </span>
        </a>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <span className="w-10 h-10 rounded-2xl bg-error/15 text-error flex items-center justify-center text-lg">
            <FaMapMarkerAlt />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block m3-body-medium text-base-content/55">Location</span>
            <span className="block m3-body-large text-base-content">{CONTACT_INFO.location}</span>
          </span>
        </div>
      </M3Card>

      {/* Form */}
      <M3Card elevation={1}>
        <h3 className="m3-title-large text-base-content">Send a Message</h3>
        <p className="m3-body-medium text-base-content/55 mt-0.5">
          I&apos;ll reply within 24 hours.
        </p>

        <form ref={formRef} onSubmit={onSubmit} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {FIELDS.map((f) => (
              <div key={f.name} className={f.colSpan === 2 ? "col-span-2" : ""}>
                <label className="block m3-label-medium text-base-content/65 mb-1">
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    rows={4}
                    required
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 m3-body-medium bg-base-200/60 border border-base-300/60 rounded-xl text-base-content placeholder:text-base-content/35 focus:outline-none focus:border-primary focus:bg-base-200 transition-colors resize-none"
                  />
                ) : (
                  <input
                    name={f.name}
                    type={f.type}
                    required={f.type !== "text" || f.name === "user_name"}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 m3-body-medium bg-base-200/60 border border-base-300/60 rounded-xl text-base-content placeholder:text-base-content/35 focus:outline-none focus:border-primary focus:bg-base-200 transition-colors"
                  />
                )}
              </div>
            ))}
          </div>

          <M3Button
            variant="filled"
            type="submit"
            icon={<FaPaperPlane />}
            fullWidth
          >
            {sending ? "Sending…" : "Send Inquiry"}
          </M3Button>
        </form>
      </M3Card>
    </div>
  );
}