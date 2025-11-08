import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Features', href: '#features' },
    { name: 'Case Study', href: '#case-study' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-black/90 backdrop-blur-lg shadow-lg shadow-electric-blue/10'
            : 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-4 sm:px-6" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center flex-shrink-0">
            <a href="#home" onClick={handleNavClick} aria-label="Nano Flows Home">
              <img
                src="/NanoFlows-LOGO-removebg-preview.png"
                alt="Nano Flows Logo"
                className="h-14 w-16 sm:h-16 sm:w-18 object-contain"
                loading="eager"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-exo font-medium transition-all duration-300 relative group text-base lg:text-lg ${
                  theme === 'dark'
                    ? 'text-white hover:text-electric-green'
                    : 'text-black hover:text-accent-red'
                }`}
                aria-label={`Navigate to ${link.name}`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    theme === 'dark' ? 'bg-electric-green' : 'bg-accent-red'
                  }`}
                  aria-hidden="true"
                />
              </a>
            ))}

            <a
              href="/login"
              className={`font-exo font-medium px-5 py-2.5 rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark'
                  ? 'bg-electric-blue text-black hover:bg-electric-green focus:ring-electric-blue'
                  : 'bg-accent-red text-white hover:bg-red-600 focus:ring-accent-red'
              }`}
              aria-label="Login to your account"
            >
              Login
            </a>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark'
                  ? 'bg-dark-card hover:bg-dark-lighter text-electric-blue hover:glow-blue focus:ring-electric-blue'
                  : 'bg-gray-100 hover:bg-gray-200 text-accent-red hover:glow-red focus:ring-accent-red'
              }`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark' 
                  ? 'text-white hover:bg-dark-lighter focus:ring-electric-blue' 
                  : 'text-black hover:bg-gray-100 focus:ring-accent-red'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className={`md:hidden mt-2 py-4 px-2 rounded-lg mb-4 ${
              theme === 'dark' ? 'bg-dark-card' : 'bg-white shadow-lg'
            }`}
            role="menu"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className={`block px-4 py-3 font-exo transition-all duration-300 rounded-md ${
                  theme === 'dark'
                    ? 'text-white hover:text-electric-green hover:bg-dark-lighter'
                    : 'text-black hover:text-accent-red hover:bg-gray-50'
                }`}
                role="menuitem"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/login"
              onClick={handleNavClick}
              className={`block mx-4 mt-4 py-3 font-exo font-medium rounded-md text-center transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-electric-blue text-black hover:bg-electric-green'
                  : 'bg-accent-red text-white hover:bg-red-600'
              }`}
              role="menuitem"
            >
              Login
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
