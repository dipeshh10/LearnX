import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  level: string;
  duration: string;
  category: string;
}

const CourseCard = ({ id, title, description, imageUrl, level, duration, category }: CourseCardProps) => {
  return (
    <Card hoverEffect className="h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium text-gray-600">
          {level}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-sm text-blue-600 font-medium mb-1">{category}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-gray-500">{duration}</span>
          <Link to={`/courses/${id}`} className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-700">
            <span>View Course</span>
            <motion.div 
              whileHover={{ x: 3 }}
              className="ml-1"
            >
              <ArrowRight size={16} />
            </motion.div>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;