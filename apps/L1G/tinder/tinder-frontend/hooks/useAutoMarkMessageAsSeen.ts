'use client';
 
import { useEffect } from 'react';
 
export const useAutoMarkMessageAsSeen = (selectedUser: any, showChatOnMobile: boolean, isMobile: boolean, markMessagesAsSeen: () => void) => {
  useEffect(() => {
    if (!selectedUser) return;
 
    if (!isMobile) {
      // Desktop: mark as seen immediately
      const timeoutId = setTimeout(() => {
        markMessagesAsSeen();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      // Mobile: only mark as seen if chat window is visible
      if (showChatOnMobile) {
        const timeoutId = setTimeout(() => {
          markMessagesAsSeen();
        }, 500);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [selectedUser, showChatOnMobile, isMobile, markMessagesAsSeen]);
};
 