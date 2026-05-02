import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Portfolio from './pages/Portfolio';
import ResumePage from './pages/ResumePage';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import ScrollToTopFAB from './components/ScrollToTopFAB';

const Navigation = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/resume';
  return showNavbar ? <Navbar /> : null;
};

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
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      {!isLoading && (
        <div className="relative">
          <Navigation />
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
          <ScrollToTopFAB />
        </div>
      )}
    </Router>
  );
}

export default App;
