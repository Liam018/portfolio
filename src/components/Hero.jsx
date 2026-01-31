import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6 inline-block">
            Available for Internships & Projects
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-tight">
            Building Digital <br />
            <span className="accent-gradient">Experiences</span> that Matter
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-muted mb-10">
            IT Student from La Union specializing in Full-stack Development, 
            UI/UX Design, and building impactful mobile & web applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#project-highlight" className="btn-primary w-full sm:w-auto text-center">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 border border-border hover:bg-text/5 rounded-full font-medium transition-all w-full sm:w-auto text-center">
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
