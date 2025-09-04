// utils/notificationUtils.ts
export const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'match':
      return '💕';
    case 'message':
      return '💬';
    case 'unmatch':
      return '💔';
    default:
      return '🔔';
  }
};

export const getNotificationColor = (type: string): string => {
  switch (type) {
    case 'match':
      return 'from-pink-500 to-red-500';
    case 'message':
      return 'from-blue-500 to-purple-500';
    case 'unmatch':
      return 'from-gray-500 to-gray-600';
    default:
      return 'from-green-500 to-blue-500';
  }
};

export const NOTIFICATION_AUTO_CLOSE_DURATION = 5000;
