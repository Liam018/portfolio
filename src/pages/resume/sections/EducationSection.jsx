import { GraduationCap } from 'lucide-react';
import { RevealSection, EyebrowLabel, BezelCard, SectionHeading } from '../ResumeUI';
import { education } from '../resumeData';

/* ── Flex-based timeline — dot + line segments per row, no absolute math ── */
const EducationSection = () => (
  <RevealSection delay={0.05} className="mb-12">
    <EyebrowLabel label="Education" icon={GraduationCap} />
    <SectionHeading anchor="education">Academic background</SectionHeading>

    <div>
      {education.map((edu, i) => {
        const isLast = i === education.length - 1;
        return (
          <div key={i} className="flex gap-5">

            {/* ── Timeline column: dot on top, line fills down ── */}
            <div className="flex flex-col items-center shrink-0" style={{ paddingTop: '1.25rem' }}>
              {/* Dot */}
              <div
                aria-hidden="true"
                className={`
                  w-3 h-3 rounded-full border-2 shrink-0 z-10
                  ${edu.primary
                    ? 'bg-primary border-primary shadow-[0_0_0_4px_rgba(59,130,246,0.14)]'
                    : 'bg-white dark:bg-[#111] border-black/20 dark:border-white/20'
                  }
                `}
              />
              {/* Connecting spine segment — hidden on last item */}
              {!isLast && (
                <div className="w-px flex-1 mt-2 bg-black/8 dark:bg-white/8" />
              )}
            </div>

            {/* ── Card column ── */}
            <div className={`flex-1 min-w-0 ${!isLast ? 'pb-4' : ''}`}>
              <BezelCard hoverGlow={edu.primary}>
                <div
                  className={`p-5 sm:p-6 flex flex-wrap justify-between items-start gap-3
                    ${edu.primary ? 'border-l-2 border-primary/40' : ''}
                  `}
                >
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-sm font-bold text-foreground">{edu.degree}</h3>
                    <p className="text-[12.5px] text-muted-foreground">{edu.school} · {edu.location}</p>
                    {edu.details && (
                      <p className="text-[11.5px] text-muted-foreground/70 italic pt-1 border-l-2 border-primary/20 pl-2.5 mt-1">
                        {edu.details}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-primary shrink-0">
                    {edu.period}
                  </span>
                </div>
              </BezelCard>
            </div>

          </div>
        );
      })}
    </div>
  </RevealSection>
);

export default EducationSection;
