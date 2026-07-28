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
      title: "Frontend Development",
      icon: <Code2 className="w-5 h-5" />,
      desc: "Creating responsive, high-performance interfaces",
      color: "bg-primary/10",
      skills: ["React.js", "React Native", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript"],
      orbitInner: [
        <FaReact key="react" className="text-[#61DAFB] size-6" />,
        <SiJavascript key="js" className="text-[#F7DF1E] size-6" />
      ],
      orbitOuter: [
        <SiTailwindcss key="tailwind" className="text-[#06B6D4] size-7" />,
        <SiTypescript key="ts" className="text-[#3178C6] size-7" />,
        <FaHtml5 key="html" className="text-[#E34F26] size-7" />,
        <FaCss3Alt key="css" className="text-[#1572B6] size-7" />
      ]
    },
    {
      title: "Backend Architecture",
      icon: <Server className="w-5 h-5" />,
      desc: "Engineering scalable APIs & databases",
      color: "bg-primary/10",
      skills: ["PostgreSQL", "Django REST", "MariaDB / SQL", "Laravel"],
      orbitInner: [
        <SiPostgresql key="postgres" className="text-[#4169E1] size-6" />,
        <FaLaravel key="laravel" className="text-[#FF2D20] size-6" />
      ],
      orbitOuter: [
        <SiDjango key="django" className="text-[#092E20] size-7" />,
        <SiMariadb key="mariadb" className="text-[#003545] size-7" />,
        <FaDatabase key="sql" className="text-primary size-7" />
      ]
    },
    {
      title: "UI/UX & Design",
      icon: <Palette className="w-5 h-5" />,
      desc: "Crafting modern user experiences & prototypes",
      color: "bg-primary/10",
      skills: ["Figma", "Photoshop", "Framer"],
      orbitInner: [
        <FaFigma key="figma" className="text-[#F24E1E] size-6" />,
        <SiFramer key="framer" className="text-text size-6" />
      ],
      orbitOuter: [
        <DiPhotoshop key="ps" className="text-[#31A8FF] size-7" />,
        <FaFigma key="figma2" className="text-[#A259FF] size-7" />
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
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }
  };

  return (
    <section ref={containerRef} id="skills" className="py-12 sm:py-20 lg:py-24 relative overflow-hidden bg-background text-text select-none">
      <motion.div 
        style={{ opacity, scale, transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Editorial Section Header */}
        <div className="space-y-2.5 mb-10 sm:mb-16 text-left max-w-2xl">
          <div className="inline-flex items-center gap-2">
            {/* <span className="h-1.5 w-1.5 rounded-full bg-primary" /> */}
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
              // The Toolbox
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-text tracking-tight leading-tight">
            Skills & Technologies.
          </h2>
          <p className="text-xs sm:text-base text-text-muted leading-relaxed font-normal">
            A comprehensive overview of my core technical stack, engineering tools, and design workflow.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={itemVars}
              className="bg-card/40 border border-border/60 p-6 sm:p-7 rounded-2xl hover:border-primary/50 hover:bg-card/70 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md hover:shadow-primary/5"
            >
              {/* Orbiting Circles Background */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                <OrbitingCircles className="size-7 border-none bg-transparent" duration={22} radius={70}>
                  {cat.orbitInner}
                </OrbitingCircles>
                <OrbitingCircles className="size-8.5 border-none bg-transparent" reverse duration={32} radius={115}>
                  {cat.orbitOuter}
                </OrbitingCircles>
              </div>

              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-extrabold text-text group-hover:text-primary transition-colors">{cat.title}</h3>
                    <p className="text-xs text-text-muted">{cat.desc}</p>
                  </div>
                </div>

                {/* Skills Tag Cloud (Genesis Pill Style) */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={skillVars}
                      whileHover={{ scale: 1.04, y: -1 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 border border-border/70 text-xs font-mono text-text-muted hover:text-text hover:border-primary/50 hover:bg-card/90 transition-all cursor-default select-none min-h-[32px]"
                    >
                      <CheckCircle2 size={12} className="text-primary shrink-0" aria-hidden="true" />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Ambient Hover Glow */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-primary/10 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
