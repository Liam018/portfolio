import { motion } from 'framer-motion';
import logoAsset from '../assets/LKKE.png';

const Preloader = () => {
  const letters = "LIAM KURT".split("");

  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { 
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const logoVars = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)"
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const textContainerVars = {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.8
      }
    }
  };

  const letterVars = {
    initial: { 
      opacity: 0, 
      y: 10,
      filter: "blur(4px)"
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          variants={logoVars}
          className="w-24 h-24 md:w-32 md:h-32 mb-8 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <img 
            src={logoAsset} 
            alt="Logo" 
            className="w-full h-full object-cover rounded-2xl relative z-10 shadow-2xl shadow-primary/20"
          />
        </motion.div>

        {/* Name Animation */}
        <motion.div
          variants={textContainerVars}
          className="flex space-x-2 md:space-x-3"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVars}
              className={`text-2xl md:text-4xl font-display font-bold tracking-tighter ${
                letter === " " ? "w-3" : "accent-gradient"
              }`}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Loading progress underline */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          className="h-[2px] w-48 bg-linear-to-r from-primary via-secondary to-accent mt-6 rounded-full origin-left opacity-30"
        />
      </div>

      {/* Modern Backdrop Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

export default Preloader;
