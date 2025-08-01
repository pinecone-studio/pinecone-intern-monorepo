import mongoose from 'mongoose';

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
  matched?: string[];
  likedBy?: UserType[];
  likedTo?: UserType[];
};

export interface IUser {
  _id: mongoose.Types.ObjectId | string;
  email: string;
  name: string;
  likedBy?: IUser[];
  likedTo?: IUser[];
}

export type LikeArgs = {
  likedByUser: string;
  likeReceiver: string;
};
