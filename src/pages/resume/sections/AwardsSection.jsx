import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { RevealSection, EyebrowLabel, BezelCard, SectionHeading } from '../ResumeUI';
import { easeCubic } from '../resumeMotion';
import { achievements } from '../resumeData';

const AwardsSection = () => (
  <RevealSection delay={0.05} className="mb-12">
    <EyebrowLabel label="Honors & Awards" icon={Award} />
    <SectionHeading anchor="awards">Recognition</SectionHeading>

    <div className="grid sm:grid-cols-2 gap-4">
      {achievements.map((ach, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: easeCubic, delay: i * 0.1 }}
          whileHover={{ y: -3 }}
        >
          <BezelCard className="h-full">
            <div className="p-6 space-y-3 h-full">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/22 flex items-center justify-center">
                  <ach.icon size={16} className="text-amber-500" strokeWidth={2} />
                </div>
                <h3 className="text-sm font-bold text-foreground leading-snug">{ach.title}</h3>
              </div>
              <p className="text-[11px] font-semibold text-primary">{ach.org}</p>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-3">
                "{ach.desc}"
              </p>
            </div>
          </BezelCard>
        </motion.div>
      ))}
    </div>
  </RevealSection>
);

export default AwardsSection;
