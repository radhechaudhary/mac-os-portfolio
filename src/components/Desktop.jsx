import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  User,
  FolderGit2,
  Compass,
  GraduationCap,
  Mail,
  Terminal as TerminalIcon,
  Settings as SettingsIcon,
  Globe,
  Clock,
  Sun,
  Code2,
  Cpu,
  FileText,
  CloudSun
} from 'lucide-react';
import Window from './Window';
import WelcomeApp from './apps/WelcomeApp';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import JourneyApp from './apps/JourneyApp';
import EducationApp from './apps/EducationApp';
import ContactApp from './apps/ContactApp';
import TerminalApp from './apps/TerminalApp';
import SettingsApp from './apps/SettingsApp';
import SafariApp from './apps/SafariApp';
import ResumeApp from './apps/ResumeApp';
import LeetCodeApp from './apps/LeetCodeApp';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';

export default function Desktop({
  wallpaper,
  apps,
  openAppIds,
  activeAppId,
  minimizedApps,
  onOpenApp,
  onCloseApp,
  onMinimizeApp,
  onFocusApp,
  windowZIndexes,
  soundEnabled,
  setSoundEnabled,
  theme,
  setTheme,
  currentWallpaper,
  onSelectWallpaper
}) {
  const { personal } = PORTFOLIO_DATA;

  // Live Weather State for New Delhi, India
  const [weather, setWeather] = useState({
    tempC: 28,
    tempF: 82,
    condition: 'Partly Cloudy',
    wind: 10,
    location: 'New Delhi, India'
  });

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const tempC = Math.round(data.current_weather.temperature);
          const tempF = Math.round((tempC * 9 / 5) + 32);
          const wind = Math.round(data.current_weather.windspeed);
          setWeather({
            tempC,
            tempF,
            condition: 'Clear / Fair',
            wind,
            location: 'New Delhi, India'
          });
        }
      })
      .catch(() => { });
  }, []);

  // Render individual application content by ID
  const renderAppContent = (appId) => {
    switch (appId) {
      case 'welcome':
        return <WelcomeApp onOpenApp={onOpenApp} theme={theme} />;
      case 'about':
        return <AboutApp theme={theme} />;
      case 'projects':
        return <ProjectsApp theme={theme} />;
      case 'journey':
        return <JourneyApp theme={theme} />;
      case 'education':
        return <EducationApp theme={theme} />;
      case 'contact':
        return <ContactApp theme={theme} />;
      case 'terminal':
        return <TerminalApp onOpenApp={onOpenApp} onSetWallpaper={onSelectWallpaper} theme={theme} />;
      case 'settings':
        return (
          <SettingsApp
            currentWallpaper={currentWallpaper}
            onSelectWallpaper={onSelectWallpaper}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            theme={theme}
            setTheme={setTheme}
          />
        );
      case 'safari':
        return <SafariApp theme={theme} />;
      case 'leetcode':
        return <LeetCodeApp theme={theme} />;
      case 'resume':
        return <ResumeApp theme={theme} />;
      default:
        return null;
    }
  };

  const defaultGradient = 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 70%, #831843 100%)';
  const activeGradient = wallpaper?.gradient || defaultGradient;

  return (
    <div className="relative w-screen h-screen overflow-hidden pt-8 pb-16 select-none font-sans">
      {/* Background Wallpaper Layer (Guaranteed Rich Color & Image Render) */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: activeGradient,
          backgroundImage: wallpaper?.url ? `url(${wallpaper.url}), ${activeGradient}` : activeGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dynamic Theme Overlay */}
        <div className={`absolute inset-0 transition-colors duration-500 ${theme === 'dark' ? 'bg-black/25 backdrop-brightness-95' : 'bg-white/25 backdrop-brightness-110'
          }`} />
      </div>

      {/* Desktop Grid Icons Area (Left Side) */}
      <div className="absolute top-12 left-4 bottom-20 flex flex-col flex-wrap gap-4 z-10 p-2 pointer-events-none">
        {/* Special Desktop File: Resume.pdf */}
        <button
          onClick={() => {
            sounds.playOpen();
            onOpenApp('resume');
          }}
          className="pointer-events-auto w-24 flex flex-col items-center p-2 rounded-xl hover:bg-white/20 focus:bg-white/25 transition-all duration-150 group"
          title="Double click or click to view Resume.pdf"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-red-600 to-amber-600 text-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-200 ring-1 ring-white/30 relative">
            <FileText className="w-7 h-7 text-white" />
            <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/60 rounded text-[8px] font-extrabold uppercase tracking-wider text-rose-300">PDF</span>
          </div>
          <span className="mt-1.5 text-[11px] font-semibold text-white tracking-wide text-center drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] line-clamp-1 group-hover:text-rose-200">
            Resume.pdf
          </span>
        </button>

        {/* {apps.map((app) => {
          const isIconImage = typeof app.icon === 'string';

          return (
            <button
              key={app.id}
              onClick={() => {
                sounds.playClick();
                onOpenApp(app.id);
              }}
              className="pointer-events-auto w-24 flex flex-col items-center p-2 rounded-xl hover:bg-white/20 focus:bg-white/25 transition-all duration-150 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.color || 'from-slate-700 to-slate-900'} text-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-200 ring-1 ring-white/20 overflow-hidden p-2`}>
                {isIconImage ? (
                  <img src={app.icon} alt={app.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-7 h-7 flex items-center justify-center">
                    {app.icon}
                  </div>
                )}
              </div>
              <span className="mt-1 text-[11px] font-semibold text-white tracking-wide text-center drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] line-clamp-1 group-hover:text-blue-200">
                {app.title}
              </span>
            </button>
          );
        })} */}
      </div>

      {/* Desktop Widgets (Right Side) */}
      <div className="hidden lg:flex flex-col gap-4 absolute top-12 right-6 w-72 pointer-events-none z-10">
        {/* Clock & Weather Widget - Live New Delhi Weather */}
        <div className={`pointer-events-auto p-4 rounded-2xl liquid-glass space-y-2 transition-colors ${theme === 'light' ? 'liquid-glass-light text-slate-900' : 'liquid-glass-dark text-white'
          }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-80">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" /> {weather.location}
            </span>
            <Sun className="w-4 h-4 text-yellow-400 animate-spin-slow" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight">
            {weather.tempC}°C <span className="text-sm font-normal opacity-80">({weather.tempF}°F) • {weather.condition}</span>
          </div>
          <p className="text-[11px] opacity-75">Wind: {weather.wind} km/h • Timezone: IST (UTC+5:30)</p>
        </div>

        {/* Developer Bio Card Widget */}
        <div className={`pointer-events-auto p-4 rounded-2xl liquid-glass space-y-3 transition-colors ${theme === 'light' ? 'liquid-glass-light text-slate-900' : 'liquid-glass-dark text-white'
          }`}>
          <div className="flex items-center space-x-3">
            <img src={personal.avatar} alt={personal.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/50" />
            <div>
              <h4 className="font-bold text-sm">{personal.name}</h4>
              <p className="text-[10px] text-blue-500 font-semibold">{personal.title}</p>
            </div>
          </div>
          <p className="text-[11px] opacity-80 leading-relaxed">
            Specializing in high-performance web applications, desktop-grade interfaces, and scalable backend architecture in New Delhi.
          </p>
          <div className="flex items-center justify-between text-[10px] opacity-70 pt-1 border-t border-black/10 dark:border-white/10">
            <span>Location: New Delhi</span>
            <span className="text-emerald-500 font-bold">● Active</span>
          </div>
        </div>
      </div>

      {/* Render Active Windows with smooth exit & minimize transitions */}
      <AnimatePresence>
        {apps.map((app) => {
          const isOpen = openAppIds.includes(app.id);
          const isMinimized = minimizedApps.includes(app.id);
          if (!isOpen || isMinimized) return null;

          const isActive = activeAppId === app.id;
          const zIndex = windowZIndexes[app.id] || 10;

          const isIconImage = typeof app.icon === 'string';
          const windowIcon = isIconImage ? (
            <img src={app.icon} alt={app.title} className="w-4 h-4 object-contain inline-block" />
          ) : (
            app.icon
          );

          return (
            <Window
              key={app.id}
              id={app.id}
              title={app.title}
              icon={windowIcon}
              isActive={isActive}
              zIndex={zIndex}
              theme={theme}
              defaultPosition={app.defaultPosition}
              defaultSize={app.defaultSize}
              onFocus={onFocusApp}
              onClose={onCloseApp}
              onMinimize={onMinimizeApp}
            >
              {renderAppContent(app.id)}
            </Window>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
