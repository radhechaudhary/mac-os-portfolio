import React, { useState } from 'react';
import {
  User,
  Code2,
  Server,
  Palette,
  Cpu,
  Cloud,
  Sparkles,
  CheckCircle2,
  Heart,
  Music,
  Coffee,
  Globe
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/sound';

export default function AboutApp() {
  const { personal, skills } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI', 'Frontend', 'Backend', 'DevOps'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-6 text-slate-100 p-2 select-text">
      {/* Header Profile Section */}
      <div className="liquid-glass-card flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl">
        <img
          src={personal.avatar}
          alt={personal.name}
          className="w-24 h-24 rounded-2xl object-cover ring-2 ring-blue-500/50 shadow-lg"
        />
        <div className="space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h2 className="text-2xl font-bold text-white">{personal.name}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              Full Stack Developer & AI Enthusiast
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            {personal.bio}
          </p>
        </div>
      </div>

      {/* Skills Matrix Section */}
      <div className="liquid-glass-card rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              Technical Skill Proficiency
            </h3>
            <p className="text-xs text-slate-400">Core engineering stack & tools expertise</p>
          </div>

          {/* Filter Pills */}
          <div className="liquid-glass-well flex items-center space-x-1 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="liquid-glass-well p-3 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">{skill.name}</span>
                <span className="text-blue-400">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principles & Interests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="liquid-glass-card p-4 rounded-xl space-y-2">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-sm">Pixel Perfection</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Crafting fluid, accessible micro-interactions and desktop-grade UI components with modern CSS.
          </p>
        </div>

        <div className="liquid-glass-card p-4 rounded-xl space-y-2">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 w-fit">
            <Server className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-sm">Scalable Architecture</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Designing micro-services, REST/GraphQL APIs, and high-concurrency database queries.
          </p>
        </div>

        <div className="liquid-glass-card p-4 rounded-xl space-y-2">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 w-fit">
            <Coffee className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-sm">Open Source & AI</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Building open tools, prompt engineering, RAG pipelines, and developer productivity plugins.
          </p>
        </div>
      </div>
    </div>
  );
}
