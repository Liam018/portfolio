import { motion } from 'framer-motion';
import { Code2, Calendar, Star } from 'lucide-react';
import { RevealSection, EyebrowLabel, BezelCard, TechPill, SectionHeading } from '../ResumeUI';
import { easeCubic } from '../resumeMotion';
import { projects } from '../resumeData';

const ProjectsSection = () => (
  <RevealSection delay={0.05} className="mb-12">
    <EyebrowLabel label="Highlighted Projects" icon={Code2} />
    <SectionHeading anchor="projects">Things I've built</SectionHeading>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((proj, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: easeCubic, delay: i * 0.07 }}
        >
          <BezelCard hoverGlow className="h-full">
            <div className="p-6 space-y-3.5 h-full flex flex-col relative">

              {/* Faint background project number */}
              <span
                aria-hidden="true"
                className="absolute top-4 right-5 text-[4.5rem] font-black leading-none select-none pointer-events-none tabular-nums text-foreground/4"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title row */}
              <div className="relative">
                {/* Project name + inline star + award label */}
                <div className="flex flex-wrap items-center gap-2 pr-2">
                  <h3 className="text-[0.9375rem] font-bold text-foreground leading-snug">
                    {proj.title}
                  </h3>
                  {/* {proj.award && (
                    <span className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full
                      bg-amber-400/10 border border-amber-400/25 text-amber-500
                      text-[9px] font-bold uppercase tracking-wide shrink-0">
                      <Star size={8} strokeWidth={2.5} aria-hidden="true" />
                      {proj.awardLabel}
                    </span>
                  )} */}
                </div>
                <p className="text-[11px] font-mono font-semibold text-text-muted mt-0.5">{proj.context}</p>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5">
                {proj.tech.map(t => <TechPill key={t} label={t} />)}
              </div>

              {/* Bullets */}
              <ul className="space-y-2 border-t border-border/40 pt-3 flex-1">
                {proj.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-[12.5px] text-text-muted leading-relaxed">
                    <span className="mt-1.25 shrink-0 w-1 h-1 rounded-full bg-text-muted/50" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Period */}
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70 font-mono pt-1">
                <Calendar size={10} strokeWidth={2} />
                {proj.period}
              </div>
            </div>
          </BezelCard>
        </motion.div>
      ))}
    </div>
  </RevealSection>
);

export default ProjectsSection;
