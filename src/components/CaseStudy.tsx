import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSwipeable } from 'react-swipeable';

const caseStudies = [
  { image: '/case1.jpg', title: 'AI in Educational Skill Development', description: 'Discover how AI transforms educational skill development by personalizing learning paths, enhancing student engagement, and enabling adaptive training programs.', downloadLink: '#' },
  { image: '/case2.jpg', title: 'AI in Machine Learning Solutions', description: 'Explore advanced machine learning techniques powering real-time analytics, predictive modeling, and automation that drive smarter decisions across industries.', downloadLink: '#' },
  { image: '/case3.jpg', title: 'AI in Autonomous Vehicles', description: 'Learn how AI ensures real-time adaptation, situational awareness, and safety through intelligent decision-making in next-generation autonomous vehicles.', downloadLink: '#' },
  { image: '/case4.jpg', title: 'AI in Business Intelligence', description: 'Boost business intelligence with AI-enabled predictive analytics, helping organizations forecast trends, optimize performance, and stay ahead competitively.', downloadLink: '#' },
  { image: '/case5.jpg', title: 'AI in Predictive Maintenance', description: 'Use AI-driven predictive maintenance to minimize downtime, reduce repair costs, and improve equipment longevity by detecting failures before they occur.', downloadLink: '#' },
  { image: '/case6.jpg', title: 'AI powered Cybersecurity', description: 'Empower cybersecurity with AI-based real-time threat detection, automated responses, and proactive defenses that ensure stronger digital protection.', downloadLink: '#' },
  { image: '/case7.jpg', title: 'AI in Biotechnology', description: 'Discover how AI accelerates biotechnology research by predicting protein structures, optimizing drug discovery, and enhancing genomic analysis for precision medicine.', downloadLink: '#' },
];

const CaseStudy = () => {
  const { theme } = useTheme();
  const visibleCount = 3;

  // ---- SSR-safe width + mounted flag to avoid hydration warnings ----
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 1024);
    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize, { passive: true });
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = useMemo(() => (mounted ? windowWidth < 768 : false), [mounted, windowWidth]);

  // ---- Index state ----
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [currentDesktopIndex, setCurrentDesktopIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  // ---- Derived values ----
  const maxIndex = Math.max(0, caseStudies.length - visibleCount);
  const totalGroups = 3;
  const slidesPerGroup = Math.ceil(caseStudies.length / totalGroups);
  const activeDot = Math.floor(currentMobileIndex / slidesPerGroup);

  // Clamp when breakpoint changes
  useEffect(() => {
    setCurrentMobileIndex((prev) => Math.min(prev, caseStudies.length - 1));
    setCurrentDesktopIndex((prev) => Math.min(prev, maxIndex));
  }, [isMobile, maxIndex]);

  // ---- Swipe (iOS-friendly) ----
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentMobileIndex((prev) => Math.min(prev + 1, caseStudies.length - 1)),
    onSwipedRight: () => setCurrentMobileIndex((prev) => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // ---- Desktop arrows ----
  const prevSlide = useCallback(() => {
    setCurrentDesktopIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentDesktopIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // ---- Keyboard support on desktop ----
  useEffect(() => {
    if (!mounted || isMobile) return;
    const onKey = (e: { key: string; }) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, isMobile, prevSlide, nextSlide]);

  if (!mounted) {
    // Avoid SSR/client mismatch by rendering a minimal shell until mounted
    return (
      <section
        id="case-study"
        className={`py-20 w-full relative overflow-hidden ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-center">
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Case</span>{' '}
            <span className={theme === 'dark' ? 'text-electric-blue' : 'text-accent-red'}>Study</span>
          </h2>
          <p className={`text-base max-w-xl mx-auto mb-16 font-exo text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Explore detailed case studies showcasing our innovative applications and industry impact.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="case-study"
      className={`py-20 w-full relative overflow-hidden ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}
    >
      <div
        className={`absolute inset-0 ${theme === 'dark' ? 'gradient-mesh' : 'gradient-mesh-light'}`}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-center">
          <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Case</span>{' '}
          <span className={theme === 'dark' ? 'text-electric-blue' : 'text-accent-red'}>Study</span>
        </h2>

        <p className={`text-base max-w-xl mx-auto mb-16 font-exo text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Explore detailed case studies showcasing our innovative applications and industry impact.
        </p>

        <div className="relative">
          {!isMobile && currentDesktopIndex > 0 && (
            <button
              onClick={prevSlide}
              className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg z-20 focus:outline-none focus:ring ${
                theme === 'dark'
                  ? 'bg-electric-blue text-black hover:bg-electric-blue/80 focus:ring-electric-blue/60'
                  : 'bg-accent-red text-white hover:bg-accent-red/80 focus:ring-accent-red/60'
              }`}
              aria-label="Previous Slide"
              type="button"
            >
              ‹
            </button>
          )}

          <div
            className={`${isMobile ? 'overflow-hidden' : 'overflow-hidden flex'}`}
            style={{
              width: '100%',
              WebkitOverflowScrolling: 'touch',
              willChange: 'transform',
            }}
            {...(isMobile ? swipeHandlers : {})}
            aria-roledescription="carousel"
            aria-label="Case studies"
          >
            <div
              className="flex transition-transform duration-500"
              style={
                isMobile
                  ? { transform: `translateX(-${currentMobileIndex * 100}%)` }
                  : {
                      transform: `translateX(-${(100 / visibleCount) * currentDesktopIndex}%)`,
                      width: `${(100 / visibleCount) * caseStudies.length}%`,
                    }
              }
            >
              {caseStudies.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 box-border ${isMobile ? 'min-w-full' : 'w-[calc(100%/3)]'}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${caseStudies.length}`}
                >
                  <div
                    className={`m-0 p-4 group flex flex-col justify-between rounded-2xl backdrop-blur-sm transition-all duration-500 ${
                      theme === 'dark'
                        ? 'bg-dark-card/50 border border-electric-blue/20 hover:bg-dark-card/70 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]'
                        : 'bg-white/80 border border-gray-200 hover:bg-white/90 hover:shadow-[0_0_25px_rgba(235,50,50,0.4)]'
                    }`}
                    style={{
                      height: isMobile ? '520px' : '440px',
                      width: isMobile ? '100%' : '95%',
                      margin: 'auto',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className={`object-cover rounded-xl mb-4 border ${isMobile ? 'h-44' : 'h-40'} w-full`}
                    />

                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h3
                          className={`text-xl font-semibold text-center mb-3 ${
                            theme === 'dark' ? 'text-electric-green' : 'text-accent-red'
                          }`}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={`text-center leading-relaxed px-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: isMobile ? 6 : 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: isMobile ? '120px' : '108px',
                          }}
                        >
                          {item.description}
                        </p>
                      </div>

                      <div className="flex justify-center mt-6">
                        <a
                          href={item.downloadLink}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          onTouchStart={() => setIsPressed(true)}
                          onTouchEnd={() => setIsPressed(false)}
                          className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold shadow transition-all duration-300 ${
                            theme === 'dark'
                              ? `text-black ${
                                  isPressed
                                    ? 'scale-95 bg-electric-green/80 shadow-[0_4px_10px_rgba(0,232,129,0.6)]'
                                    : 'bg-electric-green hover:scale-105 hover:bg-electric-green/90 hover:shadow-[0_4px_12px_rgba(0,232,129,0.6)]'
                                }`
                              : `text-white ${
                                  isPressed
                                    ? 'scale-95 bg-accent-red/80 shadow-[0_4px_10px_rgba(235,50,50,0.6)]'
                                    : 'bg-accent-red hover:scale-105 hover:bg-accent-red/90 hover:shadow-[0_4px_12px_rgba(235,50,50,0.6)]'
                                }`
                          }`}
                          style={{ marginBottom: isMobile ? '10px' : '20px' }}
                          aria-label={`Download ${item.title}`}
                        >
                          Download Case Study ⬇️
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isMobile && (
            <div className="flex items-center justify-center mt-5 space-x-2" role="tablist" aria-label="Slide navigation">
              {[...Array(totalGroups)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMobileIndex(idx * slidesPerGroup)}
                  className={`transition-all duration-300 rounded-full ${
                    activeDot === idx
                      ? theme === 'dark'
                        ? 'bg-electric-green w-5 h-3'
                        : 'bg-accent-red w-5 h-3'
                      : theme === 'dark'
                      ? 'bg-gray-600 w-3 h-3'
                      : 'bg-gray-300 w-3 h-3'
                  }`}
                  aria-label={`Go to section ${idx + 1}`}
                  aria-selected={activeDot === idx}
                  role="tab"
                  type="button"
                />
              ))}
            </div>
          )}

          {!isMobile && currentDesktopIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg z-20 focus:outline-none focus:ring ${
                theme === 'dark'
                  ? 'bg-electric-blue text-black hover:bg-electric-blue/80 focus:ring-electric-blue/60'
                  : 'bg-accent-red text-white hover:bg-accent-red/80 focus:ring-accent-red/60'
              }`}
              aria-label="Next Slide"
              type="button"
            >
              ›
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
