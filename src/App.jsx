import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Launchpad from './components/Launchpad';
import Spotlight from './components/Spotlight';
import ControlCenter from './components/ControlCenter';
import AboutThisMacModal from './components/AboutThisMacModal';
import { PORTFOLIO_DATA } from './data/portfolioData';

export default function App() {
  const { wallpapers } = PORTFOLIO_DATA;

  // Applications Configuration with spacious default dimensions & auto-centering
  const APPS = [
    {
      id: 'welcome',
      title: 'Welcome.app',
      icon: "./assets/welcome.png",
      color: 'from-amber-500 via-orange-500 to-rose-500',
      defaultSize: { width: 980, height: 640 }
    },
    {
      id: 'about',
      title: 'About Me',
      icon: "./assets/person.png",
      color: 'from-blue-600 via-indigo-600 to-purple-600',
      defaultSize: { width: 960, height: 640 }
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: "./assets/git.png",
      color: 'from-cyan-500 via-blue-600 to-indigo-700',
      defaultSize: { width: 1040, height: 680 }
    },
    {
      id: 'journey',
      title: 'Experience',
      icon: "./assets/maps.png",
      color: 'from-amber-500 via-orange-600 to-red-600',
      defaultSize: { width: 980, height: 650 }
    },
    {
      id: 'education',
      title: 'Education',
      icon: "./assets/graduation-cap.png",
      color: 'from-emerald-600 via-teal-600 to-cyan-700',
      defaultSize: { width: 940, height: 620 }
    },
    {
      id: 'contact',
      title: 'Contact Me',
      icon: "./assets/mail.png",
      color: 'from-rose-500 via-pink-600 to-purple-600',
      defaultSize: { width: 940, height: 620 }
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: "./assets/terminal.png",
      color: 'from-slate-800 via-slate-900 to-black',
      defaultSize: { width: 900, height: 560 }
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: "./assets/settings.png",
      color: 'from-slate-600 via-slate-700 to-slate-800',
      defaultSize: { width: 900, height: 600 }
    },
    {
      id: 'safari',
      title: 'Safari',
      icon: "./assets/safari.png",
      color: 'from-sky-500 via-blue-600 to-indigo-700',
      defaultSize: { width: 1040, height: 680 }
    },
    {
      id: 'leetcode',
      title: 'LeetCode',
      icon: "./assets/leetcode.svg",
      color: 'from-amber-500 via-orange-500 to-yellow-600',
      defaultSize: { width: 1020, height: 680 }
    },
    {
      id: 'resume',
      title: 'Resume.pdf',
      icon: "../../assets/pdf.png",
      color: 'from-rose-600 via-red-600 to-amber-600',
      defaultSize: { width: 1020, height: 680 }
    }
  ];

  // State Management
  const [openAppIds, setOpenAppIds] = useState(['welcome']); // Welcome app open by default
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [activeAppId, setActiveAppId] = useState('welcome');
  const [windowZIndexes, setWindowZIndexes] = useState({ welcome: 20 });
  const [highestZIndex, setHighestZIndex] = useState(20);

  const [currentWallpaper, setCurrentWallpaper] = useState(wallpapers[0]);
  const [showLaunchpad, setShowLaunchpad] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showAboutMac, setShowAboutMac] = useState(false);

  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // App Navigation Handlers
  const handleOpenApp = (id) => {
    if (!openAppIds.includes(id)) {
      setOpenAppIds([...openAppIds, id]);
    }
    if (minimizedApps.includes(id)) {
      setMinimizedApps(minimizedApps.filter(appId => appId !== id));
    }
    handleFocusApp(id);
  };

  const handleCloseApp = (id) => {
    setOpenAppIds(openAppIds.filter(appId => appId !== id));
    setMinimizedApps(minimizedApps.filter(appId => appId !== id));
    if (activeAppId === id) {
      const remainingOpen = openAppIds.filter(appId => appId !== id);
      if (remainingOpen.length > 0) {
        handleFocusApp(remainingOpen[remainingOpen.length - 1]);
      } else {
        setActiveAppId(null);
      }
    }
  };

  const handleMinimizeApp = (id) => {
    if (!minimizedApps.includes(id)) {
      setMinimizedApps([...minimizedApps, id]);
    }
    const remainingActive = openAppIds.filter(appId => appId !== id && !minimizedApps.includes(appId));
    if (remainingActive.length > 0) {
      handleFocusApp(remainingActive[remainingActive.length - 1]);
    } else {
      setActiveAppId(null);
    }
  };

  const handleFocusApp = (id) => {
    setActiveAppId(id);
    const newZ = highestZIndex + 1;
    setHighestZIndex(newZ);
    setWindowZIndexes(prev => ({ ...prev, [id]: newZ }));
  };

  return (
    <div className="w-screen h-screen overflow-hidden font-sans text-slate-100 select-none">
      {/* Top macOS Navbar Bar */}
      <Navbar
        activeAppId={activeAppId}
        apps={APPS}
        onOpenApp={handleOpenApp}
        onCloseApp={handleCloseApp}
        toggleSpotlight={() => setShowSpotlight(!showSpotlight)}
        toggleControlCenter={() => setShowControlCenter(!showControlCenter)}
        showControlCenter={showControlCenter}
        openAboutMac={() => setShowAboutMac(true)}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Desktop & Windows Layer */}
      <Desktop
        wallpaper={currentWallpaper}
        apps={APPS}
        openAppIds={openAppIds}
        activeAppId={activeAppId}
        minimizedApps={minimizedApps}
        onOpenApp={handleOpenApp}
        onCloseApp={handleCloseApp}
        onMinimizeApp={handleMinimizeApp}
        onFocusApp={handleFocusApp}
        windowZIndexes={windowZIndexes}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        theme={theme}
        setTheme={setTheme}
        currentWallpaper={currentWallpaper}
        onSelectWallpaper={setCurrentWallpaper}
      />

      {/* Bottom Floating macOS Dock */}
      <Dock
        apps={APPS}
        openAppIds={openAppIds}
        activeAppId={activeAppId}
        minimizedApps={minimizedApps}
        onOpenApp={handleOpenApp}
        onToggleLaunchpad={() => setShowLaunchpad(!showLaunchpad)}
        theme={theme}
      />

      {/* Launchpad Fullscreen Grid Overlay */}
      {showLaunchpad && (
        <Launchpad
          apps={APPS}
          onOpenApp={handleOpenApp}
          onClose={() => setShowLaunchpad(false)}
        />
      )}

      {/* Spotlight Search Overlay */}
      <Spotlight
        isOpen={showSpotlight}
        onClose={() => setShowSpotlight(false)}
        onOpenApp={handleOpenApp}
        apps={APPS}
      />

      {/* Control Center Popup */}
      <ControlCenter
        isOpen={showControlCenter}
        onClose={() => setShowControlCenter(false)}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        currentWallpaper={currentWallpaper}
        onSelectWallpaper={setCurrentWallpaper}
      />

      {/* About This Mac Modal */}
      {showAboutMac && (
        <AboutThisMacModal onClose={() => setShowAboutMac(false)} />
      )}
    </div>
  );
}
