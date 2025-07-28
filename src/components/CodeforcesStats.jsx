// src/components/CodeforcesStats.jsx
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CodeforcesStats = () => {
  const handle = "mahmud.nubtk";
  const [userInfo, setUserInfo] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [infoResponse, ratingResponse, submissionsResponse] = await Promise.all([
          fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
          fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
          fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
        ]);

        const [infoData, ratingData, submissionsData] = await Promise.all([
          infoResponse.json(),
          ratingResponse.json(),
          submissionsResponse.json()
        ]);

        setUserInfo(infoData.result[0]);
        setUserRating(ratingData.result);
        setUserSubmissions(submissionsData.result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [handle]);

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
        <span>Error loading Codeforces data: {error}</span>
      </div>
    );
  }

  // Calculate statistics
  const solvedProblems = userSubmissions
    ? new Set(
        userSubmissions
          .filter((sub) => sub.verdict === "OK")
          .map((sub) => `${sub.problem.contestId}${sub.problem.index}`)
      ).size
    : 0;

  const submissionsByVerdict = userSubmissions?.reduce((acc, sub) => {
    acc[sub.verdict] = (acc[sub.verdict] || 0) + 1;
    return acc;
  }, {});

  const problemsByLevel = userSubmissions
    ?.filter((sub) => sub.verdict === "OK")
    ?.reduce((acc, sub) => {
      const level = sub.problem.index?.[0] || "Unknown";
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

  const problemsByTag = userSubmissions
    ?.filter((sub) => sub.verdict === "OK")
    ?.flatMap((sub) => sub.problem.tags || [])
    ?.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

  // Prepare chart data
  const ratingChartData = {
    labels: userRating?.map((contest) => `Contest ${contest.contestId}`),
    datasets: [
      {
        label: "Rating",
        data: userRating?.map((contest) => contest.newRating),
        borderColor: "hsl(var(--p))",
        backgroundColor: "hsla(var(--p), 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "hsl(var(--s))",
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const verdictChartData = {
    labels: Object.keys(submissionsByVerdict || {}),
    datasets: [
      {
        data: Object.values(submissionsByVerdict || {}),
        backgroundColor: [
          "hsl(var(--su))",
          "hsl(var(--er))",
          "hsl(var(--wa))",
          "hsl(var(--in))",
          "hsl(var(--p))",
        ],
        borderWidth: 1,
      },
    ],
  };

  const levelChartData = {
    labels: Object.keys(problemsByLevel || {}).sort(),
    datasets: [
      {
        label: "Problems Solved",
        data: Object.keys(problemsByLevel || {}).sort().map((level) => problemsByLevel[level]),
        backgroundColor: "hsl(var(--p))",
        borderRadius: 4,
      },
    ],
  };

  // Sort tags by count and take top 10
  const sortedTags = problemsByTag
    ? Object.entries(problemsByTag).sort((a, b) => b[1] - a[1]).slice(0, 10)
    : [];

  return (
    <section id="codeforces" className="py-12 px-4 sm:px-6 lg:px-8 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Codeforces Statistics
          </h2>
          <a
            href="https://codeforces.com/profile/mahmud.nubtk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
          <div className="flex items-center justify-center gap-4 cursor-pointer">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={userInfo?.titlePhoto || "https://userpic.codeforces.com/no-title.jpg"} alt="Profile" />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">{userInfo?.handle}</h3>
              <p className="text-sm opacity-80">
                {userInfo?.organization || "No organization"} • {userInfo?.city || "Unknown location"}
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
            className={`tab ${activeTab === "submissions" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("submissions")}
          >
            Submissions
          </button>
          <button
            className={`tab ${activeTab === "problems" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("problems")}
          >
            Problems
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Current Rating"
                value={userInfo?.rating || "N/A"}
                subtitle={userInfo?.rank || "Unrated"}
                icon="📊"
              />
              <StatCard
                title="Max Rating"
                value={userInfo?.maxRating || "N/A"}
                subtitle={userInfo?.maxRank || "Unrated"}
                icon="🚀"
              />
              <StatCard
                title="Problems Solved"
                value={solvedProblems}
                subtitle="Unique AC submissions"
                icon="✅"
              />
              <StatCard
                title="Contests"
                value={userRating?.length || 0}
                subtitle="Participated"
                icon="🏆"
              />
            </div>

            {/* Rating Chart */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Rating Progress</h3>
                <div className="h-80">
                  {userRating?.length > 0 ? (
                    <Line 
                      data={ratingChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p>No rating history available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Activity</h3>
                  <div className="space-y-4">
                    <StatItem
                      label="Last Online"
                      value={userInfo?.lastOnlineTimeSeconds ? new Date(userInfo.lastOnlineTimeSeconds * 1000).toLocaleString() : "N/A"}
                    />
                    <StatItem
                      label="Registered"
                      value={userInfo?.registrationTimeSeconds ? new Date(userInfo.registrationTimeSeconds * 1000).toLocaleDateString() : "N/A"}
                    />
                    <StatItem
                      label="Friend of"
                      value={userInfo?.friendOfCount || 0}
                    />
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Contest Performance</h3>
                  <div className="space-y-4">
                    <StatItem
                      label="Best Rank"
                      value={Math.min(...(userRating?.map(r => r.rank) || [0]))}
                    />
                    <StatItem
                      label="Worst Rank"
                      value={Math.max(...(userRating?.map(r => r.rank) || [0]))}
                    />
                    <StatItem
                      label="Average Rating Change"
                      value={userRating?.length ? (userRating.reduce((sum, r) => sum + (r.newRating - r.oldRating), 0) / userRating.length).toFixed(1) : 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Submission Verdicts</h3>
                  <div className="h-64">
                    {submissionsByVerdict ? (
                      <Doughnut
                        data={verdictChartData}
                        options={{
                          plugins: {
                            legend: {
                              position: "right",
                            },
                          },
                        }}
                      />
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <p>No submission data available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Submission Stats</h3>
                  <div className="space-y-4">
                    <StatItem
                      label="Total Submissions"
                      value={userSubmissions?.length || 0}
                    />
                    <StatItem
                      label="Accepted Rate"
                      value={userSubmissions?.length ? `${((solvedProblems / userSubmissions.length) * 100).toFixed(1)}%` : "0%"}
                    />
                    <StatItem
                      label="Most Used Language"
                      value={userSubmissions?.reduce((acc, sub) => {
                        acc[sub.programmingLanguage] = (acc[sub.programmingLanguage] || 0) + 1;
                        return acc;
                      }, {}) ? Object.entries(
                        userSubmissions.reduce((acc, sub) => {
                          acc[sub.programmingLanguage] = (acc[sub.programmingLanguage] || 0) + 1;
                          return acc;
                        }, {})
                      ).sort((a, b) => b[1] - a[1])[0][0] : "N/A"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Problems Tab */}
        {activeTab === "problems" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Problems by Level</h3>
                  <div className="h-64">
                    {problemsByLevel ? (
                      <Bar
                        data={levelChartData}
                        options={{
                          responsive: true,
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                        }}
                      />
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <p>No problem data available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Top Problem Tags</h3>
                  <div className="space-y-3">
                    {sortedTags.length > 0 ? (
                      sortedTags.map(([tag, count]) => (
                        <div key={tag} className="flex items-center">
                          <div className="w-32 font-medium">{tag}</div>
                          <progress
                            className="progress progress-primary w-full"
                            value={count}
                            max={sortedTags[0][1]}
                          ></progress>
                          <div className="w-12 text-right">{count}</div>
                        </div>
                      ))
                    ) : (
                      <p>No tag data available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Helper components
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

export default CodeforcesStats;