import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { RevealSection, EyebrowLabel, BezelCard, SectionHeading } from '../ResumeUI';
import { experience } from '../resumeData';

const ExperienceSection = () => (
  <RevealSection delay={0.05} className="mb-12">
    <EyebrowLabel label="Work Experience" icon={Briefcase} />
    <SectionHeading anchor="experience">Where I've worked</SectionHeading>

    {experience.map((exp, i) => (
      <BezelCard key={i} hoverGlow>
        <div className="p-6 sm:p-7 space-y-4">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-start gap-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-text">{exp.title}</h3>
              <p className="text-sm font-semibold text-text">{exp.company}</p>
              <p className="text-xs text-text-muted flex items-center gap-1.5 pt-0.5">
                <MapPin size={11} strokeWidth={2} />
                {exp.location}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-background/80 text-text-muted border border-border/70">
                {exp.period}
              </span>
              <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-background/80 text-text-muted border border-border/70">
                {exp.type}
              </span>
            </div>
          </div>

          {/* Bullets */}
          <ul className="space-y-2 border-t border-border/40 pt-4">
            {exp.bullets.map((bullet, j) => (
              <li key={j} className="flex items-start gap-2.5 text-[13px] text-text-muted leading-relaxed">
                <CheckCircle2 size={13} strokeWidth={2} className="mt-0.75 shrink-0 text-text-muted/60" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </BezelCard>
    ))}
  </RevealSection>
);

export default ExperienceSection;
