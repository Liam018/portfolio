import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const DeveloperPlayground = () => {
  const [history, setHistory] = useState([
    { type: 'input', text: 'welcome' },
    { type: 'output', text: 'System initialized. Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: 'Available commands: whoami, skills, projects, location, contact, clear, cls, coffee',
    whoami: 'Liam Kurt Kasten Edaño - IT Student & Full-stack Developer at Saint Louis College.',
    skills: 'Frontend: React, React Native, Vite. Backend: Supabase, Django REST, SQL. Design: UI/UX, Figma.',
    projects: '1. Interactive Campus Kiosk  2. AgriLako E-commerce platform.',
    location: 'San Fernando City, La Union, Philippines.',
    contact: 'Email: liamkurt014@gmail.com',
    coffee: '☕ Coffee is the fuel for coding. Want to buy me one?',
    clear: 'clear',
    cls: 'clear'
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, { type: 'input', text: cmd }];

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
    } else if (commands[cmd]) {
      newHistory.push({ type: 'output', text: commands[cmd] });
      setHistory(newHistory);
    } else {
      newHistory.push({ type: 'output', text: `Command not found: ${cmd}. Type "help" for a list of commands.` });
      setHistory(newHistory);
    }
    setInput('');
  };

  return (
    <section className="py-20 bg-white/[0.01]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8 justify-center">
          <Terminal className="text-primary" size={32} />
          <h2 className="text-3xl font-display font-bold">Developer Playground</h2>
        </div>
        
        <div className="glass rounded-2xl overflow-hidden shadow-2xl border-white/5">
          {/* Terminal Header */}
          <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs text-text-muted font-mono tracking-widest uppercase">liam-terminal — 80x24</span>
          </div>

          {/* Terminal Body */}
          <div 
            ref={scrollRef}
            className="p-6 h-[400px] overflow-y-auto font-mono text-sm sm:text-base scrollbar-hide"
          >
            {history.map((line, idx) => (
              <div key={idx} className="mb-2">
                {line.type === 'input' ? (
                  <div className="flex items-center text-primary">
                    <span className="mr-2">➜</span>
                    <span className="text-text">{line.text}</span>
                  </div>
                ) : (
                  <div className="text-text-muted leading-relaxed pl-6">
                    {line.text}
                  </div>
                )}
              </div>
            ))}
            <form onSubmit={handleCommand} className="flex items-center mt-4">
              <span className="text-primary mr-2 font-bold animate-pulse">➜</span>
              <input
                type="text"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-text caret-primary"
                placeholder="Type a command..."
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperPlayground;
