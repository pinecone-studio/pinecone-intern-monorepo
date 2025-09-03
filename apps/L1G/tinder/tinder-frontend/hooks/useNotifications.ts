import { useState, useCallback, useRef } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      type: string;
      title: string;
      message: string;
      timestamp: string;
    }>
  >([]);

  const notificationIdRef = useRef(0);

  const handleNotification = useCallback((notificationData: any) => {
    const notification = {
      id: `notif_${++notificationIdRef.current}`,
      ...notificationData,
    };
    setNotifications((prev) => [...prev, notification]);
  }, []);

  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  }, []);

  return {
    notifications,
    handleNotification,
    dismissNotification,
    setNotifications,
  };
};
