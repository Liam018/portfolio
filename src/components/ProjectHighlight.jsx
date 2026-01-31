import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink, Zap } from 'lucide-react';
import agrilakoMobile from '../assets/agrilakoMobile.jpg';
import agrilakoWeb from '../assets/agrilakoWeb.png';

const ProjectHighlight = () => {
  const highlights = [
    {
      title: "AgriLako E-commerce",
      category: "Capstone Project • Web & Mobile App",
      images: [agrilakoWeb, agrilakoMobile],
      desc: "My Capstone project: a robust agriculture marketplace built with React Native and Supabase. Features real-time notifications, secure user roles, and an administrative dashboard.",
      challenge: "Solved complex Expo disconnect issues and optimized Supabase real-time subscriptions for low-latency notifications.",
      tech: ["React Native", "React", "Vite", "Tailwind", "Expo", "Supabase", "Auth"],
      links: { github: "https://github.com/Liam018", live: "#" },
      color: "from-primary/20 to-secondary/20"
    },
    {
      title: "Interactive Campus Kiosk",
      category: "3rd Year Final Project • Web App",
      desc: "A comprehensive solution for student campus life, developed as my 3rd-year final project. Offers navigation via maps, announcements, and a QR-based feedback system.",
      challenge: "Integrated Django REST framework with MariaDB while maintaining a high-performance frontend with Vite.",
      tech: ["React", "Django REST", "MariaDB", "Vite", "Tailwind"],
      links: { github: "https://github.com/Liam018", demo: "#" },
      color: "from-secondary/20 to-accent/20"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);

  const next = () => setCurrentIndex((prev) => (prev + 1) % highlights.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);

  return (
    <section id="project-highlight" className="py-20 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Deep Dive</h2>
            <p className="text-text-muted mt-2">A closer look at my flagship projects.</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={prev} className="p-3 glass rounded-full hover:bg-primary hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="p-3 glass rounded-full hover:bg-primary hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Visual Side */}
              <div className={`aspect-video rounded-3xl bg-gradient-to-br ${highlights[currentIndex].color} glass flex items-center justify-center relative overflow-hidden group`}>
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

                <div className="p-6 glass border-l-4 border-primary rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2 text-primary">
                    <Zap size={18} />
                    <span className="font-bold text-sm">Challenge & Solution</span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {highlights[currentIndex].challenge}
                  </p>
                </div>

                {/* <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                  {highlights[currentIndex].links.github && (
                    <a href={highlights[currentIndex].links.github} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center space-x-2">
                       <Github size={18} />
                       <span>View Code</span>
                    </a>
                  )}
                   {highlights[currentIndex].links.live || highlights[currentIndex].links.demo ? (
                    <a href={highlights[currentIndex].links.live || highlights[currentIndex].links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-text hover:text-primary transition-colors font-medium">
                       <ExternalLink size={18} />
                       <span>{highlights[currentIndex].links.live ? 'Live App' : 'See Demo'}</span>
                    </a>
                   ) : null}
                </div> */}
              </div>
            </motion.div>
          </AnimatePresence>
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
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
