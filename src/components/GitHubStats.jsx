// src/components/GitHubStats.jsx
import GitHubCalendar from "react-github-calendar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const GitHubStats = () => {
  const { isDark } = useContext(ThemeContext);
  const username = "shahjalal-mahmud";

  return (
    <section id="github" className="py-24 px-6 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto text-center">
        {/* Elegant, premium heading */}
        <h2
          className="text-4xl md:text-5xl font-bold mb-14"
          data-aos="fade-up"
        >
          My GitHub Stats
        </h2>

        {/* GitHub Calendar */}
        <div
          className="overflow-x-auto pb-12 flex justify-center"
          data-aos="zoom-in"
        >
          <div className="rounded-xl bg-base-100 p-6 shadow-md border border-base-300 dark:border-base-100 w-full max-w-3xl">
            <GitHubCalendar
              username={username}
              blockSize={17}
              blockMargin={6}
              color="#570df8"
              fontSize={15}
              colorScheme={isDark ? "dark" : "light"}
            />
          </div>
        </div>

        {/* GitHub Stats (2-column layout) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center"
          data-aos="fade-up"
        >
          <div className="bg-base-100 border border-base-300 dark:border-base-100 rounded-2xl shadow-md p-4">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${
                isDark ? "tokyonight" : "default"
              }&hide_border=true&border_radius=20`}
              alt="GitHub Stats"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="bg-base-100 border border-base-300 dark:border-base-100 rounded-2xl shadow-md p-4">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${
                isDark ? "tokyonight" : "default"
              }&hide_border=true&border_radius=20`}
              alt="Top Languages"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>

        {/* GitHub Streak - matching width */}
        <div
          className="mt-12 mx-auto bg-base-100 border border-base-300 dark:border-base-100 rounded-2xl shadow-md p-4 max-w-3xl"
          data-aos="fade-up"
        >
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${
              isDark ? "tokyonight" : "default"
            }&hide_border=true&border_radius=20`}
            alt="GitHub Streak Stats"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
