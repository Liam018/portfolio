import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { easeCubic } from './resumeMotion';

/* ── Scroll-aware section reveal wrapper ── */
// Accepts optional `id` prop for anchor links 
export const RevealSection = ({ children, delay = 0, className = '', id }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, ease: easeCubic, delay }}
    >
      {children}
    </motion.div>
  );
};

/* ── Editorial section eyebrow: line ── pill  ── */
export const EyebrowLabel = ({ label, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="flex-1 h-px bg-border/40" />
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border/60 text-text-muted font-mono font-bold text-[10px] uppercase tracking-[0.18em]">
      {Icon && <Icon size={10} strokeWidth={2.5} />}
      {label}
    </div>
    <div className="flex-1 h-px bg-border/40" />
  </div>
);

/* ── Solid card with optional hover glow ── */
export const BezelCard = ({ children, className = '', hoverGlow = false }) => (
  <div
    className={`
      relative rounded-2xl overflow-hidden
      bg-card/40
      border border-border/60
      transition-all duration-300
      ${hoverGlow ? 'hover:border-border/90 hover:bg-card/60' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

/* ── Technology pill badge ── */
export const TechPill = ({ label }) => (
  <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full bg-background/80 text-text-muted border border-border/70 transition-colors duration-200 hover:text-text hover:border-border">
    {label}
  </span>
);

/* ── Section heading with optional hover anchor link── */
export const SectionHeading = ({ children, anchor }) => (
  <h2 className="group text-2xl font-black tracking-[-0.02em] mb-6 text-foreground flex items-center gap-2">
    {children}
    {anchor && (
      <a
        href={`#${anchor}`}
        aria-label={`Link to ${anchor} section`}
        className="opacity-0 group-hover:opacity-35 hover:opacity-100! text-muted-foreground transition-opacity duration-200 font-mono text-base font-normal"
      >
        #
      </a>
    )}
  </h2>
);
