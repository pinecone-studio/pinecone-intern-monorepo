import { useEffect, useRef, useState } from 'react';
import { useSendMessageMutation } from '@/generated';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollToBottom } from './ScrollToBottom';

export const Message = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [sendMessageMutation] = useSendMessageMutation();
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setIsUserScrolling(!nearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isUserScrolling) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isUserScrolling]);

  const simulateStreaming = (fullResponse: string) => {
    let index = -1;
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: 'bot', content: '' }]);

    streamingIntervalRef.current = setInterval(() => {
      if (index === fullResponse.length - 1) {
        if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
        setIsStreaming(false);
        return;
      }

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return last?.role === 'bot' ? [...prev.slice(0, -1), { role: 'bot', content: last.content + fullResponse[index] }] : [...prev, { role: 'bot', content: fullResponse[index] }];
      });

      index++;
    }, 30);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    try {
      const { data } = await sendMessageMutation({
        variables: {
          input: {
            conversationId: '67d337c593b47e004a086b31',
            query: input,
          },
        },
      });

      const response = data?.sendMessage?.response ?? 'Sorry, no response.';
      simulateStreaming(response);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleStopStreaming = () => {
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen overflow-hidden text-black bg-white dark:bg-black dark:text-white">
      <div className="relative flex flex-col w-full h-full max-w-3xl">
        <header className="flex items-center justify-between px-6 py-3 text-black bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-black dark:text-white">
          <h1 className="text-lg font-semibold">Chat</h1>
        </header>

        <main ref={chatContainerRef} className="flex-grow px-6 py-6 pb-32 space-y-4 overflow-y-auto custom-scroll">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role as 'user' | 'bot'} content={msg.content} />
          ))}
          <div ref={messagesEndRef} />
        </main>

        {isUserScrolling && (
          <ScrollToBottom
            onClick={() => {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
              setIsUserScrolling(false);
            }}
          />
        )}

        <footer className="fixed bottom-0 w-full max-w-3xl px-6 py-4 bg-white border-t border-gray-200 dark:border-gray-800 dark:bg-black">
          <ChatInput input={input} isStreaming={isStreaming} onChange={setInput} onSend={handleSend} onStop={handleStopStreaming} />
        </footer>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #444;
          border-radius: 9999px;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #444 transparent;
        }
      `}</style>
    </div>
  );
};
