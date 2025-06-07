import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  verifyEmail: (token: string) => Promise<void>;
  enableTwoFactor: () => Promise<void>;
  disableTwoFactor: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: (() => {
    const savedUser = localStorage.getItem('learnx_user');
    return savedUser ? JSON.parse(savedUser) : null;
  })(),
  isAuthenticated: !!localStorage.getItem('learnx_user'),
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'student',
        emailVerified: true,
        twoFactorEnabled: false,
        createdAt: new Date().toISOString(),
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true,
        },
      };
      
      set({ user: newUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem('learnx_user', JSON.stringify(newUser));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: '1',
        name,
        email,
        role: 'student',
        emailVerified: false,
        twoFactorEnabled: false,
        createdAt: new Date().toISOString(),
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true,
        },
      };
      
      set({ user: newUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem('learnx_user', JSON.stringify(newUser));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('learnx_user');
  },

  updateUser: (updates: Partial<User>) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, ...updates };
      set({ user: updatedUser });
      localStorage.setItem('learnx_user', JSON.stringify(updatedUser));
    }
  },

  verifyEmail: async (token: string) => {
    // Simulate email verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { user } = get();
    if (user) {
      get().updateUser({ emailVerified: true });
    }
  },

  enableTwoFactor: async () => {
    // Simulate 2FA setup
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { user } = get();
    if (user) {
      get().updateUser({ twoFactorEnabled: true });
    }
  },

  disableTwoFactor: async () => {
    // Simulate 2FA disable
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { user } = get();
    if (user) {
      get().updateUser({ twoFactorEnabled: false });
    }
  },
}));