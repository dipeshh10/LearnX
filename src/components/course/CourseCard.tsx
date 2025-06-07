import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Course } from '../../types';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  progress?: number;
}

const CourseCard = ({ course, showProgress = false, progress = 0 }: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={course.isFree ? 'success' : 'info'}>
            {course.isFree ? 'Free' : `$${course.price}`}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="default">{course.level}</Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="info" size="sm">{course.category}</Badge>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {course.shortDescription}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.enrollmentCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons.length} lessons</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <Rating rating={course.rating} size="sm" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({course.reviewCount} reviews)
          </span>
        </div>

        {showProgress && (
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={course.instructor.avatar || `https://ui-avatars.com/api/?name=${course.instructor.name}&background=3b82f6&color=fff`}
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {course.instructor.name}
            </span>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
          >
            View Course
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;