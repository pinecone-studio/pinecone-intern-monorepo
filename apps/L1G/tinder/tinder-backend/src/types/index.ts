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
export type disLikeArgs = {
  dislikedByUser: string;
  dislikeReceiver: string;
};
export interface LeanUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  images?: string[];
}
export interface LeanMatch {
  _id: mongoose.Types.ObjectId;
  users: mongoose.Types.ObjectId[];
  unmatched?: boolean;
}
export type LeanChatMessage = {
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  seen?: boolean;
};
type Match = {
  _id: string;
  matchedAt: string;
  unmatched: boolean;
  users: IUser[];
};

export interface PopulatedUser {
  _id: string | mongoose.Types.ObjectId;
  email: string;
  name?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: string;
  genderPreferences?: string;
  images?: string[];
  profession?: string;
  schoolWork?: string;
  likedBy?: PopulatedUser[];
  likedTo?: PopulatedUser[];
  matchIds?: Match[];
}
