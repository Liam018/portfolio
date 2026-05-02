import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ScrollToTopFAB = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isResumePage = location.pathname === '/resume';

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG ring properties
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          layout // Add layout prop for smooth position transitions
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={`fixed bottom-7 ${isResumePage ? 'right-8' : 'right-[104px]'} z-100 w-14 h-14 rounded-full glass shadow-2xl flex items-center justify-center group outline-none transition-[right] duration-500 ease-in-out`}
          aria-label="Scroll to top"
        >

          {/* Inner Tint */}
          <div className="absolute inset-0 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />

          {/* Flat Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <motion.circle
              cx="28"
              cy="28"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: offset }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
              className="text-primary opacity-40 group-hover:opacity-100 transition-opacity duration-300"
              strokeLinecap="round"
            />
          </svg>

          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center text-primary group-hover:text-primary transition-colors duration-300">
            <ArrowUp size={24} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>

          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopFAB;



