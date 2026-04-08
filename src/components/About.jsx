import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import profileIllustration from '../assets/profile_illustration.png';

const infoCards = [
  { label: 'Education', value: 'BS IT', sub: 'Saint Louis College', color: 'text-primary' },
  { label: 'Location', value: 'La Union', sub: 'San Fernando City', color: 'text-secondary' },
  { label: 'Projects', value: '2+', sub: 'Key Highlights', color: 'text-accent' },
  { label: 'Focus', value: 'Full-stack', sub: 'Web & Mobile', color: 'text-primary' },
];

const interests = ['Web Prep', 'UI/UX', 'Mobile Dev', 'Supabase', 'React Native'];

// Shared smooth transition for whileInView elements
const smoothTransition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.6,
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 30]), smoothConfig);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), smoothConfig);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), smoothConfig);

  // Spring-smoothed enter/exit transitions
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  return (
    <section ref={containerRef} id="about" className="py-24 relative overflow-hidden">
      <motion.div 
        style={{ opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Visuals */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={smoothTransition}
            viewport={{ once: true, margin: "-15%" }}
            className="flex flex-col items-center lg:items-start relative"
            style={{ y: y1 }}
          >
            <div className="relative z-10 glass rounded-[40px] p-2 overflow-hidden aspect-square max-w-md w-full mx-auto lg:mx-0">
               <motion.img 
                src={profileIllustration} 
                alt="Profile Illustration"
                className="w-full h-full object-cover rounded-[38px]"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
               />
            </div>

            {/* Interest Badges moved here */}
            <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start w-full">
              {interests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/5 transition-colors cursor-default"
                >
                  #{interest}
                </span>
              ))}
            </div>

            {/* Background blobs with parallax */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" 
            />
            <motion.div 
              style={{ y: y3 }}
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" 
            />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            viewport={{ once: true, margin: "-15%" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tracing My Path in Tech
            </h2>
            
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              I'm an IT student from San Fernando City, La Union, passionate about the intersection of design and functionality. Currently pursuing my BS in Information Technology at Saint Louis College, I focus on creating seamless user experiences across web and mobile platforms.
            </p>
            <p className="text-lg text-text-muted leading-relaxed mb-10">
              My journey involves hands-on experience with React Native, Supabase, and full-stack architecture. I love turning complex problems into elegant, user-centric solutions that make a difference.
            </p>

            {/* <div className="grid grid-cols-2 gap-4">
              {infoCards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="glass p-5 rounded-2xl border-white/5"
                >
                  <span className={`block text-2xl font-bold ${card.color}`}>{card.value}</span>
                  <span className="block text-sm font-semibold text-text mt-1">{card.label}</span>
                  <span className="block text-xs text-text-muted mt-0.5">{card.sub}</span>
                </motion.div>
              ))}
            </div> */}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;
