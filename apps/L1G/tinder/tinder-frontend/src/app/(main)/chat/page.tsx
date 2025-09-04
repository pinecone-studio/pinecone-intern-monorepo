'use client';
import ChatPage from '@/components/ChatPage';
import { Header } from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Chat = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/');
    } else {
      setToken(storedToken);
    }
  }, [router]);

  if (!token) {
    return null;
  }

  return (
    <div>
      <Header />
      <ChatPage />
    </div>
  );
};

export default Chat;
