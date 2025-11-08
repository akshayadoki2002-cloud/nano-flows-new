import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  ArrowLeft,
  Search,
  Brain,
  MessageSquare,
  Image,
  FileText,
  Code,
  Music,
  Video,
  Sparkles,
  Zap,
  Globe,
  TrendingUp,
  Mic,
  Languages,
  BookOpen,
  BarChart3,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AITool {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: any;
  color: string;
  features: string[];
}

const AIToolsShowcase = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Tools', icon: Sparkles },
    { id: 'text', label: 'Text & Writing', icon: FileText },
    { id: 'image', label: 'Image Generation', icon: Image },
    { id: 'code', label: 'Code Assistant', icon: Code },
    { id: 'audio', label: 'Audio & Voice', icon: Mic },
    { id: 'video', label: 'Video Creation', icon: Video },
    { id: 'analysis', label: 'Data Analysis', icon: BarChart3 },
    { id: 'translation', label: 'Translation', icon: Languages }
  ];

  const tools: AITool[] = [
    {
      id: 1,
      name: 'AI Text Generator',
      description: 'Generate high-quality content, articles, and creative writing with advanced AI language models.',
      category: 'text',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      features: ['Content Creation', 'Article Writing', 'Creative Stories']
    },
    {
      id: 2,
      name: 'Smart Chatbot',
      description: 'Engage in natural conversations, get answers, and receive personalized assistance instantly.',
      category: 'text',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      features: ['24/7 Support', 'Multi-language', 'Context Awareness']
    },
    {
      id: 3,
      name: 'Image Creator',
      description: 'Transform your ideas into stunning visuals with AI-powered image generation technology.',
      category: 'image',
      icon: Image,
      color: 'from-orange-500 to-red-500',
      features: ['Text-to-Image', 'Style Transfer', 'High Resolution']
    },
    {
      id: 4,
      name: 'Code Assistant',
      description: 'Write, debug, and optimize code faster with intelligent AI-powered coding suggestions.',
      category: 'code',
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      features: ['Code Generation', 'Bug Detection', 'Refactoring']
    },
    {
      id: 5,
      name: 'Voice Synthesizer',
      description: 'Convert text to natural-sounding speech with customizable voices and accents.',
      category: 'audio',
      icon: Mic,
      color: 'from-indigo-500 to-blue-500',
      features: ['Text-to-Speech', 'Voice Cloning', 'Multiple Accents']
    },
    {
      id: 6,
      name: 'Video Generator',
      description: 'Create professional videos from text descriptions with AI-powered video synthesis.',
      category: 'video',
      icon: Video,
      color: 'from-pink-500 to-rose-500',
      features: ['Text-to-Video', 'Auto Editing', 'HD Quality']
    },
    {
      id: 7,
      name: 'Data Analyzer',
      description: 'Extract insights from complex datasets with AI-powered analytics and visualization.',
      category: 'analysis',
      icon: BarChart3,
      color: 'from-yellow-500 to-orange-500',
      features: ['Pattern Recognition', 'Predictive Analytics', 'Visualization']
    },
    {
      id: 8,
      name: 'Language Translator',
      description: 'Translate text between 100+ languages with context-aware AI translation.',
      category: 'translation',
      icon: Languages,
      color: 'from-teal-500 to-cyan-500',
      features: ['100+ Languages', 'Context-Aware', 'Real-time']
    },
    {
      id: 9,
      name: 'AI Music Composer',
      description: 'Compose original music tracks in any genre using advanced AI composition algorithms.',
      category: 'audio',
      icon: Music,
      color: 'from-violet-500 to-purple-500',
      features: ['Genre Selection', 'Original Compositions', 'Royalty-free']
    },
    {
      id: 10,
      name: 'Smart Summarizer',
      description: 'Condense long documents into concise summaries while retaining key information.',
      category: 'text',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
      features: ['Quick Summaries', 'Key Points', 'Multi-format']
    },
    {
      id: 11,
      name: 'SEO Optimizer',
      description: 'Optimize your content for search engines with AI-powered SEO recommendations.',
      category: 'analysis',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-500',
      features: ['Keyword Analysis', 'Content Optimization', 'Competitor Analysis']
    },
    {
      id: 12,
      name: 'AI Web Designer',
      description: 'Generate beautiful, responsive website designs with AI-powered design intelligence.',
      category: 'code',
      icon: Globe,
      color: 'from-cyan-500 to-blue-500',
      features: ['Responsive Design', 'Color Schemes', 'Layout Generation']
    }
  ];

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, tools]);

  const handleToolClick = (tool: AITool) => {
    alert(`🚀 Launching ${tool.name}\n\n${tool.description}\n\nFeatures:\n${tool.features.map(f => `• ${f}`).join('\n')}\n\nThis would open the AI tool interface.`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <div className={`border-b ${theme === 'dark' ? 'bg-dark-card border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-dark-lighter text-electric-blue hover:bg-gray-700'
                    : 'bg-gray-100 text-accent-blue hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              
              <h1 className={`text-2xl font-bold font-orbitron ${
                theme === 'dark' ? 'text-electric-green' : 'text-accent-red'
              }`}>
                Nano Flows AI Tools
              </h1>
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-dark-lighter hover:bg-gray-700 text-electric-blue'
                  : 'bg-gray-100 hover:bg-gray-200 text-accent-blue'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg' : 'bg-gradient-to-b from-white via-gray-50 to-white'}`}>
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute inset-0 ${theme === 'dark' ? 'gradient-mesh' : 'gradient-mesh-light'}`} />
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{
                borderColor: theme === 'dark' ? '#0ABAB5' : '#EB3232'
              }}
            >
              <Sparkles className={`w-5 h-5 ${theme === 'dark' ? 'text-electric-green' : 'text-accent-red'}`} />
              <span className={`font-semibold ${theme === 'dark' ? 'text-electric-blue' : 'text-accent-blue'}`}>
                Free AI Tools Platform
              </span>
            </motion.div>

            <h1 className={`text-4xl md:text-6xl font-bold font-orbitron mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Unleash the Power of{' '}
              <span className={theme === 'dark' ? 'text-electric-green text-glow-green' : 'text-accent-red'}>
                AI Tools
              </span>
            </h1>

            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Explore our collection of cutting-edge AI tools designed to boost your productivity and creativity.
              All tools are free to use and powered by advanced AI technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="relative w-full sm:w-96">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-dark-lighter border-gray-700 text-white focus:border-electric-blue'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-accent-blue'
                  }`}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-electric-green text-black hover:bg-electric-blue'
                    : 'bg-accent-red text-white hover:bg-accent-blue'
                }`}
              >
                <Zap className="w-5 h-5" />
                Explore All Tools
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                      selectedCategory === category.id
                        ? theme === 'dark'
                          ? 'bg-electric-blue text-black shadow-lg'
                          : 'bg-accent-red text-white shadow-lg'
                        : theme === 'dark'
                          ? 'bg-dark-lighter text-gray-400 hover:bg-gray-700 border border-gray-700'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    onClick={() => handleToolClick(tool)}
                    className={`rounded-xl p-6 cursor-pointer border-2 transition-all ${
                      theme === 'dark'
                        ? 'bg-dark-lighter border-gray-700 hover:border-electric-blue hover:shadow-[0_0_30px_rgba(10,186,181,0.3)]'
                        : 'bg-white border-gray-200 hover:border-accent-red hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Sparkles className={`w-5 h-5 ${theme === 'dark' ? 'text-electric-green' : 'text-accent-red'}`} />
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {tool.name}
                    </h3>

                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tool.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            theme === 'dark' ? 'bg-electric-blue' : 'bg-accent-blue'
                          }`} />
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToolClick(tool);
                      }}
                      className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                        theme === 'dark'
                          ? 'bg-electric-green text-black hover:bg-electric-blue'
                          : 'bg-accent-red text-white hover:bg-accent-blue'
                      }`}
                    >
                      <Brain className="w-4 h-4" />
                      Use Now
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredTools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                No tools found
              </h3>
              <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className={`border-t ${theme === 'dark' ? 'bg-dark-card border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-6 py-12">
          <div className={`rounded-2xl p-8 md:p-12 text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-electric-blue/10 to-electric-green/10 border border-electric-blue/30'
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
          }`}>
            <Brain className={`w-16 h-16 mx-auto mb-6 ${theme === 'dark' ? 'text-electric-green' : 'text-accent-red'}`} />
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Transform Your Workflow?
            </h2>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Join thousands of users leveraging our AI tools to boost productivity and unlock creative potential.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`px-8 py-3 rounded-lg font-semibold ${
                  theme === 'dark'
                    ? 'bg-electric-green text-black hover:bg-electric-blue'
                    : 'bg-accent-red text-white hover:bg-accent-blue'
                }`}
              >
                Get Started Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className={`px-8 py-3 rounded-lg font-semibold border-2 ${
                  theme === 'dark'
                    ? 'border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black'
                    : 'border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white'
                }`}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsShowcase;
