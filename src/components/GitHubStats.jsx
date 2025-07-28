// src/components/GitHubStats.jsx
import { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, Filler } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Filler
);

const GitHubStats = () => {
  const username = "shahjalal-mahmud";
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const [user, repos] = await Promise.all([
          userResponse.json(),
          reposResponse.json()
        ]);

        setUserData(user);
        setRepoData(repos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto my-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading GitHub data: {error}</span>
      </div>
    );
  }

  // Calculate statistics
  const totalStars = repoData?.reduce((acc, repo) => acc + repo.stargazers_count, 0) || 0;
  const totalForks = repoData?.reduce((acc, repo) => acc + repo.forks_count, 0) || 0;

  const starsPerRepo = repoData
    ?.filter(repo => repo.stargazers_count > 0)
    ?.sort((a, b) => b.stargazers_count - a.stargazers_count)
    ?.slice(0, 5) || [];

  const starsChartData = {
    labels: starsPerRepo.map(repo => repo.name),
    datasets: [
      {
        label: 'Stars',
        data: starsPerRepo.map(repo => repo.stargazers_count),
        backgroundColor: Array(starsPerRepo.length).fill(0).map((_, i) =>
          `hsl(var(--${['p', 's', 'a', 'in', 'su'][i % 5]}))`.replace('))', ')')
        ),
        borderColor: 'hsl(var(--b1))',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };


  return (
    <section id="github" className="py-12 px-4 sm:px-6 lg:px-8 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            GitHub Statistics
          </h2>
          <a
            href="https://github.com/shahjalal-mahmud"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center gap-4 cursor-pointer">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={userData?.avatar_url || "https://github.com/identicons/app.png"}
                    alt="Profile"
                  />
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">{userData?.name || username}</h3>
                <p className="text-sm opacity-80">
                  {userData?.bio || "No bio available"}
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs tabs-boxed bg-base-200 justify-center mb-8">
          <button
            className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === "repositories" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("repositories")}
          >
            Repositories
          </button>
          <button
            className={`tab ${activeTab === "activity" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Public Repos"
                value={userData?.public_repos || 0}
                subtitle="Total repositories"
                icon="📦"
              />
              <StatCard
                title="Total Stars"
                value={totalStars}
                subtitle="Across all repositories"
                icon="⭐"
              />
              <StatCard
                title="Total Forks"
                value={totalForks}
                subtitle="Repository forks"
                icon="🔀"
              />
              <StatCard
                title="Followers"
                value={userData?.followers || 0}
                subtitle="GitHub followers"
                icon="👥"
              />
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Profile Info</h3>
                  <div className="space-y-4">
                    <StatItem
                      label="Account Created"
                      value={userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : "N/A"}
                    />
                    <StatItem
                      label="Last Active"
                      value={userData?.updated_at ? new Date(userData.updated_at).toLocaleDateString() : "N/A"}
                    />
                    <StatItem
                      label="Following"
                      value={userData?.following || 0}
                    />
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Popular Repositories</h3>
                  <div className="space-y-4">
                    {starsPerRepo.length > 0 ? (
                      starsPerRepo.map(repo => (
                        <div key={repo.id} className="flex justify-between items-center">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-hover font-medium"
                          >
                            {repo.name}
                          </a>
                          <span className="badge badge-primary">
                            {repo.stargazers_count} stars
                          </span>
                        </div>
                      ))
                    ) : (
                      <p>No starred repositories</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Repositories Tab */}
        {activeTab === "repositories" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Most Starred Repos</h3>
                  <div className="h-64 w-full">
                    {starsPerRepo.length > 0 ? (
                      <Bar
                        data={starsChartData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true,
                              ticks: {
                                color: 'hsl(var(--bc))',
                              },
                              grid: {
                                color: 'hsl(var(--b3))',
                              },
                            },
                            x: {
                              ticks: {
                                color: 'hsl(var(--bc))',
                              },
                              grid: {
                                color: 'hsl(var(--b3))',
                              },
                            },
                          },
                          plugins: {
                            legend: {
                              labels: {
                                color: 'hsl(var(--bc))',
                              },
                            },
                          },
                        }}
                      />
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <p>No starred repositories</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Repository Stats</h3>
                  <div className="space-y-4">
                    <StatItem
                      label="Total Repositories"
                      value={userData?.public_repos || 0}
                    />
                    <StatItem
                      label="Average Stars"
                      value={userData?.public_repos ? (totalStars / userData.public_repos).toFixed(1) : 0}
                    />
                    <StatItem
                      label="Average Forks"
                      value={userData?.public_repos ? (totalForks / userData.public_repos).toFixed(1) : 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="space-y-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Contribution Calendar</h3>
                <div className="overflow-x-auto">
                  <div className="rounded-xl bg-base-100 p-6 w-full">
                    <GitHubCalendar
                      username={username}
                      blockSize={14}
                      blockMargin={4}
                      fontSize={14}
                      theme={{
                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">GitHub Stats</h3>
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent`}
                    alt="GitHub Stats"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Top Languages</h3>
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent`}
                    alt="Top Languages"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Commit Streak</h3>
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent`}
                  alt="GitHub Streak Stats"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Helper components (same as in CodeforcesStats)
const StatCard = ({ title, value, subtitle, icon }) => (
  <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
    <div className="card-body">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold opacity-80">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm opacity-60">{subtitle}</p>
        </div>
      </div>
    </div>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="font-medium opacity-80">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

export default GitHubStats;