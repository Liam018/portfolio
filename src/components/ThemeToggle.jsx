import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2.5 rounded-xl glass hover:scale-110 transition-all text-text-muted hover:text-primary relative group flex items-center justify-center w-10 h-10 overflow-hidden"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: 20, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative z-10"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

export default ThemeToggle;
