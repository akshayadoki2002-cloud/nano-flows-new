import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import EducationDashboard from './components/EducationDashboard';// ✅ Added new page import

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* ✅ Main Home Page Route */}
          <Route
            path="/"
            element={
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
            }
          />

          {/* ✅ Education Dashboard Route */}
          <Route
            path="/educationdashboard"
            element={
              <div className="relative min-h-screen flex flex-col bg-white dark:bg-dark-bg transition-colors duration-300">
                <EducationDashboard />
              </div>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
