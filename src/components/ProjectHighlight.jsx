import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink, Zap } from 'lucide-react';
import agrilakoMobile from '../assets/agrilakoMobile.jpg';
import agrilakoWeb from '../assets/agrilakoWeb.png';

const ProjectHighlight = () => {
  const highlights = [
    {
      title: "AgriLako E-commerce",
      category: "Capstone Project • Web & Mobile App",
      images: [agrilakoWeb, agrilakoMobile],
      desc: "My Capstone project and 3rd place Hackathon entry: a robust agriculture marketplace built with React Native and Supabase. Features real-time notifications, secure user roles, and an administrative dashboard.",
      tech: ["React Native", "React", "Vite", "Tailwind", "Expo", "Supabase", "Auth"],
      links: { github: "https://github.com/Liam018", live: "#" },
      color: "from-primary/20 to-secondary/20"
    },
    {
      title: "Interactive Campus Kiosk",
      category: "3rd Year Final Project • Web App",
      desc: "A comprehensive solution for student campus life, developed as my 3rd-year final project. Offers navigation via maps, announcements, and a QR-based feedback system.",
      tech: ["React", "Django REST", "MariaDB", "Vite", "Tailwind"],
      links: { github: "https://github.com/Liam018", demo: "#" },
      color: "from-secondary/20 to-accent/20"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);

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

  const next = () => setCurrentIndex((prev) => (prev + 1) % highlights.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);

  return (
    <section ref={containerRef} id="project-highlight" className="py-20 overflow-hidden">
      <motion.div 
        style={{ opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Deep Dive</h2>
          <p className="text-text-muted mt-2">A closer look at my projects.</p>
        </div>

        <div className="relative group">
          {/* Side Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-30 p-4 glass rounded-full opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 bg-primary/10! hover:bg-primary! hover:text-white transition-all duration-500 hidden md:flex items-center justify-center border border-primary/20 backdrop-blur-xl"
            aria-label="Previous Project"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={next}
            className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-30 p-4 glass rounded-full opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 bg-primary/10! hover:bg-primary! hover:text-white transition-all duration-500 hidden md:flex items-center justify-center border border-primary/20 backdrop-blur-xl"
            aria-label="Next Project"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ 
                  type: "spring",
                  stiffness: 250,
                  damping: 25,
                  mass: 0.5,
                }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Visual Side */}
                <div className={`aspect-video rounded-3xl bg-linear-to-br ${highlights[currentIndex].color} glass flex items-center justify-center relative overflow-hidden group`}>
                  {highlights[currentIndex].images ? (
                    <div className="absolute inset-0 flex p-4 gap-4">
                      <button 
                        onClick={() => setSelectedImg(highlights[currentIndex].images[0])}
                        className="flex-1 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in"
                      >
                        <img src={highlights[currentIndex].images[0]} alt="Web view" className="w-full h-full object-cover" />
                      </button>
                      <button 
                        onClick={() => setSelectedImg(highlights[currentIndex].images[1])}
                        className="w-1/3 rounded-2xl overflow-hidden shadow-2xl transform group-hover:translate-y-[-10px] transition-transform duration-500 cursor-zoom-in"
                      >
                        <img src={highlights[currentIndex].images[1]} alt="Mobile view" className="w-full h-full object-cover" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-[120px] filter drop-shadow-2xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                      {currentIndex === 0 ? "🛍️" : "🏛️"}
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Content Side */}
                <div className="space-y-6">
                  <div>
                    <span className="text-primary font-bold text-sm tracking-widest uppercase">{highlights[currentIndex].category}</span>
                    <h3 className="text-4xl md:text-5xl font-display font-bold mt-2">{highlights[currentIndex].title}</h3>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {highlights[currentIndex].tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-primary/20">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-lg text-text-muted leading-relaxed italic">
                     "{highlights[currentIndex].desc}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {highlights.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-text-muted/30'}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img 
                src={selectedImg} 
                alt="Full screen view" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-3 glass rounded-full text-white hover:bg-primary transition-all"
              >
                <Zap className="rotate-45" size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectHighlight;
