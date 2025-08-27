// src/server/types.ts
export type Notification = {
  id: string;
  userId: string;
  message: string;
  seen: boolean;
  createdAt: string;
};
