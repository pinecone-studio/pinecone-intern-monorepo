'use client';

import { createContext, useState, useContext } from 'react';

import { Toast, ToastAction, ToastTitle } from '@/components/ui/toast';
import { X } from 'lucide-react';

interface ToastContextType {
  addToast: (_message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<string[]>([]);

  const addToast = (message: string) => {
    setToasts((prev) => [...prev, message]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast !== message));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4">
        {toasts.map((toast, index) => (
          <Toast key={index}>
            <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-lg">
              <ToastTitle>{toast}</ToastTitle>
              <ToastAction altText="Close" onClick={() => setToasts(toasts.filter((t) => t !== toast))}>
                <X width={16} height={16} />
              </ToastAction>
            </div>
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
