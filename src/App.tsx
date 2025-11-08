import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Features from './components/Features';
import CaseStudy from './components/CaseStudy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import SocialMediaBar from './components/SocialMediaBar';
import EducationDashboard from './components/EducationDashboard';
import { PageTransition } from './components/animations';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
          {/* ✅ Main Home Page Route */}
          <Route
            path="/"
            element={
              <PageTransition>
                <div className="relative min-h-screen flex flex-col bg-white dark:bg-dark-bg transition-colors duration-300">
                <Header />
                <SocialMediaBar />
                <Hero />
                <About />
                <Services />
                <Features />
                <CaseStudy /> {/* <-- stays before Contact */}
                <Contact />
                <Footer />
                <AIChat />
                </div>
              </PageTransition>
            }
          />

          {/* ✅ Education Dashboard Route */}
          <Route
            path="/educationdashboard"
            element={
              <PageTransition>
                <div className="relative min-h-screen flex flex-col bg-white dark:bg-dark-bg transition-colors duration-300">
                  <EducationDashboard />
                </div>
              </PageTransition>
            }
          />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
