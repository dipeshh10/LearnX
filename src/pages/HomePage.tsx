import { ArrowRight, BookOpen, Layers, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import CourseCard from '../components/home/CourseCard';

// Mock course data for the homepage
const featuredCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    level: 'Beginner',
    duration: '4 weeks',
    category: 'Web Development'
  },
  {
    id: '2',
    title: 'Data Science Foundations',
    description: 'Master the core concepts of data analysis, visualization, and machine learning.',
    imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    level: 'Intermediate',
    duration: '6 weeks',
    category: 'Data Science'
  },
  {
    id: '3',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications using React Native.',
    imageUrl: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    level: 'Intermediate',
    duration: '8 weeks',
    category: 'Mobile Development'
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    description: 'Learn to create beautiful, user-friendly interfaces that engage and delight users.',
    imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    level: 'Beginner',
    duration: '5 weeks',
    category: 'Design'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Continue your learning journey with LearnX. Discover new courses and skills to advance your career.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="large" className="bg-white text-blue-600 hover:bg-blue-50">
                  Resume Learning
                </Button>
                <Button size="large" variant="outline" className="border-white text-white hover:bg-blue-500">
                  Browse Courses
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img 
                src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Learning illustration" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Learn with LearnX?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers a unique learning experience designed to help you master new skills efficiently.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={itemVariants}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert-Led Courses</h3>
              <p className="text-gray-600">
                Learn from industry professionals with real-world experience in their fields.
              </p>
            </motion.div>
            
            <motion.div className="text-center" variants={itemVariants}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Structured Learning Paths</h3>
              <p className="text-gray-600">
                Follow curated learning paths to build skills progressively and effectively.
              </p>
            </motion.div>
            
            <motion.div className="text-center" variants={itemVariants}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Support</h3>
              <p className="text-gray-600">
                Connect with fellow learners to share insights and solve problems together.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Courses</h2>
            <Link to="/courses" className="flex items-center text-blue-600 hover:text-blue-700">
              <span className="font-medium">View all courses</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to advance your career?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners who have transformed their careers with LearnX.
          </p>
          <Button size="large">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;