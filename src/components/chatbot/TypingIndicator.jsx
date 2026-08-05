import { motion } from 'framer-motion';

// ─── TypingIndicator ──────────────────────────────────────────────────────────
export const TypingIndicator = () => (
  <motion.div
    key="typing"
    initial={{ opacity: 0, y: 10, scale: 0.92 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.92 }}
    className="flex justify-start"
  >
    <div className="bg-card/85 dark:bg-white/[0.07] glass backdrop-blur-md px-4 py-3 rounded-2xl rounded-tl-xs border border-border/50 dark:border-white/10 flex items-center gap-2.5 shadow-sm">
      <div className="flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.25, 1],
              opacity: [0.35, 1, 0.35]
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-linear-to-r from-primary to-secondary rounded-full shadow-xs"
          />
        ))}
      </div>
      <span className="text-[11px] font-medium text-text-muted/70 font-display">Thinking...</span>
    </div>
  </motion.div>
);
