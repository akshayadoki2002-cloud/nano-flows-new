import React, { ReactNode, useEffect, useState, useRef } from 'react';

// Allowed social labels including Threads
type SocialLabel = 'Facebook' | 'Instagram' | 'LinkedIn' | 'Twitter' | 'Threads';

// Background colors including Threads (black)
const iconBgColors: Record<SocialLabel, string> = {
  Facebook: '#1877f2',
  Instagram:
    'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  LinkedIn: '#0077B5',
  Twitter: '#1DA1F2',
  Threads: '#000000',
};

const SMALL_ICON_SIZE = 40;
const THREADS_ICON_SIZE = 28;
const TOUCH_RESET_MS = 350; // animation reset time for touch

// Animated wrapper
const AnimatedIconWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{ width: SMALL_ICON_SIZE, height: SMALL_ICON_SIZE }}
    className="flex items-center justify-center w-full h-full"
  >
    <span
      style={{
        display: 'inline-block',
        width: '100%',
        height: '100%',
        transition: 'transform 0.28s cubic-bezier(.4,2,.2,1), filter 0.28s ease',
      }}
    >
      {children}
    </span>
  </div>
);

// --- Icons (same as before) ---
const FacebookIcon = ({ size = SMALL_ICON_SIZE }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" aria-label="Facebook">
    <rect width="56" height="56" fill="#1877F2" />
    <path
      d="M35.675 20.364h-4.07v-3.26c0-.978.647-1.203 1.153-1.203h2.926v-5.26h-4.4c-5.26 0-6.153 3.975-6.153 6.143v3.58h-3.48v5.45h3.48v15.65h6.028V25.814h4.055l.633-5.45z"
      fill="#fff"
    />
  </svg>
);

const InstagramIcon = ({ size = SMALL_ICON_SIZE }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" aria-label="Instagram">
    <defs>
      <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect width="56" height="56" fill="url(#instaGradient)" />
    <rect x="15" y="15" width="26" height="26" rx="10" stroke="#fff" strokeWidth="3" fill="none" />
    <circle cx="28" cy="28" r="10" stroke="#fff" strokeWidth="3" fill="none" />
    <circle cx="38" cy="18" r="4" fill="#fff" />
  </svg>
);

const LinkedinIcon = ({ size = SMALL_ICON_SIZE }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" aria-label="LinkedIn">
    <rect width="56" height="56" fill="#0077B5" />
    <text
      x="50%"
      y="58%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="28"
      fill="#fff"
    >
      in
    </text>
  </svg>
);

const TwitterIcon = ({ size = SMALL_ICON_SIZE }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" aria-label="Twitter">
    <rect width="56" height="56" fill="#1DA1F2" />
    <path
      d="M39 22c-1 0.5-2 0.8-3 0.9a5.5 5.5 0 0 0 2.5-3 6.2 6.2 0 0 1-3.5 1.5 5.4 5.4 0 0 0-9 5c-4.2-.5-7.7-2.6-10-6a6 6 0 0 0-.7 2.7 5.5 5.5 0 0 0 2.5 4.7c-1 0-2-.3-3-1v.1a5.4 5.4 0 0 0 4.3 5 5.6 5.6 0 0 1-1.4.2 5.7 5.7 0 0 1-1-.1 5.4 5.4 0 0 0 5 3.7 11 11 0 0 1-6 2 11 11 0 0 1-1.3 0 15 15 0 0 0 8 2.5c9.6 0 15-8 15-15v-.6a11 11 0 0 0 3-3.6z"
      fill="#fff"
    />
  </svg>
);

const ThreadsIcon = ({ size = THREADS_ICON_SIZE }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" aria-label="Threads">
    <rect width="44" height="44" fill="black" />
    <text
      x="67%"
      y="71%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="24"
      fill="white"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      style={{ userSelect: 'none' }}
    >
      @
    </text>
  </svg>
);

const socialLinks = [
  { icon: FacebookIcon, href: 'https://www.facebook.com/', label: 'Facebook' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/', label: 'Instagram' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://www.twitter.com/', label: 'Twitter' },
  { icon: ThreadsIcon, href: 'https://www.threads.net/', label: 'Threads' },
];

const SocialMediaBar: React.FC = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [canHover, setCanHover] = useState<boolean>(true); // assume hover until checked
  const touchResetTimers = useRef<Record<string, number | null>>({});

  // Detect hover capability (desktop) vs touch-only (mobile)
  useEffect(() => {
    const mq = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(hover: hover) and (pointer: fine)')
      : null;

    const setFromQuery = () => {
      setCanHover(!!mq?.matches);
    };

    setFromQuery();
    if (mq && mq.addEventListener) {
      mq.addEventListener('change', setFromQuery);
      return () => mq.removeEventListener('change', setFromQuery);
    } else if (mq && mq.addListener) {
      // older browsers
      mq.addListener(setFromQuery);
      return () => mq.removeListener(setFromQuery);
    }
    return;
  }, []);

  // Helper to set active for touch and auto-reset
  const triggerTouchActive = (label: string) => {
    // clear prior timer
    if (touchResetTimers.current[label]) {
      window.clearTimeout(touchResetTimers.current[label] as number);
    }
    setActiveLabel(label);
    // reset after animation
    touchResetTimers.current[label] = window.setTimeout(() => {
      setActiveLabel((cur) => (cur === label ? null : cur));
      touchResetTimers.current[label] = null;
    }, TOUCH_RESET_MS);
  };

  return (
    <div
      className="social-bar"
      style={{ display: 'flex', gap: '0px', alignItems: 'center' }}
    >
      {socialLinks.map(({ icon: Icon, href, label }) => {
        const isActive = activeLabel === label;

        // transformOrigin: left for hover (desktop) -> stretches right,
        // right for touch (mobile) -> stretches left.
        const transformOrigin = canHover ? 'left center' : 'right center';

        // transform value: keep same scale amount; desktop hover uses mouse events,
        // mobile touch uses touchstart to set active.
        const transform = isActive ? 'scaleX(1.35)' : 'scaleX(1)';

        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group"
            // inline styles keep behaviour self-contained; you can convert to CSS classes if preferred
            style={{
              display: 'block',
              width: SMALL_ICON_SIZE,
              height: SMALL_ICON_SIZE,
              borderRadius: 0,
              margin: 0,
              padding: 0,
              background:
                label === 'Instagram'
                  ? iconBgColors.Instagram
                  : label === 'Threads'
                  ? iconBgColors.Threads
                  : iconBgColors[label as SocialLabel],
              transformOrigin,
              transition: 'transform 0.28s ease, filter 0.28s ease',
              willChange: 'transform',
              transform,
              filter: isActive ? 'brightness(1.06)' : 'brightness(1)',
            }}
            // Desktop hover handlers only when device supports hover
            onMouseEnter={() => {
              if (canHover) {
                setActiveLabel(label);
              }
            }}
            onMouseLeave={() => {
              if (canHover) {
                setActiveLabel(null);
              }
            }}
            // Touch-only handler — animate but DO NOT prevent navigation
            onTouchStart={() => {
              if (!canHover) {
                triggerTouchActive(label);
                // don't prevent default; link will open on tap
              }
            }}
            // Click should always navigate (no preventDefault). We don't change it.
          >
            <AnimatedIconWrapper>
              <Icon size={label === 'Threads' ? THREADS_ICON_SIZE : SMALL_ICON_SIZE} />
            </AnimatedIconWrapper>
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaBar;
