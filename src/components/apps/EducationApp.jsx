import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Calendar, 
  MapPin,
  Star
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function EducationApp() {
  const { education } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6 text-slate-100 p-2 select-text">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/20 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Education & Credentials</h2>
            <p className="text-xs text-emerald-200">Academic background, computer science degree, and cloud certifications</p>
          </div>
        </div>
      </div>

      {/* Degrees & Certifications Cards */}
      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-800/60 border border-white/10 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{edu.degree}</span>
                </h3>
                <p className="text-sm font-semibold text-emerald-400">{edu.institution}</p>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" /> {edu.period}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" /> {edu.location}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {edu.details}
            </p>

            {edu.honors && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 shrink-0 fill-current" />
                <span>{edu.honors}</span>
              </div>
            )}

            {edu.activities && (
              <div className="space-y-1 pt-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Highlights & Leadership</h4>
                {edu.activities.map((act, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
