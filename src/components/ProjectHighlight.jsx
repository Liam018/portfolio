import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, School, Laptop, X, ShieldAlert } from 'lucide-react';
import { highlights } from '../constants/projects';

// Mockup Frames
const BrowserFrame = ({ children }) => (
  <div className="w-full h-full bg-[#18181b] rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
    <div className="h-6 sm:h-7 bg-[#27272a] border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
      </div>
      <div className="flex-1 max-w-[200px] sm:max-w-[320px] h-4 bg-black/40 rounded-md mx-auto" />
    </div>
    <div className="flex-1 overflow-hidden relative">{children}</div>
  </div>
);

const PhoneFrame = ({ children }) => (
  <div className="relative w-full h-full bg-black rounded-[24px] sm:rounded-[32px] p-1.5 border-2 border-[#27272a] shadow-2xl">
    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-3.5 bg-black rounded-b-xl z-20 flex items-center justify-center">
      <div className="w-5 h-1 bg-[#18181b] rounded-full" />
    </div>
    <div className="w-full h-full rounded-[18px] sm:rounded-[26px] overflow-hidden relative z-10 bg-[#18181b]">{children}</div>
  </div>
);

const smoothTransition = { type: "spring", stiffness: 120, damping: 22, mass: 0.6 };

const ProjectHighlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImgIdx, setSelectedImgIdx] = useState(null);
  const [showMobileArrows, setShowMobileArrows] = useState(false);
  const [direction, setDirection] = useState(0);
  const hideTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const currentProjectImages = [
    ...(highlights[currentIndex]?.images || []),
    ...(highlights[currentIndex]?.mobileImages || []),
  ];
  const currentMobileImg = highlights[currentIndex]?.mobileImages?.[0] || null;

  const triggerActivity = useCallback(() => {
    setShowMobileArrows(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowMobileArrows(false), 3000);
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [next, prev]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 180 : -180, opacity: 0, scale: 0.96 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ zIndex: 0, x: dir < 0 ? 180 : -180, opacity: 0, scale: 0.96 }),
  };

  return (
    <section ref={containerRef} id="project-highlight" className="py-12 sm:py-20 lg:py-24 relative overflow-hidden bg-background text-text border-t border-border/40 select-none" onTouchStart={triggerActivity}>
      <motion.div style={{ opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div className="space-y-2.5 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">// Featured Projects</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">Featured Projects.</h2>
            <p className="text-xs sm:text-base text-text-muted leading-relaxed font-normal">A detailed look at my web, mobile, and software engineering projects.</p>
          </div>

          {/* Project Index Counter */}
          <div className="flex items-center gap-2 font-mono text-sm font-bold bg-card/60 border border-border/70 px-3.5 py-1.5 rounded-full shrink-0 w-fit">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.span key={currentIndex} custom={direction} initial={{ y: direction > 0 ? 10 : -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: direction > 0 ? -10 : 10, opacity: 0 }} transition={{ duration: 0.2 }} className="text-primary font-bold">
                0{currentIndex + 1}
              </motion.span>
            </AnimatePresence>
            <span className="text-text-muted/40">/</span>
            <span className="text-text-muted">0{highlights.length}</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <button onClick={prev} className={`absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-background/80 border border-border/70 text-text hover:text-primary hover:border-primary/50 transition-all backdrop-blur-md shadow-lg ${showMobileArrows ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`} aria-label="Previous Project">
            <ChevronLeft size={20} />
          </button>
          
          <button onClick={next} className={`absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-background/80 border border-border/70 text-text hover:text-primary hover:border-primary/50 transition-all backdrop-blur-md shadow-lg ${showMobileArrows ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`} aria-label="Next Project">
            <ChevronRight size={20} />
          </button>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div key={currentIndex} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ x: { type: "spring", stiffness: 280, damping: 28 }, opacity: { duration: 0.25 } }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragStart={triggerActivity} onDragEnd={(_, info) => { if (info.offset.x > 70) prev(); else if (info.offset.x < -70) next(); }} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-grab active:cursor-grabbing">
              
              {/* Visual Side: Overlapping Mockups (Cols 1-6) */}
              <div className="lg:col-span-6 relative w-full flex items-center justify-center p-2">
                <div className="relative w-full max-w-[520px] aspect-video">
                  <BrowserFrame>
                    {highlights[currentIndex].images?.[0] ? (
                      <button onClick={() => setSelectedImgIdx(0)} className="w-full h-full cursor-zoom-in group/browser block">
                        <img src={highlights[currentIndex].images[0]} alt={`${highlights[currentIndex].title} Web view`} className="w-full h-full object-cover group-hover/browser:scale-102 transition-transform duration-500" />
                      </button>
                    ) : highlights[currentIndex].mobileImages ? (
                      <div className="w-full h-full bg-linear-to-br from-[#18181b] to-[#27272a] flex flex-col items-center justify-center p-6 text-center">
                        <ShieldAlert className="w-14 h-14 text-red-500/80" />
                        <span className="mt-3 text-[10px] font-mono tracking-widest text-red-500/70 uppercase">Emergency SOS & Community Support</span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-[#18181b] flex items-center justify-center">
                        {highlights[currentIndex].emoji === '🏫' ? <School className="w-16 h-16 text-primary/60" /> : <Laptop className="w-16 h-16 text-primary/60" />}
                      </div>
                    )}
                  </BrowserFrame>

                  {(currentMobileImg || highlights[currentIndex].images?.[1]) && (
                    <div className="absolute -bottom-5 -right-2 sm:-bottom-7 sm:-right-4 z-20 w-[35%] max-w-[170px] aspect-[9/18.5]">
                      <PhoneFrame>
                        <button onClick={() => setSelectedImgIdx(currentMobileImg ? (highlights[currentIndex].images?.length || 0) : 1)} className="w-full h-full cursor-zoom-in relative group/phone block">
                          <img src={currentMobileImg || highlights[currentIndex].images[1]} alt={`${highlights[currentIndex].title} Mobile screen`} className="w-full h-full object-cover object-top group-hover/phone:scale-105 transition-transform duration-500" />
                        </button>
                      </PhoneFrame>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Side (Cols 7-12) */}
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary font-mono font-bold text-xs uppercase tracking-wider">
                    {highlights[currentIndex].category}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-text leading-tight">{highlights[currentIndex].title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {highlights[currentIndex].tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-background/80 border border-border/70 text-xs font-mono text-text-muted hover:text-text hover:border-primary/40 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal border-l-2 border-primary/30 pl-4">
                  "{highlights[currentIndex].desc}"
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-10 space-x-2.5">
          {highlights.map((_, idx) => (
            <button key={idx} onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); triggerActivity(); }} className="py-2 cursor-pointer" aria-label={`Go to project ${idx + 1}`}>
              <div className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-10 bg-primary' : 'w-2.5 bg-border hover:bg-text-muted/40'}`} />
            </button>
          ))}
        </div>

      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImgIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImgIdx(null)} className="fixed inset-0 z-9999 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out">
            <div className="relative max-w-5xl w-full h-full flex items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
              {currentProjectImages.length > 1 && (
                <button onClick={() => setSelectedImgIdx((prev) => (prev - 1 + currentProjectImages.length) % currentProjectImages.length)} className="absolute left-4 p-3 bg-black/60 hover:bg-primary text-white rounded-full transition-all border border-white/20" aria-label="Previous image">
                  <ChevronLeft size={22} />
                </button>
              )}
              <img src={currentProjectImages[selectedImgIdx]} alt="Project screenshot" className="max-w-[85%] max-h-[85%] object-contain rounded-xl shadow-2xl" />
              {currentProjectImages.length > 1 && (
                <button onClick={() => setSelectedImgIdx((prev) => (prev + 1) % currentProjectImages.length)} className="absolute right-4 p-3 bg-black/60 hover:bg-primary text-white rounded-full transition-all border border-white/20" aria-label="Next image">
                  <ChevronRight size={22} />
                </button>
              )}
              <button onClick={() => setSelectedImgIdx(null)} className="absolute top-4 right-4 p-2.5 bg-black/60 hover:bg-primary text-white rounded-full transition-all border border-white/20" aria-label="Close lightbox">
                <X size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectHighlight;
