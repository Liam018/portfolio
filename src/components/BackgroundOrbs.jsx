import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const BackgroundOrbs = () => {
  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 50, damping: 25, restDelta: 0.001 };

  // Dynamic Positional Transforms (Diagonal/Drifting Movement)
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 800]), springConfig);
  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -500]), springConfig);
  const x2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);

  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 400]), springConfig);
  const x3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -250]), springConfig);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
      {/* Primary Orb - Drifts down and right */}
      <motion.div 
        style={{ y: y1, x: x1 }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] will-change-transform"
      />
      
      {/* Secondary Orb - Drifts up and left */}
      <motion.div 
        style={{ y: y2, x: x2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-secondary/5 rounded-full blur-[120px] will-change-transform"
      />

      {/* Accent Orb - Drifts slowly middle-left */}
      <motion.div 
        style={{ y: y3, x: x3 }}
        className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px] will-change-transform"
      />

      {/* Stationary Ambient Layer */}
      <div className="absolute inset-0 bg-white/1" />
    </div>
  );
};

export default BackgroundOrbs;
