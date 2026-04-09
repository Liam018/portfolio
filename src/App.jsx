import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectHighlight from './components/ProjectHighlight';
import ChatBot from './components/ChatBot';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasVisited');
    }
    return true;
  });

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Lock scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      {!isLoading && (
        <div className="min-h-screen relative overflow-x-hidden">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <ProjectHighlight />
          <ChatBot />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
