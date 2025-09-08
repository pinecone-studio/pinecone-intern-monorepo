// Create a simple global bridge for messages sent from MatchPopup
// This works better than localStorage for immediate state updates

interface PendingMessage {
  id: string;
  text: string;
  sender: 'me';
  timestamp: string;
  seen: boolean;
  delivered: boolean;
  sending: boolean;
  failed: boolean;
  retrying: boolean;
}

class MessageBridge {
  private pendingMessages: Map<string, PendingMessage[]> = new Map();
  private listeners: Set<() => void> = new Set();

  // Add a message to the bridge
  addMessage(matchId: string, message: PendingMessage) {
    console.log('MessageBridge: Adding message', { matchId, message });

    const existing = this.pendingMessages.get(matchId) || [];

    // Check for duplicates
    const isDuplicate = existing.some((msg) => msg.id === message.id || (msg.text === message.text && Math.abs(new Date(msg.timestamp).getTime() - new Date(message.timestamp).getTime()) < 2000));

    if (!isDuplicate) {
      this.pendingMessages.set(matchId, [...existing, message]);
      console.log('MessageBridge: Message added, notifying listeners');
      this.notifyListeners();
    } else {
      console.log('MessageBridge: Duplicate message detected, skipping');
    }
  }

  // Get and clear messages for a specific match
  getAndClearMessages(matchId: string): PendingMessage[] {
    const messages = this.pendingMessages.get(matchId) || [];
    if (messages.length > 0) {
      console.log('MessageBridge: Retrieving messages for match', matchId, messages);
      this.pendingMessages.delete(matchId);
      this.notifyListeners();
    }
    return messages;
  }

  // Get all pending matches (for chatted users list)
  getPendingMatches(): string[] {
    return Array.from(this.pendingMessages.keys());
  }

  // Check if match has pending messages
  hasPendingMessages(matchId: string): boolean {
    return this.pendingMessages.has(matchId) && this.pendingMessages.get(matchId)!.length > 0;
  }

  // Subscribe to changes
  subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((callback) => callback());
  }

  // Debug method
  getDebugInfo() {
    return {
      totalMatches: this.pendingMessages.size,
      totalMessages: Array.from(this.pendingMessages.values()).reduce((sum, msgs) => sum + msgs.length, 0),
      matches: Object.fromEntries(this.pendingMessages.entries()),
    };
  }
}

// Create global instance
export const messageBridge = new MessageBridge();

// React hook to use the bridge
import { useEffect, useState } from 'react';

export const useMessageBridge = () => {
  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const unsubscribe = messageBridge.subscribe(() => {
      setUpdateTrigger((prev) => prev + 1);
    });

    return unsubscribe;
  }, []);

  return {
    addMessage: (matchId: string, message: PendingMessage) => messageBridge.addMessage(matchId, message),
    getAndClearMessages: (matchId: string) => messageBridge.getAndClearMessages(matchId),
    getPendingMatches: () => messageBridge.getPendingMatches(),
    hasPendingMessages: (matchId: string) => messageBridge.hasPendingMessages(matchId),
    getDebugInfo: () => messageBridge.getDebugInfo(),
  };
};
