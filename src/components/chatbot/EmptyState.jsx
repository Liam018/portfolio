import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

// ─── EmptyState ───────────────────────────────────────────────────────────────
export const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center h-full gap-3.5 text-text-muted px-6 text-center py-10"
  >
    <div className="relative">
      <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 flex items-center justify-center shadow-inner backdrop-blur-md">
        <Bot size={32} className="text-primary" />
      </div>
      <div className="absolute -top-1 -right-1 p-1 bg-amber-500/20 border border-amber-500/40 rounded-full backdrop-blur-xs">
        <Sparkles size={12} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
      </div>
    </div>
    <div className="space-y-1">
      <h5 className="text-sm font-bold text-text font-display">How can I help you today?</h5>
      <p className="text-xs text-text-muted/70 max-w-60">
        Ask about Liam's skills, projects, background, or select a shortcut below!
      </p>
    </div>
  </motion.div>
);
