import React from 'react';
import { Wifi, WifiOff, Clock } from 'lucide-react';

export type UserStatus = {
  status: 'online' | 'away' | 'offline';
  lastSeen: string;
};

export const formatLastSeen = (timestamp: string): string => {
  const lastSeenTime = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - lastSeenTime.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return lastSeenTime.toLocaleDateString();
};

export const getStatusIndicator = (userStatus?: UserStatus) => {
  if (!userStatus) return null;

  switch (userStatus.status) {
    case 'online':
      return <Wifi className="w-3 h-3 text-green-500" />;
    case 'away':
      return <Clock className="w-3 h-3 text-yellow-500" />;
    case 'offline':
      return <WifiOff className="w-3 h-3 text-gray-400" />;
    default:
      return null;
  }
};
