import React, { useState, useEffect } from 'react';
import { Search, Sparkles, FolderGit2, User, Terminal, Mail, Compass, GraduationCap, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';

export default function Spotlight({ isOpen, onClose, onOpenApp, apps }) {
  const [query, setQuery] = useState('');
  const { projects, skills } = PORTFOLIO_DATA;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          sounds.playClick();
          // Trigger spotlight open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedApps = apps.filter(app => app.title.toLowerCase().includes(query.toLowerCase()));
  const matchedProjects = projects.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())));

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-24 px-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl liquid-glass liquid-glass-dark overflow-hidden text-slate-100">
        {/* Input Bar */}
        <div className="relative border-b border-white/10 flex items-center px-4">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Spotlight Search (apps, projects, skills...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-3">
          {/* Apps Section */}
          {matchedApps.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider">Applications</span>
              {matchedApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    sounds.playOpen();
                    onOpenApp(app.id);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-blue-600/80 text-left flex items-center justify-between text-xs font-semibold text-slate-200 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg bg-linear-to-tr ${app.color} text-white`}>
                      <img src = {app.icon} alt={app.title} className="w-4 h-4" />  
                    </div>
                    <span>{app.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-white">Open Application</span>
                </button>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {matchedProjects.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider">Projects</span>
              {matchedProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    sounds.playOpen();
                    onOpenApp('projects');
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-blue-600/80 text-left flex items-center justify-between text-xs font-semibold text-slate-200 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <FolderGit2 className="w-4 h-4 text-blue-400 group-hover:text-white" />
                    <div>
                      <div>{p.title}</div>
                      <div className="text-[10px] text-slate-400 group-hover:text-slate-200 font-normal">{p.tagline}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-2.5 bg-slate-950/80 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between px-4 font-mono">
          <span>Press ESC to exit</span>
          <span>Cmd + K to toggle</span>
        </div>
      </div>
    </div>
  );
}
