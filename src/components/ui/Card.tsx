import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card = ({ children, className = '', hoverEffect = false }: CardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;