'use client';
import { useEffect } from 'react';

export const usePageVisibility = (refetch: () => void, setNotifications: React.Dispatch<React.SetStateAction<any[]>>) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
        setNotifications([]);
      }
    };

    const handleFocus = () => {
      refetch();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetch, setNotifications]);
};
 