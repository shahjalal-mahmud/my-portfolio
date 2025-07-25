// src/components/GitHubStats.jsx
import GitHubCalendar from "react-github-calendar";

const GitHubStats = () => {
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
          <div className="rounded-xl bg-base-100 p-6 shadow-md border border-base-300 w-full max-w-3xl">
            <GitHubCalendar
              username={username}
              blockSize={17}
              blockMargin={6}
              color="hsl(var(--p))" // Using primary color from DaisyUI
              fontSize={15}
            />
          </div>
        </div>

        {/* GitHub Stats (2-column layout) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center"
          data-aos="fade-up"
        >
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-4">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=&hide_border=true&border_radius=20`}
              alt="GitHub Stats"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-4">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&hide_border=true&border_radius=20`}
              alt="Top Languages"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>

        {/* GitHub Streak - matching width */}
        <div
          className="mt-12 mx-auto bg-base-100 border border-base-300 rounded-2xl shadow-md p-4 max-w-3xl"
          data-aos="fade-up"
        >
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true&border_radius=20`}
            alt="GitHub Streak Stats"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;