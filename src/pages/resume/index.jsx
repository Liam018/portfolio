import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';
import resumePdf from '../../assets/Resume2026_LiamEdaño.pdf';

import { RevealSection } from './ResumeUI';
import { spring, easeCubic } from './resumeMotion';

import ResumeHero from './sections/ResumeHero';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import AwardsSection from './sections/AwardsSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import SeminarsSection from './sections/SeminarsSection';

const SECTION_LABELS = {
  hero: 'Overview',
  experience: 'Experience',
  projects: 'Projects',
  awards: 'Awards',
  skills: 'Skills',
  education: 'Education',
  seminars: 'Learning',
};

const ResumePage = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Resume — Liam Kurt Edaño';
    return () => { document.title = 'Portfolio — Liam Kurt Edaño'; };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-dvh bg-background text-text selection:bg-primary/25 select-none">

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="print:hidden fixed top-0 left-0 right-0 h-0.5 bg-primary z-100 origin-left"
        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
      />

      {/* Ambient background glows */}
      <div aria-hidden="true" className="print:hidden fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-120 h-120 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-primary/4 blur-[100px]" />
      </div>

      {/* Floating Header Nav Bar */}
      <div className="print:hidden sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: easeCubic }}
          className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-card/70 border border-border/60 backdrop-blur-xl shadow-lg"
        >
          {/* Left: Back Link & Active Section */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-text-muted hover:text-primary transition-colors duration-200 group"
            >
              <span className="w-6 h-6 rounded-full bg-background/80 border border-border/70 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-200">
                <ChevronLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              </span>
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            {/* Active section breadcrumb */}
            <AnimatePresence mode="wait">
              {activeSection && SECTION_LABELS[activeSection] && (
                <motion.span
                  key={activeSection}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-primary uppercase tracking-wider"
                  aria-live="polite"
                  aria-label={`Currently viewing: ${SECTION_LABELS[activeSection]}`}
                >
                  // {SECTION_LABELS[activeSection]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Theme Toggle & PDF Download */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <motion.a
              href={resumePdf}
              download="Resume2026_LiamEdano.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-md hover:shadow-primary/20 transition-all cursor-pointer"
            >
              <Download size={13} strokeWidth={2.5} />
              <span>Download PDF</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-8">
        <section id="hero" className="scroll-mt-20 mb-14">
          <RevealSection>
            <ResumeHero />
          </RevealSection>
        </section>

        <section id="experience" className="scroll-mt-20">
          <ExperienceSection />
        </section>

        <section id="projects" className="scroll-mt-20">
          <ProjectsSection />
        </section>

        <section id="awards" className="scroll-mt-20">
          <AwardsSection />
        </section>

        <section id="skills" className="scroll-mt-20">
          <SkillsSection />
        </section>

        <section id="education" className="scroll-mt-20">
          <EducationSection />
        </section>

        <section id="seminars" className="scroll-mt-20">
          <SeminarsSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="print:hidden relative z-10 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <span>© 2026 Liam Kurt Kasten C. Edaño</span>
          <div className="flex items-center gap-5">
            <a href="mailto:liamkurt014@gmail.com" className="hover:text-primary transition-colors duration-200">liamkurt014@gmail.com</a>
            <a href="https://github.com/Liam018" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">GitHub</a>
            <a href="https://www.linkedin.com/in/liam-kurt-kasten-edano-bb47623a9" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ResumePage;
