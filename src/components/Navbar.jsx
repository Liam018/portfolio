import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOption);
    const sections = ['about', 'skills', 'project-highlight', 'contact'];
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
    { name: 'Project Highlight', href: '#project-highlight', id: 'project-highlight' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-display font-bold accent-gradient">Liam Kurt Kasten Edaño</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === link.id ? 'text-primary' : 'text-text-muted hover:text-text'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
            <div className="flex items-center space-x-4 ml-4 border-l border-white/10 pl-6">
              <ThemeToggle />
              <a href="https://github.com/Liam018" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/liam-kurt-edano-bb47623a9" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-muted hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-text-muted hover:text-white hover:bg-white/5 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
