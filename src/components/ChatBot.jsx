import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Bot, X, Trash2, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import pitchel from '../assets/pitchel.png';

const ChatBot = () => {
  const INITIAL_MESSAGE = { role: 'bot', text: "Hi! I'm Liam's AI assistant. Ask me anything about his skills, projects, or background! #skills" };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [INITIAL_MESSAGE];
  });
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  // Auto-focus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    } else if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isExpanded]);

  const knowledgeBase = {
    skills: "Liam is proficient in **Frontend** (React, React Native, Vite, Tailwind CSS), **Backend** (Supabase, Django REST, MariaDB/SQL), and **Design** (UI/UX, Photoshop, Figma, Framer). View them at #skills.",
    projects: "His featured projects include an **Interactive Campus Kiosk** and **AgriLako** (built with React Native and Supabase). Check them out at #project-highlight.",
    education: "He is currently pursuing a **BS in Information Technology** at Saint Louis College in San Fernando City, La Union.",
    contact: "You can reach Liam at **liamkurt014@gmail.com** or find him on LinkedIn and GitHub @Liam018. More details at #contact.",
    background: "He's an IT student from San Fernando City, La Union, passionate about full-stack development and UI/UX design. Meet him at #about.",
    // Meme Logic
    pagbilan: "Kala ko ba ayaw mo?",
    gustoko: "Ha? Ilan?",
    bente: "Tarantadooo",
    bakit: "Saan mo ilalagay?",
    dito: "Ohhululll",
    default: "I'm not sure about that. Try asking about his **skills**, **projects**, **education**, or **contact** info!"
  };

  const findBestResponse = (query) => {
    const q = query.toLowerCase();
    
    // Meme Logic First
    if (/pagbilan/i.test(q)) return knowledgeBase.pagbilan;
    if (/gusto ko/i.test(q)) return knowledgeBase.gustoko;
    if (/bente pesos/i.test(q)) return knowledgeBase.bente;
    if (/bakit/i.test(q)) return knowledgeBase.bakit;
    if (/dito oh/i.test(q)) return knowledgeBase.dito;

    // Knowledge Base with Regex
    if (/(skill|tool|stack|tech|know|language)/i.test(q)) return knowledgeBase.skills;
    if (/(project|work|portfolio|app|build|made)/i.test(q)) return knowledgeBase.projects;
    if (/(education|study|school|college|degree|learn)/i.test(q)) return knowledgeBase.education;
    if (/(contact|email|reach|message|hire|linkedin|github)/i.test(q)) return knowledgeBase.contact;
    if (/(who|about|background|bio|profile|liam)/i.test(q)) return knowledgeBase.background;

    return knowledgeBase.default;
  };

  const suggestions = [
    { label: "Skills?", query: "skills" },
    { label: "Projects?", query: "projects" },
    { label: "Education?", query: "education" },
    { label: "Contact?", query: "contact" }
  ];

  const handleSend = (e, customValue) => {
    if (e) e.preventDefault();
    const messageText = customValue || input;
    if (!messageText.trim()) return;

    const userMessage = messageText.toLowerCase().trim();
    
    // Check for meme image
    let userImage = null;
    if (userMessage.includes("dito oh")) {
      userImage = pitchel;
    }

    setMessages(prev => [...prev, { role: 'user', text: messageText, image: userImage }]);
    setInput('');
    setIsTyping(true);

    const botResponse = findBestResponse(userMessage);
    
    // Dynamic typing delay based on response length
    const typingDuration = Math.min(800 + botResponse.length * 15, 2500);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      if (!isOpen) setUnreadCount(prev => prev + 1);
    }, typingDuration);
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem('chat_history');
  };

  const FormattedMessage = ({ text }) => {
    const parts = text.split(/(\*\*.*?\*\*|#\S+)/g);
    return (
      <div className="space-y-1">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('#')) {
            const id = part.slice(1);
            return (
              <button
                key={i}
                onClick={() => {
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    if (window.innerWidth < 768) setIsOpen(false);
                  }
                }}
                className="text-primary hover:underline font-bold inline-flex items-center gap-1"
              >
                {part}
              </button>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-60 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isExpanded 
                ? (window.innerWidth < 1024 ? 'calc(100vw - 48px)' : '600px') 
                : (window.innerWidth < 640 ? 'calc(100vw - 48px)' : '400px'),
              height: isExpanded 
                ? (window.innerHeight < 800 ? 'calc(100vh - 120px)' : '700px') 
                : (window.innerHeight < 600 ? 'calc(100vh - 120px)' : '550px')
            }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass backdrop-blur-md mb-4 rounded-[32px] overflow-hidden flex flex-col shadow-2xl border-white/10"
          >
            {/* Header */}
            <div className="p-5 bg-linear-to-r from-primary to-secondary flex justify-between items-center text-white relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />
               <div className="flex items-center space-x-3 z-10">
                <div className="relative">
                  <motion.div 
                    animate={isTyping ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30"
                  >
                    <Bot size={22} />
                  </motion.div>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-primary" 
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold leading-none">Liam Assistant</h4>
                  <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold flex items-center gap-1 mt-1">
                    <Sparkles size={8} className="text-yellow-300" /> Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 z-10">
                <button 
                  onClick={clearChat}
                  title="Clear Chat"
                  className="hover:bg-white/10 p-2 rounded-xl transition-colors text-white/80 hover:text-white"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Minimize" : "Maximize"}
                  className="hover:bg-white/10 p-2 rounded-xl transition-colors text-white/80 hover:text-white hidden sm:block"
                >
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="hover:bg-white/10 p-2 rounded-xl transition-colors text-white/80 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-4 scroll-smooth bg-black/20"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, idx) => (
                  <motion.div 
                    key={idx}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed space-y-2 ${
                      m.role === 'user' 
                        ? 'bg-linear-to-br from-primary to-secondary text-white rounded-tr-none shadow-lg shadow-primary/20 font-medium' 
                        : 'glass backdrop-blur-md text-text rounded-tl-none border-white/5'
                    }`}>
                      {m.text && <FormattedMessage text={m.text} />}
                      {m.image && (
                        <motion.img 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          src={m.image} 
                          alt="Bot response" 
                          className="w-full h-auto rounded-xl shadow-lg border border-white/10"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="glass backdrop-blur-md p-4 rounded-2xl rounded-tl-none border-white/5">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-1.5 h-1.5 bg-primary/50 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestions & Input */}
            <div className="p-4 bg-white/2 border-t border-white/10 space-y-4">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(null, s.label)}
                    className="text-[10px] uppercase tracking-wider font-bold px-3 py-2 rounded-xl glass backdrop-blur-md hover:bg-primary/20 hover:text-primary transition-all border-white/5"
                  >
                    {s.label}
                  </motion.button>
                ))}
              </div>

              <form 
                onSubmit={handleSend} 
                className="relative group search-container"
              >
                <textarea
                  ref={inputRef}
                  rows="1"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder="Ask me something..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-12 outline-none text-sm text-text focus:border-primary/50 focus:bg-white/8 transition-all placeholder:text-text-muted/50 resize-none min-h-[56px] max-h-32 flex items-center"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="absolute right-3 bottom-3 text-primary hover:text-white hover:bg-primary p-2 rounded-xl transition-all disabled:opacity-0"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.6 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <AnimatePresence>
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background z-20"
            >
              {unreadCount}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageSquare size={32} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
