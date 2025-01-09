'use client';

import Matches from '@/components/chat/Matches';
import { Loading } from '@/components/main/Loading';
import { MainHeader } from '@/components/main/MainHeader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Match, useGetMatchedUsersQuery } from '@/generated';

const getAuthId = () => {
  if (typeof window === 'undefined') return '';
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  return storedUser?._id || '';
};

const useCheckToken = (router: any) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);
};

const Main: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [recentChats, setRecentChats] = useState<string[]>([]);

  const authId = getAuthId();
  const { data } = useGetMatchedUsersQuery({
    variables: { authId },
    skip: !authId,
  });

  const matches = data?.getMatchedUsers;

  const getMatchByUserId = (targetUserId: string) => {
    return matches?.find((m) => m.targetUserId?._id === targetUserId);
  };

  const addToRecentChats = (username: string) => {
    if (!recentChats.includes(username)) {
      setRecentChats((prevChats) => [username, ...prevChats]);
    }
  };

  const redirectToChat = (username: string) => {
    router.replace(`/chat?username=${username}`);
  };

  const handleAddToRecentChats = async (targetUserId: string) => {
    try {
      if (!matches) return;
      const match = getMatchByUserId(targetUserId);
      const username = match?.targetUserId?.username;
      if (username) {
        addToRecentChats(username);
        redirectToChat(username);
      }
    } catch (error) {
      console.error('Error adding to recent chats:', error);
    }
  };

  useCheckToken(router);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading || !authId || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col relative items-center justify-between h-screen ">
      <MainHeader user={user} />
      <Matches matches={matches as Match[]} handleAddToRecentChats={handleAddToRecentChats} />
      {/* <MainChat /> */}
    </div>
  );
};

export default Main;
