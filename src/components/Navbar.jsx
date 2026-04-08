import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Github, Linkedin, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import logoAsset from '../assets/LKKE.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const observerOption = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
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

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#project-highlight', id: 'project-highlight' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/Liam018", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/liam-kurt-edano-bb47623a9", label: "LinkedIn" }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-4' 
        : 'py-6'
    }`}>
      {/* Background Glass Layer */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 glass border-b border-white/5 shadow-2xl shadow-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <motion.a 
            href="#hero"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
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
              <span className="text-lg font-display font-bold accent-gradient leading-tight tracking-tight">Liam Kurt</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Programmer</span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
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
                  {/* Active/Hover Pill */}
                  {(activeSection === link.id || hoveredLink === link.id) && (
                    <motion.div
                      layoutId="nav-pill"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className={`absolute inset-0 rounded-full z-0 ${
                        activeSection === link.id 
                          ? 'bg-linear-to-r from-primary to-secondary' 
                          : 'bg-white/10 dark:bg-white/5'
                      }`}
                    />
                  )}
                </a>
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
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-text-muted hover:text-primary transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Connect Button (Desktop) */}
          <div className="hidden lg:block">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-text text-background px-6 py-2.5 rounded-full text-sm font-bold flex items-center space-x-2 group shadow-xl hover:shadow-primary/20 transition-all"
            >
              <span>Let's talk</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Mobile UI Buttons */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                isOpen ? 'bg-primary text-white' : 'bg-white/5 border border-white/10 text-text'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-primary via-secondary to-accent origin-left z-20" 
        style={{ scaleX }}
      />

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-white/10 z-[999]"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="grid gap-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const href = link.href;
                      setIsOpen(false);
                      // Wait for the exit animation to finish before scrolling
                      setTimeout(() => {
                        const target = document.querySelector(href);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 150);
                    }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all"
                  >
                    <span className={`text-xl font-medium ${activeSection === link.id ? 'text-primary' : 'text-text'}`}>
                      {link.name}
                    </span>
                    <ArrowRight size={20} className={activeSection === link.id ? 'text-primary' : 'text-text-muted'} />
                  </motion.a>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a key={social.label} href={social.href} className="p-3 bg-white/5 rounded-full text-text-muted hover:text-white transition-colors">
                      {social.icon}
                    </a>
                  ))}
                </div>
                <a 
                  href="mailto:liamkurt014@gmail.com" 
                  className="text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  liamkurt014@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
