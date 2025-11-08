import { useState } from 'react';
import { Target, Users, Rocket, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: Target,
      title: 'Our Mission',
      content:
        'To empower businesses with cutting-edge AI technology that transforms digital experiences through seamless innovation and continuous evolution. We believe in creating solutions that flow naturally with your business needs.',
    },
    {
      icon: Users,
      title: 'Our Team',
      content:
        'A diverse collective of AI specialists, developers, designers, and innovators passionate about pushing the boundaries of technology. Our global team brings together expertise from multiple disciplines to deliver world-class solutions.',
    },
    {
      icon: Rocket,
      title: 'Our Vision',
      content:
        'To lead the future of digital transformation by pioneering AI-powered personalization that adapts, learns, and evolves with every interaction. We envision a world where technology seamlessly integrates into every aspect of business.',
    },
    {
      icon: TrendingUp,
      title: 'Our Growth',
      content:
        'From startup to industry leader, our journey has been marked by continuous innovation and expansion. With presence in 150+ countries and serving 500+ clients, we continue to grow while maintaining our commitment to excellence.',
    },
  ];

  return (
    <section
      id="about"
      className={`py-16 sm:py-20 md:py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'
      }`}
    >
      <div
        className={`absolute inset-0 ${
          theme === 'dark' ? 'gradient-mesh' : 'gradient-mesh-light'
        }`}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            About{' '}
            <span className={theme === 'dark' ? 'text-electric-blue' : 'text-accent-red'}>
              Nano Flows
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg font-exo max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Pioneering the future of digital innovation through AI-powered solutions and seamless
            user experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          <div
            className={`rounded-2xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-dark-card/50 border border-electric-blue/20'
                : 'bg-white/80 shadow-xl'
            }`}
          >
            <div className="relative h-48 sm:h-64 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-xl ${
                  theme === 'dark' ? 'bg-electric-blue/10' : 'bg-accent-blue/10'
                } animate-pulse-slow`}
                aria-hidden="true"
              />
              <img
                src="/NanoFlows-LOGO-removebg-preview.png"
                alt="Nano Flows Logo"
                className="relative z-10 h-36 w-36 sm:h-48 sm:w-48 animate-float object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3
              className={`text-2xl sm:text-3xl font-orbitron font-bold mb-4 sm:mb-6 ${
                theme === 'dark' ? 'text-electric-green' : 'text-accent-red'
              }`}
            >
              Transforming Ideas Into Reality
            </h3>
            <p
              className={`text-sm sm:text-base font-exo mb-4 leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Founded on the principle that technology should flow seamlessly with business needs,
              Nano Flows has become a trusted partner for organizations seeking to harness the
              power of AI and digital innovation.
            </p>
            <p
              className={`text-sm sm:text-base font-exo mb-6 leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Our approach combines cutting-edge technology with human-centered design, ensuring
              every solution we create is both powerful and intuitive. We don't just build products;
              we craft experiences that evolve with your business.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: 'Founded', value: '2018' },
                { label: 'Team Size', value: '200+' },
                { label: 'Projects', value: '1000+' },
                { label: 'Awards', value: '25+' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-dark-lighter border border-electric-blue/20'
                      : 'bg-gray-100'
                  }`}
                >
                  <div
                    className={`text-xl sm:text-2xl font-orbitron font-bold mb-1 ${
                      theme === 'dark' ? 'text-electric-blue' : 'text-accent-blue'
                    }`}
                  >
                    {item.value}
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-exo ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl p-6 sm:p-8 backdrop-blur-sm ${
            theme === 'dark'
              ? 'bg-dark-card/50 border border-electric-blue/20'
              : 'bg-white/80 shadow-xl'
          }`}
        >
          <nav className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center" role="tablist">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`tabpanel-${index}`}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-exo font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    activeTab === index
                      ? theme === 'dark'
                        ? 'bg-electric-blue text-black glow-blue scale-105 focus:ring-electric-blue'
                        : 'bg-accent-red text-white glow-red scale-105 focus:ring-accent-red'
                      : theme === 'dark'
                      ? 'bg-dark-lighter text-gray-300 hover:bg-dark-bg focus:ring-electric-blue/50'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-accent-red/50'
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.title}</span>
                  <span className="sm:hidden">{tab.title.split(' ')[1] || tab.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>

          <div 
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="max-w-3xl mx-auto text-center"
          >
            <p
              className={`text-base sm:text-lg font-exo leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {tabs[activeTab].content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
