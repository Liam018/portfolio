import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Palette, CheckCircle2 } from 'lucide-react';

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Enter/Exit transitions
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const categories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-6 h-6 text-primary" />,
      desc: "Building intuitive interfaces",
      color: "bg-primary/10",
      skills: ["React.js", "React Native", "Tailwind CSS", "HTML", "CSS", "JavaScript", "TypeScript"]
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 text-secondary" />,
      desc: "Architecting solid logic",
      color: "bg-secondary/10",
      skills: ["PostgreSQL", "Django REST", "MariaDB/SQL", "Laravel"]
    },
    {
      title: "Design",
      icon: <Palette className="w-6 h-6 text-accent" />,
      desc: "Designing user journeys",
      color: "bg-accent/10",
      skills: ["Photoshop", "Figma", "Framer"]
    }
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const skillVars = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section ref={containerRef} id="skills" className="py-24 relative overflow-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">The Toolbox</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            A comprehensive overview of my technical stack and the tools I use to bring digital ideas to life.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              variants={itemVars}
              className="glass p-8 rounded-[32px] hover:border-primary/30 transition-all duration-500 group relative"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl ${cat.color} relative overflow-hidden`}>
                  {cat.icon}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text">{cat.title}</h3>
                  <p className="text-xs text-text-muted">{cat.desc}</p>
                </div>
              </div>

              {/* Skills Tag Cloud */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <motion.div
                    key={skill}
                    variants={skillVars}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center px-3 py-1.5 rounded-xl bg-text/5 border border-border text-sm text-text-muted hover:text-text hover:bg-text/10 hover:border-primary/30 transition-all cursor-default"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1.5 text-primary opacity-50" />
                    {skill}
                  </motion.div>
                ))}
              </div>

              {/* Subtle background glow */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${cat.color} blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
