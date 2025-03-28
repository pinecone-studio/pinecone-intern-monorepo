import React, { useEffect, useState } from 'react';
import { XCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Alert as ShadcnAlert, AlertDescription } from '@/components/ui/alert';

interface AlerttProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose?: () => void;
  duration?: number;
}

const Alertt: React.FC<AlerttProps> = ({ type, message, onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const percentage = (remaining / duration) * 100;

      if (percentage <= 0) {
        setVisible(false);
        onClose?.();
      } else {
        setProgress(percentage);
        requestAnimationFrame(updateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5" data-testid="check-circle-icon" />,
    error: <XCircle className="h-5 w-5" data-testid="x-circle-icon" />,
    warning: <AlertTriangle className="h-5 w-5" data-testid="alert-triangle-icon" />,
  };

  const colors = {
    success: {
      background: 'bg-green-50 dark:bg-green-950',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      progress: 'bg-green-500',
    },
    error: {
      background: 'bg-red-50 dark:bg-red-950',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      progress: 'bg-red-500',
    },
    warning: {
      background: 'bg-yellow-50 dark:bg-yellow-950',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      progress: 'bg-yellow-500',
    },
  };

  const color = colors[type];

  return (
    <>
      {visible && (
        <div className="fixed top-5 right-5 max-w-sm w-full transition-opacity duration-200 ease-in-out">
          <ShadcnAlert className={`${color.background} ${color.border} relative overflow-hidden`}>
            <div className="flex items-start">
              <span className={color.text}>{icons[type]}</span>
              <div className="ml-3 flex-1">
                <AlertDescription className={color.text}>{message}</AlertDescription>
              </div>
              <button
                onClick={() => {
                  setVisible(false);
                  onClose?.();
                }}
                className="absolute top-0 right-0 mt-2 mr-2"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-100 overflow-hidden">
              <div className={`${color.progress} h-full`} style={{ width: `${progress}%`, transition: `width ${duration}ms linear` }} />
            </div>
          </ShadcnAlert>
        </div>
      )}
    </>
  );
};

export default Alertt;
