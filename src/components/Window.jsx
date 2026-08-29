import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function Window({ 
  id, 
  title, 
  icon, 
  children, 
  isActive, 
  onFocus, 
  onClose, 
  onMinimize,
  zIndex,
  theme = 'dark',
  defaultPosition,
  defaultSize = { width: 960, height: 640 }
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  // Dynamic window centering calculation
  const [centerPos, setCenterPos] = useState({ x: 100, y: 60 });

  useEffect(() => {
    const calculateCenter = () => {
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const posX = Math.max(16, (screenW - defaultSize.width) / 2);
      const posY = Math.max(45, (screenH - defaultSize.height) / 2 - 15);
      setCenterPos({ x: posX, y: posY });
    };

    calculateCenter();
    window.addEventListener('resize', calculateCenter);
    return () => window.removeEventListener('resize', calculateCenter);
  }, [defaultSize.width, defaultSize.height]);

  const handleMinimize = (e) => {
    e.stopPropagation();
    sounds.playMinimize();
    onMinimize(id);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    sounds.playClick();
    onClose(id);
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    sounds.playClick();
    setIsMaximized(prev => !prev);
  };

  const isLight = theme === 'light';

  // Calculate window dimensions and positions centered on screen
  const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;

  const normalWidth = Math.min(defaultSize.width, screenW - 32);
  const normalHeight = Math.min(defaultSize.height, screenH - 100);

  const windowWidth = isMaximized ? 'calc(100vw - 24px)' : normalWidth;
  const windowHeight = isMaximized ? 'calc(100vh - 108px)' : normalHeight;

  const posX = isMaximized ? 12 : (defaultPosition?.x !== undefined ? defaultPosition.x : Math.max(16, (screenW - normalWidth) / 2));
  const posY = isMaximized ? 38 : (defaultPosition?.y !== undefined ? defaultPosition.y : Math.max(45, (screenH - normalHeight) / 2 - 15));

  return (
    <motion.div
      key={`${id}-${isMaximized ? 'max' : 'norm'}`}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
      exit={{ scale: 0.45, opacity: 0, y: 300, filter: 'blur(8px)' }}
      transition={{ type: 'spring', damping: 24, stiffness: 320 }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      onMouseDown={() => {
        onFocus(id);
      }}
      style={{ 
        zIndex,
        width: windowWidth,
        height: windowHeight,
        top: posY,
        left: posX,
        position: 'fixed'
      }}
      className={`rounded-xl overflow-hidden flex flex-col transition-shadow duration-200 ${
        isLight 
          ? isActive 
            ? 'bg-slate-100/95 text-slate-900 ring-1 ring-black/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]' 
            : 'bg-slate-100/90 text-slate-800 ring-1 ring-black/10 shadow-lg'
          : isActive 
            ? 'macos-window-dark bg-slate-900/95 text-slate-100 ring-1 ring-white/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]' 
            : 'macos-window bg-slate-900/90 text-slate-100 ring-1 ring-white/10 shadow-xl'
      } backdrop-blur-2xl`}
    >
      {/* Title Bar / Header (Draggable Handle) */}
      <div 
        onPointerDown={(e) => {
          onFocus(id);
          sounds.playClick();
          if (!isMaximized) {
            dragControls.start(e);
          }
        }}
        className={`h-10 border-b flex items-center justify-between px-3 select-none cursor-grab active:cursor-grabbing shrink-0 transition-colors ${
          isLight ? 'bg-slate-200/90 border-black/10 text-slate-800' : 'bg-slate-800/80 border-white/10 text-slate-200'
        }`}
      >
        {/* macOS Traffic Lights Buttons */}
        <div className="flex items-center space-x-2 group" onPointerDown={(e) => e.stopPropagation()}>
          {/* Red Close Button */}
          <button 
            onClick={handleClose} 
            className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-rose-950 focus:outline-none transition-colors"
            title="Close Window"
          >
            <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>
          
          {/* Yellow Minimize Button */}
          <button 
            onClick={handleMinimize} 
            className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-amber-950 focus:outline-none transition-colors"
            title="Minimize Window"
          >
            <Minus className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
          </button>

          {/* Green Zoom / Fullscreen Button */}
          <button 
            onClick={handleMaximize} 
            className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-emerald-950 focus:outline-none transition-colors"
            title="Maximize / Restore"
          >
            {isMaximized ? (
              <Minimize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            ) : (
              <Maximize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
            )}
          </button>
        </div>

        {/* Window Title & Icon */}
        <div className="flex items-center space-x-2 text-xs font-semibold truncate px-4 pointer-events-none">
          <span className="opacity-80">{icon}</span>
          <span className="truncate">{title}</span>
        </div>

        {/* Spacer */}
        <div className="w-12 pointer-events-none" />
      </div>

      {/* Window Body / Content */}
      <div className="flex-1 overflow-auto p-4 relative scrollbar-thin select-text">
        {children}
      </div>
    </motion.div>
  );
}
