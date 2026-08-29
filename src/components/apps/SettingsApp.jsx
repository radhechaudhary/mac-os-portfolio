import React, { useState } from 'react';
import { 
  Settings, 
  Image, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Check, 
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/sound';

export default function SettingsApp({ 
  currentWallpaper, 
  onSelectWallpaper, 
  soundEnabled, 
  setSoundEnabled,
  theme,
  setTheme
}) {
  const { wallpapers } = PORTFOLIO_DATA;
  const [toastMsg, setToastMsg] = useState('');

  const isLight = theme === 'light';

  const handleWallpaperChange = (wp) => {
    sounds.playClick();
    onSelectWallpaper(wp);
    setToastMsg(`Wallpaper changed to ${wp.name}`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className={`space-y-6 p-2 select-text transition-colors ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
      {/* Toast Banner */}
      {toastMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className={`flex items-center space-x-3 p-4 rounded-2xl border shadow-lg ${
        isLight ? 'bg-slate-200/80 border-black/10' : 'bg-slate-800/80 border-white/10'
      }`}>
        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-500">
          <Settings className="w-6 h-6 animate-spin-slow" />
        </div>
        <div>
          <h2 className="text-xl font-bold">System Preferences</h2>
          <p className="text-xs opacity-75">Customize desktop wallpapers, audio effects, and macOS appearance theme</p>
        </div>
      </div>

      {/* Wallpaper Switcher Section */}
      <div className={`p-5 rounded-2xl border shadow-lg space-y-3 ${
        isLight ? 'bg-slate-200/60 border-black/10' : 'bg-slate-800/60 border-white/10'
      }`}>
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Image className="w-4 h-4 text-purple-500" />
          Desktop Wallpapers
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {wallpapers.map((wp) => {
            const isSelected = currentWallpaper.id === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => handleWallpaperChange(wp)}
                className={`relative rounded-xl overflow-hidden border-2 transition-all group aspect-video text-left bg-gradient-to-tr ${wp.previewGradient || wp.bgClass} ${
                  isSelected 
                    ? 'border-blue-500 ring-4 ring-blue-500/40 scale-102 shadow-xl' 
                    : 'border-white/20 hover:border-blue-400/60'
                }`}
              >
                {wp.url && (
                  <img 
                    src={wp.url} 
                    alt={wp.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2.5 flex items-end justify-between z-10">
                  <span className="text-xs font-bold text-white drop-shadow-md truncate">{wp.name}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Audio & Theme Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sound Toggle */}
        <div className={`p-4 rounded-xl border flex items-center justify-between shadow-lg ${
          isLight ? 'bg-slate-200/60 border-black/10' : 'bg-slate-800/60 border-white/10'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-500">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-rose-500" />}
            </div>
            <div>
              <h4 className="text-sm font-bold">Audio Feedback</h4>
              <p className="text-xs opacity-75">macOS click and window sound effects</p>
            </div>
          </div>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sounds.enabled = !soundEnabled;
              if (!soundEnabled) sounds.playClick();
            }}
            className={`w-12 h-6 rounded-full transition-colors p-1 relative flex items-center ${
              soundEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-400 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>

        {/* Desktop Appearance Theme Toggle */}
        <div className={`p-4 rounded-xl border flex items-center justify-between shadow-lg ${
          isLight ? 'bg-slate-200/60 border-black/10' : 'bg-slate-800/60 border-white/10'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-500">
              {isLight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold">Appearance Theme</h4>
              <p className="text-xs opacity-75">Mode: {isLight ? 'Light Mode' : 'Dark Mode'}</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              const nextTheme = isLight ? 'dark' : 'light';
              setTheme(nextTheme);
              setToastMsg(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode`);
              setTimeout(() => setToastMsg(''), 3000);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
          >
            Switch to {isLight ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </div>
  );
}
