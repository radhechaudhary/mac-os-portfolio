import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  LayoutGrid,
  Trash2
} from 'lucide-react';
import { sounds } from '../utils/sound';

export default function Dock({
  apps,
  openAppIds,
  activeAppId,
  onOpenApp,
  onToggleLaunchpad,
  minimizedApps,
  theme = 'dark'
}) {
  const mouseX = useMotionValue(Infinity);
  const isLight = theme === 'light';

  // Filter out Desktop-only files like resume from the Dock
  const dockApps = apps.filter(app => app.id !== 'resume');

  return (
    <div className="fixed bottom-2 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`pointer-events-auto flex items-end h-16 gap-2 px-3 pb-2 rounded-2xl liquid-glass liquid-glass-refract transition-colors ${isLight ? 'liquid-glass-light' : 'liquid-glass-dark'
          }`}
      >
        {/* Launchpad Icon */}
        <DockIcon
          mouseX={mouseX}
          icon={<LayoutGrid className="w-6 h-6 text-white" />}
          title="Launchpad"
          bgGradient="from-indigo-500 via-purple-500 to-pink-500"
          onClick={() => {
            sounds.playClick();
            onToggleLaunchpad();
          }}
        />

        <div className={`w-[1px] h-8 mx-0.5 my-auto ${isLight ? 'bg-black/20' : 'bg-white/20'}`} />

        {/* Portfolio App Icons */}
        {dockApps.map((app) => {
          const isOpen = openAppIds.includes(app.id);
          const isActive = activeAppId === app.id;
          const isMinimized = minimizedApps?.includes(app.id);

          return (
            <DockIcon
              key={app.id}
              mouseX={mouseX}
              icon={app.icon}
              title={app.title}
              bgGradient={app.color}
              isOpen={isOpen}
              isActive={isActive}
              isMinimized={isMinimized}
              onClick={() => {
                sounds.playOpen();
                onOpenApp(app.id);
              }}
            />
          );
        })}

        <div className={`w-[1px] h-8 mx-0.5 my-auto ${isLight ? 'bg-black/20' : 'bg-white/20'}`} />

        {/* Trash Icon */}
        <DockIcon
          mouseX={mouseX}
          icon="../../assets/trash.png"
          title="Trash"
          bgGradient="from-slate-700 to-slate-800"
          onClick={() => {
            sounds.playClick();
            alert("Trash is empty! Keep coding! 🚀");
          }}
        />
      </motion.div>
    </div>
  );
}

function DockIcon({
  mouseX,
  icon,
  title,
  bgGradient,
  isOpen,
  isActive,
  isMinimized,
  onClick
}) {
  const ref = React.useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 68, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 12 });

  const isImageString = typeof icon === 'string';

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      whileHover={{ y: -6 }}
      className="relative group flex items-center justify-center focus:outline-none"
    >
      {/* Icon Content (shine effect clipped to the icon only, not the tooltip) */}
      <div className="liquid-glass-shine relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
        {isImageString ? (
          <motion.img
            src={icon}
            alt={title}
            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className={`w-full h-full rounded-xl bg-gradient-to-tr ${bgGradient || 'from-slate-700 to-slate-800'} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform ring-1 ring-white/20`}>
            {icon}
          </div>
        )}
      </div>

      {/* Tooltip Title */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-950/90 text-white text-xs rounded-md shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap font-medium z-50">
        {title} {isMinimized ? '(Minimized)' : ''}
      </div>

      {/* macOS Active Dot Indicator */}
      {isOpen && (
        <span
          className={`absolute -bottom-1.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive
            ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] scale-110'
            : 'bg-white/60'
            }`}
        />
      )}
    </motion.button>
  );
}
