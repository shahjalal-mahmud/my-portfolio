// src/components/ProjectDetails/SectionWrapper.jsx
// NOTE: SectionWrapper is now largely replaced by the inline SectionCard in ProjectDetails.jsx
// This file is kept for backward compatibility with any other components that import it.

const SectionWrapper = ({ title, children }) => (
  <div className="mb-8">
    {title && (
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-5 bg-primary/40" />
        <h3 className="text-[10px] uppercase tracking-[0.22em] text-primary font-bold">{title}</h3>
      </div>
    )}
    <div className="text-base-content/70 text-sm leading-relaxed">{children}</div>
  </div>
);

export default SectionWrapper;