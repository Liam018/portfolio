import { motion } from 'framer-motion';
import { Bot, Sparkles, Trash2, Minimize2, Maximize2, X } from 'lucide-react';

// ─── ChatHeader ───────────────────────────────────────────────────────────────
export const ChatHeader = ({ isTyping, clearChat, isExpanded, setIsExpanded, setIsOpen }) => (
  <div className="p-4 sm:p-5 bg-card/90 dark:bg-white/4 border-b border-border/40 dark:border-white/10 text-text flex justify-between items-center relative overflow-hidden backdrop-blur-md">
    {/* Left: Bot Info */}
    <div className="flex items-center space-x-3.5 z-10">
      <div className="relative">
        <motion.div
          animate={isTyping ? { scale: [1, 1.12, 1], rotate: [0, 6, -6, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-md shadow-xs"
        >
          <Bot size={22} className="text-primary" />
        </motion.div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-display font-bold text-base leading-none text-text tracking-tight">
            Liam Assistant
          </h4>
        </div>
        <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold flex items-center gap-1.5 mt-1 font-display">
          {isTyping ? 'Typing...' : ''}
        </span>
      </div>
    </div>

    {/* Right: Actions */}
    <div className="flex items-center gap-1 z-10">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={clearChat}
        aria-label="Clear chat history"
        title="Clear Chat"
        className="p-2 rounded-xl transition-all duration-200 text-text-muted hover:text-text hover:bg-text/5 dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <Trash2 size={17} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Minimize chat window" : "Maximize chat window"}
        title={isExpanded ? "Minimize" : "Maximize"}
        className="p-2 rounded-xl transition-all duration-200 text-text-muted hover:text-text hover:bg-text/5 dark:hover:bg-white/10 hidden sm:block focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {isExpanded ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(false)}
        aria-label="Close chat window"
        className="p-2 rounded-xl transition-all duration-200 text-text-muted hover:text-text hover:bg-text/5 dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <X size={17} />
      </motion.button>
    </div>
  </div>
);
