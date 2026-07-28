import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { RevealSection, EyebrowLabel, BezelCard, SectionHeading } from '../ResumeUI';
import { easeCubic } from '../resumeMotion';
import { seminars } from '../resumeData';

const SeminarsSection = () => (
  <RevealSection delay={0.05} className="mb-4">
    <EyebrowLabel label="Seminars & Training" icon={BookOpen} />
    <SectionHeading anchor="seminars">Continuous learning</SectionHeading>

    <div className="grid sm:grid-cols-3 gap-3">
      {seminars.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeCubic, delay: i * 0.08 }}
        >
          <BezelCard>
            <div className="p-5 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[12.5px] font-bold text-text leading-tight">{s.title}</h4>
                <span className="text-[10px] font-mono text-text-muted shrink-0">{s.period}</span>
              </div>
              <p className="text-[11px] text-text-muted">{s.org}</p>
            </div>
          </BezelCard>
        </motion.div>
      ))}
    </div>
  </RevealSection>
);

export default SeminarsSection;
