import { motion, AnimatePresence } from 'framer-motion';

export const NavbarProgressBar = ({ scrolled, scaleX, sparkPosition, sparkOpacity }) => {
  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div 
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-8 right-8 h-0.5 z-20 pointer-events-none"
        >
          <div className="relative w-full h-full bg-white/5 dark:bg-black/20 rounded-full overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-linear-to-r from-primary via-secondary to-accent origin-left shadow-[0_0_12px_rgba(59,130,246,0.5)]" 
              style={{ scaleX }}
            />
            
            {/* Dynamic leading Spark */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_30px_var(--primary)] pointer-events-none z-30"
              style={{ 
                left: sparkPosition,
                translateX: "-50%",
                opacity: sparkOpacity
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
