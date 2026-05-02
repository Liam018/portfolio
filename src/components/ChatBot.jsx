import { useEffect, useRef } from 'react';
import { MessageSquare, Send, Bot, X, Trash2, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatBot } from '../hooks/useChatBot';
import { SUGGESTIONS } from '../constants/chatbotData';


const FormattedMessage = ({ text, setIsOpen }) => {
  const parts = text.split(/(\*\*.*?\*\*|#\S+)/g);
  
  const handleHashClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth < 768) setIsOpen(false);
    }
  };

  return (
    <div className="space-y-1">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('#')) {
          const id = part.slice(1).replace(/[.,!?;:]+$/, "");
          return (
            <button
              key={i}
              onClick={() => handleHashClick(id)}
              aria-label={`Jump to ${id} section`}
              className="text-primary hover:underline font-bold inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
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

const ChatBot = () => {
  const {
    isOpen,
    setIsOpen,
    isExpanded,
    setIsExpanded,
    isTyping,
    messages,
    input,
    setInput,
    unreadCount,
    handleSend,
    clearChat
  } = useChatBot();

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus input when opened (Desktop Only)
  useEffect(() => {
    if (isOpen && inputRef.current && window.innerWidth >= 1024) {
      const timer = setTimeout(() => inputRef.current.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock scroll on mobile when chat is open
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isOpen && isMobile) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Scroll to bottom when messages or typing status changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isExpanded]);

  return (
    <div className="fixed bottom-6 right-6 z-60 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <div className="relative mb-6">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0, y: 100, x: 100, filter: 'blur(10px)' }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                x: 0,
                filter: 'blur(0px)',
                width: isExpanded 
                  ? (window.innerWidth < 1024 ? 'calc(100vw - 48px)' : '600px') 
                  : (window.innerWidth < 640 ? 'calc(100vw - 48px)' : '410px'),
                height: isExpanded 
                  ? (window.innerHeight < 800 ? 'calc(100vh - 120px)' : '700px') 
                  : (window.innerHeight < 600 ? 'calc(100vh - 120px)' : '580px')
              }}
              exit={{ opacity: 0, scale: 0, y: 100, x: 100, filter: 'blur(10px)' }}
              transition={{ 
                type: "spring", 
                stiffness: 350, 
                damping: 30, 
                mass: 1
              }}
              style={{ 
                transformOrigin: 'bottom right',
                willChange: 'width, height, transform, opacity, filter'
              }}
              className="glass backdrop-blur-md rounded-[32px] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-text/10 dark:border-white/10 relative z-10"
            >
              {/* Header */}
              <div className="p-5 bg-linear-to-r from-primary to-secondary flex justify-between items-center text-white relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none" />
                 <div className="flex items-center space-x-3 z-10">
                  <div className="relative">
                    <motion.div 
                      animate={isTyping ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30"
                    >
                      <Bot size={22} />
                    </motion.div>
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary" 
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold leading-none">Liam Assistant</h4>
                    <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold flex items-center gap-1 mt-1">
                      <Sparkles size={8} className="text-accent" /> Online
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 z-10">
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearChat}
                    aria-label="Clear chat history"
                    title="Clear Chat"
                    className="hover:bg-white/10 p-2 rounded-xl transition-colors text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                  <motion.button 
                     whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                     whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={isExpanded ? "Minimize chat window" : "Maximize chat window"}
                    title={isExpanded ? "Minimize" : "Maximize"}
                    className="hover:bg-white/10 p-2 rounded-xl transition-colors text-white/80 hover:text-white hidden sm:block focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </motion.button>
                  <motion.button 
                     whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)', rotate: 90 }}
                     whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)} 
                    aria-label="Close chat window"
                    className="hover:bg-white/10 p-2 rounded-xl transition-colors text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <X size={18} />
                  </motion.button>
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
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20,
                        delay: 0.05 
                      }
                    }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed space-y-2 shadow-lg transition-colors group ${
                      m.role === 'user' 
                        ? 'bg-linear-to-br from-primary to-secondary text-white rounded-tr-none shadow-primary/20 font-medium' 
                        : 'glass backdrop-blur-md text-text rounded-tl-none border border-text/5 dark:border-white/5'
                    }`}>
                      {m.text && <FormattedMessage text={m.text} setIsOpen={setIsOpen} />}
                      {m.image && (
                        <motion.img 
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          src={m.image} 
                          alt="Bot response" 
                          className="w-full h-auto rounded-xl shadow-lg border border-text/10 dark:border-white/10"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="flex justify-start"
                  >
                    <div className="glass backdrop-blur-md p-4 rounded-2xl rounded-tl-none border border-text/5 dark:border-white/5">
                      <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ 
                              y: [0, -6, 0],
                              scale: [1, 1.2, 1],
                              opacity: [0.4, 1, 0.4]
                            }}
                            transition={{ 
                              duration: 0.8, 
                              repeat: Infinity, 
                              delay: i * 0.15,
                              ease: "easeInOut"
                            }}
                            className="w-1.5 h-1.5 bg-primary rounded-full"
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
                <AnimatePresence>
                  {SUGGESTIONS.map((s, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        delay: idx * 0.05 
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(null, s.label)}
                      aria-label={`Ask about ${s.label}`}
                      className="text-[10px] uppercase tracking-wider font-bold px-3 py-2 rounded-xl glass backdrop-blur-md hover:bg-primary/20 hover:text-primary transition-all border border-text/5 dark:border-white/5 focus-visible:ring-2 focus-visible:ring-primary/50 outline-none"
                    >
                      {s.label}
                    </motion.button>
                  ))}
                </AnimatePresence>
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
                  aria-label="Message Liam Assistant"
                  placeholder="Ask me something..."
                  className="w-full bg-text/5 dark:bg-white/5 border border-text/10 dark:border-white/10 rounded-2xl px-5 py-4 pr-12 outline-none text-sm text-text focus-visible:ring-2 focus-visible:ring-primary/50 focus:border-primary/50 focus:bg-text/8 dark:focus:bg-white/8 transition-all placeholder:text-text-muted/50 resize-none min-h-[56px] max-h-32 flex items-center"
                />
                <motion.button 
                  type="submit" 
                  disabled={!input.trim()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Send message"
                  className="absolute right-3 bottom-3 text-primary hover:text-white hover:bg-primary p-2 rounded-xl transition-all disabled:opacity-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
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
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 glass rounded-full flex items-center justify-center text-primary shadow-2xl relative group outline-none"
      >
        {/* Inner Tint */}
        <div className="absolute inset-0 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
        
        <AnimatePresence>
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              className="absolute top-0 right-0 min-w-[22px] h-[22px] px-1.5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-background z-20 shadow-lg"
            >
              {unreadCount}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div 
              key="close" 
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }} 
              animate={{ rotate: 0, scale: 1, opacity: 1 }} 
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div 
              key="open" 
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }} 
              animate={{ rotate: 0, scale: 1, opacity: 1 }} 
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </motion.button>

    </div>
  );
};

export default ChatBot;
