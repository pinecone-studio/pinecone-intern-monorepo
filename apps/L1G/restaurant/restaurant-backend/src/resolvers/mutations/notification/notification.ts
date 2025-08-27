// graphql/resolvers/mutations/notificationMutations.ts

import { notifications } from 'src/resolvers/queries/notification/notification';
import { Notification } from './types/notification';

export const notificationMutations = {
  createNotification: (_: unknown, { userId, message }: { userId: string; message: string }): Notification => {
    const newNotif: Notification = {
      id: String(notifications.length + 1),
      userId,
      message,
      seen: false,
      createdAt: new Date().toISOString(),
    };

    notifications.push(newNotif);

    return newNotif;
  },

  markAsSeen: (_: unknown, { id }: { id: string }): Notification | null => {
    const notif = notifications.find((n) => n.id === id);
    if (notif) notif.seen = true;
    return notif ?? null;
  },
};
