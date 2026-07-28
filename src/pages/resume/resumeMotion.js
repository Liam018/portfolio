export const spring = { type: 'spring', stiffness: 260, damping: 28 };
export const easeCubic = [0.32, 0.72, 0, 1];

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: easeCubic },
  },
};
