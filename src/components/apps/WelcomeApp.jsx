import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  FolderGit2, 
  Mail, 
  Compass, 
  Code2, 
  CheckCircle2, 
  ExternalLink,
  Trophy
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/sound';

export default function WelcomeApp({ onOpenApp }) {
  const { personal } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6 text-slate-100 p-2 select-text">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 md:p-8 shadow-2xl text-white">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <img 
            src={personal.avatar} 
            alt={personal.name} 
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/30 shadow-2xl object-cover"
          />
          
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>macOS Interactive Portfolio 2026</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Hello, I'm <span className="text-yellow-300">{personal.name}</span> 👋
            </h1>
            
            <p className="text-sm md:text-base text-indigo-100 max-w-xl font-medium">
              {personal.title}
            </p>

            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white/15 text-xs text-white">📍 {personal.location}</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/30 text-emerald-200 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {personal.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Description */}
      <div className="liquid-glass-card rounded-xl p-5">
        <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-400" />
          Welcome Message
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {personal.welcomeMessage} Feel free to drag windows around, trigger Spotlight with <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-xs font-mono text-white">Cmd + K</kbd>, customize wallpapers, or run commands in the Terminal!
        </p>
      </div>

      {/* Quick Launch Shortcuts Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Explore Quick Apps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <QuickCard 
            title="Projects & Work" 
            desc="Explore apps & repos" 
            icon={<FolderGit2 className="w-5 h-5 text-blue-400" />}
            bgColor="bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30"
            onClick={() => {
              sounds.playClick();
              onOpenApp('projects');
            }}
          />

          <QuickCard 
            title="LeetCode Profile" 
            desc="Stats & achievements" 
            icon={<Trophy className="w-5 h-5 text-amber-400" />}
            bgColor="bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30"
            onClick={() => {
              sounds.playClick();
              onOpenApp('leetcode');
            }}
          />

          <QuickCard 
            title="About & Bio" 
            desc="Tech skills & background" 
            icon={<Sparkles className="w-5 h-5 text-purple-400" />}
            bgColor="bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30"
            onClick={() => {
              sounds.playClick();
              onOpenApp('about');
            }}
          />

          <QuickCard 
            title="Experience" 
            desc="Career journey timeline" 
            icon={<Compass className="w-5 h-5 text-orange-400" />}
            bgColor="bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30"
            onClick={() => {
              sounds.playClick();
              onOpenApp('journey');
            }}
          />

          <QuickCard 
            title="Terminal CLI" 
            desc="Interactive shell" 
            icon={<Terminal className="w-5 h-5 text-emerald-400" />}
            bgColor="bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30"
            onClick={() => {
              sounds.playClick();
              onOpenApp('terminal');
            }}
          />
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="liquid-glass-card flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <a 
            href={personal.github} 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <GithubIcon className="w-4 h-4" /> GitHub
          </a>
          <a 
            href={personal.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <LinkedinIcon className="w-4 h-4" /> LinkedIn
          </a>
        </div>

        <button 
          onClick={() => {
            sounds.playClick();
            onOpenApp('contact');
          }}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
        >
          <Mail className="w-4 h-4" />
          Send Me a Message
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function QuickCard({ title, desc, icon, bgColor, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`liquid-glass-tint p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${bgColor}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-slate-900/60 shadow-md">
          {icon}
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{title}</h4>
        <p className="text-xs text-slate-400 mt-1">{desc}</p>
      </div>
    </button>
  );
}
