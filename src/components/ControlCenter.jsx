import React from 'react';
import { 
  Wifi, 
  Bluetooth, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Tv, 
  Sliders, 
  BatteryCharging,
  Image,
  Check
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';

export default function ControlCenter({ 
  isOpen, 
  onClose, 
  theme, 
  setTheme, 
  soundEnabled, 
  setSoundEnabled,
  currentWallpaper,
  onSelectWallpaper
}) {
  if (!isOpen) return null;

  const { wallpapers, personal } = PORTFOLIO_DATA;
  const isLight = theme === 'light';

  return (
    <div 
      className={`fixed right-3 top-10 z-50 w-80 rounded-2xl border shadow-2xl p-4 text-xs backdrop-blur-3xl animate-in slide-in-from-top-3 duration-200 space-y-3 transition-colors ${
        isLight ? 'bg-white/95 text-slate-900 border-black/15' : 'bg-slate-900/90 text-slate-100 border-white/20'
      }`}
      onMouseLeave={onClose}
    >
      {/* Top Grid Widgets */}
      <div className="grid grid-cols-2 gap-2">
        {/* Connection Widget */}
        <div className={`p-3 rounded-xl border space-y-2 ${isLight ? 'bg-slate-100/90 border-black/10' : 'bg-slate-800/80 border-white/10'}`}>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-full bg-blue-600 text-white">
              <Wifi className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-bold">Wi-Fi</div>
              <div className="text-[10px] opacity-70">Alex-5G-Fiber</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <div className="p-1.5 rounded-full bg-blue-600 text-white">
              <Bluetooth className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-bold">Bluetooth</div>
              <div className="text-[10px] opacity-70">AirPods Max</div>
            </div>
          </div>
        </div>

        {/* Display / Theme Widget */}
        <button
          onClick={() => {
            sounds.playClick();
            setTheme(isLight ? 'dark' : 'light');
          }}
          className={`p-3 rounded-xl border flex flex-col justify-between text-left transition-colors ${
            isLight ? 'bg-slate-100/90 border-black/10 hover:bg-slate-200' : 'bg-slate-800/80 border-white/10 hover:bg-slate-700/80'
          }`}
        >
          <div className="p-1.5 rounded-full bg-amber-500/20 text-amber-500 w-fit">
            {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </div>
          <div>
            <div className="font-bold">{isLight ? 'Light Mode' : 'Dark Mode'}</div>
            <div className="text-[10px] opacity-70">Click to switch</div>
          </div>
        </button>
      </div>

      {/* Sound Volume Slider */}
      <div className={`p-3 rounded-xl border space-y-2 ${isLight ? 'bg-slate-100/90 border-black/10' : 'bg-slate-800/80 border-white/10'}`}>
        <div className="flex items-center justify-between">
          <span className="font-bold flex items-center gap-1.5">
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-500" /> : <VolumeX className="w-3.5 h-3.5 text-rose-500" />}
            Sound Effects
          </span>
          <button 
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sounds.enabled = !soundEnabled;
              if (!soundEnabled) sounds.playClick();
            }}
            className="text-[10px] text-blue-500 font-semibold"
          >
            {soundEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>
      </div>

      {/* Quick Wallpaper Switcher */}
      <div className={`p-3 rounded-xl border space-y-2 ${isLight ? 'bg-slate-100/90 border-black/10' : 'bg-slate-800/80 border-white/10'}`}>
        <div className="font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-purple-500" /> Desktop Wallpaper
          </span>
          <span className="text-[10px] opacity-70 truncate max-w-[100px]">{currentWallpaper.name}</span>
        </div>

        <div className="grid grid-cols-6 gap-1 pt-1">
          {wallpapers.map((wp) => (
            <button
              key={wp.id}
              onClick={() => {
                sounds.playClick();
                onSelectWallpaper(wp);
              }}
              className={`h-7 rounded-md overflow-hidden border transition-all bg-gradient-to-tr ${wp.previewGradient || wp.bgClass} ${
                currentWallpaper.id === wp.id ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105' : 'border-white/20 hover:border-white/40'
              }`}
              title={wp.name}
            >
              {wp.url && <img src={wp.url} alt={wp.name} className="w-full h-full object-cover opacity-80" />}
            </button>
          ))}
        </div>
      </div>

      {/* System User Footer */}
      <div className={`p-2 rounded-xl flex items-center justify-between border ${isLight ? 'bg-slate-200/80 border-black/10' : 'bg-slate-950/80 border-white/10'}`}>
        <div className="flex items-center space-x-2">
          <img src={personal.avatar} alt={personal.name} className="w-6 h-6 rounded-full object-cover" />
          <span className="font-semibold">{personal.name}</span>
        </div>
        <span className="text-[10px] text-emerald-500 font-mono">macOS Sonoma</span>
      </div>
    </div>
  );
}
