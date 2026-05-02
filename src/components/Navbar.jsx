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
  const navRef = useRef(null);
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
      if (navRef.current && !navRef.current.contains(event.target)) {
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
    
    // Slight delay to ensure content layout is fully calculated 
    // after the preloader mounts the main app content
    const timer = setTimeout(calculateInitialProgress, 100);

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOption = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // More balanced active area
      threshold: [0.1, 0.5],
    };

    const observer = new IntersectionObserver(handleIntersect, observerOption);
    const sections = ['hero', 'about', 'skills', 'project-highlight', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
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
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/liam-kurt-edano-bb47623a9", label: "LinkedIn" }
  ];

  return (
    <nav ref={navRef} className="fixed w-full z-50 flex justify-center pointer-events-none pt-4 md:pt-6">
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
          ease: [0.22, 1, 0.36, 1] // Smooth quintic ease
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
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-primary/40 transition-shadow duration-300">
              <img 
                src={logoAsset} 
                alt="LKKE Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold accent-gradient leading-tight tracking-tight">
                Liam Kurt<span className="hidden sm:inline"> Kasten Edano</span><span className="sm:hidden">...</span>
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center glass rounded-full px-2 py-1.5 backdrop-blur-md glass-bg">
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
            
            <div className="w-px h-6 bg-white/10 mx-4" />
            
            <div className="flex items-center space-x-3 pr-2">
              <ThemeToggle />
              <div className="flex items-center space-x-2">
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
              </div>
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
          <div className="lg:hidden flex items-center space-x-4">
            <Link to="/resume" aria-label="View Resume" className="p-2 rounded-xl bg-text/5 border border-border text-text">
              <FileText size={24} />
            </Link>
            <ThemeToggle />
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                isOpen ? 'bg-primary text-white' : 'bg-text/5 border border-border text-text'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="absolute bottom-0 left-8 right-8 h-[2px] z-20 pointer-events-none"
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

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: -10, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-4 glass backdrop-blur-md rounded-[2.5rem] overflow-hidden z-999 shadow-2xl shadow-primary/5 pointer-events-auto"
          >
            <div className="px-8 py-10 flex flex-col space-y-10">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1, type: "spring", stiffness: 300, damping: 24 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const href = link.href;
                      setIsOpen(false);
                      
                      if (!isHomePage) {
                        navigate('/');
                        // Small delay for navigation to complete
                        setTimeout(() => {
                          const target = document.querySelector(href.replace('/', ''));
                          if (target) target.scrollIntoView({ behavior: 'smooth' });
                        }, 500);
                      } else {
                        setTimeout(() => {
                          const target = document.querySelector(href);
                          if (target) target.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      }
                    }}
                    className="group flex flex-col relative w-fit py-2"
                  >
                    <div className="flex items-center space-x-6">
                      <span className={`text-4xl font-display font-bold tracking-tight transition-colors duration-300 ${activeSection === link.id ? 'text-primary' : 'text-text-muted group-hover:text-text'}`}>
                        {link.name}
                      </span>
                      {activeSection === link.id && (
                        <motion.div 
                          layoutId="active-indicator-mobile" 
                          className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/50" 
                        />
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="h-px bg-border w-full opacity-50" />

              <div className="flex flex-col space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Connect</span>
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a 
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        key={social.label} 
                        href={social.href} 
                        className="p-3.5 glass backdrop-blur-md rounded-full text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-300 shadow-lg"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                  <a 
                    href="mailto:liamkurt014@gmail.com" 
                    className="text-base font-medium text-text group flex items-center space-x-3 w-fit"
                  >
                    <div className="relative overflow-hidden h-6">
                      <span className="block group-hover:-translate-y-full transition-transform duration-300">liamkurt014@gmail.com</span>
                      <span className="block absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-primary">liamkurt014@gmail.com</span>
                    </div>
                    <ArrowRight size={18} className="text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
