// utils/messageUtils.ts
import { Message } from 'types/chat';

export const mergeMessages = (localMessages: Message[], serverMessages: Message[]): Message[] => {
  const mergedMessagesMap = new Map<string, Message>();

  // Add server messages first
  for (const msg of serverMessages) {
    mergedMessagesMap.set(msg.id, msg);
  }

  // Overlay local messages (including optimistic ones)
  for (const msg of localMessages) {
    if (typeof msg.id === 'string' && msg.id.startsWith('temp_')) {
      // Keep optimistic messages
      mergedMessagesMap.set(msg.id, msg);
    } else if (mergedMessagesMap.has(msg.id)) {
      // Merge local state with server data
      const serverMsg = mergedMessagesMap.get(msg.id)!;
      mergedMessagesMap.set(msg.id, {
        ...serverMsg,
        ...msg, // Local state takes precedence for UI states
        seen: serverMsg.seen, // But server takes precedence for seen status
      });
    } else {
      mergedMessagesMap.set(msg.id, msg);
    }
  }

  const mergedMessages = Array.from(mergedMessagesMap.values()).sort((a, b) => {
    const timeA = new Date(`2000-01-01 ${a.timestamp}`).getTime();
    const timeB = new Date(`2000-01-01 ${b.timestamp}`).getTime();
    return timeA - timeB;
  });

  return mergedMessages;
};
