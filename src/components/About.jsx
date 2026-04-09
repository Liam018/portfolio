import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Terminal, FastForward, Github, Linkedin, Mail, FileText, X, Minus, Maximize2 } from 'lucide-react';
import profileIllustration from '../assets/profile_illustration.png';
import resumePdf from '../assets/RESUME.pdf';

const interests = ['Web Prep', 'UI/UX', 'Mobile Dev', 'Supabase', 'React Native'];

// Shared smooth transition
const smoothTransition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.6,
};

const About = () => {
  const containerRef = useRef(null);
  const terminalScrollRef = useRef(null);
  const terminalRef = useRef(null);
  const isTerminalInView = useInView(terminalRef, { once: true, margin: "-100px" });
  
  const [viewMode, setViewMode] = useState('terminal'); // 'static' | 'terminal' | 'fullscreen'
  const [history, setHistory] = useState([
    { type: 'output', text: 'Initializing liam_kurt.sys...', isSystem: true }
  ]);
  const [input, setInput] = useState('');
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  const introText = "Liam Kurt Kasten Edaño — Pursuing BSIT at Saint Louis College. My journey is fueled by the intersection of beautiful design and reliable functionality. I specialize in React Native, Supabase, and Full-stack Web Development, driven by curiosity and a commitment to continuous learning.";

  const commands = {
    help: 'Available: whoami, tech, ls, resume, socials, hobbies, clear',
    whoami: 'Liam Kurt — IT Student & Full-stack Developer based in La Union.',
    tech: 'Core Stack: React Native, Supabase, Vite, Tailwind, React, and Django REST.',
    ls: 'drwxr-xr-x  about.md  skills.py  projects.exe  Liam_Resume.pdf',
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
            <a key={i} href={resumePdf} download="Liam_Kurt_Resume.pdf" className="text-accent hover:text-white transition-colors flex items-center gap-1.5 font-bold group inline-flex">
              <FileText size={14} className="group-hover:scale-110 transition-transform" />
              {word}
            </a>
          );
        } else if (word.includes('github.com') || word.includes('linkedin.com')) {
          finalParts.push(
            <a key={i} href={`https://${word}`} target="_blank" rel="noreferrer" className="text-accent underline hover:text-white transition-colors">
              {word}
            </a>
          );
        } else if (word.includes('@')) {
          finalParts.push(
            <a key={i} href={`mailto:${word}`} className="text-accent hover:text-white transition-colors">
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
  }, [isTerminalInView, isAutoTyping, typingIndex]);

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

  // Handle scroll lock and auto-close on navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (viewMode === 'fullscreen') setViewMode('terminal');
    };

    if (viewMode === 'fullscreen') {
      document.body.style.overflow = 'hidden';
      // Listen for when user clicks navbar links while in fullscreen
      window.addEventListener('hashchange', handleHashChange);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => { 
      document.body.style.overflow = 'auto';
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [viewMode]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 30]), smoothConfig);
  
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

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
        <span className={`transition-colors duration-300 ${viewMode === 'static' ? 'text-primary' : 'text-white/20'}`}>Close</span>
        <span className="text-white/10">/</span>
        <span className={`transition-colors duration-300 ${viewMode === 'terminal' ? 'text-[#ffbd2e]' : 'text-white/20'}`}>Min</span>
        <span className="text-white/10">/</span>
        <span className={`transition-colors duration-300 ${viewMode === 'fullscreen' ? 'text-secondary' : 'text-white/20'}`}>Max</span>
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className={`${viewMode === 'fullscreen' ? 'fixed inset-0 z-9999 bg-[#050505] flex items-center justify-center py-0 overflow-y-auto' : 'py-24 relative overflow-hidden'}`}
    >
      <motion.div 
        style={viewMode === 'fullscreen' ? {} : { opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${viewMode === 'fullscreen' ? 'h-full flex flex-col justify-center' : ''}`}
      >
        <div className={`grid ${viewMode === 'fullscreen' ? 'grid-cols-1 max-w-6xl mx-auto' : 'lg:grid-cols-2'} gap-16 items-center w-full`}>
          
          {/* Left Side: Visuals - Hidden in Fullscreen */}
          {viewMode !== 'fullscreen' && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={smoothTransition}
              viewport={{ once: true, margin: "-15%" }}
              className="flex flex-col items-center lg:items-start relative"
              style={{ y: y1 }}
            >
              <div className="relative z-10 p-2 overflow-hidden aspect-square max-w-md w-full mx-auto lg:mx-0">
                 <motion.img 
                  src={profileIllustration} 
                  alt="Profile Illustration"
                  className="w-full h-full object-cover rounded-[38px]"
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                 />
              </div>

              {/* Interest Badges */}
              <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start w-full">
                {interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/5 transition-colors cursor-default"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Right Side: Interactive Content */}
          <motion.div
            initial={viewMode === 'fullscreen' ? {} : { opacity: 0, y: 40 }}
            whileInView={viewMode === 'fullscreen' ? {} : { opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            viewport={{ once: true, margin: "-15%" }}
            className={`w-full relative ${viewMode === 'fullscreen' ? 'h-full flex flex-col' : 'min-h-[450px]'}`}
          >
            <AnimatePresence mode="wait">
              {viewMode === 'static' ? (
                <motion.div
                  key="static"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="pb-1 text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Tracing My Path
                    </h2>
                    <button 
                      onClick={() => setViewMode('terminal')}
                      className="text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-xl border border-border glass hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                    >
                      <Terminal size={14} /> Open Terminal
                    </button>
                  </div>
                  
                  <p className="text-lg text-text leading-relaxed">
                    I'm {formatTerminalText('Liam Kurt Kasten Edaño')}, a passionate IT student at {formatTerminalText('Saint Louis College')}.
                  </p>
                  <p className="text-lg text-text leading-relaxed">
                    My journey is fueled by the intersection of beautiful design and reliable functionality. I specialize in {formatTerminalText('React Native')}, {formatTerminalText('Supabase')}, and {formatTerminalText('Full-stack')} development.
                  </p>
                  <p className="text-lg text-text leading-relaxed">
                    Driven by curiosity and a commitment to continuous learning, I enjoy turning complex challenges into intuitive experiences that deliver real value.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`flex flex-col w-full h-full`}
                >
                  {/* Hide title in fullscreen to maximize space */}
                  {viewMode !== 'fullscreen' && (
                    <div className="flex items-center space-x-3 mb-8">
                      <Terminal className="text-secondary" size={32} />
                      <h2 className="pb-1 text-3xl md:text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Tracing My Path
                      </h2>
                    </div>
                  )}
                  
                  <div 
                    ref={terminalRef} 
                    className={`bg-[#050505] overflow-hidden border-white/5 flex flex-col relative group text-white transition-all duration-700
                      ${viewMode === 'fullscreen' ? 'h-[80vh] md:h-[85vh] w-full rounded-3xl border' : 'h-[400px] md:h-[450px] rounded-2xl border'}`}
                  >
                      {/* Scanline Overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-[length:100%_4px,3px_100%] opacity-15" />
                      
                      {/* Header */}
                      <div className={`bg-[#0a0a0a] px-4 py-4 md:px-6 border-b border-white/10 flex items-center justify-between shrink-0 z-30`}>
                        <TerminalControls />
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest uppercase">liam@dev: ~/path</span>
                          <span className="text-[10px] md:text-xs text-secondary font-mono px-2 py-0.5 rounded-sm bg-secondary/10 border border-secondary/20 font-bold">main*</span>
                        </div>
                      </div>

                      {/* Body */}
                      <div ref={terminalScrollRef} className="p-6 md:p-10 lg:p-12 overflow-y-auto font-mono text-sm md:text-lg flex-1 scrollbar-hide bg-[#050505] relative z-10">
                        <div className={`${viewMode === 'fullscreen' ? 'max-w-5xl mx-auto' : ''}`}>
                          {history.map((line, idx) => (
                            <div key={idx} className="mb-4">
                              {line.type === 'input' ? (
                                <div className="flex items-center text-primary">
                                  <span className="mr-3 opacity-70">➜</span>
                                  <span className="text-white font-bold">{line.text}</span>
                                </div>
                              ) : (
                                <div className={`leading-relaxed pl-6 border-l-2 border-white/5 ${line.isSystem ? 'text-primary font-bold' : 'text-white/80'}`}>
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
                                className="flex-1 bg-transparent border-none outline-none text-white caret-primary"
                                placeholder="Try 'ls' or 'resume'..."
                              />
                            </form>
                          )}
                          
                        {isAutoTyping && (
                          <div className="mt-8 flex justify-end">
                            <button onClick={handleSkip} className="text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group text-white/50">
                              <FastForward size={14} className="group-active:translate-x-1 transition-transform" /> Skip Intro
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;
