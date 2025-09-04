import { useEffect, useRef, useState } from 'react';

export function useChatScroll(messagesLength: number) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (!bottomRef.current || !messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    const isScrolledNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isNearBottom || isScrolledNearBottom || messagesLength <= 1) {
      bottomRef.current.scrollIntoView({
        behavior: messagesLength <= 1 ? 'auto' : 'smooth',
        block: 'end',
      });
      setShowScrollToBottom(false);
    } else {
      setShowScrollToBottom(true);
    }
  }, [messagesLength, isNearBottom]);

  // Scroll position monitoring
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isScrolledNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setIsNearBottom(isScrolledNearBottom);
      setShowScrollToBottom(!isScrolledNearBottom && messagesLength > 0);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [messagesLength]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    setShowScrollToBottom(false);
  };

  return {
    bottomRef,
    messagesContainerRef,
    showScrollToBottom,
    scrollToBottom,
  };
}
