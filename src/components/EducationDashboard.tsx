// File: EducationDashboard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Image paths
const Icon1 = "/WhatsApp-Image-2025-11-04-at-18.19.50_050970e3.jpg";
const Icon2 = "/WhatsApp-Image-2025-11-04-at-18.19.50_bc18f06b.jpg";
const Icon3 = "/WhatsApp-Image-2025-11-04-at-18.19.51_863400be.jpg";

// 🌗 Theme Configuration
type ThemeMode = "dark" | "light";

interface ThemeConfig {
  background: string;
  gradient: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  button: string;
  border: string;
  shadow: string;
  badge: string;
  card: string;
}

const themeConfig: Record<ThemeMode, ThemeConfig> = {
  dark: {
    background: "bg-dark-card",
    gradient: "gradient-mesh",
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    textAccent: "text-electric-blue",
    button: "bg-electric-green text-black",
    border: "border-electric-blue/30",
    shadow: "hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]",
    badge: "bg-electric-green text-black",
    card: "bg-dark-lighter/70 backdrop-blur-md",
  },
  light: {
    background: "bg-gray-50",
    gradient: "gradient-mesh-light",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-700",
    textAccent: "text-accent-red",
    button: "bg-accent-red text-white",
    border: "border-gray-200",
    shadow: "hover:shadow-[0_0_25px_rgba(235,50,50,0.3)]",
    badge: "bg-accent-red text-white",
    card: "bg-white",
  },
};

// 📊 Tabs
const tabs = [
  { key: "courseware", label: ["Course", "ware"] },
  { key: "liveclass", label: ["Live", "Class"] },
  { key: "assessment", label: ["Continuous", "Assessment"] },
];

// 🧭 Theme Toggle
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-400/30 bg-white/10 dark:bg-black/10 backdrop-blur-md shadow-lg hover:scale-105 transition-all"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-400" size={22} />
      ) : (
        <Moon className="text-gray-800" size={20} />
      )}
    </motion.button>
  );
};

// 🧩 Split Title
const SplitTitle: React.FC<{ left: string; right: string; extra?: string }> = ({
  left,
  right,
  extra,
}) => {
  const { theme } = useTheme();
  const cfg = themeConfig[theme as ThemeMode];
  return (
    <h2
      className={`font-orbitron font-semibold text-2xl md:text-4xl flex items-center gap-2 flex-wrap leading-tight`}
    >
      <span className={cfg.textPrimary}>{left}</span>
      <span className={cfg.textAccent}>{right}</span>
      {extra && (
        <span
          className={`font-exo text-lg md:text-xl ml-1 opacity-90 ${cfg.textAccent}`}
        >
          {extra}
        </span>
      )}
    </h2>
  );
};

// 🧭 Tab Navigation
const TabNav: React.FC<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();
  const cfg = themeConfig[theme as ThemeMode];
  return (
    <nav className="flex flex-wrap gap-3 mt-6" role="tablist">
      {tabs.map(({ key, label }) => (
        <motion.button
          key={key}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          role="tab"
          aria-selected={activeTab === key}
          onClick={() => setActiveTab(key)}
          className={`font-orbitron py-2 px-6 rounded-full text-base transition-all duration-300 ${
            activeTab === key
              ? `${cfg.gradient} ${cfg.textPrimary} ring-2 ring-inset ${cfg.textAccent}`
              : `bg-transparent ${cfg.textAccent} border ${cfg.border}`
          } ${cfg.shadow}`}
        >
          <span>{label[0]}</span>
          <span className={`ml-1 ${cfg.textAccent}`}>{label[1]}</span>
        </motion.button>
      ))}
    </nav>
  );
};

// 📈 Progress Bar
const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => {
  const { theme } = useTheme();
  return (
    <div className="w-full h-3 rounded bg-gray-200 dark:bg-gray-600 mt-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.6 }}
        className={`h-3 rounded ${
          theme === "dark" ? "bg-electric-blue" : "bg-accent-red"
        }`}
      />
    </div>
  );
};

// 🧱 Card with improved mini-text styles
const Card: React.FC<{
  title: string;
  subtitle: string;
  tags?: string[];
  progress?: number;
  action?: string;
  image?: string;
}> = ({ title, subtitle, tags = [], progress, action, image }) => {
  const { theme } = useTheme();
  const cfg = themeConfig[theme as ThemeMode];
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 border ${cfg.card} ${cfg.border} ${cfg.shadow} transition-all`}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shadow-md flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <h3 className={`font-orbitron text-lg md:text-xl ${cfg.textPrimary}`}>
          {title}
        </h3>
        <p
          className={`font-exo mt-1 text-xs sm:text-sm md:text-base text-left ${cfg.textSecondary}`}
          style={{ lineHeight: "1.4em" }}
        >
          {subtitle}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((t, i) => (
              <span
                key={i}
                className={`py-1 px-3 rounded-full font-exo text-xs ${cfg.badge}`}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {progress !== undefined && <ProgressBar percent={progress} />}
      </div>
      {action && (
        <button
          className={`mt-4 md:mt-0 py-2 px-5 font-exo rounded-full ${cfg.button} ${cfg.shadow} hover:scale-105 transition`}
        >
          {action}
        </button>
      )}
    </motion.article>
  );
};

// 🧩 Sections

const CoursewareSection = () => (
  <section>
    <SplitTitle left="Course" right="ware" />
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-6">
      <div className="flex-1 space-y-4 md:space-y-6">
        <Card
          title="Study Guide"
          subtitle="GBook – Quick Learning Book"
          tags={["8 Hrs", "0%"]}
          progress={0}
          action="View"
          image={Icon1}
        />
        <Card
          title="Ebook"
          subtitle="Digital Text Book"
          tags={["10 Hrs", "100%"]}
          progress={100}
          action="Read"
          image={Icon2}
        />
      </div>
      <div className="flex-1 space-y-4 md:space-y-6">
        <SplitTitle left="Assignments" right="" />
        <Card
          title="Practice Test"
          subtitle="Sep 08, 2025 - Dec 01, 2030 • 15 Marks • 15 Mins"
          tags={["Assignment", "Practice", "Not Attempted"]}
          action="View"
          image={Icon3}
        />
      </div>
    </div>
  </section>
);

const LiveClassSection = () => (
  <section>
    <SplitTitle left="Live" right="Class" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">
      <Card
        title="Session 3"
        subtitle="Nov 02, 2025 | 9:00 AM • 1 Hr"
        tags={["Recorded"]}
        action="View Recorded"
        image={Icon1}
      />
      <Card
        title="Session 2"
        subtitle="Nov 01, 2025 | 3:00 PM • 1 Hr"
        tags={["Recorded"]}
        action="View Recorded"
        image={Icon2}
      />
      <Card
        title="Session 1"
        subtitle="Oct 25, 2025 | 3:00 PM • 1 Hr"
        tags={["Recorded"]}
        action="View Recorded"
        image={Icon3}
      />
    </div>
  </section>
);

const AssessmentSection = () => (
  <section>
    <SplitTitle left="Continuous" right="Assessment" />
    <div className="space-y-4 lg:space-y-6 mt-6">
      <Card
        title="Unit Progress"
        subtitle="Unit 1: 16% Complete"
        progress={16}
        image={Icon1}
      />
      <Card
        title="Learning Activities"
        subtitle="6 activities, 1 assignment, 0 discussions"
        image={Icon2}
      />
    </div>
  </section>
);

// 🧭 Main Component with toggle beside Back button on right side desktop
const EducationDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("courseware");
  const cfg = themeConfig[theme as ThemeMode];
  const navigate = useNavigate();

  return (
    <main
      className={`font-exo min-h-screen ${cfg.background} ${cfg.gradient} transition-colors duration-500 overflow-x-hidden`}
    >
      <section className="py-8 sm:py-16 w-full relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

          {/* Responsive Header */}
          <header className="mb-8">

            {/* Mobile view: Title + toggle + back inline */}
            <div className="flex items-center justify-between md:hidden gap-3 mb-4">
              <SplitTitle left="Artificial" right="Intelligence" extra="Dashboard" />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => navigate("/")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md font-exo text-sm font-semibold ${cfg.button} ${cfg.shadow} hover:scale-105 transition`}
                  aria-label="Back to Home"
                  title="Back to Home"
                >
                  <ArrowLeft size={18} />
                  <span>Back</span>
                </button>
              </div>
            </div>

            {/* Desktop: Title left, Back + Toggle right */}
            <div className="hidden md:flex md:flex-col gap-4">
              <div className="flex items-center justify-between">
                <SplitTitle left="Artificial" right="Intelligence" extra="Dashboard" />
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate("/")}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-exo text-base ${cfg.button} ${cfg.shadow} hover:scale-105`}
                  >
                    <ArrowLeft size={20} />
                    Back to Home
                  </button>
                  <ThemeToggle />
                </div>
              </div>
              <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Tabs below on mobile */}
            <div className="md:hidden">
              <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

          </header>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8">
            {activeTab === "courseware" && <CoursewareSection />}
            {activeTab === "liveclass" && <LiveClassSection />}
            {activeTab === "assessment" && <AssessmentSection />}
          </div>
        </div>
      </section>
    </main>
  );
};

export default EducationDashboard;
