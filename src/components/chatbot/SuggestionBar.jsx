import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ─── SuggestionBar ────────────────────────────────────────────────────────────
// Horizontally scrollable chip row with:
//   • Mouse drag-to-scroll
//   • Touch drag (native, no override needed)
//   • Left/Right arrow buttons (fade in only when overflow exists in that dir)
//   • Keyboard ArrowLeft / ArrowRight while the bar is focused
export const SuggestionBar = ({ suggestions, onSelect, disabled }) => {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const updateArrows = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });

    // Must be non-passive so preventDefault() actually stops the page scrolling
    const handleWheel = (e) => {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY + e.deltaX, behavior: 'smooth' });
    };
    el.addEventListener('wheel', handleWheel, { passive: false });

    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      el.removeEventListener('wheel', handleWheel);
      ro.disconnect();
    };
  }, [updateArrows]);

  // ── Mouse drag ──────────────────────────────────────────────────────────────
  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartX.current = rowRef.current.scrollLeft;
    rowRef.current.style.cursor = 'grabbing';
    rowRef.current.style.userSelect = 'none';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    rowRef.current.scrollLeft = scrollStartX.current - dx;
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    rowRef.current.style.cursor = 'grab';
    rowRef.current.style.userSelect = '';
  };

  // ── Keyboard arrow navigation ────────────────────────────────────────────────
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); rowRef.current.scrollBy({ left: -100, behavior: 'smooth' }); }
    if (e.key === 'ArrowRight') { e.preventDefault(); rowRef.current.scrollBy({ left:  100, behavior: 'smooth' }); }
  };

  const scrollBy = (dir) => rowRef.current?.scrollBy({ left: dir * 100, behavior: 'smooth' });

  return (
    <div className="relative flex items-center">
      {/* Left fade + arrow */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            key="left"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute left-0 top-0 h-full flex items-center z-10 pointer-events-none"
          >
            <div className="w-8 h-full bg-linear-to-r from-(--glass-bg) to-transparent" />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => scrollBy(-1)}
              aria-label="Scroll suggestions left"
              className="pointer-events-auto absolute left-0 w-6 h-6 flex items-center justify-center rounded-full bg-card/80 border border-border shadow text-text-muted hover:text-primary transition-colors"
            >
              <ChevronLeft size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable chip list */}
      <div
        ref={rowRef}
        role="toolbar"
        aria-label="Quick topic shortcuts"
        tabIndex={0}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onKeyDown={onKeyDown}
        className="flex gap-2 overflow-x-auto py-0.5 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab' }}
      >
        {suggestions.map((s, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22, delay: idx * 0.04 }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.94 }}
            onMouseDown={(e) => e.stopPropagation()} // let drag start only on the row itself
            onClick={() => !isDragging.current && onSelect(s.query)}
            aria-label={s.label}
            disabled={disabled}
            className="shrink-0 font-display text-[11px] font-semibold px-3.5 py-1.5 rounded-full bg-card/60 dark:bg-white/5 backdrop-blur-md border border-border/40 dark:border-white/10 text-text-muted hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-xs"
          >
            {s.label}
          </motion.button>
        ))}
      </div>

      {/* Right fade + arrow */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            key="right"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute right-0 top-0 h-full flex items-center z-10 pointer-events-none"
          >
            <div className="w-8 h-full bg-linear-to-l from-(--glass-bg) to-transparent" />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => scrollBy(1)}
              aria-label="Scroll suggestions right"
              className="pointer-events-auto absolute right-0 w-6 h-6 flex items-center justify-center rounded-full bg-card/80 border border-border shadow text-text-muted hover:text-primary transition-colors"
            >
              <ChevronRight size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
