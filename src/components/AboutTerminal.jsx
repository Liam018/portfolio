import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Terminal, FastForward, FileText, X, Minus, Maximize2 } from 'lucide-react';
import resumePdf from '../assets/RESUME.pdf';

const AboutTerminal = ({ viewMode, setViewMode }) => {
  const terminalScrollRef = useRef(null);
  const terminalRef = useRef(null);
  const isTerminalInView = useInView(terminalRef, { once: true, margin: "-100px" });
  
  const [history, setHistory] = useState([
    { type: 'output', text: 'Initializing liam_kurt.sys...', isSystem: true }
  ]);
  const [input, setInput] = useState('');
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  const introText = "Liam Kurt Kasten Edaño — Pursuing BSIT at Saint Louis College. My journey is fueled by the intersection of beautiful design and reliable functionality. I specialize in React Native, Supabase, and Full-stack Web Development, driven by curiosity and a commitment to continuous learning.";

  const commands = {
    help: 'Available: whoami, tech, resume, socials, hobbies, contact, clear',
    whoami: 'Liam Kurt — IT Student & Full-stack Developer based in La Union.',
    tech: 'Core Stack: React Native, Supabase, Vite, Tailwind, React, and Django REST.',
    resume: 'Click to download: Liam_Resume.pdf',
    socials: 'github.com/Liam018 \n linkedin.com/in/liam-kurt-edano',
    contact: 'liamkurt014@gmail.com',
    hobbies: '📚 Reading Manhwa/Manga/Donghua, 🎮 Playing online games, 🎵 Listening to music',
    clear: 'clear'
  };

  // Syntax highlighting for terminal text
  const formatTerminalText = (text) => {
    if (!text) return null;
    
    const keywords = ['Liam Kurt Kasten Edaño', 'Saint Louis College', 'React Native', 'Supabase', 'Full-stack', 'Vite', 'Tailwind', 'React', 'BSIT', 'La Union'];
    const hashtags = ['#skills', '#about', '#projects', '#contact'];
    
    let parts = [text];
    
    keywords.forEach(keyword => {
      let newParts = [];
      parts.forEach(part => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }
        const regex = new RegExp(`(${keyword})`, 'gi');
        const split = part.split(regex);
        split.forEach((s, i) => {
          if (s.toLowerCase() === keyword.toLowerCase()) {
            newParts.push(<span key={`${keyword}-${i}`} className="text-secondary font-bold brightness-110">{s}</span>);
          } else if (s) {
            newParts.push(s);
          }
        });
      });
      parts = newParts;
    });

    // Format URLs and Hashtags
    let finalParts = [];
    parts.forEach(part => {
      if (typeof part !== 'string') {
        finalParts.push(part);
        return;
      }
      
      const words = part.split(/(\s+|\n)/);
      words.forEach((word, i) => {
        if (word === 'Liam_Resume.pdf') {
          finalParts.push(
            <a key={i} href={resumePdf} download="Liam_Kurt_Resume.pdf" className="text-accent hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 font-bold group">
              <FileText size={14} className="group-hover:scale-110 transition-transform" />
              {word}
            </a>
          );
        } else if (word.includes('github.com') || word.includes('linkedin.com')) {
          finalParts.push(
            <a key={i} href={`https://${word}`} target="_blank" rel="noreferrer" className="text-accent underline hover:text-slate-900 dark:hover:text-white transition-colors">
              {word}
            </a>
          );
        } else if (word.includes('@')) {
          finalParts.push(
            <a key={i} href={`mailto:${word}`} className="text-accent hover:text-slate-900 dark:hover:text-white transition-colors">
              {word}
            </a>
          );
        } else if (hashtags.some(h => word.startsWith(h))) {
          finalParts.push(
            <button 
              key={i} 
              onClick={() => {
                const id = word.slice(1);
                document.getElementById(id === 'projects' ? 'project-highlight' : id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-primary font-bold hover:underline"
            >
              {word}
            </button>
          );
        } else {
          finalParts.push(word);
        }
      });
    });

    return finalParts;
  };

  // Auto-typing effect
  useEffect(() => {
    if (isTerminalInView && typingIndex < introText.length && !isAutoTyping && viewMode !== 'static') {
      setIsAutoTyping(true);
    }

    if (isAutoTyping && typingIndex < introText.length) {
      const timeout = setTimeout(() => {
        setHistory(prev => {
          const newHistory = [...prev];
          const lastItem = newHistory[newHistory.length - 1];
          if (lastItem.type === 'output' && typingIndex > 0 && lastItem.isIntro) {
            newHistory[newHistory.length - 1] = { ...lastItem, text: introText.slice(0, typingIndex + 1) };
          } else {
            newHistory.push({ type: 'output', text: introText.slice(0, 1), isIntro: true });
          }
          return newHistory;
        });
        setTypingIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else if (typingIndex === introText.length && isAutoTyping) {
      setIsAutoTyping(false);
      setHistory(prev => [...prev, { type: 'output', text: 'Type "help" for more information.' }]);
    }
  }, [isTerminalInView, isAutoTyping, typingIndex, introText, viewMode]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSkip = () => {
    setIsAutoTyping(false);
    setTypingIndex(introText.length);
    setHistory([
      { type: 'output', text: 'Initializing liam_kurt.sys...', isSystem: true },
      { type: 'output', text: introText, isIntro: true },
      { type: 'output', text: 'Type "help" for more information.' }
    ]);
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim() || isAutoTyping) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, { type: 'input', text: cmd }];

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([
        { type: 'output', text: 'Initializing liam_kurt.sys...', isSystem: true },
        { type: 'output', text: introText, isIntro: true },
        { type: 'output', text: 'Terminal session reset.', isSystem: true },
        { type: 'output', text: 'Type "help" for more information.' }
      ]);
    } else if (commands[cmd]) {
      newHistory.push({ type: 'output', text: commands[cmd] });
      setHistory(newHistory);
    } else {
      newHistory.push({ type: 'output', text: `zsh: command not found: ${cmd}` });
      setHistory(newHistory);
    }
    setInput('');
  };

  const TerminalControls = () => (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-2">
        <button 
          onClick={() => setViewMode('static')}
          title="Close to Reader Mode"
          className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)] hover:brightness-125 transition-all flex items-center justify-center group/btn" 
        >
          <X size={6} className="text-black/60 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </button>
        <button 
          onClick={() => setViewMode('terminal')}
          title="Standard Mode"
          className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)] hover:brightness-125 transition-all flex items-center justify-center group/btn" 
        >
          <Minus size={6} className="text-black/60 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </button>
        <button 
          onClick={() => setViewMode('fullscreen')}
          title="Maximize"
          className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)] hover:brightness-125 transition-all flex items-center justify-center group/btn" 
        >
          <Maximize2 size={6} className="text-black/60 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </button>
      </div>
      <div className="hidden sm:flex items-center space-x-3 text-[9px] uppercase tracking-[0.2em] font-mono font-bold">
        <span className={`transition-colors duration-300 ${viewMode === 'static' ? 'text-primary' : 'text-slate-400 dark:text-white/20'}`}>Close</span>
        <span className="text-slate-300 dark:text-white/10">/</span>
        <span className={`transition-colors duration-300 ${viewMode === 'terminal' ? 'text-[#ffbd2e]' : 'text-slate-400 dark:text-white/20'}`}>Min</span>
        <span className="text-slate-300 dark:text-white/10">/</span>
        <span className={`transition-colors duration-300 ${viewMode === 'fullscreen' ? 'text-secondary' : 'text-slate-400 dark:text-white/20'}`}>Max</span>
      </div>
    </div>
  );

  return (
    <div 
      ref={terminalRef} 
      className={`bg-white dark:bg-[#050505] overflow-hidden border-slate-200 dark:border-white/5 flex flex-col relative group text-slate-800 dark:text-white transition-all duration-700
        ${viewMode === 'fullscreen' ? 'h-[80vh] md:h-[85vh] w-full rounded-3xl border' : 'h-[400px] md:h-[450px] rounded-2xl border'}`}
    >
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-size-[100%_4px,3px_100%] opacity-5 dark:opacity-15" />
        
        {/* Header */}
        <div className={`bg-slate-50 dark:bg-[#0a0a0a] px-4 py-4 md:px-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0 z-30`}>
          <TerminalControls />
          <div className="flex items-center gap-2">
            <span className="text-[10px] md:text-xs text-slate-500 dark:text-white/40 font-mono tracking-widest uppercase">liam@dev: ~/path</span>
            <span className="text-[10px] md:text-xs text-secondary font-mono px-2 py-0.5 rounded-sm bg-secondary/10 border border-secondary/20 font-bold">main*</span>
          </div>
        </div>

        {/* Body */}
        <div ref={terminalScrollRef} className="p-6 md:p-10 lg:p-12 overflow-y-auto font-mono text-sm md:text-lg flex-1 bg-white dark:bg-[#050505] relative z-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/30 transition-colors">
          <div className={`${viewMode === 'fullscreen' ? 'max-w-5xl mx-auto' : ''}`}>
            {history.map((line, idx) => (
              <div key={idx} className="mb-4">
                {line.type === 'input' ? (
                  <div className="flex items-center text-primary">
                    <span className="mr-3 opacity-70">➜</span>
                    <span className="text-slate-800 dark:text-white font-bold">{line.text}</span>
                  </div>
                ) : (
                  <div className={`leading-relaxed pl-6 border-l-2 border-slate-200 dark:border-white/5 ${line.isSystem ? 'text-primary font-bold' : 'text-slate-600 dark:text-white/80'}`}>
                    {formatTerminalText(line.text)}
                  </div>
                )}
              </div>
            ))}
            
            {!isAutoTyping && (
              <form onSubmit={handleCommand} className="flex items-center mt-6">
                <span className="text-primary mr-3 font-bold animate-pulse">➜</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-white caret-primary"
                  placeholder="Try 'whoami' or 'resume'..."
                />
              </form>
            )}
            
          {isAutoTyping && (
            <div className="mt-8 flex justify-end">
              <button onClick={handleSkip} className="text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center gap-2 group text-slate-500 dark:text-white/50">
                <FastForward size={14} className="group-active:translate-x-1 transition-transform" /> Skip Intro
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutTerminal;
