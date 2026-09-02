import React, { useState } from 'react';
import { 
  Search, 
  Folder, 
  ExternalLink, 
  Sparkles, 
  LayoutGrid, 
  List, 
  X, 
  CheckCircle2,
  Code2
} from 'lucide-react';
import { GithubIcon } from '../SocialIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/sound';

export default function ProjectsApp() {
  const { projects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'AI & Full-Stack', 'Full-Stack', 'Frontend', 'DevOps & Tools'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full text-slate-100 select-text">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl liquid-glass-input text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sounds.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center space-x-1 liquid-glass-well p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Projects Display Area */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Folder className="w-12 h-12 text-slate-600 mb-2" />
          <p className="text-sm">No projects matching your search filter.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="liquid-glass-card group rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-36 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-blue-300 border border-white/10">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 flex items-center justify-between border-t border-white/5 mt-3">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setSelectedProject(project);
                  }}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Details
                </button>

                <div className="flex items-center space-x-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-600 text-slate-200 transition-colors"
                    title="View Source Code"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="liquid-glass-card p-3 rounded-xl flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-white text-sm">{project.title}</h4>
                  <p className="text-xs text-slate-400">{project.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(project)}
                className="px-3 py-1 text-xs rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Project Details Modal Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl liquid-glass liquid-glass-dark p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-56 rounded-xl object-cover border border-white/10"
            />

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Highlights</h4>
              <ul className="space-y-1.5">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technologies Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-blue-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end space-x-3 border-t border-white/10">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" /> GitHub Repository
              </a>
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Open Live Application
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
