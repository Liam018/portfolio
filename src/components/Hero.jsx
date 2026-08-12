import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { DiaTextReveal } from './ui/dia-text-reveal';
import { AuroraText } from './ui/aurora-text';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };

  // Parallax offset & spring transitions
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), smoothConfig);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  return (
    <section ref={containerRef} id="hero" className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] md:min-h-screen flex items-center justify-center bg-background text-text select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">

        {/* Parallax wrapper — all content moves together on scroll */}
        <motion.div
          style={{ y: y3, opacity, scale, willChange: 'transform, opacity' }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Status Badge + Headline + Subtitle — first entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-card/60 border border-border/70 shadow-xs"
            >
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-primary">
                // Available for Work &amp; Projects
              </span>
            </motion.div>

            {/* Editorial Display Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[1.05] text-text">
              Bringing Ideas to <br className="hidden sm:inline" />
              <AuroraText>Life</AuroraText> with Code.
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-text-muted leading-relaxed font-normal">
              <DiaTextReveal text="Passionate IT graduate building clean, responsive web and mobile applications." />
            </p>
          </motion.div>

          {/* Action Buttons — delayed, enters after headline settles */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-5"
          >
            <a
              href="#project-highlight"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg hover:shadow-primary/20 min-h-[44px] cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowDown size={15} />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 border border-border/80 hover:border-primary/40 hover:bg-card/60 text-text font-bold text-sm transition-all min-h-[44px] cursor-pointer"
            >
              <span>Contact Me</span>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
