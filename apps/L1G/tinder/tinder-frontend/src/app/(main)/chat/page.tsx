'use client';
import ChatPage from '@/components/ChatPage';
import { Header } from '@/components/Header';
import { useRouter } from 'next/router';

const Chat = () => {
  const token = localStorage.getItem('token');
  const router = useRouter();
  if (!token) {
    router.push('/');
  }
  return (
    <div>
      <Header />
      <ChatPage />
    </div>
  );
};

export default Chat;
