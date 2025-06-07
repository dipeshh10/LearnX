import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play,
  Calendar,
  Target,
  Users
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useCourseStore } from '../stores/courseStore';
import CourseCard from '../components/course/CourseCard';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { courses, enrollments, fetchCourses } = useCourseStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'certificates' | 'activity'>('overview');

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const enrolledCourses = courses.filter(course => 
    enrollments.some(enrollment => enrollment.courseId === course.id)
  );

  const completedCourses = enrollments.filter(enrollment => enrollment.progress === 100);
  const inProgressCourses = enrollments.filter(enrollment => enrollment.progress > 0 && enrollment.progress < 100);

  const stats = [
    {
      label: 'Enrolled Courses',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Completed Courses',
      value: completedCourses.length,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Learning Hours',
      value: '24.5',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Certificates',
      value: completedCourses.length,
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Continue your learning journey
              </p>
            </div>
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Resume Learning
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'courses', label: 'My Courses' },
              { id: 'certificates', label: 'Certificates' },
              { id: 'activity', label: 'Activity' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Continue Learning
                </h2>
                <div className="space-y-4">
                  {inProgressCourses.slice(0, 3).map((enrollment) => {
                    const course = courses.find(c => c.id === enrollment.courseId);
                    if (!course) return null;

                    return (
                      <div
                        key={enrollment.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {course.instructor.name}
                            </p>
                            <ProgressBar progress={enrollment.progress} size="sm" />
                          </div>
                          <Button size="small">
                            <Play className="h-4 w-4 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          action: 'Completed lesson',
                          course: 'React Fundamentals',
                          time: '2 hours ago',
                          icon: Award,
                        },
                        {
                          action: 'Started course',
                          course: 'Advanced JavaScript',
                          time: '1 day ago',
                          icon: BookOpen,
                        },
                        {
                          action: 'Earned certificate',
                          course: 'HTML & CSS Basics',
                          time: '3 days ago',
                          icon: Award,
                        },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                            <activity.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.action}: {activity.course}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Learning Goals */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Learning Goals
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Weekly Goal
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        3/5 hours
                      </span>
                    </div>
                    <ProgressBar progress={60} size="sm" showPercentage={false} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Monthly Goal
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        12/20 hours
                      </span>
                    </div>
                    <ProgressBar progress={60} size="sm" showPercentage={false} />
                  </div>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Upcoming Deadlines
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        JavaScript Assignment
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Due in 2 days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        React Project
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Due in 1 week
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
                      <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        First Course Completed
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        3 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                      <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        5-Day Streak
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        1 week ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                My Courses ({enrolledCourses.length})
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="small">All</Button>
                <Button variant="outline" size="small">In Progress</Button>
                <Button variant="outline" size="small">Completed</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => {
                const enrollment = enrollments.find(e => e.courseId === course.id);
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    showProgress={true}
                    progress={enrollment?.progress || 0}
                  />
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              My Certificates ({completedCourses.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((enrollment) => {
                const course = courses.find(c => c.id === enrollment.courseId);
                if (!course) return null;

                return (
                  <div
                    key={enrollment.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-center">
                      <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-4">
                        <Award className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Completed on {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </p>
                      <Button size="small" variant="outline">
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Learning Activity
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Activity tracking coming soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're working on detailed analytics to help you track your learning progress.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;