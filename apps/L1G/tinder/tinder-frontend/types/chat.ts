/* eslint-disable no-unused-vars */

import { UserStatus } from "utils/chat-utils";

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
export interface ChatWindowProps {
  selectedUser: ChatUser | null;
  messages: Message[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
  sending: boolean;
  lastSeenMessageId: string | null;
  matchId: string | undefined;
  onUnmatched?: () => void;
  onBack?: () => void;
  onRetryMessage?: (messageId: string | number) => void;
  className?: string;
  loading: boolean;
  typingUsers?: Record<string, boolean>;
  userStatus?: UserStatus;
}
 