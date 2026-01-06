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
  
  // Get GitHub token from Vite environment variables
  // Vite uses import.meta.env instead of process.env
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching GitHub data for:', username);
        console.log('Using GitHub Token:', GITHUB_TOKEN ? 'Yes' : 'No');
        
        // Prepare headers with token if available
        const headers = {};
        if (GITHUB_TOKEN) {
          headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        headers['Accept'] = 'application/vnd.github.v3+json';

        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`, 
          { headers }
        );
        
        console.log('User API Response Status:', userResponse.status);
        
        // Check for specific errors
        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.error('User API Error:', errorText);
          
          if (userResponse.status === 404) {
            throw new Error(`GitHub user "${username}" not found. Please check the username.`);
          } else if (userResponse.status === 403) {
            if (GITHUB_TOKEN) {
              throw new Error('GitHub token is invalid or expired. Please regenerate your token.');
            } else {
              throw new Error('GitHub API rate limit exceeded. Please add a GitHub token to your .env file.');
            }
          } else if (userResponse.status === 401) {
            throw new Error('Invalid GitHub token. Please check your VITE_GITHUB_TOKEN.');
          } else {
            throw new Error(`GitHub API error: ${userResponse.status} - ${userResponse.statusText}`);
          }
        }

        const user = await userResponse.json();
        console.log('User data fetched successfully:', user.login);

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers }
        );
        
        console.log('Repos API Response Status:', reposResponse.status);
        
        if (!reposResponse.ok) {
          const errorText = await reposResponse.text();
          console.error('Repos API Error:', errorText);
          throw new Error(`Failed to fetch repositories: ${reposResponse.status} - ${reposResponse.statusText}`);
        }

        const repos = await reposResponse.json();
        console.log(`Successfully fetched ${repos.length} repositories`);

        setUserData(user);
        setRepoData(repos);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('GitHub data fetch error:', err);
        setError(err.message || 'An unknown error occurred while fetching GitHub data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [username, GITHUB_TOKEN]);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "https://github.com/identicons/app.png";
    e.target.onerror = null; // Prevent infinite loop
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-6">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Loading GitHub Statistics...</p>
          <p className="text-sm text-base-content/70">
            Fetching data for <span className="font-semibold">{username}</span>
          </p>
          {GITHUB_TOKEN && (
            <p className="text-xs text-success mt-2">
              <span className="badge badge-success badge-xs mr-1"></span>
              Using GitHub Token for authentication
            </p>
          )}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-12 px-4">
        <div className="alert alert-error shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Failed to Load GitHub Data</h3>
            <div className="text-sm mt-1">{error}</div>
            <div className="mt-3 text-xs space-y-2">
              <p className="font-semibold">Troubleshooting steps:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Verify your GitHub username is correct: <code className="bg-base-300 px-1 rounded">{username}</code></li>
                <li>Check that your GitHub token has <code className="bg-base-300 px-1 rounded">public_repo</code> scope</li>
                <li>Restart your development server after adding the token</li>
                <li>Check browser console for detailed error messages</li>
              </ol>
              {error.includes('rate limit') && !GITHUB_TOKEN && (
                <div className="mt-2 p-2 bg-base-300 rounded">
                  <p className="font-semibold mb-1">Add GitHub Token:</p>
                  <code className="text-xs block p-2 bg-base-200 rounded">
                    VITE_GITHUB_TOKEN=your_token_here
                  </code>
                  <a 
                    href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link link-accent text-xs mt-1 inline-block"
                  >
                    How to create a GitHub token
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Fallback static content */}
        <div className="mt-8 text-center">
          <p className="mb-4">Showing limited information without API data:</p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View GitHub Profile
          </a>
        </div>
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

  // Prepare chart data
  const starsChartData = {
    labels: starsPerRepo.map(repo => repo.name.length > 15 ? repo.name.substring(0, 12) + '...' : repo.name),
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="github" className="py-12 px-4 sm:px-6 lg:px-8 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        {/* Header with auth status */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              GitHub Statistics
            </h2>
            {GITHUB_TOKEN && (
              <div className="tooltip" data-tip="Using GitHub Token">
                <div className="badge badge-success badge-sm">Auth</div>
              </div>
            )}
          </div>
          
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity inline-block"
          >
            <div className="flex items-center justify-center gap-4 cursor-pointer group">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 group-hover:ring-secondary transition-all">
                  <img
                    src={userData?.avatar_url || "https://github.com/identicons/app.png"}
                    alt={`${username}'s GitHub profile`}
                    onError={handleImageError}
                  />
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {userData?.name || userData?.login || username}
                </h3>
                <p className="text-sm opacity-80">
                  {userData?.bio || "GitHub Developer"}
                </p>
                <p className="text-xs opacity-60 mt-1">
                  @{userData?.login || username}
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
          <div className="space-y-8 animate-fadeIn">
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Public Repos"
                value={userData?.public_repos || 0}
                subtitle="Total repositories"
                icon="📦"
                trend={repoData?.length > 0 ? `${repoData.length} loaded` : null}
              />
              <StatCard
                title="Total Stars"
                value={totalStars.toLocaleString()}
                subtitle="Across all repositories"
                icon="⭐"
              />
              <StatCard
                title="Total Forks"
                value={totalForks.toLocaleString()}
                subtitle="Repository forks"
                icon="🔀"
              />
              <StatCard
                title="Followers"
                value={userData?.followers?.toLocaleString() || 0}
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
                      value={formatDate(userData?.created_at)}
                    />
                    <StatItem
                      label="Last Updated"
                      value={formatDate(userData?.updated_at)}
                    />
                    <StatItem
                      label="Following"
                      value={userData?.following?.toLocaleString() || 0}
                    />
                    <StatItem
                      label="Location"
                      value={userData?.location || "Not specified"}
                    />
                    {userData?.company && (
                      <StatItem
                        label="Company"
                        value={userData.company}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="card-title text-2xl">Popular Repositories</h3>
                    <span className="badge badge-outline">
                      {starsPerRepo.length} of {repoData?.length || 0}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {starsPerRepo.length > 0 ? (
                      starsPerRepo.map((repo, index) => (
                        <div key={repo.id} className="flex justify-between items-center p-3 bg-base-300 rounded-lg hover:bg-base-300/80 transition-colors">
                          <div className="flex-1 min-w-0">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link link-hover font-medium text-lg truncate block"
                              title={repo.name}
                            >
                              {repo.name}
                            </a>
                            <p className="text-sm opacity-70 truncate" title={repo.description || "No description"}>
                              {repo.description || "No description"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <span className="badge badge-primary badge-lg whitespace-nowrap">
                              ⭐ {repo.stargazers_count}
                            </span>
                            {repo.forks_count > 0 && (
                              <span className="badge badge-outline whitespace-nowrap">
                                🔀 {repo.forks_count}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-base-content/70">No starred repositories yet</p>
                        <p className="text-sm mt-2">Start by adding stars to your favorite repositories!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Repositories Tab */}
        {activeTab === "repositories" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Most Starred Repositories</h3>
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
                                callback: function(value) {
                                  return Number(value).toLocaleString();
                                }
                              },
                              grid: {
                                color: 'hsl(var(--b3))',
                              },
                            },
                            x: {
                              ticks: {
                                color: 'hsl(var(--bc))',
                                maxRotation: 45,
                              },
                              grid: {
                                color: 'hsl(var(--b3))',
                              },
                            },
                          },
                          plugins: {
                            legend: {
                              display: false,
                            },
                            tooltip: {
                              callbacks: {
                                label: function(context) {
                                  return `Stars: ${context.parsed.y.toLocaleString()}`;
                                }
                              }
                            }
                          },
                        }}
                      />
                    ) : (
                      <div className="flex flex-col justify-center items-center h-full text-center">
                        <div className="text-4xl mb-4">📊</div>
                        <p className="text-base-content/70">No starred repositories to display</p>
                        <p className="text-sm mt-2">Star some repositories to see analytics here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Repository Statistics</h3>
                  <div className="space-y-6">
                    <StatItem
                      label="Total Repositories"
                      value={userData?.public_repos?.toLocaleString() || 0}
                    />
                    <StatItem
                      label="Average Stars per Repo"
                      value={userData?.public_repos ? (totalStars / userData.public_repos).toFixed(1) : "0.0"}
                    />
                    <StatItem
                      label="Average Forks per Repo"
                      value={userData?.public_repos ? (totalForks / userData.public_repos).toFixed(1) : "0.0"}
                    />
                    <StatItem
                      label="Total Watchers"
                      value={repoData?.reduce((acc, repo) => acc + repo.watchers_count, 0) || 0}
                    />
                    <div className="divider"></div>
                    <div>
                      <p className="font-medium opacity-80 mb-2">Repository Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {(() => {
                          const languages = {};
                          repoData?.forEach(repo => {
                            if (repo.language) {
                              languages[repo.language] = (languages[repo.language] || 0) + 1;
                            }
                          });
                          return Object.entries(languages)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5)
                            .map(([lang, count]) => (
                              <span key={lang} className="badge badge-outline">
                                {lang}: {count}
                              </span>
                            ));
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Contribution Calendar</h3>
                <div className="overflow-x-auto">
                  <div className="rounded-xl bg-base-100 p-4 md:p-6 w-full">
                    <GitHubCalendar
                      username={username}
                      blockSize={12}
                      blockMargin={4}
                      fontSize={12}
                      theme={{
                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                      }}
                      renderBlock={(block, activity) => (
                        <div
                          title={`${activity.count} contributions on ${activity.date}`}
                          style={{ backgroundColor: block.color }}
                          className="rounded-sm"
                        />
                      )}
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
                    src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&bg_color=00000000`}
                    alt="GitHub Stats"
                    className="w-full h-auto rounded-lg"
                    onError={handleImageError}
                  />
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4">Top Languages</h3>
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&bg_color=00000000&hide_title=true`}
                    alt="Top Languages"
                    className="w-full h-auto rounded-lg"
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Commit Streak</h3>
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&hide_border=true&background=00000000`}
                  alt="GitHub Streak Stats"
                  className="w-full h-auto rounded-lg"
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        {GITHUB_TOKEN && (
          <div className="text-center mt-12 pt-6 border-t border-base-300">
            <p className="text-sm opacity-60">
              Using authenticated GitHub API calls
              <span className="mx-2">•</span>
              Rate limit: 5,000 requests/hour
              <span className="mx-2">•</span>
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Helper components
const StatCard = ({ title, value, subtitle, icon, trend }) => (
  <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className="card-body">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold opacity-80">{title}</h3>
          <p className="text-3xl font-bold my-1">{value}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-60">{subtitle}</p>
            {trend && (
              <span className="text-xs badge badge-outline">{trend}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-base-300 last:border-0">
    <span className="font-medium opacity-80">{label}</span>
    <span className="font-bold text-lg">{value}</span>
  </div>
);

export default GitHubStats;