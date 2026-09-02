import React from 'react';
import { Apple, X, Cpu, HardDrive, Monitor, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function AboutThisMacModal({ onClose }) {
  const { personal } = PORTFOLIO_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl liquid-glass liquid-glass-dark p-6 text-slate-100 relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* macOS Sequoia / Sonoma Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-xl">
            <Apple className="w-10 h-10 text-white fill-current" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">macOS Sonoma</h2>
          <span className="text-xs text-slate-400 font-mono">Version 15.2 (2026 Developer Build)</span>
        </div>

        <div className="my-2 border-t border-white/10" />

        {/* System Specs List */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50">
            <span className="text-slate-400 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-blue-400" /> Model Name
            </span>
            <span className="font-semibold text-white">MacBook Pro 16-inch</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50">
            <span className="text-slate-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" /> Chip
            </span>
            <span className="font-semibold text-white">Apple M3 Max (16-core CPU)</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50">
            <span className="text-slate-400 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" /> Memory & Storage
            </span>
            <span className="font-semibold text-white">36 GB Unified RAM / 1TB SSD</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50">
            <span className="text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Portfolio Architect
            </span>
            <span className="font-semibold text-blue-300">{personal.name}</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-center">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
          >
            System Info OK
          </button>
        </div>
      </div>
    </div>
  );
}

function Laptop(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.36 20H3.64a1 1 0 0 1-.92-1.45L4 16"/>
    </svg>
  );
}
