import { motion } from 'framer-motion';
import { Code2, Palette, BookOpen } from 'lucide-react';
import { RevealSection, EyebrowLabel, BezelCard, SectionHeading } from '../ResumeUI';
import { staggerContainer, fadeUp } from '../resumeMotion';
import { skills } from '../resumeData';

const SkillsSection = () => (
  <RevealSection delay={0.05} className="mb-12">
    <EyebrowLabel label="Technical Stack" icon={Code2} />
    <SectionHeading anchor="skills">What I work with</SectionHeading>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Technical — spans 2 cols */}
      <BezelCard className="md:col-span-2">
        <div className="p-6 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Technical</p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {skills.technical.map(skill => (
              <motion.span
                key={skill.name}
                variants={fadeUp}
                className="px-3 py-1.5 rounded-xl bg-background/80 text-text-muted border border-border/70
                  text-[11px] font-mono font-semibold flex items-center gap-1.5
                  hover:text-text hover:border-border transition-colors duration-200 cursor-default"
              >
                <span className="w-1 h-1 rounded-full bg-text-muted/60" />
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </BezelCard>

      {/* Design tools */}
      <BezelCard>
        <div className="p-6 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">Design tools</p>
          <div className="flex flex-wrap gap-2">
            {skills.design.map(tool => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-xl bg-background/80 text-text-muted border border-border/70
                  text-[11px] font-mono font-semibold hover:text-text hover:border-border transition-colors duration-200 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </BezelCard>

      {/* Professional skills — full width */}
      <BezelCard className="md:col-span-3">
        <div className="p-6 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Professional skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.professional.map(prof => (
              <span
                key={prof}
                className="px-3 py-1.5 rounded-xl
                  bg-black/4 dark:bg-white/5
                  text-muted-foreground
                  border border-black/[0.07] dark:border-white/8
                  text-[11px] font-medium hover:text-foreground transition-colors duration-250 cursor-default"
              >
                {prof}
              </span>
            ))}
          </div>
        </div>
      </BezelCard>
    </div>
  </RevealSection>
);

export default SkillsSection;
