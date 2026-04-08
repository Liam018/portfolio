import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  
  // Parallax offsets — softer springs for buttery movement
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), smoothConfig);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), smoothConfig);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), smoothConfig);

  // Spring-smoothed scroll-linked opacity & scale
  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  return (
    <section ref={containerRef} id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          style={{ y: y3, opacity, scale, willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <span className="px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6 inline-block">
            Available for Internships & Projects
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-tight">
            Building Digital <br />
            <span className="accent-gradient">Experiences</span> that Matter
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-muted mb-10">
            IT Student from La Union specializing in Full-stack Development, 
            UI/UX Design, and building impactful mobile & web applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#project-highlight" className="btn-primary w-full sm:w-auto text-center">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 border border-border hover:bg-text/5 rounded-full font-medium transition-all w-full sm:w-auto text-center">
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
