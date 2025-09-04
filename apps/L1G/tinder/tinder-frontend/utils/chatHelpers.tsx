// utils/chatHelpers.ts
import React from 'react';
import { Clock } from 'lucide-react';

export const formatTime = (timestamp: string): string => {
  try {
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const fullDateTimeString = `${todayDate}T${timestamp}:00`;

    const messageTime = new Date(fullDateTimeString);

    if (isNaN(messageTime.getTime())) throw new Error('Invalid date');

    return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  } catch {
    return timestamp;
  }
};

export const formatLastSeen = (timestamp: string): string => {
  const lastSeenTime = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - lastSeenTime.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 1) return 'now';
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;

  return lastSeenTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getStatusIndicator = (status: 'online' | 'away' | 'offline' | undefined) => {
  if (!status) return null;

  if (status === 'online') {
    return (
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (status === 'away') {
    return (
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-yellow-500 border-2 border-white rounded-full flex items-center justify-center">
        <Clock className="w-2 h-2 text-white" />
      </div>
    );
  }

  if (status === 'offline') {
    return <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-400 border-2 border-white rounded-full" />;
  }

  return null;
};

export const getUnreadBadge = (hasUnread: boolean) => {
  if (!hasUnread) return null;

  return <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full border border-white animate-pulse" />;
};

export const sortChatUsers = (users: any[]) => {
  return [...users].sort((a, b) => {
    // Unread messages get priority
    if (a.hasUnreadMessages && !b.hasUnreadMessages) return -1;
    if (!a.hasUnreadMessages && b.hasUnreadMessages) return 1;

    // Then sort by last activity
    const aTime = a.lastActivity || new Date(0);
    const bTime = b.lastActivity || new Date(0);
    return bTime.getTime() - aTime.getTime();
  });
};
