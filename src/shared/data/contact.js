// EmailJS configuration shared by both desktop and mobile Contact forms.
// TODO: move serviceId / templateId / publicKey to env vars (e.g. VITE_EMAILJS_*)
//       to keep keys out of the source bundle. Currently bundled because EmailJS
//       public keys are designed to be client-side anyway.

export const EMAILJS_CONFIG = {
  serviceId: "service_9c09v8d",
  templateId: "template_z5hgwcs",
  publicKey: "JLbxXRTE6OGFflAQB",
};

export const CONTACT_INFO = {
  email: "mahmud.nubtk@gmail.com",
  phone: "+880 18897-93146",
  location: "Khulna, Bangladesh",
  subtitle:
    "Whether you're a founder looking for an MVP, a business needing a digital overhaul, or a developer wanting to collaborate at Appriyo — my inbox is always open.",
};