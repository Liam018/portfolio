import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import ProjectHighlight from '../components/ProjectHighlight';
import ChatBot from '../components/ChatBot';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <ProjectHighlight />
      <ChatBot />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
