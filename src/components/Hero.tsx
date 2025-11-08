import { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { AIGlowBackground, AIPulseButton } from './animations';

const slideOneImageUrl = '/nanoflows-image.png';

const Hero = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideAnimationStage, setSlideAnimationStage] = useState<
    'show' | 'slideLeft' | 'showImage'
  >('show');
  const navigate = useNavigate();

  const slides = useMemo(() => [
    {
      title: 'Flowing Into',
      highlight: 'The Future',
      subtitle:
        'Experience seamless innovation with Nano Flows. We deliver cutting-edge AI-powered solutions that transform your digital presence through dynamic personalization and continuous evolution.',
      buttonText: 'Request Demo',
    },
    {
      title: 'Empower Your',
      highlight: 'Business',
      subtitle: 'Gain the confidence to evolve intelligently.',
      buttonText: 'Discover Solutions',
    },
    {
      title: 'Join Our',
      highlight: 'Community',
      subtitle:
        'Collaborate and innovate with experts worldwide. Be part of the AI revolution and accelerate your projects with shared knowledge and resources.',
      buttonText: 'Get Involved',
    },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const particleCount = window.innerWidth < 768 ? 50 : 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === 'dark'
            ? `rgba(10, 186, 181, ${0.3 + Math.random() * 0.3})`
            : `rgba(0, 123, 255, ${0.2 + Math.random() * 0.2})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle =
              theme === 'dark'
                ? `rgba(0, 255, 127, ${0.2 - distance / 500})`
                : `rgba(255, 0, 0, ${0.15 - distance / 700})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  useEffect(() => {
    if (currentSlide === 0) {
      setSlideAnimationStage('show');
      const slideLeftTimer = setTimeout(() => {
        setSlideAnimationStage('slideLeft');
      }, 2000);
      const showImageTimer = setTimeout(() => {
        setSlideAnimationStage('showImage');
      }, 3500);

      return () => {
        clearTimeout(slideLeftTimer);
        clearTimeout(showImageTimer);
      };
    } else {
      setSlideAnimationStage('show');
    }
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleButtonClick = () => {
    if (currentSlide === 1) {
      navigate('/educationdashboard');
    } else {
      console.log(`Clicked ${slides[currentSlide].buttonText}`);
    }
  };

  const textSlideLeftClass =
    slideAnimationStage === 'slideLeft' || slideAnimationStage === 'showImage'
      ? 'md:-translate-x-1/4 transition-transform duration-700 ease-in-out'
      : 'translate-x-0';

  const imageSlideInClass =
    slideAnimationStage === 'slideLeft' || slideAnimationStage === 'showImage'
      ? 'translate-x-0 opacity-100 transition-all duration-700 ease-in-out'
      : 'translate-x-full opacity-0';

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      <canvas ref={canvasRef} className="particle-bg" aria-hidden="true" />
      <AIGlowBackground />

      <div
        className={`absolute inset-0 ${
          theme === 'dark' ? 'gradient-mesh' : 'gradient-mesh-light'
        }`}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32 relative z-10 max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full border animate-pulse-slow justify-center"
        >
          <Sparkles
            size={20}
            className={theme === 'dark' ? 'text-electric-green' : 'text-accent-red'}
            aria-hidden="true"
          />
          <span
            className={`text-sm font-exo ${
              theme === 'dark' ? 'text-electric-blue' : 'text-accent-blue'
            }`}
          >
            AI-Powered Innovation Platform
          </span>
        </motion.div>

        {currentSlide === 0 ? (
          slideAnimationStage === 'show' ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <h1
                className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 animate-float leading-tight ${
                  theme === 'dark' ? 'text-white text-glow-blue' : 'text-black'
                }`}
              >
                {slides[0].title}
                <br />
                <span
                  className={
                    theme === 'dark'
                      ? 'text-electric-green text-glow-green'
                      : 'text-accent-red'
                  }
                >
                  {slides[0].highlight}
                </span>
              </h1>
              <p
                className={`text-base sm:text-lg md:text-xl font-exo mb-12 max-w-full px-4 sm:px-6 md:max-w-2xl ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {slides[0].subtitle}
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
              <div
                className={`max-w-full md:max-w-xl text-center md:text-left flex flex-col justify-center ${textSlideLeftClass}`}
                style={{ minHeight: '300px' }}
              >
                <h1
                  className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 animate-float leading-tight ${
                    theme === 'dark' ? 'text-white text-glow-blue' : 'text-black'
                  }`}
                >
                  {slides[0].title}
                  <br />
                  <span
                    className={
                      theme === 'dark'
                        ? 'text-electric-green text-glow-green'
                        : 'text-accent-red'
                    }
                  >
                    {slides[0].highlight}
                  </span>
                </h1>
                <p
                  className={`text-base sm:text-lg md:text-xl font-exo mb-12 max-w-full px-4 md:px-0 md:max-w-2xl ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {slides[0].subtitle}
                </p>
              </div>
              <img
                src={slideOneImageUrl}
                alt="Nano Flows AI Illustration"
                className={`max-w-xs md:max-w-sm rounded-lg shadow-lg ${imageSlideInClass}`}
                loading="eager"
              />
            </div>
          )
        ) : (
          <div className="min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center">
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 animate-float leading-tight ${
                theme === 'dark' ? 'text-white text-glow-blue' : 'text-black'
              }`}
            >
              {slides[currentSlide].title}
              <br />
              <span
                className={
                  theme === 'dark'
                    ? 'text-electric-green text-glow-green'
                    : 'text-accent-red'
                }
              >
                {slides[currentSlide].highlight}
              </span>
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl font-exo mb-12 max-w-full px-4 sm:px-6 md:max-w-2xl mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {slides[currentSlide].subtitle}
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <AIPulseButton
            onClick={handleButtonClick}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto group flex items-center justify-center space-x-2"
          >
            <span>{slides[currentSlide].buttonText}</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </AIPulseButton>

          <AIPulseButton
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            View Our Services
          </AIPulseButton>
        </motion.div>

        <div className="flex justify-center space-x-3 sm:space-x-4 mt-8 px-4" role="tablist" aria-label="Slide navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              role="tab"
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={currentSlide === index}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                currentSlide === index
                  ? theme === 'dark'
                    ? 'bg-electric-green scale-125 focus:ring-electric-green'
                    : 'bg-accent-red scale-125 focus:ring-accent-red'
                  : theme === 'dark'
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div
          className={`w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 flex items-start justify-center p-2 ${
            theme === 'dark' ? 'border-electric-blue' : 'border-accent-blue'
          }`}
        >
          <div
            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
              theme === 'dark' ? 'bg-electric-green' : 'bg-accent-red'
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
