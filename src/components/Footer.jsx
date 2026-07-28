import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Check, 
  Copy,
  Github,
  Linkedin,
  FileText
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import resumePdf from '../assets/Resume2026_LiamEdaño.pdf';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleCopyEmail = () => {
    const email = 'liamkurt014@gmail.com';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Safe fallback
    }
  };

  const navLinks = [
    { name: 'About Me', href: isHomePage ? '#about' : '/#about' },
    { name: 'Skills', href: isHomePage ? '#skills' : '/#skills' },
    { name: 'Projects', href: isHomePage ? '#project-highlight' : '/#project-highlight' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
    { name: 'Resume', href: '/resume', isRoute: true },
  ];

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/Liam018',
      handle: '@Liam018',
      icon: Github
    },
    { 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/liam-kurt-kasten-edano-bb47623a9',
      handle: 'LinkedIn',
      icon: Linkedin
    },
    { 
      label: 'Resume PDF', 
      href: resumePdf,
      handle: 'PDF CV',
      download: true,
      icon: FileText
    },
  ];

  return (
    <footer 
      id="footer"
      className="relative pt-12 sm:pt-16 pb-6 overflow-hidden bg-background text-text border-t border-border/40 select-none flex flex-col justify-between"
    >
      {/* Subtle Ambient Glow Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10 sm:space-y-12">
        
        {/* Responsive Text Grid Section: Brand, Navigation & Social Connections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Brand Intro & Direct Contact Column (Cols 1-5) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="space-y-1">
              <h4 className="font-display text-xl sm:text-2xl font-extrabold text-text tracking-tight">
                Liam Kurt Kasten Edaño
              </h4>
              <p className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                Full-Stack Software Developer
              </p>
            </div>
            
            {/* Question leading into direct contact email */}
            <div className="space-y-2.5 pt-1">
              <p className="text-xs sm:text-sm font-medium text-text-muted leading-relaxed max-w-md">
                Have a project idea, opportunity, or technical question?
              </p>
              
              <div className="pt-1">
                <span className="block text-[11px] font-mono font-bold uppercase tracking-widest text-primary mb-1.5">
                  // Reach out directly
                </span>
                <a
                  href="mailto:liamkurt014@gmail.com"
                  onClick={handleCopyEmail}
                  className="group relative inline-flex items-center gap-2 text-sm xs:text-base sm:text-lg font-mono font-bold text-text hover:text-primary transition-colors cursor-pointer focus:outline-hidden break-all sm:break-normal max-w-full touch-manipulation active:opacity-80"
                  title="Click to send email or copy address"
                >
                  <span className="relative">
                    liamkurt014@gmail.com
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                  
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span 
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-mono font-bold shrink-0"
                      >
                        <Check size={12} /> Copied!
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-text-muted group-hover:text-primary transition-colors shrink-0"
                      >
                        <ArrowUpRight size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile 2-Column Grid for Links / Desktop Columns (Cols 6-12) */}
          <div className="md:col-span-7 grid grid-cols-2 gap-6 sm:gap-10">
            
            {/* Navigation Text Column */}
            <div className="space-y-3.5">
              <h5 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-primary">
                // Navigation
              </h5>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-2 text-xs sm:text-sm text-text-muted hover:text-text font-medium transition-colors py-1 sm:py-0.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-xs sm:text-sm text-text-muted hover:text-text font-medium transition-colors py-1 sm:py-0.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links Text Column */}
            <div className="space-y-3.5">
              <h5 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-primary">
                // Social & Connect
              </h5>
              <ul className="space-y-2.5 sm:space-y-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={social.download ? "Liam_Edano_Resume.pdf" : undefined}
                        className="group flex items-center justify-between text-xs sm:text-sm text-text-muted hover:text-text transition-colors py-1 sm:py-0.5 border-b border-transparent hover:border-border/60"
                      >
                        <span className="inline-flex items-center gap-1.5 sm:gap-2 font-medium">
                          <IconComponent size={15} className="text-primary/70 group-hover:text-primary transition-colors shrink-0" />
                          <span>{social.label}</span>
                        </span>
                        <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs font-mono text-text-muted group-hover:text-primary transition-colors">
                          <span className="hidden xs:inline">{social.handle}</span>
                          <ArrowUpRight size={13} className="opacity-70 sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Giant Typography Banner & Subline */}
      <div className="w-full mt-10 sm:mt-12 pt-4 sm:pt-6">
        <div className="w-full overflow-hidden flex items-center justify-center">
          <h2 className="w-full font-display text-[36vw] sm:text-[27vw] lg:text-[28vw] font-black tracking-tighter uppercase leading-none text-center text-text/90 hover:text-primary transition-colors duration-500 cursor-default select-none">
            LKKE
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono text-text-muted text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} Liam Kurt Kasten Edaño. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-[11px] tracking-wide">
              Designed & Built with Focus
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
