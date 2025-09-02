import { useState, useEffect, useCallback } from 'react';
import { ChatUser, ChatUserWithLastMessage, Message } from 'types/chat';

export const useUserManagement = (data: any, conversations: Record<string, Message[]>) => {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [topRowUsers, setTopRowUsers] = useState<ChatUser[]>([]);
  const [bottomUsers, setBottomUsers] = useState<ChatUser[]>([]);
  const [chattedUsers, setChattedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const matchIds = data?.getMe?.matchIds ?? [];
    const allMatches: ChatUserWithLastMessage[] = matchIds
      .filter((match: any) => !!match && !!match.matchedUser)
      .map((match: any) => {
        const user = match!.matchedUser;
        const birthDate = user.dateOfBirth ? new Date(user.dateOfBirth) : null;
        const age = birthDate ? new Date().getFullYear() - birthDate.getFullYear() : 0;

        const messages = conversations[match!.id] ?? [];
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : undefined;

        return {
          id: match!.id,
          name: user.name || 'Unknown',
          images: user.images && user.images.length > 0 ? user.images : ['/default-avatar.jpg'],
          dateOfBirth: user.dateOfBirth || '',
          profession: user.profession || '',
          age,
          startedConversation: match!.startedConversation,
          lastMessage,
        };
      });

    const usersNotStartedConversation = allMatches.filter((user) => !user.startedConversation);
    const usersStartedConversation = allMatches.filter((user) => user.startedConversation);

    setTopRowUsers(usersNotStartedConversation.slice(0, 7));
    setBottomUsers(usersStartedConversation);
    // eslint-disable-next-line complexity
    setSelectedUser((prevSelected) => {
      if (prevSelected && allMatches.find((u) => u.id === prevSelected.id)) return prevSelected;
      return usersStartedConversation[0] || usersNotStartedConversation[0] || null;
    });

    const chattedUserIds = new Set(usersStartedConversation.map((user) => user.id));
    setChattedUsers(chattedUserIds);
  }, [data, conversations]);

  const handleUserSelect = useCallback((user: ChatUser | null) => {
    setSelectedUser(user);
  }, []);

  const moveUserToBottom = useCallback((user: ChatUser) => {
    setTopRowUsers((prev) => prev.filter((u) => u.id !== user.id));
    setBottomUsers((prev) => (prev.some((u) => u.id === user.id) ? prev : [user, ...prev]));
  }, []);

  return {
    selectedUser,
    topRowUsers,
    bottomUsers,
    chattedUsers,
    handleUserSelect,
    moveUserToBottom,
    setChattedUsers,
  };
};
