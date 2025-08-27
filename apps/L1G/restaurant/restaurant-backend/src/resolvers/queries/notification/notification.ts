// graphql/resolvers/queries/notificationQueries.ts

import { Notification } from 'src/resolvers/mutations/notification/types/notification';

let notifications: Notification[] = [];

export const notificationQueries = {
  notifications: (_: unknown, { userId }: { userId: string }): Notification[] => notifications.filter((n) => n.userId === userId),

  unreadCount: (_: unknown, { userId }: { userId: string }): number => notifications.filter((n) => n.userId === userId && !n.seen).length,
};

// экспорт хийхэд хялбар болгохын тулд өгөгдлийг shared байдлаар гаргаж болно
export { notifications };
