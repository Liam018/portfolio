import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Download, 
  ChevronLeft,
  Award,
  BookOpen,
  Code2,
  Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import resumePdf from '../assets/RESUME.pdf';

const Section = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-display font-bold text-text">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const ResumePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = {
    technical: ["Javascript (React)", "Typescript (React Native)", "PHP", "C", "C++", "Java"],
    design: ["Framer", "Figma", "Photoshop"]
  };

  const experience = [
    {
      title: "Capstone Project: Agrilako",
      company: "Saint Louis College x OPAG",
      period: "2025 - 2026",
      desc: "Developed a web-based admin system for the Office of the Provincial Agriculturist (OPAG) and a mobile app for cooperatives. Enabled direct marketing and transaction tracking for local farmers."
    }
  ];

  const achievements = [
    {
      title: "3rd Place - PATCH Hackathon",
      organization: "Provincial Application and Tool for Citizens Hackathon",
      desc: "Awarded for the 'Most Viable Product' (MVP) for the Agrilako platform."
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "Saint Louis College",
      period: "2022 - 2026",
      location: "Carlatan, City of San Fernando, La Union",
      details: "Agrilako: agricultural e-commerce system for la union sellers and buyers (Capstone)"
    },
    {
      degree: "Secondary Level",
      school: "Saint Louis College",
      period: "2018 - 2022",
      location: "Carlatan, City of San Fernando, La Union"
    },
    {
      degree: "Primary Level",
      school: "Dalumpinas Integrated School",
      period: "2012",
      location: "Dalumpinas Este, City of San Fernando, La Union"
    }
  ];



  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 py-20 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-medium group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
      </div>

      <div className="max-w-4xl mx-auto glass rounded-[40px] overflow-hidden shadow-2xl border-border">
        {/* Header Header */}
        <div className="p-8 md:p-12 bg-linear-to-br from-primary/10 via-secondary/5 to-transparent border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-display font-black mb-4 accent-gradient"
              >
                Liam Kurt Kasten C. Edano
              </motion.h1>
              <div className="flex flex-wrap gap-4 text-text-muted">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> San Fernando City, La Union</span>
                <span className="flex items-center gap-1.5"><Mail size={16} /> liamkurt014@gmail.com</span>
                <span className="flex items-center gap-1.5"><Phone size={16} /> +63 994 108 3840</span>
              </div>
            </div>
            <motion.a
              href={resumePdf}
              download="Liam_Kurt_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
            >
              <Download size={18} />
              Download PDF
            </motion.a>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-20">
          {/* Experience Section */}
          <Section title="Experience" icon={Briefcase}>
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-primary/20 mb-10 last:mb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                <div className="text-primary font-medium text-sm mb-4">{exp.company} | {exp.period}</div>
                <p className="text-text-muted leading-relaxed text-lg">{exp.desc}</p>
              </div>
            ))}
          </Section>

          {/* Education Section */}
          <Section title="Education" icon={GraduationCap} delay={0.1}>
            <div className="space-y-10">
              {education.map((edu, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-xl font-bold leading-tight">{edu.degree}</h3>
                  <div className="text-primary font-medium">{edu.school}</div>
                  <div className="text-text-muted text-sm">{edu.period} • {edu.location}</div>
                  {edu.details && (
                    <p className="text-base text-text-muted italic border-l-2 border-primary/20 pl-4 mt-3">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Skills Section */}
          <Section title="Technical Skills" icon={Code2} delay={0.2}>
            <div className="flex flex-wrap gap-3">
              {skills.technical.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 text-base font-medium hover:bg-primary/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Design & Tools" icon={Palette} delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {skills.design.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-secondary/5 border border-secondary/10 text-base font-medium hover:bg-secondary/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </Section>



          <Section title="Achievements" icon={Award} delay={0.4}>
            <div className="space-y-6">
              {achievements.map((ach, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-text/5 border border-border hover:border-primary/30 transition-colors group">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{ach.title}</h3>
                  <div className="text-base text-text-muted mb-3 font-medium">{ach.organization}</div>
                  <p className="text-base text-text-muted italic leading-relaxed">{ach.desc}</p>
                </div>
              ))}
            </div>
          </Section>

         

        </div>
      </div>
    </div>
  );
};

export default ResumePage;
