import React, { useState, useEffect } from 'react';
import { 
  Apple, 
  Wifi, 
  BatteryCharging, 
  Search, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Check, 
  Info, 
  Moon, 
  Sun,
  RotateCcw
} from 'lucide-react';
import { sounds } from '../utils/sound';

export default function Navbar({ 
  activeAppId, 
  apps, 
  onOpenApp, 
  onCloseApp,
  toggleSpotlight, 
  toggleControlCenter,
  showControlCenter,
  openAboutMac,
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled
}) {
  const [time, setTime] = useState('');
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showBatteryMenu, setShowBatteryMenu] = useState(false);
  const [showWifiMenu, setShowWifiMenu] = useState(false);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(80);

  const isLight = theme === 'light';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      };
      setTime(now.toLocaleString('en-US', options).replace(',', ''));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeApp = apps.find(app => app.id === activeAppId);
  const appName = activeApp ? activeApp.title : 'Finder';

  return (
    <header className={`fixed top-0 left-0 right-0 h-8 z-50 flex items-center justify-between px-3 text-xs font-medium select-none backdrop-blur-md transition-colors border-b ${
      isLight 
        ? 'bg-white/75 text-slate-900 border-black/10 shadow-sm' 
        : 'bg-slate-900/65 text-slate-100 border-white/10 shadow-sm'
    }`}>
      {/* Left Menu Items */}
      <div className="flex items-center space-x-3">
        {/* Apple Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              sounds.playClick();
              setShowAppleMenu(!showAppleMenu);
              setShowBatteryMenu(false);
              setShowWifiMenu(false);
              setShowVolumeMenu(false);
            }}
            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/20 transition-colors flex items-center focus:outline-none"
            aria-label="Apple Menu"
          >
            <Apple className={`w-4 h-4 fill-current ${isLight ? 'text-slate-900' : 'text-white'}`} />
          </button>

          {showAppleMenu && (
            <div 
              className={`absolute left-0 top-8 w-56 rounded-xl shadow-2xl border p-1 z-50 text-xs backdrop-blur-2xl animate-in fade-in duration-100 ${
                isLight ? 'bg-white/95 text-slate-900 border-black/15' : 'bg-slate-900/95 text-slate-100 border-white/15'
              }`}
              onMouseLeave={() => setShowAppleMenu(false)}
            >
              <button 
                onClick={() => {
                  sounds.playClick();
                  openAboutMac();
                  setShowAppleMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>About This Mac</span>
                <Info className="w-3.5 h-3.5 opacity-70" />
              </button>
              <div className="my-1 border-t opacity-20 border-current" />
              <button 
                onClick={() => {
                  sounds.playClick();
                  onOpenApp('settings');
                  setShowAppleMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>System Settings...</span>
              </button>
              <button 
                onClick={() => {
                  sounds.playClick();
                  onOpenApp('welcome');
                  setShowAppleMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white flex items-center transition-colors"
              >
                <span>Welcome & Quick Tour</span>
              </button>
              <div className="my-1 border-t opacity-20 border-current" />
              <button 
                onClick={() => {
                  sounds.playClick();
                  setTheme(isLight ? 'dark' : 'light');
                  setShowAppleMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>Switch to {isLight ? 'Dark' : 'Light'} Mode</span>
                {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>
              <div className="my-1 border-t opacity-20 border-current" />
              <button 
                onClick={() => {
                  sounds.playClick();
                  window.location.reload();
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>Restart Portfolio...</span>
                <RotateCcw className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          )}
        </div>

        {/* Active App Name */}
        <span className="font-bold tracking-wide px-1">
          {appName}
        </span>

        {/* Menu Items */}
        <div className="hidden md:flex items-center space-x-1 opacity-80">
          <button onClick={() => sounds.playClick()} className="px-2 py-0.5 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors">File</button>
          <button onClick={() => sounds.playClick()} className="px-2 py-0.5 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors">Edit</button>
          <button onClick={() => sounds.playClick()} className="px-2 py-0.5 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors">View</button>
          <button onClick={() => sounds.playClick()} className="px-2 py-0.5 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors">Window</button>
          <button onClick={() => sounds.playClick()} className="px-2 py-0.5 rounded hover:bg-black/10 dark:hover:bg-white/15 transition-colors">Help</button>
        </div>
      </div>

      {/* Right Menu / Status Bar Icons */}
      <div className="flex items-center space-x-2">
        {/* Battery Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              sounds.playClick();
              setShowBatteryMenu(!showBatteryMenu);
              setShowWifiMenu(false);
              setShowVolumeMenu(false);
              setShowAppleMenu(false);
            }}
            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/20 transition-colors flex items-center space-x-1"
            title="Battery status"
          >
            <BatteryCharging className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline text-[11px]">98%</span>
          </button>

          {showBatteryMenu && (
            <div 
              className={`absolute right-0 top-8 w-56 rounded-xl shadow-2xl border p-3 z-50 text-xs backdrop-blur-2xl ${
                isLight ? 'bg-white/95 text-slate-900 border-black/15' : 'bg-slate-900/95 text-slate-100 border-white/15'
              }`}
              onMouseLeave={() => setShowBatteryMenu(false)}
            >
              <div className="font-semibold mb-1">Power Source: Power Adapter</div>
              <p className="opacity-70 text-[11px]">Battery level: 98% (Fully Charged)</p>
            </div>
          )}
        </div>

        {/* Wi-Fi Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              sounds.playClick();
              setShowWifiMenu(!showWifiMenu);
              setShowBatteryMenu(false);
              setShowVolumeMenu(false);
              setShowAppleMenu(false);
            }}
            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
            title="Wi-Fi Connected"
          >
            <Wifi className="w-4 h-4 text-blue-500" />
          </button>

          {showWifiMenu && (
            <div 
              className={`absolute right-0 top-8 w-60 rounded-xl shadow-2xl border p-2 z-50 text-xs backdrop-blur-2xl ${
                isLight ? 'bg-white/95 text-slate-900 border-black/15' : 'bg-slate-900/95 text-slate-100 border-white/15'
              }`}
              onMouseLeave={() => setShowWifiMenu(false)}
            >
              <div className="flex items-center justify-between px-2 py-1 font-semibold">
                <span>Wi-Fi</span>
                <span className="text-emerald-500 text-[11px]">On</span>
              </div>
              <div className="my-1 border-t opacity-20 border-current" />
              <div className="px-2 py-1.5 rounded bg-blue-600/20 text-blue-600 dark:text-blue-300 flex items-center justify-between font-medium">
                <span>Alex-5G-Fiber</span>
                <Check className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </div>
          )}
        </div>

        {/* Sound / Volume Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              sounds.playClick();
              setShowVolumeMenu(!showVolumeMenu);
              setShowBatteryMenu(false);
              setShowWifiMenu(false);
              setShowAppleMenu(false);
            }}
            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
            title="Sound Settings"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>

          {showVolumeMenu && (
            <div 
              className={`absolute right-0 top-8 w-56 rounded-xl shadow-2xl border p-3 z-50 text-xs backdrop-blur-2xl ${
                isLight ? 'bg-white/95 text-slate-900 border-black/15' : 'bg-slate-900/95 text-slate-100 border-white/15'
              }`}
              onMouseLeave={() => setShowVolumeMenu(false)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Sound Output</span>
                <button 
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    sounds.enabled = !soundEnabled;
                    if (!soundEnabled) sounds.playClick();
                  }}
                  className="text-blue-500 text-[11px] underline"
                >
                  {soundEnabled ? 'Mute' : 'Unmute'}
                </button>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={soundEnabled ? volumeLevel : 0} 
                onChange={(e) => setVolumeLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          )}
        </div>

        {/* Spotlight Search Trigger */}
        <button 
          onClick={() => {
            sounds.playClick();
            toggleSpotlight();
          }}
          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          title="Spotlight Search (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center Toggle */}
        <button 
          onClick={() => {
            sounds.playClick();
            toggleControlCenter();
          }}
          className={`p-1 rounded transition-colors ${showControlCenter ? 'bg-black/20 dark:bg-white/30' : 'hover:bg-black/10 dark:hover:bg-white/20'}`}
          title="Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Live Clock & Date */}
        <button 
          onClick={() => {
            sounds.playClick();
            toggleControlCenter();
          }}
          className="px-1.5 py-0.5 rounded hover:bg-black/10 dark:hover:bg-white/20 transition-colors font-medium text-[11px] whitespace-nowrap"
        >
          {time || 'Sat Aug 29 3:04 AM'}
        </button>
      </div>
    </header>
  );
}
