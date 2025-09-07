import type { MatchedUser } from '@/app/(main)/home/page';
import type { ChatUser } from 'types/chat';

export const mapMatchedUserToChatUser = (user: MatchedUser): ChatUser => ({
  id: user.id,
  name: user.name,
  images: user.images,
  dateOfBirth: user.dateOfBirth,
  profession: user.profession,
  age: user.age,
  startedConversation: user.startedConversation,
});
