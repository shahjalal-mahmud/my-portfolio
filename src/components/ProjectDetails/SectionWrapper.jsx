// src/components/ProjectDetails/SectionWrapper.jsx
const SectionWrapper = ({ title, children }) => (
  <div className="mb-10">
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <div className="text-gray-700 dark:text-gray-300 text-sm">{children}</div>
  </div>
);

export default SectionWrapper;
