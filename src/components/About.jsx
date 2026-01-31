import { motion } from 'framer-motion';
import profileIllustration from '../assets/profile_illustration.png';

const infoCards = [
  { label: 'Education', value: 'BS IT', sub: 'Saint Louis College', color: 'text-primary' },
  { label: 'Location', value: 'La Union', sub: 'San Fernando City', color: 'text-secondary' },
  { label: 'Projects', value: '2+', sub: 'Key Highlights', color: 'text-accent' },
  { label: 'Focus', value: 'Full-stack', sub: 'Web & Mobile', color: 'text-primary' },
];

const interests = ['Web Prep', 'UI/UX', 'Mobile Dev', 'Supabase', 'React Native'];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Visuals */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start relative"
          >
            <div className="relative z-10 glass rounded-[40px] p-2 overflow-hidden aspect-square max-w-md w-full mx-auto lg:mx-0">
               <motion.img 
                src={profileIllustration} 
                alt="Profile Illustration"
                className="w-full h-full object-cover rounded-[38px]"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
               />
            </div>

            {/* Interest Badges moved here */}
            <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start w-full">
              {interests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/5 transition-colors cursor-default"
                >
                  #{interest}
                </span>
              ))}
            </div>

            {/* Background blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tracing My Path in Tech
            </h2>
            
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              I'm an IT student from San Fernando City, La Union, passionate about the intersection of design and functionality. Currently pursuing my BS in Information Technology at Saint Louis College, I focus on creating seamless user experiences across web and mobile platforms.
            </p>
            <p className="text-lg text-text-muted leading-relaxed mb-10">
              My journey involves hands-on experience with React Native, Supabase, and full-stack architecture. I love turning complex problems into elegant, user-centric solutions that make a difference.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {infoCards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="glass p-5 rounded-2xl border-white/5"
                >
                  <span className={`block text-2xl font-bold ${card.color}`}>{card.value}</span>
                  <span className="block text-sm font-semibold text-text mt-1">{card.label}</span>
                  <span className="block text-xs text-text-muted mt-0.5">{card.sub}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
