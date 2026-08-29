import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function Launchpad({ apps, onOpenApp, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-3xl flex flex-col items-center p-8 select-none"
    >
      {/* Top Bar with Close Button */}
      <div className="w-full flex justify-end max-w-4xl">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar Input */}
      <div className="relative w-full max-w-md my-8">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search portfolio apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl backdrop-blur-md"
        />
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 max-w-4xl w-full">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              sounds.playOpen();
              onOpenApp(app.id);
              onClose();
            }}
            className="flex flex-col items-center space-y-2 group focus:outline-none"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200 ring-1 ring-white/20`}>
              <img src={app.icon} alt={app.title} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center" />
            </div>
            <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
              {app.title}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
