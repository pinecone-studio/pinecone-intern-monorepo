/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */ import type { Message } from 'types/chat';

export const getUserStatusByMatchId = (matchId: string | undefined, matchIds: any[] | null | undefined, userStatuses: Record<string, { status: 'online' | 'away' | 'offline'; lastSeen: string }>) => {
  if (!matchId || !matchIds) return undefined;
  const match = matchIds.find((match) => match?.id === matchId);
  const actualUserId = match?.matchedUser?.id;
  return actualUserId ? userStatuses[actualUserId] : undefined;
};

export const getLastSeenMessageId = (messages: Message[]): string | null => {
  const seenMessages = messages.filter((m) => m.sender === 'me' && m.seen);
  if (seenMessages.length === 0) return null;
  return seenMessages[seenMessages.length - 1].id;
};

export const createMatchIdToUserStatusMap = (
  matchIds: any[] | null | undefined,
  userStatuses: Record<string, { status: 'online' | 'away' | 'offline'; lastSeen: string }>
): Record<string, { status: 'online' | 'away' | 'offline'; lastSeen: string }> => {
  const statusMap: Record<string, { status: 'online' | 'away' | 'offline'; lastSeen: string }> = {};
  if (matchIds) {
    matchIds.forEach((match) => {
      if (match?.id && match.matchedUser?.id) {
        const userStatus = userStatuses[match.matchedUser.id];
        if (userStatus) {
          statusMap[match.id] = userStatus;
        }
      }
    });
  }
  return statusMap;
};

export const shouldShowChatPersonOnMobile = (showChatOnMobile: boolean): boolean => {
  return !showChatOnMobile;
};

export const shouldShowChatWindowOnMobile = (showChatOnMobile: boolean): boolean => {
  return showChatOnMobile;
};

export const handleKeyDownForSending = (
  e: React.KeyboardEvent<HTMLInputElement>,
  sending: boolean,
  inputValue: string,
  handleSend: (message: string, setInputValue: (value: string) => void) => void,
  setInputValue: (value: string) => void
): void => {
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    if (!sending && inputValue.trim()) {
      handleSend(inputValue, setInputValue);
    }
  }
};
