import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logoAsset from '../assets/LKKE.png';

const Preloader = () => {
  const letters = "LIAM KURT".split("");
  const logoRef = useRef(null);
  const [logoExit, setLogoExit] = useState(null);

  // Measure the ghost anchor element (always in DOM) for exact navbar logo target
  useEffect(() => {
    const calcTarget = () => {
      if (!logoRef.current) return;
      const logoRect = logoRef.current.getBoundingClientRect();

      // Try to use the ghost anchor first, fall back to navbar logo anchor
      const anchor =
        document.getElementById('navbar-logo-ghost') ||
        document.getElementById('navbar-logo-anchor');

      if (!anchor) return;

      const anchorRect = anchor.getBoundingClientRect();
      const targetCX = anchorRect.left + anchorRect.width / 2;
      const targetCY = anchorRect.top + anchorRect.height / 2;
      const currentCX = logoRect.left + logoRect.width / 2;
      const currentCY = logoRect.top + logoRect.height / 2;

      setLogoExit({
        x: targetCX - currentCX,
        y: targetCY - currentCY,
        scale: anchorRect.width / logoRect.width,
      });
    };
    calcTarget();
    window.addEventListener('resize', calcTarget);
    return () => window.removeEventListener('resize', calcTarget);
  }, []);

  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        delay: 1.5,      // fade bg after logo has landed (1.0s navbar wait + 0.55s fly)
        ease: 'easeIn',
      },
    },
  };

  const logoExitAnim = logoExit
    ? {
        x: logoExit.x,
        y: logoExit.y,
        scale: logoExit.scale,
        transition: {
          duration: 0.5,
          delay: 1.0,      // wait for navbar slide-in to finish (delay:0.2 + duration:0.8)
          ease: [0.32, 0, 0.67, 0],
        },
      }
    : { opacity: 0, transition: { duration: 0.3, delay: 1.0 } };

  const logoVars = {
    initial: {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
    exit: logoExitAnim,
  };

  const textContainerVars = {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.25, delay: 0.7, ease: 'easeIn' },
    },
  };

  const letterVars = {
    initial: {
      opacity: 0,
      y: 10,
      filter: 'blur(4px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo — exits by flying to navbar corner position */}
        <motion.div
          ref={logoRef}
          variants={logoVars}
          className="w-24 h-24 md:w-32 md:h-32 mb-8 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20"
          style={{ originX: 0.5, originY: 0.5 }}
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
          <img
            src={logoAsset}
            alt="Logo"
            className="w-full h-full object-cover relative z-10"
          />
        </motion.div>

      </div>

      {/* Background glow elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

export default Preloader;
