import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

// ─── CopyButton ───────────────────────────────────────────────────────────────
// Icon-only; toast is rendered centrally in the footer above the suggestion bar
export const CopyButton = ({ text, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silent fail
    }
  }, [text, onCopy]);

  return (
    <motion.button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy message'}
      title={copied ? 'Copied!' : 'Copy'}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied
          ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={11} className="text-accent" /></motion.span>
          : <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={11} /></motion.span>
        }
      </AnimatePresence>
    </motion.button>
  );
};
