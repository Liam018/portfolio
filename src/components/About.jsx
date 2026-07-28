import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import AboutTerminal from './AboutTerminal';
import profile from '../assets/profile1.png';
import profileHover from '../assets/profile4.png';

// Shared smooth transition
const smoothTransition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.6,
};

const Highlight = ({ children }) => (
  <span className="text-primary font-bold">{children}</span>
);

const About = () => {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('static'); // 'static' | 'terminal' | 'fullscreen'
  const [isHovered, setIsHovered] = useState(false);

  // Handle scroll lock and auto-close on navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (viewMode === 'fullscreen') setViewMode('terminal');
    };

    if (viewMode === 'fullscreen') {
      document.body.style.overflow = 'hidden';
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
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className={`${viewMode === 'fullscreen' ? 'fixed inset-0 z-9999 bg-background flex items-center justify-center py-0 overflow-y-auto' : 'py-8 sm:py-14 lg:py-16 relative overflow-hidden bg-background text-text select-none'}`}
    >
      <motion.div 
        style={viewMode === 'fullscreen' ? {} : { opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${viewMode === 'fullscreen' ? 'h-full flex flex-col justify-center' : ''}`}
      >
        {viewMode !== 'fullscreen' && (
          /* Editorial Section Header */
          <div className="space-y-2.5 mb-6 sm:mb-8 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                // Tracing My Path
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
              About Me.
            </h2>
            <p className="text-xs sm:text-base text-text-muted leading-relaxed font-normal">
              A passionate IT graduate and full-stack developer committed to crafting performant web and mobile applications.
            </p>
          </div>
        )}

        <div className={`grid ${viewMode === 'fullscreen' ? 'grid-cols-1 max-w-6xl mx-auto' : 'grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto'} gap-6 lg:gap-12 items-center justify-items-center justify-center w-full`}>
          
          {/* Left Side: Visual Profile Avatar (Cols 1-5) */}
          {viewMode !== 'fullscreen' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={smoothTransition}
              viewport={{ once: true, margin: "-10%" }}
              className="lg:col-span-5 flex flex-col items-center justify-center w-full relative"
            >
              <div className="w-full max-w-[260px] sm:max-w-[300px] overflow-hidden rounded-2xl mx-auto flex items-center justify-center">
                <motion.img 
                  src={isHovered ? profileHover : profile} 
                  alt="Liam Kurt Edaño Profile"
                  className="w-full h-auto object-cover rounded-2xl transition-all duration-500 cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  animate={{ 
                    y: [0, -6, 0],
                    scale: isHovered ? 1.04 : 1,
                  }}
                  transition={{
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.3, ease: "easeOut" }
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Right Side: Interactive Content (Cols 6-12) */}
          <motion.div
            initial={viewMode === 'fullscreen' ? {} : { opacity: 0, y: 30 }}
            whileInView={viewMode === 'fullscreen' ? {} : { opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            viewport={{ once: true, margin: "-10%" }}
            className={`w-full relative ${viewMode === 'fullscreen' ? 'h-full flex flex-col' : 'lg:col-span-7 flex flex-col justify-center'}`}
          >
            <AnimatePresence mode="wait">
              {viewMode === 'static' ? (
                <motion.div
                  key="static"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5 bg-card/40 border border-border/60 p-6 sm:p-8 rounded-2xl"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">// Profile Overview</span>
                    <button 
                      onClick={() => setViewMode('terminal')}
                      className="text-xs font-mono font-bold px-3.5 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Terminal size={14} /> <span>Open Terminal</span>
                    </button>
                  </div>
                  
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    I am <Highlight>Liam Kurt Kasten Edaño</Highlight>, a graduate of <Highlight>Bachelor of Science in Information Technology</Highlight> from <Highlight>Saint Louis College</Highlight>, with a strong foundation in full-stack web and mobile software engineering.
                  </p>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    I specialize in <Highlight>React.js</Highlight>, <Highlight>React Native</Highlight>, <Highlight>Django</Highlight>, and <Highlight>Laravel</Highlight>, engineering responsive, high-performance applications that prioritize user experience and code craftsmanship.
                  </p>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    I am committed to continuous learning and dedicated to crafting impactful digital solutions.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col w-full h-full"
                >
                  <AboutTerminal viewMode={viewMode} setViewMode={setViewMode} />
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
