import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Award, 
  Target, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  RotateCcw,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/sound';

export default function LeetCodeApp({ theme }) {
  const defaultData = PORTFOLIO_DATA.leetcode;
  const [data, setData] = useState(defaultData);
  const [usernameInput, setUsernameInput] = useState(defaultData.username);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [apiError, setApiError] = useState(null);

  // Function to fetch live stats from LeetCode public API endpoint
  const fetchLeetCodeStats = async (user) => {
    if (!user) return;
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${user}`);
      const result = await res.json();
      if (result.status === 'success') {
        setData(prev => ({
          ...prev,
          username: user,
          ranking: result.ranking || prev.ranking,
          totalSolved: result.totalSolved || prev.totalSolved,
          easySolved: result.easySolved || prev.easySolved,
          mediumSolved: result.mediumSolved || prev.mediumSolved,
          hardSolved: result.hardSolved || prev.hardSolved,
          acceptanceRate: (result.acceptanceRate ? result.acceptanceRate.toFixed(1) + '%' : prev.acceptanceRate),
          contributionPoints: result.contributionPoints || prev.contributionPoints,
          reputation: result.reputation || prev.reputation
        }));
      } else {
        setApiError('User not found on live API. Displaying verified profile archive.');
      }
    } catch (err) {
      console.warn('LeetCode API fetch error, using portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    sounds.playClick();
    fetchLeetCodeStats(usernameInput.trim());
  };

  const triggerConfetti = () => {
    sounds.playOpen();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl overflow-hidden select-text border border-white/10 p-2 sm:p-4 space-y-4 overflow-y-auto scrollbar-thin">
      
      {/* Top Banner & Profile Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-5 md:p-6 shadow-2xl text-white">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={data.avatar} 
                alt={data.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-300/50 shadow-xl object-cover"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-md uppercase tracking-wider shadow-md">
                PRO
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">{data.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold border border-amber-300/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {data.topPercentage}
                </span>
              </div>
              <p className="text-xs text-amber-100 font-mono mt-0.5">@{data.username}</p>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded bg-black/30 text-[11px] font-mono text-amber-200 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-300" /> Rank #{data.ranking.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/30 text-[11px] font-mono text-orange-200 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" /> {data.streak} Day Streak
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-400/30 text-[11px] font-mono text-purple-200 flex items-center gap-1">
                  ⚔️ Rating {data.contestRating} (Knight)
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar & External Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-black/40 border border-white/20 rounded-xl overflow-hidden text-xs">
              <input 
                type="text" 
                placeholder="Lookup username..." 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="px-3 py-1.5 bg-transparent text-white placeholder-amber-200/60 focus:outline-none w-36 font-mono"
              />
              <button 
                type="submit" 
                className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                title="Search profile"
              >
                {loading ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              </button>
            </form>

            <a
              href={`https://leetcode.com/u/${data.username}/`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <span>View LeetCode</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {apiError && (
          <p className="text-[11px] text-amber-200/90 mt-2 bg-black/30 px-2 py-1 rounded">
            {apiError}
          </p>
        )}
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center space-x-1 border-b border-white/10 pb-1 text-xs">
        <TabButton 
          id="overview" 
          label="Overview & Stats" 
          icon={<BarChart3 className="w-3.5 h-3.5" />} 
          activeTab={activeTab} 
          onClick={setActiveTab} 
        />
        <TabButton 
          id="badges" 
          label={`Badges & Achievements (${data.badges.length})`} 
          icon={<Award className="w-3.5 h-3.5" />} 
          activeTab={activeTab} 
          onClick={setActiveTab} 
        />
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Main Stat Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard 
              label="Total Problems Solved" 
              value={data.totalSolved} 
              subtext={`Out of ${data.totalQuestions} questions`} 
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />} 
              bgColor="bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
            />
            <StatCard 
              label="Acceptance Rate" 
              value={data.acceptanceRate} 
              subtext="High precision submit ratio" 
              icon={<Target className="w-5 h-5 text-blue-400" />} 
              bgColor="bg-blue-500/10 border-blue-500/20 text-blue-300"
            />
            <StatCard 
              label="Contest Rating" 
              value={data.contestRating} 
              subtext="Knight Badge (Top 5%)" 
              icon={<Trophy className="w-5 h-5 text-amber-400" />} 
              bgColor="bg-amber-500/10 border-amber-500/20 text-amber-300"
            />
            <StatCard 
              label="Contribution Points" 
              value={data.contributionPoints} 
              subtext={`${data.reputation} reputation points`} 
              icon={<Zap className="w-5 h-5 text-purple-400" />} 
              bgColor="bg-purple-500/10 border-purple-500/20 text-purple-300"
            />
          </div>

          {/* Difficulty Solved Ring & Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left Card: Total Solved Breakdown */}
            <div className="md:col-span-1 p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  Difficulty Progress
                </h3>
                <p className="text-xs text-slate-400 mt-1">Verified problem-solving distribution</p>
              </div>

              <div className="relative flex flex-col items-center justify-center p-4">
                <div className="text-4xl font-extrabold text-white tracking-tight">{data.totalSolved}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">Solved</div>
                <div className="mt-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  {Math.round((data.totalSolved / data.totalQuestions) * 100)}% Completed
                </div>
              </div>

              <div className="text-xs text-slate-400 flex justify-between border-t border-white/10 pt-3">
                <span>Active Days: <strong className="text-white">{data.activeDays}</strong></span>
                <span>Contests: <strong className="text-white">{data.attendedContests}</strong></span>
              </div>
            </div>

            {/* Right Card: Individual Difficulty Progress Bars */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-slate-200">Difficulty Level Detail</h3>

              {/* Easy Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    Easy Problems
                  </span>
                  <span className="text-slate-300 font-mono">
                    <strong className="text-emerald-400">{data.easySolved}</strong> / {data.totalEasy}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-emerald-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, (data.easySolved / data.totalEasy) * 100)}%` }} 
                  />
                </div>
              </div>

              {/* Medium Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    Medium Problems
                  </span>
                  <span className="text-slate-300 font-mono">
                    <strong className="text-amber-400">{data.mediumSolved}</strong> / {data.totalMedium}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-amber-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, (data.mediumSolved / data.totalMedium) * 100)}%` }} 
                  />
                </div>
              </div>

              {/* Hard Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    Hard Problems
                  </span>
                  <span className="text-slate-300 font-mono">
                    <strong className="text-rose-400">{data.hardSolved}</strong> / {data.totalHard}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-rose-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, (data.hardSolved / data.totalHard) * 100)}%` }} 
                  />
                </div>
              </div>

              {/* Celebration Footer */}
              <div className="pt-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <span>LeetCode Global Ranking: <strong className="text-amber-400">#{data.ranking.toLocaleString()}</strong></span>
                <button 
                  onClick={triggerConfetti} 
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Celebrate Stats 🎉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Badges */}
      {activeTab === 'badges' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                LeetCode Badges & Achievements
              </h3>
              <p className="text-xs text-slate-400">Official badges earned through contests, study plans, and daily streaks.</p>
            </div>
            
            <button 
              onClick={triggerConfetti}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" /> Celebrate Trophies
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.badges.map((badge) => (
              <div 
                key={badge.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-amber-400/50 transition-all duration-200 flex items-center space-x-3.5 group shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${badge.color} text-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">{badge.title}</h4>
                  <p className="text-[11px] text-amber-400/80 font-medium">{badge.category}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Unlocked: {badge.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

function StatCard({ label, value, subtext, icon, bgColor }) {
  return (
    <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 shadow-lg ${bgColor}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold opacity-90">{label}</span>
        {icon}
      </div>
      <div>
        <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">{value}</div>
        <p className="text-[10px] opacity-75 mt-0.5">{subtext}</p>
      </div>
    </div>
  );
}

function TabButton({ id, label, icon, activeTab, onClick }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => {
        sounds.playClick();
        onClick(id);
      }}
      className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-medium transition-all whitespace-nowrap ${
        isActive 
          ? 'bg-amber-500 text-slate-950 font-bold shadow-md' 
          : 'text-slate-400 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
