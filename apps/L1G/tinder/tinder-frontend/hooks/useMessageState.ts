'use client';
import { useState, useCallback } from 'react';
import { Message } from 'types/chat';

export const useMessageState = () => {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});

  const updateMessages = useCallback((matchId: string, updater: (_messages: Message[]) => Message[]) => {
    setConversations((prev) => ({
      ...prev,
      [matchId]: updater(prev[matchId] || []),
    }));
  }, []);

  const markMessagesAsSeenLocally = useCallback(
    (matchId: string, messageIds: string[]) => {
      updateMessages(matchId, (messages) => messages.map((msg) => (messageIds.includes(msg.id) ? { ...msg, seen: true } : msg)));
    },
    [updateMessages]
  );

  const revertSeenStatus = useCallback(
    (matchId: string) => {
      updateMessages(matchId, (messages) => messages.map((msg) => (msg.sender === 'them' ? { ...msg, seen: false } : msg)));
    },
    [updateMessages]
  );

  return {
    conversations,
    setConversations,
    updateMessages,
    markMessagesAsSeenLocally,
    revertSeenStatus,
  };
};

 