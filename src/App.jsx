import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import ResumePage from './pages/resume';
import Navbar from './components/Navbar';
import ScrollToTopFAB from './components/ScrollToTopFAB';
import { ThemeProvider } from './components/ThemeProvider';

const Navigation = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/resume';
  return showNavbar ? <Navbar /> : null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative">
          <Navigation />
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
          <ScrollToTopFAB />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
