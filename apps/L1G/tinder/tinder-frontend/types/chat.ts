export type Message = {
  id: any;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  seen?: boolean;
  delivered: boolean;
  sending: boolean;
  failed: boolean;
  retrying: boolean;
};

export type ChatUser = {
  id: string;
  name: string;
  images: string[];
  dateOfBirth: string;
  profession: string;
  age: number;
  startedConversation: boolean;
};

export type UserData = {
  id?: string;
  email?: string;
  otpId?: string;
  password?: string;
  name?: string;
  gender?: string;
  genderPreferences?: string;
  dateOfBirth?: Date | null;
  bio?: string;
  interests?: string[];
  profession?: string;
  schoolWork?: string;
  images?: string[];
};
export interface ChatUserWithLastMessage extends ChatUser {
  lastMessage?: Message;
  lastActivity: Date;
  hasUnreadMessages: boolean;
}
