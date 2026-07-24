import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink, School, Laptop, X, ShieldAlert } from 'lucide-react';
import { highlights } from '../constants/projects';

// --- Mockup Components ---
const BrowserFrame = ({ children, className = "" }) => (
  <div className={`w-full h-full bg-[#1a1a1e] rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl ${className}`}>
    <div className="h-6 sm:h-7 md:h-8 bg-[#252529] border-b border-white/5 flex items-center px-2.5 sm:px-3 md:px-4 gap-1.5 sm:gap-2 shrink-0">
      <div className="flex gap-1 sm:gap-1.5">
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[var(--terminal-red)]" />
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[var(--terminal-yellow)]" />
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[var(--terminal-green)]" />
      </div>
      <div className="flex-1 max-w-[180px] sm:max-w-[300px] md:max-w-[400px] h-3.5 sm:h-4 md:h-5 bg-black/30 rounded-md mx-auto" />
    </div>
    <div className="flex-1 overflow-hidden relative">
      {children}
    </div>
  </div>
);

const PhoneFrame = ({ children, className = "" }) => (
  <div className={`relative w-full h-full bg-black rounded-[20px] sm:rounded-[28px] md:rounded-[36px] p-1 sm:p-1.5 md:p-2 border-2 border-[#1e1e22] shadow-2xl ${className}`}>
    {/* Dynamic Island / Notch */}
    <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-10 sm:w-14 md:w-16 h-2.5 sm:h-3.5 md:h-4 bg-black rounded-b-xl sm:rounded-b-2xl z-20 flex items-center justify-center">
       <div className="w-4 sm:w-6 h-0.5 sm:h-1 bg-[#141416] rounded-full" />
    </div>
    <div className="w-full h-full rounded-[15px] sm:rounded-[22px] md:rounded-[28px] overflow-hidden relative z-10 bg-[#16161a]">
      {children}
    </div>
    {/* Side button */}
    <div className="absolute -right-[3px] top-12 sm:top-16 w-[3px] h-8 sm:h-12 bg-[#1e1e22] rounded-r-sm" />
  </div>
);


const ProjectHighlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImgIdx, setSelectedImgIdx] = useState(null);

  const currentProjectImages = [
    ...(highlights[currentIndex]?.images || []),
    ...(highlights[currentIndex]?.mobileImages || []),
  ];
  const [showMobileArrows, setShowMobileArrows] = useState(false);
  const [direction, setDirection] = useState(0);
  const hideTimeoutRef = useRef(null);

  // Static primary mobile image (no auto-play)
  const currentMobileImg = highlights[currentIndex]?.mobileImages?.[0] || null;

  const triggerActivity = useCallback(() => {
    setShowMobileArrows(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowMobileArrows(false), 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % highlights.length);
    triggerActivity();
  }, [triggerActivity]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
    triggerActivity();
  }, [triggerActivity]);

  const goToProject = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    triggerActivity();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };

  // Spring-smoothed enter/exit transitions
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  // Slide variants for project switching
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section 
      ref={containerRef} 
      id="project-highlight" 
      className="py-24 overflow-hidden relative"
      onTouchStart={triggerActivity}
    >
      <motion.div 
        style={{ opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 md:mb-4 flex flex-col items-center text-center gap-2"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">Featured <span className="text-primary">Projects</span></h2>
            
            <div className="flex items-center gap-2 select-none">
              <div className="flex items-center h-8 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.span
                    key={currentIndex}
                    custom={direction}
                    initial={{ y: direction > 0 ? 15 : -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: direction > 0 ? -15 : 15, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-2xl font-display font-bold text-primary"
                  >
                    0{currentIndex + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-text-muted/20 text-xl font-light">/</span>
              <span className="text-text-muted font-display text-sm mt-1">0{highlights.length}</span>
            </div>
          </div>
          <p className="text-text-muted text-base md:text-lg">A detailed look at my projects.</p>
        </motion.div>

        <div className="relative group">
          {/* Side Navigation Arrows */}
          <button 
            onClick={prev}
            className={`absolute left-0 md:-left-4 lg:-left-12 top-[35%] sm:top-[40%] md:top-1/2 -translate-y-1/2 z-40 p-2 md:p-4 glass rounded-full transition-all duration-500 flex items-center justify-center border border-primary/20 backdrop-blur-xl bg-primary/10! hover:bg-primary! hover:text-white ${showMobileArrows ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} md:opacity-0 md:group-hover:opacity-100 md:-translate-x-4 md:group-hover:translate-x-0`}
            aria-label="Previous Project"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={next}
            className={`absolute right-0 md:-right-4 lg:-right-12 top-[35%] sm:top-[40%] md:top-1/2 -translate-y-1/2 z-40 p-2 md:p-4 glass rounded-full transition-all duration-500 flex items-center justify-center border border-primary/20 backdrop-blur-xl bg-primary/10! hover:bg-primary! hover:text-white ${showMobileArrows ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} md:opacity-0 md:group-hover:opacity-100 md:translate-x-4 md:group-hover:translate-x-0`}
            aria-label="Next Project"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>

          <div className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-28 md:pt-32 md:pb-32 -mt-8 -mb-8 sm:-mt-12 sm:-mb-12 md:-mt-20 md:-mb-20">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={triggerActivity}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 80) prev();
                  else if (info.offset.x < -80) next();
                }}
                className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center cursor-grab active:cursor-grabbing"
              >
                {/* Visual Side: Overlapping Mockups */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full flex items-center justify-center pt-4 pb-12 sm:pb-16 md:pb-16 px-2 sm:px-4"
                >
                  <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full scale-75 pointer-events-none" />

                  {/* Unified Mockup Group Wrapper */}
                  <div className="relative w-full max-w-[560px] aspect-video">
                    {/* Browser Mockup */}
                    <BrowserFrame>
                      {highlights[currentIndex].images?.[0] ? (
                        <button
                          onClick={() => setSelectedImgIdx(0)}
                          className="w-full h-full cursor-zoom-in group/browser block"
                        >
                          <img 
                            src={highlights[currentIndex].images[0]} 
                            alt={`${highlights[currentIndex].title} Web view`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/browser:scale-102" 
                          />
                        </button>
                      ) : highlights[currentIndex].mobileImages ? (
                        /* Case where project has mobile images but no web screenshots (e.g. SHERCLE) */
                        <div className="w-full h-full bg-linear-to-br from-[#1b1b1f] to-[#26262b] flex flex-col items-center justify-center select-none relative overflow-hidden p-6 text-center">
                          <div className="absolute inset-0 bg-red-500/10 blur-[80px] rounded-full scale-75" />
                          <ShieldAlert className="w-16 h-16 md:w-20 md:h-20 text-red-500/80 hover:scale-110 transition-transform duration-300 cursor-default" />
                          <span className="mt-4 text-[10px] md:text-xs font-mono tracking-widest text-red-500/60 uppercase">Emergency SOS &amp; Community Support</span>
                        </div>
                      ) : (
                        /* Placeholder when no images exist */
                        <div className="w-full h-full bg-linear-to-br from-[#1e1e22] to-[#2a2a30] flex items-center justify-center">
                          {highlights[currentIndex].emoji === '🏫' ? (
                            <School className="w-20 h-20 text-primary/70" />
                          ) : (
                            <Laptop className="w-20 h-20 text-primary/70" />
                          )}
                        </div>
                      )}
                    </BrowserFrame>

                    {/* Overlapping Phone Mockup - Anchored to Browser Mockup Wrapper */}
                    {(currentMobileImg || highlights[currentIndex].images?.[1]) && (
                      <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 md:-bottom-10 md:-right-6 z-20 w-[36%] sm:w-[34%] max-w-[190px] aspect-[9/18.5] hover:scale-105 transition-transform duration-500">
                        <PhoneFrame>
                          <button
                            onClick={() => setSelectedImgIdx(currentMobileImg ? (highlights[currentIndex].images?.length || 0) : 1)}
                            className="w-full h-full cursor-zoom-in relative group/phone block"
                          >
                            <img
                              src={currentMobileImg || highlights[currentIndex].images[1]}
                              alt={`${highlights[currentIndex].title} Mobile screen`}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/phone:scale-105"
                            />
                            {/* Photos Count Badge */}
                            {currentProjectImages.length > 1 && (
                              <div className="absolute bottom-3 right-3 glass px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-lg select-none bg-black/70 text-white backdrop-blur-md">
                                <span>+{currentProjectImages.length} Photos</span>
                              </div>
                            )}
                          </button>
                        </PhoneFrame>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left pt-10 sm:pt-14 md:pt-0"
                >
                  <div className="space-y-4 flex flex-col items-center lg:items-start">
                    <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary font-bold text-xs tracking-widest uppercase">
                      {highlights[currentIndex].category}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-display font-bold text-balance leading-tight">
                      {highlights[currentIndex].title}
                    </h3>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {highlights[currentIndex].tech.map(t => (
                      <span key={t} className="px-3 py-1 glass bg-white/5 border border-border rounded-full text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-primary hover:text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-xl text-text-muted leading-relaxed font-light border-l-0 lg:border-l-2 border-primary/20 pl-0 lg:pl-6">
                     "{highlights[currentIndex].desc}"
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-16 space-x-3">
          {highlights.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToProject(idx)}
              className="group relative py-2"
              aria-label={`Go to project ${idx + 1}`}
            >
              <div className={`h-1.5 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-12 bg-primary' : 'w-3 bg-text-muted/30 group-hover:bg-text-muted/50'}`} />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImgIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setSelectedImgIdx(null)}
            className="fixed inset-0 z-1000 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Image Button */}
              {currentProjectImages.length > 1 && (
                <button
                  onClick={() => setSelectedImgIdx(prev => (prev - 1 + currentProjectImages.length) % currentProjectImages.length)}
                  className="absolute left-4 md:left-8 p-3.5 md:p-4 bg-black/60 hover:bg-primary border border-white/15 hover:border-primary/50 text-white rounded-full transition-all duration-300 shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 flex items-center justify-center z-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <img 
                src={currentProjectImages[selectedImgIdx]} 
                alt={`Project screenshot ${selectedImgIdx + 1}`} 
                className="max-w-[85%] max-h-[85%] object-contain rounded-xl shadow-2xl cursor-zoom-out"
                onClick={() => setSelectedImgIdx(null)}
              />

              {/* Next Image Button */}
              {currentProjectImages.length > 1 && (
                <button
                  onClick={() => setSelectedImgIdx(prev => (prev + 1) % currentProjectImages.length)}
                  className="absolute right-4 md:right-8 p-3.5 md:p-4 bg-black/60 hover:bg-primary border border-white/15 hover:border-primary/50 text-white rounded-full transition-all duration-300 shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 flex items-center justify-center z-110"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Close Button */}
              <button 
                onClick={() => setSelectedImgIdx(null)}
                className="absolute top-4 right-4 p-3 bg-black/60 hover:bg-primary border border-white/15 text-white rounded-full transition-all duration-300 shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 flex items-center justify-center z-120 group/close"
                aria-label="Close image viewer"
              >
                <X size={24} className="transition-transform duration-300 group-hover/close:rotate-90" />
              </button>

              {/* Image Counter Badge */}
              {currentProjectImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 border border-white/15 px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-white shadow-xl backdrop-blur-md">
                  {selectedImgIdx + 1} / {currentProjectImages.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectHighlight;
