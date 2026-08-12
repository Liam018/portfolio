import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

export const MobileMenu = ({
  isOpen,
  setIsOpen,
  overlayRef,
  logoAsset,
  scrolled,
  navLinks,
  socialLinks,
  activeSection,
  isHomePage,
  navigate,
  handleLogoClick
}) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={overlayRef}
          initial={{ opacity: 0, scale: 0.97, y: -10, borderRadius: '2rem' }}
          animate={{ opacity: 1, scale: 1, y: 0, borderRadius: '0rem' }}
          exit={{ opacity: 0, scale: 0.97, y: -10, borderRadius: '2rem' }}
          transition={{ type: 'spring', stiffness: 350, damping: 32, mass: 0.8 }}
          style={{ transformOrigin: 'top right', willChange: 'transform, opacity, border-radius' }}
          className={`lg:hidden fixed inset-0 z-100 bg-background/98 dark:bg-[#08080a]/98 backdrop-blur-2xl flex flex-col ${
            scrolled ? 'pt-7' : 'pt-8'
          } pb-6 px-6 sm:px-8 overscroll-contain overflow-y-auto pointer-events-auto`}
        >
          {/* Top Bar: Logo & Morphing Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-border/40 shrink-0">
            <motion.a
              href="#hero"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-3 cursor-pointer group min-w-0 max-w-[55%] sm:max-w-none"
            >
              <motion.div 
                layoutId="mobile-nav-logo-box" 
                className="w-10 h-10 shrink-0 rounded-xl overflow-hidden shadow-md border border-border/40 group-hover:border-primary/40 transition-colors"
              >
                <img src={logoAsset} alt="LKKE Logo" className="w-full h-full object-cover" />
              </motion.div>
              <motion.span 
                layoutId="mobile-nav-name" 
                className="text-lg font-display font-bold text-text group-hover:text-primary transition-colors truncate"
              >
                {scrolled ? (
                  <>Liam<span className="hidden sm:inline"> Kurt Kasten Edano</span><span className="sm:hidden">...</span></>
                ) : (
                  <>Liam Kurt<span className="hidden sm:inline"> Kasten Edano</span><span className="sm:hidden">...</span></>
                )}
              </motion.span>
            </motion.a>
            
            <div className="flex items-center gap-2">
              <motion.div layoutId="mobile-nav-theme">
                <ThemeToggle />
              </motion.div>

              <motion.div layoutId="mobile-nav-resume">
                <Link
                  to="/resume"
                  aria-label="View Resume"
                  onClick={() => {
                    setIsOpen(false);
                    document.body.style.overflow = 'unset';
                    document.documentElement.style.overflow = 'unset';
                  }}
                  className="w-10 h-10 rounded-full glass backdrop-blur-md flex items-center justify-center text-text border border-border/40 shadow-xs hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <FileText size={18} />
                </Link>
              </motion.div>

              <motion.button
                layoutId="mobile-nav-trigger"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(false)}
                aria-label="Close mobile menu"
                className="w-10 h-10 rounded-full glass backdrop-blur-md flex items-center justify-center border border-border/40 shadow-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          {/* Natural Top-to-Bottom Flow Navigation Area (No giant my-auto gaps) */}
          <div className="py-6 flex-1 flex flex-col space-y-4 min-h-0">
            <div className="flex items-center justify-between px-1 gap-2 flex-nowrap">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-text-muted truncate">
                // Directory
              </span>
              <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                // Available for Work
              </span>
            </div>

            <ul className="space-y-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: i * 0.05 + 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      onClick={(e) => {
                        e.preventDefault();
                        const href = link.href;
                        setIsOpen(false);
                        document.body.style.overflow = 'unset';
                        document.documentElement.style.overflow = 'unset';
                        
                        if (!isHomePage) {
                          navigate('/');
                          setTimeout(() => {
                            const target = document.querySelector(href.replace('/', ''));
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                          }, 400);
                        } else {
                          setTimeout(() => {
                            const target = document.querySelector(href);
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }}
                      className={`group flex items-center justify-between text-xl sm:text-2xl font-display font-extrabold tracking-tight py-3 transition-colors border-b ${
                        isActive 
                          ? 'text-primary border-primary' 
                          : 'text-text-muted hover:text-text border-border/20 dark:border-white/10 hover:border-border/60'
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full transition-all duration-200 shrink-0 ${
                          isActive ? 'bg-primary shadow-xs shadow-primary scale-110' : 'bg-primary/40 group-hover:bg-primary group-hover:scale-110'
                        }`} />
                        <span className={`transition-transform duration-200 ${
                          isActive ? 'translate-x-1 text-primary' : 'group-hover:translate-x-1'
                        }`}>
                          {link.name}
                        </span>
                      </span>

                      <span className={`inline-flex items-center text-xs font-mono transition-colors shrink-0 ${
                        isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary'
                      }`}>
                        <ArrowUpRight 
                          size={18} 
                          className={`transition-all duration-200 shrink-0 ${
                            isActive 
                              ? 'opacity-100 text-primary translate-x-0.5 -translate-y-0.5' 
                              : 'opacity-40 sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                          }`} 
                        />
                      </span>
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Command Dock Footer */}
          <div className="mt-auto pt-4 border-t border-border/40 space-y-3 shrink-0">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-text-muted block">
              // Quick Connect
            </span>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                {socialLinks.map((social) => (
                  <motion.a 
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={social.label} 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer" 
                    aria-label={social.label}
                    className="w-10 h-10 glass backdrop-blur-md rounded-xl text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200 shadow-xs border border-border/40 flex items-center justify-center shrink-0"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              <a 
                href="mailto:liamkurt014@gmail.com" 
                className="h-10 px-3.5 glass backdrop-blur-md rounded-xl text-xs font-semibold text-primary hover:bg-primary/10 border border-primary/30 transition-all flex items-center space-x-2 shrink-0 shadow-xs"
              >
                <Mail size={14} className="shrink-0" />
                <span>Email Me</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
