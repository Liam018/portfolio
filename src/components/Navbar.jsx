import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Menu, X, Github, Linkedin, ArrowRight, FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

import logoAsset from '../assets/LKKE.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 20;
    }
    return false;
  });
  const [hideNavbar, setHideNavbar] = useState(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);

  // Progress scale and spark values
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sparkPosition = useTransform(scaleX, [0, 1], ["0%", "100%"]);
  const sparkOpacity = useTransform(scaleX, [0, 0.05], [0, 1]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedNav = navRef.current && navRef.current.contains(event.target);
      const clickedOverlay = overlayRef.current && overlayRef.current.contains(event.target);

      if (!clickedNav && !clickedOverlay) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Auto-activate contact section if at bottom of page
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      // Scroll position spy for active section highlighting
      const sections = ['hero', 'about', 'skills', 'project-highlight', 'contact'];
      const scrollPosition = window.scrollY + (window.innerHeight * 0.35);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition <= top + height) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Instant sync for progress bar on mount
    const calculateInitialProgress = () => {
      requestAnimationFrame(() => {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height > 0) {
          scaleX.set(winScroll / height);
        }
      });
    };
    
    const timer = setTimeout(calculateInitialProgress, 100);

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOption = {
      root: null,
      rootMargin: '-25% 0px -25% 0px',
      threshold: [0.1, 0.4],
    };

    const observer = new IntersectionObserver(handleIntersect, observerOption);
    const sections = ['hero', 'about', 'skills', 'project-highlight', 'contact'];

    const observeSections = () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observeSections();
    const observerTimer = setTimeout(observeSections, 300);

    // Observer to hide Navbar when Footer is in view
    const handleFooterIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setHideNavbar(true);
        } else {
          setHideNavbar(false);
        }
      });
    };

    const footerObserver = new IntersectionObserver(handleFooterIntersect, {
      root: null,
      threshold: [0.1, 0.3],
    });

    const footerEl = document.getElementById('footer');
    if (footerEl) observer.observe(footerEl);
    if (footerEl) footerObserver.observe(footerEl);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearTimeout(observerTimer);
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'About Me', href: isHomePage ? '#about' : '/#about', id: 'about' },
    { name: 'Skills', href: isHomePage ? '#skills' : '/#skills', id: 'skills' },
    { name: 'Projects', href: isHomePage ? '#project-highlight' : '/#project-highlight', id: 'project-highlight' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/Liam018", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/liam-kurt-kasten-edano-bb47623a9", label: "LinkedIn" }
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'unset';

    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const target = document.querySelector('#hero');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 400);
    } else {
      setTimeout(() => {
        const target = document.querySelector('#hero');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav 
        ref={navRef} 
        className={`fixed w-full z-50 flex justify-center transition-all duration-500 ${
          hideNavbar 
            ? '-translate-y-40 opacity-0 pointer-events-none' 
            : 'translate-y-0 opacity-100 pointer-events-none pt-4 md:pt-6'
        }`}
      >
        <motion.div 
          initial={{ 
            y: -150, 
            opacity: 0,
            width: scrolled ? '92%' : '100%',
            maxWidth: scrolled ? '1200px' : '100vw'
          }}
          animate={{
            y: 0,
            opacity: 1,
            width: scrolled ? '92%' : '100%',
            maxWidth: scrolled ? '1200px' : '100vw',
          }}
          transition={{ 
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`relative flex items-center justify-between px-6 transition-all duration-500 pointer-events-auto ${
            scrolled 
              ? 'glass backdrop-blur-md rounded-full shadow-2xl shadow-black/30 border border-white/10 py-3' 
              : 'py-4'
          }`}
        >
        <div className="flex w-full items-center justify-between px-2">
          {/* Logo Section */}
          <motion.a 
            href="#hero"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <motion.div layoutId="mobile-nav-logo-box" className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-primary/40 transition-shadow duration-300">
              <img 
                src={logoAsset} 
                alt="LKKE Logo" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span layoutId="mobile-nav-name" className="text-lg font-display font-bold leading-tight tracking-tight">
                Liam Kurt<span className="hidden sm:inline"> Kasten Edano</span><span className="sm:hidden">...</span>
              </motion.span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center glass rounded-full px-2 py-1.5 backdrop-blur-md">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                isHomePage ? (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeSection === link.id ? 'text-white' : 'text-text-muted hover:text-text'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="nav-pill"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-full z-0 bg-linear-to-r from-primary to-secondary"
                      />
                    )}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="relative px-4 py-2 text-sm font-medium text-text-muted hover:text-text transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            {/* Separator: nav links → social */}
            <div className="w-px h-5 bg-border mx-3 shrink-0" />

            <div className="flex items-center gap-1 pr-1">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.15, rotate: social.label === 'GitHub' ? -5 : 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-text-muted hover:text-primary transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}

              {/* Separator: social → theme toggle */}
              <div className="w-px h-5 bg-border mx-1 shrink-0" />

              {/* Theme Toggle — Desktop */}
              <ThemeToggle />
            </div>
          </div>

          {/* Connect Button (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/resume"
              className="px-6 py-2.5 rounded-full text-sm font-bold flex items-center space-x-2 border border-border hover:bg-text/5 transition-all text-text"
            >
              <FileText size={16} />
              <span>Resume</span>
            </Link>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-text text-background px-6 py-2.5 rounded-full text-sm font-bold flex items-center space-x-2 group shadow-xl hover:shadow-primary/20 transition-all"
            >
              <span>Let's talk</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Mobile UI Buttons */}
          <div className="lg:hidden flex items-center space-x-2">
            <motion.div layoutId="mobile-nav-theme">
              <ThemeToggle />
            </motion.div>

            <div className="w-px h-6 bg-border" />

            <motion.div layoutId="mobile-nav-resume">
              <Link to="/resume" aria-label="View Resume" className="p-2 rounded-xl bg-text/5 border border-border text-text hover:bg-text/10 transition-colors flex items-center justify-center">
                <FileText size={20} />
              </Link>
            </motion.div>

            <motion.button 
              layoutId="mobile-nav-trigger"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                isOpen ? 'bg-primary text-white' : 'bg-text/5 border border-border text-text'
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Progress Bar inside the pill */}
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
      </motion.div>
    </nav>

    {/* Mobile Nav Fullscreen Overlay */}
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
          {/* Top Bar: Logo & Close */}
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
                Liam Kurt<span className="hidden sm:inline"> Kasten Edano</span><span className="sm:hidden">...</span>
              </motion.span>
            </motion.a>
            
            <div className="flex items-center gap-3">
              <motion.div layoutId="mobile-nav-theme">
                <ThemeToggle />
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

            {/* Resume Link Box */}
            <motion.div
              layoutId="mobile-nav-resume"
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ delay: navLinks.length * 0.06 + 0.08, type: "spring", stiffness: 320, damping: 24 }}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/resume"
                onClick={() => {
                  setIsOpen(false);
                  document.body.style.overflow = 'unset';
                  document.documentElement.style.overflow = 'unset';
                }}
                className={`group flex items-center justify-between px-5 py-4 rounded-2xl glass backdrop-blur-md border transition-all duration-300 shadow-xs ${
                  location.pathname === '/resume' 
                    ? 'bg-primary/10 border-primary/40 text-primary shadow-primary/10' 
                    : 'bg-card/50 dark:bg-white/3 border-border/40 dark:border-white/10 text-text hover:border-primary/30 hover:bg-card/80'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${location.pathname === '/resume' ? 'bg-primary shadow-sm shadow-primary' : 'bg-text-muted/40 group-hover:bg-primary transition-colors'}`} />
                  <span className="text-xl sm:text-2xl font-display font-bold tracking-tight">
                    Resume
                  </span>
                </div>
                <FileText size={18} className={`transition-colors duration-300 ${location.pathname === '/resume' ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`} />
              </Link>
            </motion.div>
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
  </>
  );
};

export default Navbar;
