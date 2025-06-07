import { create } from 'zustand';
import { Course, Enrollment } from '../types';

interface CourseState {
  courses: Course[];
  enrollments: Enrollment[];
  currentCourse: Course | null;
  isLoading: boolean;
  fetchCourses: () => Promise<void>;
  fetchCourse: (id: string) => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  updateProgress: (courseId: string, lessonId: string) => void;
  searchCourses: (query: string) => Course[];
  filterCourses: (filters: any) => Course[];
}

// Mock course data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and deploy them to production.',
    shortDescription: 'Learn full-stack web development from scratch',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    level: 'Beginner',
    duration: '12 weeks',
    category: 'Web Development',
    price: 99.99,
    originalPrice: 199.99,
    isFree: false,
    instructorId: 'inst1',
    instructor: {
      id: 'inst1',
      name: 'Sarah Johnson',
      email: 'sarah@learnx.com',
      bio: 'Senior Full-Stack Developer with 8+ years of experience at top tech companies.',
      expertise: ['JavaScript', 'React', 'Node.js', 'Python'],
      rating: 4.9,
      studentCount: 15420,
      courseCount: 12,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        github: 'https://github.com/sarahjohnson',
      },
    },
    rating: 4.8,
    reviewCount: 2341,
    enrollmentCount: 15420,
    lessons: [
      {
        id: 'lesson1',
        title: 'Introduction to Web Development',
        description: 'Overview of web development and what you\'ll learn',
        videoUrl: 'https://example.com/video1.mp4',
        duration: 15,
        order: 1,
        isFree: true,
        resources: [
          {
            id: 'res1',
            title: 'Course Slides',
            type: 'pdf',
            url: 'https://example.com/slides.pdf',
            size: '2.5 MB',
          },
        ],
      },
      {
        id: 'lesson2',
        title: 'HTML Fundamentals',
        description: 'Learn the building blocks of web pages',
        videoUrl: 'https://example.com/video2.mp4',
        duration: 45,
        order: 2,
        isFree: false,
        resources: [],
      },
    ],
    requirements: ['Basic computer skills', 'No programming experience required'],
    whatYouWillLearn: [
      'Build responsive websites from scratch',
      'Master modern JavaScript and ES6+',
      'Create dynamic web applications with React',
      'Build backend APIs with Node.js',
      'Deploy applications to production',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    isPublished: true,
    language: 'English',
    certificate: true,
  },
  // Add more mock courses...
];

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  enrollments: [],
  currentCourse: null,
  isLoading: false,

  fetchCourses: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ courses: mockCourses, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchCourse: async (id: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const course = mockCourses.find(c => c.id === id);
      set({ currentCourse: course || null, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  enrollInCourse: async (courseId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEnrollment: Enrollment = {
        id: `enrollment_${Date.now()}`,
        userId: '1', // Current user ID
        courseId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        completedLessons: [],
        certificateIssued: false,
      };
      
      set(state => ({
        enrollments: [...state.enrollments, newEnrollment],
      }));
    } catch (error) {
      throw error;
    }
  },

  updateProgress: (courseId: string, lessonId: string) => {
    set(state => ({
      enrollments: state.enrollments.map(enrollment => {
        if (enrollment.courseId === courseId) {
          const completedLessons = [...enrollment.completedLessons];
          if (!completedLessons.includes(lessonId)) {
            completedLessons.push(lessonId);
          }
          
          const course = state.courses.find(c => c.id === courseId);
          const progress = course ? (completedLessons.length / course.lessons.length) * 100 : 0;
          
          return {
            ...enrollment,
            completedLessons,
            progress,
            lastAccessedLessonId: lessonId,
          };
        }
        return enrollment;
      }),
    }));
  },

  searchCourses: (query: string) => {
    const { courses } = get();
    return courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  },

  filterCourses: (filters: any) => {
    const { courses } = get();
    return courses.filter(course => {
      if (filters.category && course.category !== filters.category) return false;
      if (filters.level && course.level !== filters.level) return false;
      if (filters.price === 'free' && !course.isFree) return false;
      if (filters.price === 'paid' && course.isFree) return false;
      return true;
    });
  },
}));