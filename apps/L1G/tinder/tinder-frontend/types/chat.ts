export type Message = {
  id: any;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  seen?: boolean;
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
