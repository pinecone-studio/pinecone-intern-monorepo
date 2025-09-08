/* eslint-disable complexity */
/* eslint-disable max-lines */

import { useState, useEffect, useCallback } from 'react';
import { ChatUser, ChatUserWithLastMessage, Message } from 'types/chat';

export const useUserManagement = (data: any, conversations: Record<string, Message[]>) => {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [topRowUsers, setTopRowUsers] = useState<ChatUserWithLastMessage[]>([]);
  const [bottomUsers, setBottomUsers] = useState<ChatUserWithLastMessage[]>([]);

  const [chattedUsers, setChattedUsers] = useState<Set<string>>(new Set());
  const [allMatches, setAllMatches] = useState<ChatUserWithLastMessage[]>([]);

  // Process and organize users
  useEffect(() => {
    const matchIds = data?.getMe?.matchIds ?? [];
    const processedMatches: ChatUserWithLastMessage[] = matchIds
      .filter((match: any) => !!match && !!match.matchedUser)
      .map((match: any) => {
        const user = match!.matchedUser;
        const birthDate = user.dateOfBirth ? new Date(user.dateOfBirth) : null;
        const age = birthDate ? new Date().getFullYear() - birthDate.getFullYear() : 0;

        const messages = conversations[match!.id] ?? [];
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : undefined;
        const hasUnreadMessages = messages.some((msg) => msg.sender === 'them' && !msg.seen);

        return {
          id: match!.id,
          name: user.name || 'Unknown',
          images: user.images && user.images.length > 0 ? user.images : ['/default-avatar.jpg'],
          dateOfBirth: user.dateOfBirth || '',
          profession: user.profession || '',
          age,
          startedConversation: messages.length > 0,
          lastMessage,
          hasUnreadMessages,
          lastActivity: lastMessage ? new Date(`2000-01-01 ${lastMessage.timestamp}`) : new Date(match!.createdAt || Date.now()),
          bio: user.bio || '',
          interests: user.interests || [],
        };
      })
      .sort((a: any, b: any) => {
        // Sort by last activity (most recent first)
        return b.lastActivity.getTime() - a.lastActivity.getTime();
      });

    setAllMatches(processedMatches);

    // Separate users into different categories
    const usersWithConversation = processedMatches.filter((user) => user.startedConversation);
    const usersWithoutConversation = processedMatches.filter((user) => !user.startedConversation);

    // Top row: New matches (up to 7)
    setTopRowUsers(usersWithoutConversation.slice(0, 7));

    // Bottom: Users with conversations, sorted by most recent activity
    setBottomUsers(
      usersWithConversation.sort((a, b) => {
        // Prioritize unread messages
        if (a.hasUnreadMessages && !b.hasUnreadMessages) return -1;
        if (!a.hasUnreadMessages && b.hasUnreadMessages) return 1;

        // Then sort by last activity
        return b.lastActivity.getTime() - a.lastActivity.getTime();
      })
    );

    // Update selected user if it exists in the new matches
    setSelectedUser((prevSelected) => {
      if (prevSelected && processedMatches.find((u) => u.id === prevSelected.id)) {
        // Update selected user data with fresh info
        const updatedUser = processedMatches.find((u) => u.id === prevSelected.id);
        return updatedUser || prevSelected;
      }

      // Auto-select first user with conversation or first new match
      return usersWithConversation[0] || usersWithoutConversation[0] || null;
    });

    // Update chatted users set
    const chattedUserIds = new Set(usersWithConversation.map((user) => user.id));
    setChattedUsers(chattedUserIds);
  }, [data, conversations]);

  const handleUserSelect = useCallback((user: ChatUser | null) => {
    setSelectedUser(user);
  }, []);

  const moveUserToBottom = useCallback((user: ChatUserWithLastMessage) => {
    setTopRowUsers((prev) => prev.filter((u) => u.id !== user.id));
    setBottomUsers((prev) => {
      if (prev.some((u) => u.id === user.id)) {
        return [prev.find((u) => u.id === user.id)!, ...prev.filter((u) => u.id !== user.id)];
      }
      return [user, ...prev];
    });
    setChattedUsers((prev) => new Set(prev).add(user.id));
  }, []);

  // Add new match to the system
  const addNewMatch = useCallback((matchData: { matchId: string; matchedUser: any; timestamp: string }) => {
    const newUser: ChatUserWithLastMessage = {
      id: matchData.matchId,
      name: matchData.matchedUser.name || 'Unknown',
      images: matchData.matchedUser.images || ['/default-avatar.jpg'],
      dateOfBirth: matchData.matchedUser.dateOfBirth || '',
      profession: matchData.matchedUser.profession || '',
      age: matchData.matchedUser.age || 0,
      startedConversation: false,
      lastMessage: undefined,
      hasUnreadMessages: false,
      lastActivity: new Date(matchData.timestamp),
      bio: matchData.matchedUser.bio || '',
    };

    // Add to top row users (new matches)
    setTopRowUsers((prev) => {
      // Avoid duplicates
      if (prev.some((u) => u.id === newUser.id)) return prev;
      return [newUser, ...prev.slice(0, 6)]; // Keep max 7 in top row
    });

    setAllMatches((prev) => {
      // Avoid duplicates
      if (prev.some((u) => u.id === newUser.id)) return prev;
      return [newUser, ...prev];
    });
  }, []);

  // Remove match from the system
  const removeMatch = useCallback(
    (matchId: string) => {
      setTopRowUsers((prev) => prev.filter((u) => u.id !== matchId));
      setBottomUsers((prev) => prev.filter((u) => u.id !== matchId));
      setAllMatches((prev) => prev.filter((u) => u.id !== matchId));
      setChattedUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(matchId);
        return newSet;
      });

      // Clear selection if the removed match was selected
      setSelectedUser((prev) => {
        if (prev?.id === matchId) {
          // Select next available user
          const remaining = allMatches.filter((u) => u.id !== matchId);
          return remaining.find((u) => u.startedConversation) || remaining[0] || null;
        }
        return prev;
      });
    },
    [allMatches]
  );

  // Update user's last message and activity
  const updateUserLastMessage = useCallback(
    (matchId: string, message: Message) => {
      const updateUser = (user: ChatUserWithLastMessage) => {
        if (user.id === matchId) {
          return {
            ...user,
            lastMessage: message,
            lastActivity: new Date(`2000-01-01 ${message.timestamp}`),
            hasUnreadMessages: message.sender === 'them' && !message.seen,
            startedConversation: true,
          };
        }
        return user;
      };

      setTopRowUsers((prev) => prev.map(updateUser));
      setBottomUsers((prev) => prev.map(updateUser));
      setAllMatches((prev) => prev.map(updateUser));

      // If this was a new match that now has a conversation, move it
      if (!chattedUsers.has(matchId)) {
        const user = allMatches.find((u) => u.id === matchId);
        if (user) {
          moveUserToBottom(user);
        }
      }
    },
    [allMatches, chattedUsers, moveUserToBottom]
  );

  // Mark messages as read for a user
  const markUserMessagesAsRead = useCallback((matchId: string) => {
    const updateReadStatus = (user: ChatUserWithLastMessage) => {
      if (user.id === matchId) {
        return { ...user, hasUnreadMessages: false };
      }
      return user;
    };

    setTopRowUsers((prev) => prev.map(updateReadStatus));
    setBottomUsers((prev) => prev.map(updateReadStatus));
    setAllMatches((prev) => prev.map(updateReadStatus));
  }, []);

  // Get unread message count for a specific match
  const getUnreadCount = useCallback(
    (matchId: string) => {
      const messages = conversations[matchId] || [];
      return messages.filter((msg) => msg.sender === 'them' && !msg.seen).length;
    },
    [conversations]
  );

  // Get total unread count across all matches
  const getTotalUnreadCount = useCallback(() => {
    return Object.keys(conversations).reduce((total, matchId) => {
      return total + getUnreadCount(matchId);
    }, 0);
  }, [conversations, getUnreadCount]);

  return {
    selectedUser,
    topRowUsers,
    bottomUsers,
    chattedUsers,
    allMatches,
    handleUserSelect,
    moveUserToBottom,
    setChattedUsers,
    addNewMatch,
    removeMatch,
    updateUserLastMessage,
    markUserMessagesAsRead,
    getUnreadCount,
    getTotalUnreadCount,
  };
};
 