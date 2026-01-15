import { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { 
  Github, 
  Star, 
  GitFork, 
  Users, 
  Package, 
  MapPin, 
  Calendar,
  TrendingUp 
} from "lucide-react";

const GitHubStats = () => {
  const username = "shahjalal-mahmud";
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
        };

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
        ]);

        if (!userRes.ok) throw new Error("Could not fetch GitHub profile");

        const user = await userRes.json();
        const repos = await reposRes.json();

        setUserData(user);
        setRepoData(repos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [username, GITHUB_TOKEN]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
      <span className="loading loading-infinity loading-lg text-primary"></span>
      <p className="animate-pulse font-mono">Syncing with GitHub...</p>
    </div>
  );

  const totalStars = repoData?.reduce((acc, repo) => acc + repo.stargazers_count, 0) || 0;
  const topRepos = repoData?.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4) || [];

  return (
    <section id="github" className="py-20 px-4 bg-base-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 bg-base-200/50 p-8 rounded-3xl border border-base-300 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="avatar">
              <div className="w-32 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl">
                <img src={userData?.avatar_url} alt="Profile" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tight">{userData?.name}</h2>
              <p className="text-primary font-mono mb-2">@{userData?.login}</p>
              <p className="max-w-md opacity-70 mb-4">{userData?.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <span className="flex items-center gap-1"><MapPin size={14}/> {userData?.location}</span>
                <span className="flex items-center gap-1"><Calendar size={14}/> Joined {new Date(userData?.created_at).getFullYear()}</span>
              </div>
            </div>
          </div>
          <a href={userData?.html_url} target="_blank" className="btn btn-primary btn-md rounded-xl shadow-lg shadow-primary/20">
            <Github size={18} /> Follow on GitHub
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Package className="text-primary"/>} label="Repositories" value={userData?.public_repos} />
          <StatCard icon={<Star className="text-warning"/>} label="Total Stars" value={totalStars} />
          <StatCard icon={<GitFork className="text-secondary"/>} label="Forks" value={repoData?.reduce((a, b) => a + b.forks_count, 0)} />
          <StatCard icon={<Users className="text-accent"/>} label="Followers" value={userData?.followers} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contribution Calendar */}
          <div className="lg:col-span-2 card bg-base-200 border border-base-300 shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-success"/> 
                Contribution Graph
              </h3>
              <div className="overflow-x-auto overflow-y-hidden py-4 no-scrollbar">
                <GitHubCalendar 
                  username={username} 
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                />
              </div>
            </div>
          </div>

          {/* Top Repositories */}
          <div className="card bg-base-200 border border-base-300 shadow-sm">
            <div className="card-body p-6">
              <h3 className="card-title mb-4">Popular Projects</h3>
              <div className="space-y-3">
                {topRepos.map(repo => (
                  <a 
                    key={repo.id} 
                    href={repo.html_url} 
                    target="_blank" 
                    className="group flex flex-col p-3 rounded-xl bg-base-100 hover:bg-primary hover:text-primary-content transition-all duration-300 border border-base-300"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold truncate w-40">{repo.name}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <Star size={12} fill="currentColor"/> {repo.stargazers_count}
                      </div>
                    </div>
                    <span className="text-xs opacity-60 group-hover:text-primary-content/80 mt-1 truncate">
                      {repo.language || 'Markdown'}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic GitHub Summary Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
           <img 
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=58a6ff&text_color=adbac7&icon_color=58a6ff`} 
            alt="GitHub Stats" 
            className="h-48 md:h-52 object-contain rounded-xl"
          />
          <img 
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=58a6ff&text_color=adbac7`} 
            alt="Top Languages" 
            className="h-48 md:h-52 object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="group p-6 rounded-2xl bg-base-200 border border-base-300 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-all hover:shadow-xl">
    <div className="p-3 rounded-full bg-base-100 shadow-inner group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-2xl md:text-3xl font-black">{value?.toLocaleString()}</span>
    <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-50 font-bold">{label}</span>
  </div>
);

export default GitHubStats;