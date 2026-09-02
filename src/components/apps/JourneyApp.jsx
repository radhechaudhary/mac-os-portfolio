import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Download, 
  CheckCircle2, 
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/sound';

export default function JourneyApp() {
  const { journey } = PORTFOLIO_DATA;

  const handleDownloadResume = () => {
    sounds.playChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert("📄 Alex_Morgan_Senior_Software_Engineer_Resume.pdf download initiated!");
  };

  return (
    <div className="space-y-6 text-slate-100 p-2 select-text">
      {/* Header Banner */}
      <div className="liquid-glass-card flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            Professional Journey & Experience
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Track record of building enterprise SaaS, leading engineering teams, and cloud architecture.
          </p>
        </div>

        <button
          onClick={handleDownloadResume}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <Download className="w-4 h-4" /> Download Resume PDF
        </button>
      </div>

      {/* Timeline Section */}
      <div className="relative pl-6 border-l-2 border-slate-700 space-y-8 ml-2">
        {journey.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-blue-400 shadow-md group-hover:scale-115 transition-transform">
              <Sparkles className="w-3 h-3" />
            </div>

            {/* Timeline Item Card */}
            <div className="liquid-glass-card p-5 rounded-2xl hover:border-blue-500/40 transition-all space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-sm font-semibold text-blue-400">{item.company}</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" /> {item.period}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" /> {item.location}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Achievements Bullet Points */}
              <div className="space-y-1.5 pt-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Contributions</h4>
                {item.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
