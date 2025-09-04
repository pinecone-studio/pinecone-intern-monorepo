/* eslint-disable unicorn/filename-case */
import React, { useEffect } from 'react';
import { getNotificationColor, getNotificationIcon, NOTIFICATION_AUTO_CLOSE_DURATION } from './notification-utils';

interface NotificationProps {
  notification: {
    type: string;
    title: string;
    message: string;
    timestamp: string;
  };
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationProps> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, NOTIFICATION_AUTO_CLOSE_DURATION);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`bg-gradient-to-r ${getNotificationColor(notification.type)} text-white p-4 rounded-lg shadow-lg max-w-sm`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
            <div>
              <h4 className="font-semibold">{notification.title}</h4>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
          </div>
          <button onClick={onClose} className="ml-4 text-white/70 hover:text-white transition-colors">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
 