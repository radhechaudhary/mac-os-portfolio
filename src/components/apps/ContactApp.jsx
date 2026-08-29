import React, { useState } from 'react';
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Sparkles,
  Inbox,
  Clock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../SocialIcons';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/sound';

export default function ContactApp() {
  const { personal } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.playChime();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);

      // Trigger Confetti Explosion
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row h-full text-slate-100 select-text gap-4">
      {/* Sidebar Info Cards */}
      <div className="w-full md:w-64 space-y-3 shrink-0">
        <div className="p-4 rounded-xl bg-slate-800/80 border border-white/10 space-y-3 shadow-lg">
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
            <Mail className="w-4 h-4" />
            <span>Direct Contact</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Email Address</span>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-white/5">
              <span className="text-xs font-mono text-slate-200 truncate">{personal.email}</span>
              <button
                onClick={handleCopyEmail}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Location</span>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {personal.location}
            </p>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-white/10 space-y-2 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Social Profiles</span>
          <div className="space-y-1.5 pt-1">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-700/60 text-xs text-slate-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4 text-purple-400" /> GitHub
              </span>
              <span className="text-[10px] text-slate-400">@radhechaudhary</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-700/60 text-xs text-slate-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <LinkedinIcon className="w-4 h-4 text-blue-400" /> LinkedIn
              </span>
              <span className="text-[10px] text-slate-400">/in/mohit_chaudhary</span>
            </a>

            <a
              href={personal.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-700/60 text-xs text-slate-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <TwitterIcon className="w-4 h-4 text-cyan-400" /> Twitter / X
              </span>
              <span className="text-[10px] text-slate-400">@radhe_2k4</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Mail Compose Form */}
      <div className="flex-1 p-5 rounded-2xl bg-slate-800/60 border border-white/10 shadow-lg flex flex-col justify-between">
        {sentSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-white">Message Sent Successfully! 🎉</h3>
            <p className="text-xs text-slate-300 max-w-md">
              Thank you for reaching out, {formData.name}! I have received your message and will reply within 24 hours.
            </p>
            <button
              onClick={() => {
                setSentSuccess(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-400" /> New Mail Message
              </h3>
              <span className="text-xs text-slate-400">To: {personal.email}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Krati"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="krati@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Subject</label>
              <input
                type="text"
                placeholder="Project Collaboration / Opportunity"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Hi Mohit, I loved your portfolio..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105"
              >
                {isSending ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Mail</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
