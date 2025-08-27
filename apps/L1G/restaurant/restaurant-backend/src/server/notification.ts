// src/server/notification.ts

import { Notification } from './type';

export let notifications: Notification[] = [];

export const createNotification = (userId: string, message: string): Notification => {
  const newNotif: Notification = {
    id: String(notifications.length + 1),
    userId,
    message,
    seen: false,
    createdAt: new Date().toISOString(),
  };
  notifications.push(newNotif);
  return newNotif;
};

export const markAsSeen = (id: string): Notification | null => {
  const notif = notifications.find((n) => n.id === id);
  if (notif) notif.seen = true;
  return notif ?? null;
};

export const getNotifications = (userId: string): Notification[] => {
  return notifications.filter((n) => n.userId === userId);
};

export const getUnreadCount = (userId: string): number => {
  return notifications.filter((n) => n.userId === userId && !n.seen).length;
};
