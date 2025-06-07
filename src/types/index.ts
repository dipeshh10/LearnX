export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  bio?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  instructorId: string;
  instructor: Instructor;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  lessons: Lesson[];
  requirements: string[];
  whatYouWillLearn: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  language: string;
  certificate: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isFree: boolean;
  resources: Resource[];
  quiz?: Quiz;
  assignment?: Assignment;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'code' | 'link';
  url: string;
  size?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'text';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  maxScore: number;
  submissionType: 'file' | 'text' | 'url';
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  expertise: string[];
  rating: number;
  studentCount: number;
  courseCount: number;
  socialLinks: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  lastAccessedLessonId?: string;
  completedLessons: string[];
  certificateIssued: boolean;
}

export interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
}

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  courseId?: string;
  category: string;
  tags: string[];
  replies: ForumReply[];
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  likes: number;
  createdAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  course: {
    title: string;
    instructor: string;
  };
  issuedAt: string;
  certificateUrl: string;
}