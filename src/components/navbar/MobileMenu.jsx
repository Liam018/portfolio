import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ArrowRight } from 'lucide-react';
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
          initial={{ opacity: 0, scale: 0.9, y: -20, borderRadius: '2.5rem' }}
          animate={{ opacity: 1, scale: 1, y: 0, borderRadius: '0rem' }}
          exit={{ opacity: 0, scale: 0.9, y: -20, borderRadius: '2.5rem' }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={{ transformOrigin: 'top right', willChange: 'transform, opacity, border-radius' }}
          className="lg:hidden fixed inset-0 z-9999 bg-background/98 dark:bg-[#0a0a0a]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 overscroll-contain overflow-y-auto pointer-events-auto"
        >
          {/* Top Bar: Logo & Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-border/40 dark:border-white/10 shrink-0">
            <motion.a
              href="#hero"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center space-x-3 cursor-pointer group min-w-0 max-w-[55%] sm:max-w-none"
            >
              <motion.div layoutId="mobile-nav-logo-box" className="w-10 h-10 shrink-0 rounded-xl overflow-hidden shadow-lg border border-border/40 group-hover:border-primary/40 transition-colors">
                <img src={logoAsset} alt="LKKE Logo" className="w-full h-full object-cover" />
              </motion.div>
              <motion.span layoutId="mobile-nav-name" className="text-lg font-display font-bold text-text group-hover:text-primary transition-colors truncate">
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
                  className="w-10 h-10 rounded-full glass backdrop-blur-md flex items-center justify-center text-text border border-border/40 shadow-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <FileText size={18} />
                </Link>
              </motion.div>

              <motion.button
                layoutId="mobile-nav-trigger"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                aria-label="Close mobile menu"
                className="w-10 h-10 rounded-full glass backdrop-blur-md flex items-center justify-center border border-border/40 shadow-md bg-primary/10 text-primary"
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          {/* Nav Links: Interactive Card Boxes */}
          <div className="py-6 flex flex-col space-y-3.5 my-auto">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ delay: i * 0.06 + 0.08, type: "spring", stiffness: 320, damping: 24 }}
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                className={`group flex items-center justify-between px-5 py-4 rounded-2xl glass backdrop-blur-md border transition-all duration-300 shadow-xs ${
                  activeSection === link.id 
                    ? 'bg-primary/10 border-primary/40 text-primary shadow-primary/10' 
                    : 'bg-card/50 dark:bg-white/3 border-border/40 dark:border-white/10 text-text hover:border-primary/30 hover:bg-card/80'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${activeSection === link.id ? 'bg-primary shadow-sm shadow-primary' : 'bg-text-muted/40 group-hover:bg-primary transition-colors'}`} />
                  <span className="text-xl sm:text-2xl font-display font-bold tracking-tight">
                    {link.name}
                  </span>
                </div>
                <ArrowRight size={18} className={`transition-transform duration-300 group-hover:translate-x-1 ${activeSection === link.id ? 'text-primary opacity-100' : 'text-text-muted opacity-40 group-hover:opacity-100 group-hover:text-primary'}`} />
              </motion.a>
            ))}
          </div>

          {/* Bottom Footer Section */}
          <div className="pt-6 border-t border-border/40 dark:border-white/10 space-y-6 shrink-0">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Connect</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <motion.a 
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={social.label} 
                    href={social.href} 
                    className="p-3.5 glass backdrop-blur-md rounded-full text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-300 shadow-md"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <a 
                href="mailto:liamkurt014@gmail.com" 
                className="text-sm font-medium text-primary hover:underline flex items-center space-x-2"
              >
                <span>Email Me</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
