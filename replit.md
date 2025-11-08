# Nano Flows - Futuristic AI Website

## Overview

Nano Flows is a modern, AI-focused marketing website built with React, TypeScript, and Vite. The application showcases AI-powered services through an interactive, visually striking interface with dynamic animations, dark/light theme switching, and comprehensive service presentations. The platform features a main landing page with multiple sections (Hero, About, Services, Features, Case Studies, Contact) and an Education Dashboard accessible via routing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript for type-safe component development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router DOM v7 for client-side navigation between main page and education dashboard
- **Styling**: Tailwind CSS with custom design system featuring dark/light themes
- **Animation Library**: Framer Motion for page transitions, component animations, and interactive effects
- **State Management**: React Context API for global theme management

**Design System:**
- Custom color palette with electric blue (#0ABAB5), electric green (#00FF7F), and accent colors
- Three custom font families: Orbitron (headings), Exo 2 (body), and Poppins (UI elements)
- Dark mode as default with comprehensive light mode support
- Responsive design with mobile-first approach using Tailwind breakpoints

**Component Architecture:**
- Modular component structure with separation of concerns
- Reusable Gen-AI animation components in `/components/animations/` directory:
  - **AICursorGlow**: Animated cursor aura with gradient trail (currently inactive)
  - **AIGlowBackground**: Ambient gradient glow with particle effects for Hero section
  - **AIPulseButton**: Animated buttons with pulse and hover effects  
  - **AITokenStream**: Typewriter animation for text streaming effects
  - **AIThinkingAnimation**: AI thinking dots with Lottie animations
  - **FloatingParticles**: Particle system for background effects
  - **PageTransition**: Smooth page transitions with AnimatePresence
- Custom hooks pattern through ThemeContext
- Page-level components (Hero, About, Services, Features, CaseStudy, Contact, EducationDashboard)
- Shared UI components (Header, Footer, SocialMediaBar, AIChat)

**Key Architectural Decisions:**

1. **Theme Management**: Context-based theme system persisting to localStorage, enabling app-wide dark/light mode switching without prop drilling

2. **Animation Strategy**: Centralized animation components (AIPulseButton, AIGlowBackground, AITokenStream, AIThinkingAnimation) provide consistent motion design across the application

3. **Routing Pattern**: Simple two-route structure - main landing page (/) and education dashboard (/educationdashboard) with AnimatePresence for smooth transitions

4. **Responsive Design**: Mobile-first approach with swipeable carousels for case studies, hamburger menu for mobile navigation, and adaptive layouts using Tailwind breakpoints

5. **Component Isolation**: Each major section is a self-contained component with its own state management, reducing coupling and improving maintainability

### External Dependencies

**Core Libraries:**
- **@supabase/supabase-js** (^2.57.4): Backend-as-a-Service integration (configured but not actively used in current codebase)
- **framer-motion** (^12.23.24): Advanced animation library for page transitions and interactive elements
- **react-router-dom** (^7.9.5): Client-side routing and navigation

**UI/UX Enhancement:**
- **lucide-react** (^0.344.0): Icon library for consistent iconography
- **react-icons** (^5.5.0): Additional icon sets for social media and UI elements
- **@tsparticles/react** + **@tsparticles/slim**: Particle background effects for futuristic aesthetic
- **lottie-react** (^2.4.1): Lottie animation player for complex animations
- **google-map-react** (^2.2.5): Interactive map integration in Contact section
- **react-swipeable** (^7.0.2): Touch gesture support for mobile carousels

**Development Tools:**
- **TypeScript** (^5.5.3): Type safety and enhanced developer experience
- **ESLint** with React and TypeScript plugins: Code quality and consistency
- **Tailwind CSS** (^3.4.1) + PostCSS + Autoprefixer: Utility-first styling with vendor prefixing
- **Vite** (^7.1.10): Fast development server with HMR and optimized builds

**API Integration:**
- **axios** (^1.12.2): HTTP client for potential API calls (prepared for future backend integration)

**Third-Party Services:**
- **Supabase**: Backend infrastructure configured for potential database, authentication, and storage needs
- **Google Maps API**: Embedded map functionality in Contact section for location display

**Build Configuration:**
- Vite configured for Replit deployment with WebSocket HMR over WSS protocol
- Server exposed on all interfaces (0.0.0.0) for container compatibility
- Custom port 5000 for both development and preview modes
- Optimized dependency pre-bundling excluding lucide-react for better tree-shaking