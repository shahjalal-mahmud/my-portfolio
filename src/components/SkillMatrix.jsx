// src/components/SkillMatrix.jsx
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillMatrix = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const data = {
    labels: [
      "Kotlin",
      "Jetpack Compose",
      "React.js",
      "Node.js",
      "MongoDB",
      "Firebase",
      "DSA",
    ],
    datasets: [
      {
        label: "Proficiency (%)",
        data: [90, 85, 80, 70, 65, 75, 80],
        backgroundColor: isDark ? "rgba(16, 185, 129, 0.3)" : "rgba(59, 130, 246, 0.2)",
        borderColor: isDark ? "#10b981" : "#3b82f6",
        borderWidth: 2,
        pointBackgroundColor: isDark ? "#10b981" : "#3b82f6",
        pointHoverRadius: 7,
        pointRadius: 5,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: isDark ? "#444" : "#ccc",
        },
        grid: {
          color: isDark ? "#555" : "#e5e5e5",
        },
        pointLabels: {
          color: isDark ? "#ddd" : "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: isDark ? "#aaa" : "#555",
          stepSize: 20,
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#fff" : "#000",
          font: {
            weight: "600",
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: isDark ? "#1f2937" : "#f9fafb",
        titleColor: isDark ? "#10b981" : "#3b82f6",
        bodyColor: isDark ? "#e5e7eb" : "#1f2937",
        borderColor: isDark ? "#10b981" : "#3b82f6",
        borderWidth: 1,
        titleFont: { weight: "bold" },
        bodyFont: { weight: "normal" },
      },
    },
  };

  return (
    <section id="skill-matrix" className="py-20 px-6 bg-base-100 dark:bg-base-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10" data-aos="fade-up">
          Skill Matrix
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="100">
          A visual representation of my technical proficiency across key development areas.
        </p>
        <div
          className="relative w-full h-[400px] sm:h-[500px] p-4 rounded-xl bg-base-200 dark:bg-base-300 shadow-lg"
          data-aos="zoom-in"
        >
          <Radar data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default SkillMatrix;
