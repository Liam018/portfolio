import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ChevronLeft,
  Award,
  BookOpen,
  Code2,
  Palette,
  ExternalLink,
  Sparkles,
  Github,
  Linkedin,
  Printer,
  FileText,
  Terminal,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import resumePdf from '../assets/Resume2026_LiamEdaño.pdf';
import logoAsset from '../assets/LKKE.png';
import profile from '../assets/profile1.png';

const SectionHeader = ({ title, icon: Icon, badge }) => (
  <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-border/60">
    <div className="flex items-center gap-3">
      <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
        <Icon size={20} />
      </div>
      <h2 className="text-xl sm:text-2xl font-display font-bold text-text tracking-tight">{title}</h2>
    </div>
    {badge && (
      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
        {badge}
      </span>
    )}
  </div>
);

const ResumePage = () => {
  const [copiedContact, setCopiedContact] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const skills = {
    technical: [
      { name: "React / React.js", category: "Frontend" },
      { name: "React Native (Expo)", category: "Mobile" },
      { name: "TypeScript / JavaScript", category: "Language" },
      { name: "PHP / Laravel", category: "Backend" },
      { name: "PostgreSQL / Supabase", category: "Database" },
      { name: "MySQL / MariaDB", category: "Database" },
      { name: "Django REST Framework", category: "Backend" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "HTML5 / CSS3", category: "Core" }
    ],
    design: ["Framer", "Figma", "Photoshop"],
    professional: ["Team Collaboration", "Time Management", "Adaptable & Quick Learner", "Service-Oriented", "Agile & Problem Solving"]
  };

  const experience = [
    {
      title: "On-the-Job Training Developer",
      company: "National Food Authority (NFA) – Regional Office I",
      period: "February 2026 – June 2026",
      location: "Urbiztondo, San Juan, La Union",
      type: "Government Internship",
      bullets: [
        "Programmed and configured internal digital systems to optimize daily office workflows, document tracking, and administrative processes.",
        "Handled daily technical operations, hardware troubleshooting, and accurate digital record keeping.",
        "Designed and deployed enterprise-grade web applications and interactive public kiosk interfaces."
      ]
    }
  ];

  const projects = [
    {
      title: "NFA Interactive Information Kiosk",
      context: "NFA Regional Office I | OJT Flagship Project",
      period: "Feb 2026 – Jun 2026",
      tech: ["React", "Laravel Sanctum", "Tailwind", "REST API"],
      bullets: [
        "Created a touch-friendly public kiosk displaying real-time announcements, media galleries, interactive Citizen's Charter, and staff organization charts.",
        "Built admin portal with full CRUD content management, drag-and-drop ordering, and secure bulk media uploads.",
        "Implemented Laravel Sanctum authentication for secure administrative access and role-based session control."
      ]
    },
    {
      title: "ProjeSight (Project Locator System)",
      context: "NFA Regional Office I | OJT Project",
      period: "Feb 2026 – Jun 2026",
      tech: ["React", "React-Leaflet (GIS)", "PostgreSQL", "JWT"],
      bullets: [
        "Developed an interactive GIS mapping system using React-Leaflet with enterprise UI, smooth zooming, and location deep-linking.",
        "Built full-stack JWT authentication, optimized SQL queries, activity auditing logs, and multi-file image uploads.",
        "Engineered automated PDF report generation and real-time project status filtering."
      ]
    },
    {
      title: "SHERCLE: SOS & Community Support System",
      context: "7th eGov Awards 2026 | 1st Runner-Up",
      period: "March 2026",
      tech: ["React Native", "Expo", "Supabase", "Tailwind"],
      bullets: [
        "Designed and programmed the mobile emergency SOS application for real-time alert broadcasts, live GPS location sharing, and incident reporting."
      ]
    },
    {
      title: "AgriLAKO: Agricultural E-Commerce System",
      context: "Capstone Project & 3rd Place PATCH Hackathon",
      period: "Mar 2025 – Dec 2025",
      tech: ["React Native", "React", "PostgreSQL", "Expo"],
      bullets: [
        "Developed a web dashboard for the Office of the Provincial Agriculturist (OPAG) to monitor agricultural cooperative trades and sales.",
        "Built a cross-platform mobile app for La Union farmers and buyers featuring product listings, order management, and trade tracking.",
        "Collaborated with local government officials and farming cooperatives for field testing and iterative feature alignment."
      ]
    }
  ];

  const achievements = [
    {
      title: "1st Runner-Up (2nd Place) – 7th eGov Awards 2026",
      organization: "Women in STEM Summit | City of San Fernando, La Union",
      desc: "SHERCLE – A mobile-based SOS and Community Support System featuring emergency alerts, live location sharing, and incident reporting."
    },
    {
      title: "3rd Place (Most Viable Product) – PATCH Hackathon 2025",
      organization: "Provincial Application and Tool for Citizens Hackathon | La Union",
      desc: "AgriLAKO – Agricultural e-commerce platform enabling farmer cooperatives to market products directly to consumers and businesses."
    }
  ];

  const education = [
    {
      degree: "BS in Information Technology",
      school: "Saint Louis College",
      period: "2022 – 2026",
      location: "City of San Fernando, La Union",
      details: "Capstone: AgriLAKO – Agricultural E-Commerce System for La Union"
    },
    {
      degree: "Senior & Junior High School",
      school: "Saint Louis College",
      period: "2016 – 2022",
      location: "City of San Fernando, La Union"
    },
    {
      degree: "Primary Level",
      school: "Dalumpinas Integrated School",
      period: "2012 – 2016",
      location: "City of San Fernando, La Union"
    }
  ];

  const seminars = [
    {
      title: "Cybersecurity Awareness & Workshop",
      org: "Saint Louis College, La Union",
      period: "April 2025"
    },
    {
      title: "IT Careers & Opportunities Seminar",
      org: "UPITDC, Quezon City, Manila",
      period: "March 2025"
    },
    {
      title: "Startup & Design Thinking Seminar",
      org: "Saint Louis College, La Union",
      period: "February 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Top Floating Glass Header Bar */}
      <div className="max-w-6xl mx-auto mb-8 sticky top-4 z-50">
        <div className="glass rounded-full px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-xl border border-white/10 shadow-xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-text-muted hover:text-primary transition-colors group"
          >
            <div className="p-1.5 rounded-full bg-text/5 border border-border group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 text-xs font-mono font-medium text-text-muted px-3 py-1 rounded-full bg-text/5 border border-border">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Available for Opportunities
            </span>

            <motion.a
              href={resumePdf}
              download="Resume2026_LiamEdano.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 sm:px-5 py-2 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm rounded-full font-bold flex items-center gap-2 shadow-lg shadow-primary/25 transition-all"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main Resume Container */}
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-border">
          
          {/* Hero Header Section */}
          <div className="p-6 sm:p-10 md:p-12 bg-linear-to-br from-primary/15 via-secondary/10 to-transparent border-b border-border/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 text-center md:text-left">
              {/* Profile Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-2xl bg-black/40 group">
                  <img 
                    src={profile} 
                    alt="Liam Kurt Edaño" 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
              </div>

              {/* Bio & Details */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest">
                    BSIT Graduate • 2026
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-bold uppercase tracking-widest">
                    Full-Stack Developer
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-text tracking-tight">
                  Liam Kurt Kasten <span className="accent-gradient">C. Edaño</span>
                </h1>

                <p className="text-text-muted text-sm sm:text-base max-w-2xl leading-relaxed font-light">
                  Passionate Full-Stack Developer specializing in React, React Native, Laravel, PostgreSQL, and responsive web applications — dedicated to building clean, scalable, and impact-driven digital experiences.
                </p>

                {/* Contact Chips */}
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-medium text-text-muted">
                  <a 
                    href="mailto:liamkurt014@gmail.com" 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-text/5 border border-border hover:border-primary/40 hover:text-primary transition-all"
                  >
                    <Mail size={14} className="text-primary" />
                    <span>liamkurt014@gmail.com</span>
                  </a>
                  
                  <a 
                    href="tel:+639941083840" 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-text/5 border border-border hover:border-primary/40 hover:text-primary transition-all"
                  >
                    <Phone size={14} className="text-accent" />
                    <span>+63 994 108 3840</span>
                  </a>

                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-text/5 border border-border">
                    <MapPin size={14} className="text-secondary" />
                    <span>San Fernando, La Union</span>
                  </span>

                  <a 
                    href="https://github.com/Liam018" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-text/5 border border-border hover:border-primary/40 hover:text-text transition-all"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/liam-kurt-kasten-edano-bb47623a9" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-text/5 border border-border hover:border-primary/40 hover:text-primary transition-all"
                  >
                    <Linkedin size={14} className="text-blue-500" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Body: Single Column Layout */}
          <div className="p-6 sm:p-10 md:p-12 space-y-12 max-w-4xl mx-auto">

            {/* Work Experience */}
            <section>
              <SectionHeader title="Work Experience" icon={Briefcase} badge="Internship" />
              
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i} className="p-5 sm:p-6 rounded-2xl bg-text/5 border border-border hover:border-primary/30 transition-all space-y-3">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-text">{exp.title}</h3>
                        <div className="text-primary font-semibold text-sm">{exp.company}</div>
                      </div>
                      <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-xs text-text-muted flex items-center gap-1.5">
                      <MapPin size={12} />
                      <span>{exp.location}</span>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-border/50">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted leading-relaxed">
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Projects */}
            <section>
              <SectionHeader title="Highlighted Projects" icon={Code2} badge="4 Systems" />

              <div className="space-y-6">
                {projects.map((proj, i) => (
                  <div key={i} className="p-5 sm:p-6 rounded-2xl bg-text/5 border border-border hover:border-secondary/30 transition-all space-y-3 group">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">{proj.title}</h3>
                        <div className="text-secondary font-semibold text-xs sm:text-sm">{proj.context}</div>
                      </div>
                      <span className="text-[11px] font-mono text-text-muted px-2.5 py-0.5 rounded-md bg-text/5 border border-border">
                        {proj.period}
                      </span>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map(t => (
                        <span key={t} className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-border/50">
                      {proj.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted leading-relaxed">
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Honors & Awards */}
            <section>
              <SectionHeader title="Honors & Awards" icon={Award} badge="Competitions" />

              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((ach, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-linear-to-br from-primary/10 via-text/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all space-y-2 relative overflow-hidden group">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        <Award size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-text group-hover:text-primary transition-colors leading-tight">
                        {ach.title}
                      </h3>
                    </div>
                    <div className="text-xs font-medium text-primary">{ach.organization}</div>
                    <p className="text-xs text-text-muted leading-relaxed font-light italic">
                      "{ach.desc}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Skills & Design Tools */}
            <section className="space-y-6">
              <div>
                <SectionHeader title="Technical Stack" icon={Code2} />
                <div className="p-5 rounded-2xl bg-text/5 border border-border">
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map(skill => (
                      <span 
                        key={skill.name} 
                        className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/20 transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <SectionHeader title="Design & Creative Tools" icon={Palette} />
                  <div className="flex flex-wrap gap-2">
                    {skills.design.map(tool => (
                      <span 
                        key={tool} 
                        className="px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 text-xs font-semibold hover:bg-secondary/20 transition-all"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <SectionHeader title="Professional Skills" icon={BookOpen} />
                  <div className="flex flex-wrap gap-2">
                    {skills.professional.map(prof => (
                      <span 
                        key={prof} 
                        className="px-3 py-1.5 rounded-xl bg-text/5 border border-border text-xs font-medium text-text-muted hover:text-text transition-all"
                      >
                        {prof}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <SectionHeader title="Education" icon={GraduationCap} />

              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-text/5 border border-border space-y-1.5">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h3 className="text-base font-bold text-text">{edu.degree}</h3>
                      <span className="text-xs font-mono text-primary font-semibold">{edu.period}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-text-muted">{edu.school} • {edu.location}</div>
                    {edu.details && (
                      <p className="text-xs text-text-muted italic border-l-2 border-primary/30 pl-3 pt-1 mt-2">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Seminars & Certifications */}
            <section>
              <SectionHeader title="Seminars & Training" icon={Terminal} />

              <div className="grid sm:grid-cols-3 gap-3">
                {seminars.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl bg-text/5 border border-border space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-text leading-tight">{s.title}</h4>
                      <span className="text-[10px] font-mono text-primary shrink-0">{s.period}</span>
                    </div>
                    <div className="text-[11px] text-text-muted">{s.org}</div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Footer Bar inside Resume */}
          <div className="p-6 bg-text/5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted text-center sm:text-left">
            <div>
              © 2026 Liam Kurt Kasten C. Edaño. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:liamkurt014@gmail.com" className="hover:text-primary transition-colors">
                liamkurt014@gmail.com
              </a>
              <span>•</span>
              <a href="https://github.com/Liam018" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                GitHub
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/liam-kurt-kasten-edano-bb47623a9" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumePage;


