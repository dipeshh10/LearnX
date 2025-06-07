import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

interface ToastData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

let toastId = 0;
let addToastFn: ((toast: Omit<ToastData, 'id'>) => void) | null = null;

export const toast = {
  success: (title: string, message?: string, duration?: number) => {
    addToastFn?.({ type: 'success', title, message, duration });
  },
  error: (title: string, message?: string, duration?: number) => {
    addToastFn?.({ type: 'error', title, message, duration });
  },
  warning: (title: string, message?: string, duration?: number) => {
    addToastFn?.({ type: 'warning', title, message, duration });
  },
  info: (title: string, message?: string, duration?: number) => {
    addToastFn?.({ type: 'info', title, message, duration });
  },
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastId}`;
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Set the global function
  addToastFn = addToast;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-4">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ToastContainer;