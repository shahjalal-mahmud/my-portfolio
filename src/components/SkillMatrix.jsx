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
import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillMatrix = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark" || theme.includes("dark") || theme.includes("night");

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
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
        },
        pointLabels: {
          color: isDark ? "#e5e7eb" : "#1f2937",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: isDark ? "#9ca3af" : "#6b7280",
          stepSize: 20,
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#f3f4f6" : "#111827",
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
    <section id="skill-matrix" className="py-12 md:py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10">
          Skill Matrix
        </h2>
        <p className="opacity-90 mb-6 md:mb-8">
          A visual representation of my technical proficiency across key development areas.
        </p>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] p-4 rounded-xl bg-base-200 shadow-lg">
          <Radar data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default SkillMatrix;