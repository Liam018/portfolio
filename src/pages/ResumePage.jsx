import { useEffect } from 'react';
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
  Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import resumePdf from '../assets/Resume2026_LiamEdaño.pdf';

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
    technical: ["Javascript (React.js)", "Typescript (React Native)", "PHP (Laravel)", "HTML", "CSS", "Tailwind", "PostgreSQL", "MySQL", "Django REST"],
    design: ["Framer", "Figma", "Photoshop", "Canva", "Capcut"],
    professional: ["Team collaboration", "Time management", "Adaptable", "Service-oriented"]
  };

  const experience = [
    {
      title: "On-the-Job Training",
      company: "National Food Authority (NFA) – Regional Office I",
      period: "February 2026 – June 2026",
      location: "Urbiztondo, San Juan, La Union",
      bullets: [
        "Programmed and configured systems for the office to optimize daily workflows and digital processes.",
        "Handled daily office operations and maintained accurate files and documentation.",
        "Troubleshot technical issues with office systems and general equipment."
      ]
    }
  ];

  const projects = [
    {
      title: "NFA Interactive Information Kiosk",
      context: "National Food Authority (NFA) – Regional Office I | On-the-Job Training Project",
      period: "February 2026 – June 2026",
      bullets: [
        "Created a touch-friendly public kiosk displaying real-time announcements, media galleries, and videos, with responsive features like zoomable Citizen's Charter views, interactive org charts, and animated content.",
        "Developed content management modules with full CRUD for updates, staff directories, and GAD showcases, plus secure admin tools for bulk uploads, drag-and-drop organization, and efficient asset handling.",
        "Implemented user account and system configuration management with Laravel Sanctum for secure sessions and protected administrative access."
      ]
    },
    {
      title: "ProjeSight (Project Locator)",
      context: "National Food Authority (NFA) – Regional Office I | On-the-Job Training Project",
      period: "February 2026 – June 2026",
      bullets: [
        "Developed an interactive, responsive GIS mapping system using React-Leaflet with enterprise-grade UI design, fluid navigation, and deep-linking.",
        "Built secure full-stack functionalities including JWT authentication, role-based access control, optimized SQL database queries, and multi-file image uploads.",
        "Implemented advanced data management features for real-time search, sorting, activity auditing, and automated PDF report generation."
      ]
    },
    {
      title: "SHERCLE: A Mobile-Based SOS and Community Support System",
      context: "e-Gov Competition Entry",
      period: "March 2026",
      bullets: [
        "Programmed the mobile UI/UX, implementing intuitive interfaces tailored for emergency response and community safety features."
      ]
    },
    {
      title: "AgriLAKO: Agricultural E-Commerce System",
      context: "Capstone Project",
      period: "March 2025 – December 2025",
      bullets: [
        "Programmed a web-based admin system for the Office of the Provincial Agriculturist (OPAG) to manage agricultural data and cooperative activities.",
        "Developed a mobile application for sellers and buyers in La Union to handle product listings, orders, and transaction tracking.",
        "Collaborated with government staff and local cooperatives to test, debug, and align system features with real-world needs."
      ]
    }
  ];

  const achievements = [
    {
      title: "1st Runner-Up (2nd Place) – 7th eGov Awards 2026",
      organization: "Women in STEM Summit | City of San Fernando, La Union",
      desc: "SHERCLE – A mobile-based SOS and Community Support System featuring emergency alerts, live location sharing, and incident reporting to improve community safety and emergency response coordination."
    },
    {
      title: "3rd Place (Most Viable Product) – PATCH Hackathon 2025",
      organization: "Provincial Application and Tool for Citizens Hackathon | City of San Fernando, La Union",
      desc: "AgriLAKO – A mobile and web e-commerce platform enabling farmer cooperatives to directly market and sell their products to consumers and businesses."
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "Saint Louis College",
      period: "2022 – 2026",
      location: "City of San Fernando, La Union",
      details: "Capstone: AgriLAKO – Agricultural E-Commerce System for La Union Sellers and Buyers"
    },
    {
      degree: "Senior High School & Junior High School",
      school: "Saint Louis College",
      period: "2016 – 2022",
      location: "City of San Fernando, La Union"
    },
    {
      degree: "Primary Level",
      school: "Dalumpinas Integrated School",
      period: "2012",
      location: "Dalumpinas Este, City of San Fernando, La Union"
    }
  ];

  const seminars = [
    {
      title: "Cybersecurity Awareness and Workshop",
      org: "Saint Louis College, City of San Fernando, La Union",
      period: "April 2025"
    },
    {
      title: "IT Careers and Opportunities",
      org: "University of the Philippines Information Technology Development Center (UPITDC), Quezon City, Manila",
      period: "March 2025"
    },
    {
      title: "Startup & Design Thinking Seminar",
      org: "Saint Louis College, City of San Fernando, La Union",
      period: "February 2025"
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
        {/* Header */}
        <div className="p-8 md:p-12 bg-linear-to-br from-primary/10 via-secondary/5 to-transparent border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-display font-black mb-2 accent-gradient"
              >
                Liam Kurt Kasten C. Edaño
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-text-muted text-base mb-4 max-w-xl leading-relaxed"
              >
                Full-Stack Developer specializing in React, React Native, Laravel, and responsive Web Development — building clean, high-performance, user-centered digital experiences.
              </motion.p>
              <div className="flex flex-wrap gap-4 text-text-muted text-sm">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> Bangcusay, City of San Fernando, La Union</span>
                <span className="flex items-center gap-1.5"><Mail size={16} /> liamkurt014@gmail.com</span>
                <span className="flex items-center gap-1.5"><Phone size={16} /> +63 994 108 3840</span>
              </div>
            </div>
            <motion.a
              href={resumePdf}
              download="Resume2026_LiamEdano.pdf"
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

          {/* Work Experience Section */}
          <Section title="Work Experience" icon={Briefcase}>
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-primary/20 mb-10 last:mb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                <div className="text-primary font-medium text-sm mb-1">{exp.company}</div>
                <div className="text-text-muted text-xs mb-4">{exp.period} • {exp.location}</div>
                <ul className="space-y-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-text-muted leading-relaxed text-base">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          {/* Projects Section */}
          <Section title="Projects" icon={Code2} delay={0.05}>
            <div className="space-y-10">
              {projects.map((proj, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-secondary/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary" />
                  <h3 className="text-xl font-bold mb-1">{proj.title}</h3>
                  <div className="text-secondary font-medium text-sm mb-1">{proj.context}</div>
                  <div className="text-text-muted text-xs mb-3">{proj.period}</div>
                  <ul className="space-y-2">
                    {proj.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-text-muted leading-relaxed text-base">
                        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-secondary/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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

          <Section title="Design & Tools" icon={Palette} delay={0.25}>
            <div className="flex flex-wrap gap-3">
              {skills.design.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-secondary/5 border border-secondary/10 text-base font-medium hover:bg-secondary/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Professional Skills" icon={BookOpen} delay={0.28}>
            <div className="flex flex-wrap gap-3">
              {skills.professional.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-text/5 border border-border text-base font-medium hover:bg-text/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          {/* Seminars Section */}
          <Section title="Seminars & Trainings" icon={BookOpen} delay={0.32}>
            <div className="space-y-6">
              {seminars.map((s, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/60" />
                  <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                  <div className="text-text-muted text-sm">{s.org}</div>
                  <div className="text-primary text-xs font-medium mt-1">{s.period}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Achievements Section */}
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
