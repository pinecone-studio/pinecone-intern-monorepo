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

export interface IInterestLean {
  _id: string | mongoose.Types.ObjectId;
  interestName: string;
}

export interface IUserLean {
  _id: string | mongoose.Types.ObjectId;
  email: string;
  name: string;
  gender?: string | null;
  genderPreferences?: string | null;
  dateOfBirth?: string | null;
  bio?: string | null;
  interests?: IInterestLean[] | null;
  profession?: string | null;
  schoolWork?: string | null;
  images?: string[] | null;
  likedBy?: IUserLean[] | null;
  likedTo?: IUserLean[] | null;
  matchIds?: IMatchLean[] | null;
}

export interface IMatchLean {
  _id: string | mongoose.Types.ObjectId;
  matchedAt: Date;
  unmatched: boolean;
  startedConversation?: boolean;
  users: IUserLean[];
}

export type LikeArgs = {
  likedByUser: string;
  likeReceiver: string;
};

export type DislikeArgs = {
  dislikedByUser: string;
  dislikeReceiver: string;
};

export interface LeanUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  images?: string[];
}

export type LeanChatMessage = {
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  seen?: boolean;
};

export type UnmatchArgs = {
  matchId: string;
};

export interface IUnmatchResponse {
  success: boolean;
  message: string;
}
