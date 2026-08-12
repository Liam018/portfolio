import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Menu, X, ArrowRight, FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logoAsset from '../assets/LKKE.png';

import { getNavLinks, getSocialLinks } from './navbar/navData';
import { NavbarProgressBar } from './navbar/NavbarProgressBar';
import { MobileMenu } from './navbar/MobileMenu';

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
  }, [scaleX]);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const navLinks = getNavLinks(isHomePage);
  const socialLinks = getSocialLinks();

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
            <div
              id="navbar-logo-anchor"
              className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-primary/40 transition-shadow duration-300"
            >
              <img 
                src={logoAsset} 
                alt="LKKE Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <motion.span layoutId="mobile-nav-name" className="text-lg font-display font-bold leading-tight tracking-tight">
                {scrolled ? (
                  <>Liam<span className="hidden sm:inline"> Kurt Kasten Edano</span><span className="sm:hidden">...</span></>
                ) : (
                  <>Liam Kurt<span className="hidden sm:inline"> Kasten Edano</span><span className="sm:hidden">...</span></>
                )}
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

            <motion.div layoutId="mobile-nav-resume">
              <Link
                to="/resume"
                aria-label="View Resume"
                className="w-10 h-10 rounded-full glass backdrop-blur-md flex items-center justify-center text-text border border-border/40 shadow-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <FileText size={18} />
              </Link>
            </motion.div>

            <motion.button 
              layoutId="mobile-nav-trigger"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="w-10 h-10 rounded-full glass backdrop-blur-md flex items-center justify-center border border-border/40 shadow-md transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Progress Bar inside the pill */}
        <NavbarProgressBar 
          scrolled={scrolled} 
          scaleX={scaleX} 
          sparkPosition={sparkPosition} 
          sparkOpacity={sparkOpacity} 
        />
      </motion.div>
    </nav>

    {/* Mobile Nav Fullscreen Overlay */}
    <MobileMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      overlayRef={overlayRef}
      logoAsset={logoAsset}
      scrolled={scrolled}
      navLinks={navLinks}
      socialLinks={socialLinks}
      activeSection={activeSection}
      isHomePage={isHomePage}
      navigate={navigate}
      handleLogoClick={handleLogoClick}
    />
  </>
  );
};

export default Navbar;
