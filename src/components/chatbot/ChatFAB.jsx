import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

// ─── ChatFAB ──────────────────────────────────────────────────────────────────
export const ChatFAB = ({ isOpen, setIsOpen, unreadCount }) => (
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
    aria-label={isOpen ? 'Close chat' : 'Open chat'}
    aria-expanded={isOpen}
    className="w-14 h-14 sm:w-16 sm:h-16 glass rounded-full flex items-center justify-center text-primary shadow-2xl relative group outline-none"
  >
    {/* Inner Tint */}
    <div className="absolute inset-0 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />

    {/* Unread badge */}
    <AnimatePresence>
      {unreadCount > 0 && !isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 10 }}
          className="absolute top-0 right-0 min-w-5.5 h-5.5 px-1.5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-background z-20 shadow-lg"
        >
          {unreadCount}
        </motion.div>
      )}
    </AnimatePresence>

    {/* Icon Container with hover lift */}
    <div className="relative z-10 flex items-center justify-center text-primary group-hover:text-primary transition-colors duration-300">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* Ambient Glow */}
    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
  </motion.button>
);
