import React, { useState } from 'react';
import { Globe, ArrowLeft, ArrowRight, RotateCcw, Lock, ExternalLink, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function SafariApp() {
  const [url, setUrl] = useState('https://alexmorgan.dev/projects/omni-ai');
  const [activeTab, setActiveTab] = useState('OmniAI Workspace');

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl overflow-hidden select-text border border-white/10">
      {/* Safari Navigation Toolbar */}
      <div className="p-2 bg-slate-900 border-b border-white/10 flex items-center space-x-3 text-xs">
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded text-slate-400 hover:text-white"><ArrowLeft className="w-3.5 h-3.5" /></button>
          <button className="p-1 rounded text-slate-400 hover:text-white"><ArrowRight className="w-3.5 h-3.5" /></button>
          <button className="p-1 rounded text-slate-400 hover:text-white"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-950 border border-white/10 text-slate-300">
          <Lock className="w-3 h-3 text-emerald-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-200 focus:outline-none font-mono"
          />
        </div>

        <button className="p-1 rounded text-slate-400 hover:text-white">
          <Globe className="w-4 h-4" />
        </button>
      </div>

      {/* Safari Browser Canvas */}
      <div className="flex-1 p-6 bg-slate-900/80 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Safari Web Inspector Showcase</h3>
        <p className="text-xs text-slate-300 max-w-md">
          Live embedded web app preview frame. Experience full-stack React, Next.js, and AI web applications engineered by Alex Morgan.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-left w-full max-w-md space-y-2 font-mono text-xs">
          <div className="text-emerald-400 font-bold">✓ SSL Certificate Secured</div>
          <div className="text-slate-400">Response time: 42ms</div>
          <div className="text-slate-400">Server: Edge Vercel / Cloudflare</div>
        </div>
      </div>
    </div>
  );
}
