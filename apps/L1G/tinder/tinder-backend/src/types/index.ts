/* eslint-disable @typescript-eslint/ban-types */
export type Context = {
  userId?: string;
};
export type LoginArgs = {
  email: string;
  password: string;
};
export type SignUpArgs = {
  email: string;
  password: string;
  name: string;
};
export type UserType = {
  id: string;
  email: string;
  name: string;
  likedBy?: UserType[];
  likedTo?: UserType[];
};
export type LikeArgs = {
  likedByUser: string;
  likeReceiver: string;
};
