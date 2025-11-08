import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Clock,
  Star,
  TrendingUp,
  Award,
  Library,
  Grid3x3,
  List
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  progress?: number;
  price: string;
  thumbnail: string;
  category: string;
  level: string;
  lastUpdated?: string;
}

const EducationDashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('my-learning');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All Courses',
    'AI & Machine Learning',
    'Web Development',
    'Data Science',
    'Business',
    'Design',
    'Marketing'
  ];

  const myCourses: Course[] = [
    {
      id: 1,
      title: 'Complete AI & Machine Learning Bootcamp 2025',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      students: 45230,
      duration: '42 hours',
      progress: 65,
      price: '$89.99',
      thumbnail: '/nanoflows-image.png',
      category: 'AI & Machine Learning',
      level: 'Intermediate',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Advanced React & TypeScript Development',
      instructor: 'Michael Chen',
      rating: 4.9,
      students: 38421,
      duration: '35 hours',
      progress: 42,
      price: '$79.99',
      thumbnail: '/nanoflows-image.png',
      category: 'Web Development',
      level: 'Advanced',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Data Science with Python - Complete Guide',
      instructor: 'Emily Rodriguez',
      rating: 4.7,
      students: 52100,
      duration: '50 hours',
      progress: 28,
      price: '$94.99',
      thumbnail: '/nanoflows-image.png',
      category: 'Data Science',
      level: 'Beginner',
      lastUpdated: '3 days ago'
    }
  ];

  const featuredCourses: Course[] = [
    {
      id: 4,
      title: 'Deep Learning Specialization',
      instructor: 'Prof. Andrew Ng',
      rating: 4.9,
      students: 120000,
      duration: '60 hours',
      price: '$129.99',
      thumbnail: '/nanoflows-image.png',
      category: 'AI & Machine Learning',
      level: 'Advanced'
    },
    {
      id: 5,
      title: 'Full Stack Web Development Masterclass',
      instructor: 'John Smith',
      rating: 4.8,
      students: 89000,
      duration: '55 hours',
      price: '$99.99',
      thumbnail: '/nanoflows-image.png',
      category: 'Web Development',
      level: 'Intermediate'
    },
    {
      id: 6,
      title: 'UX/UI Design Principles & Figma',
      instructor: 'Lisa Anderson',
      rating: 4.7,
      students: 67000,
      duration: '28 hours',
      price: '$74.99',
      thumbnail: '/nanoflows-image.png',
      category: 'Design',
      level: 'Beginner'
    }
  ];

  const CourseCard = ({ course, showProgress = false }: { course: Course; showProgress?: boolean }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-lg overflow-hidden border cursor-pointer transition-all ${
        theme === 'dark'
          ? 'bg-dark-lighter border-gray-700 hover:border-electric-blue'
          : 'bg-white border-gray-200 hover:border-accent-blue hover:shadow-lg'
      }`}
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
          theme === 'dark' ? 'bg-electric-green text-black' : 'bg-accent-red text-white'
        }`}>
          {course.level}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className={`font-semibold text-base mb-2 line-clamp-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {course.title}
        </h3>
        
        <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {course.instructor}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {course.rating}
            </span>
          </div>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            ({course.students.toLocaleString()} students)
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4" />
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {course.duration}
            </span>
          </div>
          <span className={`font-bold text-lg ${theme === 'dark' ? 'text-electric-green' : 'text-accent-red'}`}>
            {course.price}
          </span>
        </div>

        {showProgress && course.progress !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Progress
              </span>
              <span className={theme === 'dark' ? 'text-electric-blue' : 'text-accent-blue'}>
                {course.progress}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full ${theme === 'dark' ? 'bg-electric-blue' : 'bg-accent-red'}`}
              />
            </div>
          </div>
        )}

        {showProgress && course.lastUpdated && (
          <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            Last accessed: {course.lastUpdated}
          </p>
        )}
      </div>
    </motion.div>
  );

  const ListCourseCard = ({ course, showProgress = false }: { course: Course; showProgress?: boolean }) => (
    <motion.div
      whileHover={{ x: 5 }}
      className={`rounded-lg overflow-hidden border cursor-pointer transition-all flex gap-4 p-4 ${
        theme === 'dark'
          ? 'bg-dark-lighter border-gray-700 hover:border-electric-blue'
          : 'bg-white border-gray-200 hover:border-accent-blue hover:shadow-lg'
      }`}
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-40 h-28 object-cover rounded flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {course.title}
          </h3>
          <span className={`font-bold text-lg ml-4 flex-shrink-0 ${
            theme === 'dark' ? 'text-electric-green' : 'text-accent-red'
          }`}>
            {course.price}
          </span>
        </div>
        
        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {course.instructor}
        </p>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {course.rating}
            </span>
            <span className={`text-xs ml-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              ({course.students.toLocaleString()})
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4" />
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {course.duration}
            </span>
          </div>

          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            theme === 'dark' ? 'bg-electric-green text-black' : 'bg-accent-red text-white'
          }`}>
            {course.level}
          </span>
        </div>

        {showProgress && course.progress !== undefined && (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className={`w-full h-2 rounded-full overflow-hidden ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  style={{ width: `${course.progress}%` }}
                  className={`h-full ${theme === 'dark' ? 'bg-electric-blue' : 'bg-accent-red'}`}
                />
              </div>
            </div>
            <span className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-electric-blue' : 'text-accent-blue'
            }`}>
              {course.progress}%
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className={`rounded-lg p-6 ${
      theme === 'dark' ? 'bg-dark-lighter border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {label}
          </p>
          <p className={`text-2xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <div className={`border-b ${theme === 'dark' ? 'bg-dark-card border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className={`text-2xl font-bold font-orbitron ${
                theme === 'dark' ? 'text-electric-green' : 'text-accent-red'
              }`}>
                Nano Flows Academy
              </h1>
              
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setActiveTab('my-learning')}
                  className={`flex items-center gap-2 font-semibold transition-colors ${
                    activeTab === 'my-learning'
                      ? theme === 'dark' ? 'text-electric-blue' : 'text-accent-red'
                      : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  My Learning
                </button>
                <button
                  onClick={() => setActiveTab('browse')}
                  className={`flex items-center gap-2 font-semibold transition-colors ${
                    activeTab === 'browse'
                      ? theme === 'dark' ? 'text-electric-blue' : 'text-accent-red'
                      : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Library className="w-5 h-5" />
                  Browse
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden lg:block">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 w-80 ${
                    theme === 'dark'
                      ? 'bg-dark-lighter border-gray-700 text-white focus:ring-electric-blue'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-accent-blue'
                  }`}
                />
              </div>
              
              <button
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-electric-green text-black hover:bg-electric-blue'
                    : 'bg-accent-red text-white hover:bg-accent-blue'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {activeTab === 'my-learning' && (
          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                My Learning Dashboard
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Continue your learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={BookOpen}
                label="Courses Enrolled"
                value="3"
                color="bg-blue-500"
              />
              <StatCard
                icon={Clock}
                label="Learning Hours"
                value="127"
                color="bg-green-500"
              />
              <StatCard
                icon={Award}
                label="Certificates"
                value="2"
                color="bg-purple-500"
              />
              <StatCard
                icon={TrendingUp}
                label="Average Progress"
                value="45%"
                color="bg-orange-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Continue Learning
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveView('grid')}
                    className={`p-2 rounded ${
                      activeView === 'grid'
                        ? theme === 'dark' ? 'bg-electric-blue text-black' : 'bg-accent-red text-white'
                        : theme === 'dark' ? 'bg-dark-lighter text-gray-400' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveView('list')}
                    className={`p-2 rounded ${
                      activeView === 'list'
                        ? theme === 'dark' ? 'bg-electric-blue text-black' : 'bg-accent-red text-white'
                        : theme === 'dark' ? 'bg-dark-lighter text-gray-400' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {activeView === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myCourses.map((course) => (
                    <CourseCard key={course.id} course={course} showProgress />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {myCourses.map((course) => (
                    <ListCourseCard key={course.id} course={course} showProgress />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Explore Courses
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Discover new skills and expand your knowledge
              </p>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category.toLowerCase()
                      ? theme === 'dark'
                        ? 'bg-electric-blue text-black'
                        : 'bg-accent-red text-white'
                      : theme === 'dark'
                        ? 'bg-dark-lighter text-gray-400 hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Featured Courses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>

            <div className={`rounded-lg p-8 text-center ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-electric-blue/20 to-electric-green/20 border border-electric-blue/30'
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
            }`}>
              <TrendingUp className={`w-12 h-12 mx-auto mb-4 ${
                theme === 'dark' ? 'text-electric-green' : 'text-accent-red'
              }`} />
              <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Start Your Learning Journey Today
              </h3>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Join thousands of students and unlock your potential
              </p>
              <button className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-electric-green text-black hover:bg-electric-blue'
                  : 'bg-accent-red text-white hover:bg-accent-blue'
              }`}>
                Browse All Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationDashboard;
