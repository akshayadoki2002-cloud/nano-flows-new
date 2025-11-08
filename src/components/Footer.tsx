import { useTheme } from '../context/ThemeContext';
import { ArrowUp } from 'lucide-react';

const AnimatedIconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="group inline-flex transition-transform duration-300 ease-out hover:scale-110 hover:brightness-105">
    {children}
  </div>
);

const FacebookIcon = ({ size = 36 }) => (
  <AnimatedIconWrapper>
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#1877F3" />
      <path
        d="M23 13.5h-2c-.8 0-1 .4-1 1v2h3l-.4 3H20v8h-3v-8h-2v-3h2v-2c0-2 1-3.5 3.5-3.5H23v3z"
        fill="#fff"
      />
    </svg>
  </AnimatedIconWrapper>
);

const InstagramIcon = ({ size = 36 }) => (
  <AnimatedIconWrapper>
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#instaGradient)" />
      <rect
        x="12"
        y="12"
        width="16"
        height="16"
        rx="6"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="20" cy="20" r="5" stroke="#fff" strokeWidth="2" fill="none" />
      <circle cx="26.5" cy="13.5" r="1.5" fill="#fff" />
    </svg>
  </AnimatedIconWrapper>
);

const LinkedinIcon = ({ size = 36 }) => (
  <AnimatedIconWrapper>
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#0077B5" />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="18"
        fill="#fff"
      >
        in
      </text>
    </svg>
  </AnimatedIconWrapper>
);

const TwitterIcon = ({ size = 36 }) => (
  <AnimatedIconWrapper>
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#1DA1F2" />
      <path
        d="M31 14.2c-.6.3-1.2.5-1.8.6a3.3 3.3 0 0 0 1.5-1.8c-.7.4-1.4.7-2.1.9a3.3 3.3 0 0 0-5.6 3c-2.7-.2-5.1-1.4-6.7-3.4-.3.5-.5 1-.5 1.6 0 1.1.6 2.1 1.5 2.7-.6 0-1.1-.2-1.6-.4v.1c0 1.5 1 2.7 2.3 3-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.2 1.5 2.1 2.9 2.1a6.7 6.7 0 0 1-4.9 1.3 9.3 9.3 0 0 0 5 1.5c6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.2-1.1 1.6-1.8z"
        fill="#fff"
      />
    </svg>
  </AnimatedIconWrapper>
);

const ThreadsIcon = ({ size = 36 }) => (
  <AnimatedIconWrapper>
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#000000" />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="18"
        fill="#fff"
      >
        @
      </text>
    </svg>
  </AnimatedIconWrapper>
);

const Footer = () => {
  const { theme } = useTheme();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerSections = [
    { title: 'Products', links: ['AI Solutions', 'Cloud Platform', 'Analytics Tools', 'Mobile Apps', 'API Services'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press', 'Partners'] },
    { title: 'Resources', links: ['Documentation', 'API Reference', 'Case Studies', 'Webinars', 'Support Center'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'Compliance'] },
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: ThreadsIcon, href: '#', label: 'Threads' },
  ];

  return (
    <footer 
      className={`relative overflow-hidden ${theme === 'dark' ? 'bg-black border-t border-electric-blue/20' : 'bg-gray-50 border-t border-gray-200'}`}
      role="contentinfo"
    >
      <div className={`absolute inset-0 ${theme === 'dark' ? 'gradient-mesh' : 'gradient-mesh-light'}`} aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-8 sm:mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <img 
                src="/NanoFlows-LOGO-removebg-preview.png" 
                alt="Nano Flows Logo" 
                className="h-28 w-28 sm:h-36 sm:w-36 object-contain" 
                loading="lazy"
              />
            </div>
            <p className={`text-sm font-exo leading-relaxed mb-6 max-w-sm mx-auto lg:mx-0 text-center lg:text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Pioneering the future of digital innovation through AI-powered solutions and seamless
              user experiences. Flowing into the future, one innovation at a time.
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={`Follow us on ${social.label}`}
                    className="inline-block transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full focus:ring-electric-blue"
                    tabIndex={0}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {footerSections.map((section, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <h4 className={`font-orbitron font-bold mb-4 text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className={`text-sm font-exo transition-all duration-300 hover:translate-x-1 inline-block focus:outline-none focus:underline ${
                        theme === 'dark' ? 'text-gray-400 hover:text-electric-green' : 'text-gray-600 hover:text-accent-red'
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className={`pt-6 sm:pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${theme === 'dark' ? 'border-electric-blue/20' : 'border-gray-200'}`}>
          <p className={`text-xs sm:text-sm font-exo text-center md:text-left ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Nano Flows. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4 sm:space-x-6" aria-label="Footer legal links">
            <a href="#" className={`text-xs sm:text-sm font-exo transition-all duration-300 focus:outline-none focus:underline ${theme === 'dark' ? 'text-gray-400 hover:text-electric-blue' : 'text-gray-600 hover:text-accent-red'}`}>Privacy</a>
            <a href="#" className={`text-xs sm:text-sm font-exo transition-all duration-300 focus:outline-none focus:underline ${theme === 'dark' ? 'text-gray-400 hover:text-electric-blue' : 'text-gray-600 hover:text-accent-red'}`}>Terms</a>
            <a href="#" className={`text-xs sm:text-sm font-exo transition-all duration-300 focus:outline-none focus:underline ${theme === 'dark' ? 'text-gray-400 hover:text-electric-blue' : 'text-gray-600 hover:text-accent-red'}`}>Cookies</a>
          </nav>
        </div>
      </div>
      
      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 sm:bottom-24 right-6 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-40 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          theme === 'dark'
            ? 'bg-dark-card text-electric-blue border border-electric-blue/30 hover:bg-electric-blue hover:text-black hover:glow-blue focus:ring-electric-blue'
            : 'bg-white text-accent-red border border-accent-red/30 hover:bg-accent-red hover:text-white hover:glow-red shadow-lg focus:ring-accent-red'
        }`}
        aria-label="Scroll to top of page"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
