import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Palette, CheckCircle2 } from 'lucide-react';
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { FaReact, FaHtml5, FaCss3Alt, FaLaravel, FaFigma, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiJavascript, SiTypescript, SiPostgresql, SiDjango, SiMariadb, SiFramer } from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";

// Shared smooth transition
const smoothTransition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.6,
};

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  
  // Spring-smoothed enter/exit transitions
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useSpring(rawOpacity, smoothConfig);
  const scale = useSpring(rawScale, smoothConfig);

  const categories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-6 h-6 text-primary" />,
      desc: "Building intuitive interfaces",
      color: "bg-primary/10",
      skills: ["React.js", "React Native", "Tailwind CSS", "HTML", "CSS", "JavaScript", "TypeScript"],
      orbitInner: [
        <FaReact key="react" className="text-[#61DAFB] size-6" />,
        <SiJavascript key="js" className="text-[#F7DF1E] size-6" />
      ],
      orbitOuter: [
        <SiTailwindcss key="tailwind" className="text-[#06B6D4] size-8" />,
        <SiTypescript key="ts" className="text-[#3178C6] size-8" />,
        <FaHtml5 key="html" className="text-[#E34F26] size-8" />,
        <FaCss3Alt key="css" className="text-[#1572B6] size-8" />
      ]
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 text-secondary" />,
      desc: "Architecting solid logic",
      color: "bg-secondary/10",
      skills: ["PostgreSQL", "Django REST", "MariaDB/SQL", "Laravel"],
      orbitInner: [
        <SiPostgresql key="postgres" className="text-[#4169E1] size-6" />,
        <FaLaravel key="laravel" className="text-[#FF2D20] size-6" />
      ],
      orbitOuter: [
        <SiDjango key="django" className="text-[#092E20] size-8" />,
        <SiMariadb key="mariadb" className="text-[#003545] size-8" />,
        <FaDatabase key="sql" className="text-secondary size-8" />
      ]
    },
    {
      title: "Design",
      icon: <Palette className="w-6 h-6 text-accent" />,
      desc: "Designing user journeys",
      color: "bg-accent/10",
      skills: ["Photoshop", "Figma", "Framer"],
      orbitInner: [
        <FaFigma key="figma" className="text-[#F24E1E] size-6" />,
        <SiFramer key="framer" className="text-text size-6" />
      ],
      orbitOuter: [
        <DiPhotoshop key="ps" className="text-[#31A8FF] size-8" />,
        <FaFigma key="figma2" className="text-[#A259FF] size-8" />
      ]
    }
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: smoothTransition,
    }
  };

  const skillVars = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    }
  };

  return (
    <section ref={containerRef} id="skills" className="py-24 relative overflow-hidden">
      <motion.div 
        style={{ opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
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
          viewport={{ once: true, margin: "-15%" }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              variants={itemVars}
              className="glass p-8 rounded-[32px] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Orbiting Circles Background */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={20} radius={80}>
                  {cat.orbitInner}
                </OrbitingCircles>
                <OrbitingCircles className="size-[40px] border-none bg-transparent" reverse duration={30} radius={130}>
                  {cat.orbitOuter}
                </OrbitingCircles>
              </div>

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
                    whileHover={{ scale: 1.05, y: -2, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                    className="flex items-center px-3 py-1.5 rounded-xl bg-text/5 border border-border text-sm text-text-muted hover:text-text hover:bg-text/10 hover:border-primary/30 transition-all cursor-default"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1.5 text-primary" />
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
