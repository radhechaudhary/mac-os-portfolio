import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sounds } from '../../utils/sound';

export default function TerminalApp({ onOpenApp, onSetWallpaper }) {
  const { personal, skills, projects, journey, education } = PORTFOLIO_DATA;
  
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to macOS ZSH Portfolio Shell (v2.4.0)' },
    { type: 'output', text: 'Type "help" to see available interactive CLI commands.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = inputVal.trim().toLowerCase();
      sounds.playClick();
      
      const newHistory = [...history, { type: 'input', text: `alex@macbook-pro ~ % ${inputVal}` }];

      if (command === 'help') {
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  help        - Display list of CLI commands
  whoami      - Print developer summary bio
  skills      - List core engineering skill competencies
  projects    - List portfolio projects & repositories
  journey     - Print career timeline & experience
  education   - View academic degrees & honors
  contact     - Display contact details & social links
  clear       - Clear screen logs
  matrix      - Toggle Hacker Matrix Rain mode 🟢
  theme       - Cycle desktop wallpaper preset
  date        - Print current date & time
  sudo        - Run elevated system command`
        });
      } else if (command === 'whoami' || command === 'about') {
        newHistory.push({
          type: 'output',
          text: `${personal.name} - ${personal.title}\n${personal.bio}`
        });
      } else if (command === 'skills') {
        const skillList = skills.map(s => `  • ${s.name.padEnd(30, ' ')} [${s.level}%]`).join('\n');
        newHistory.push({ type: 'output', text: `Engineering Skills:\n${skillList}` });
      } else if (command === 'projects') {
        const projectList = projects.map(p => `  • ${p.title} (${p.category}): ${p.tagline}`).join('\n');
        newHistory.push({ type: 'output', text: `Featured Projects:\n${projectList}` });
        if (onOpenApp) onOpenApp('projects');
      } else if (command === 'journey') {
        const jList = journey.map(j => `  • ${j.period}: ${j.role} at ${j.company}`).join('\n');
        newHistory.push({ type: 'output', text: `Career Journey:\n${jList}` });
      } else if (command === 'education') {
        const eduList = education.map(e => `  • ${e.degree} - ${e.institution} (${e.period})`).join('\n');
        newHistory.push({ type: 'output', text: `Education & Certification:\n${eduList}` });
      } else if (command === 'contact') {
        newHistory.push({
          type: 'output',
          text: `Email: ${personal.email}\nGitHub: ${personal.github}\nLinkedIn: ${personal.linkedin}`
        });
      } else if (command === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      } else if (command === 'matrix') {
        setIsMatrixMode(!isMatrixMode);
        newHistory.push({
          type: 'output',
          text: isMatrixMode ? 'Deactivated Matrix Mode.' : '🟢 Matrix Rain Mode Activated!'
        });
      } else if (command === 'date') {
        newHistory.push({ type: 'output', text: new Date().toString() });
      } else if (command === 'sudo' || command.startsWith('sudo ')) {
        newHistory.push({ type: 'output', text: 'Permission denied: User is not in the sudoers file. This incident will be reported to Apple. 🍏' });
      } else if (command.startsWith('echo ')) {
        newHistory.push({ type: 'output', text: inputVal.slice(5) });
      } else if (command !== '') {
        newHistory.push({ type: 'output', text: `zsh: command not found: ${command}. Type "help" for command list.` });
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <div className={`h-full rounded-xl p-4 font-mono text-xs select-text flex flex-col justify-between overflow-y-auto scrollbar-thin ${
      isMatrixMode 
        ? 'bg-black text-emerald-400 font-bold border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
        : 'bg-slate-950 text-emerald-400 border border-white/10'
    }`}>
      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index} className="whitespace-pre-wrap leading-relaxed">
            {item.type === 'input' ? (
              <span className="text-blue-400 font-semibold">{item.text}</span>
            ) : (
              <span className={isMatrixMode ? 'text-emerald-400' : 'text-slate-300'}>{item.text}</span>
            )}
          </div>
        ))}

        {/* Input Prompt Row */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-blue-400 font-semibold shrink-0">alex@macbook-pro ~ %</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            className="flex-1 bg-transparent text-emerald-400 focus:outline-none font-mono caret-emerald-400 text-xs"
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
