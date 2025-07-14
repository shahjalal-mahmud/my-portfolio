// src/components/GitHubStats.jsx
import GitHubCalendar from "react-github-calendar";
import { useEffect, useState } from "react";

const GitHubStats = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
  const html = document.querySelector("html");
  if (html) {
    setIsDark(html.classList.contains("dark"));
  }
}, []);


  const username = "shahjalal-mahmud";

  return (
    <section id="github" className="py-20 bg-base-200 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10" data-aos="fade-up">
          GitHub Contributions
        </h2>

        {/* Contribution Heatmap */}
        <div className="overflow-x-auto pb-10" data-aos="zoom-in">
          <GitHubCalendar
            username={username}
            blockSize={15}
            blockMargin={5}
            color="#570df8"
            fontSize={14}
            theme={isDark ? "dark" : "light"}
          />
        </div>

        {/* Profile Stats Card */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6" data-aos="fade-up">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${isDark ? "tokyonight" : "default"}&hide_border=false&border_radius=10`}
            alt="GitHub Stats"
            className="max-w-full rounded-xl shadow-md"
          />

          {/* Most Used Languages */}
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${isDark ? "tokyonight" : "default"}&hide_border=false&border_radius=10`}
            alt="Top Languages"
            className="max-w-full rounded-xl shadow-md"
          />
        </div>

        {/* Streak Stats */}
        <div className="pt-10" data-aos="fade-up">
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${isDark ? "tokyonight" : "default"}&hide_border=false&border_radius=10`}
            alt="GitHub Streak Stats"
            className="max-w-full rounded-xl shadow-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
