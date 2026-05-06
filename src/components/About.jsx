import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import profileIllustration from '../assets/profile_illustration.png';
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
  <span className="text-secondary font-bold brightness-110">{children}</span>
);

const About = () => {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('terminal'); // 'static' | 'terminal' | 'fullscreen'
  const [isHovered, setIsHovered] = useState(false);

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
  
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className={`${viewMode === 'fullscreen' ? 'fixed inset-0 z-9999 bg-white dark:bg-[#050505] flex items-center justify-center py-0 overflow-y-auto' : 'py-24 relative overflow-hidden'}`}
    >
      <motion.div 
        style={viewMode === 'fullscreen' ? {} : { opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${viewMode === 'fullscreen' ? 'h-full flex flex-col justify-center' : ''}`}
      >
        {viewMode !== 'fullscreen' && (
          <div className="text-center mb-2 md:mb-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-3"
            >
              <Terminal className="text-secondary hidden sm:block" size={36} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent pb-1">
                Tracing My Path
              </h2>
            </motion.div>
          </div>
        )}
        <div className={`grid ${viewMode === 'fullscreen' ? 'grid-cols-1 max-w-6xl mx-auto' : 'lg:grid-cols-2 max-w-6xl mx-auto'} gap-4 lg:gap-6 items-center w-full`}>
          
          {/* Left Side: Visuals - Hidden in Fullscreen */}
          {viewMode !== 'fullscreen' && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={smoothTransition}
              viewport={{ once: true, margin: "-15%" }}
              className="flex flex-col items-center relative"
            >
              <div className="relative z-10 p-2 overflow-hidden max-w-[280px] sm:max-w-[340px] w-full mx-auto mask-[linear-gradient(to_bottom,black_70%,transparent_100%)]">
                 <motion.img 
                  src={isHovered ? profileHover : profile} 
                  alt="Profile Illustration"
                  className="w-full h-auto object-cover rounded-[38px] transition-all duration-500"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  animate={{ 
                    y: [0, -5, 0],
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                 />
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
                  <div className="flex justify-end mb-6">
                    <button 
                      onClick={() => setViewMode('terminal')}
                      className="text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-xl border border-border glass hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                    >
                      <Terminal size={14} /> Open Terminal
                    </button>
                  </div>
                  
                  <p className="text-lg text-text leading-relaxed">
                    I'm <Highlight>Liam Kurt Kasten Edaño</Highlight>, a passionate IT student at <Highlight>Saint Louis College</Highlight>.
                  </p>
                  <p className="text-lg text-text leading-relaxed">
                    My journey is fueled by the intersection of beautiful design and reliable functionality. I specialize in <Highlight>React Native</Highlight>, <Highlight>Supabase</Highlight>, and <Highlight>Full-stack</Highlight> development.
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
