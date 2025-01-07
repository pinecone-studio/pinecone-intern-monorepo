'use client';

import Matches from '@/components/chat/Matches';
import { Loading } from '@/components/main/Loading';
import { MainHeader } from '@/components/main/MainHeader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Match, useGetMatchedUsersQuery } from '@/generated';

const Main: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [recentChats, setRecentChats] = useState<string[]>([]);

  const authId = (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || '{}')._id) || '';

  const { data } = useGetMatchedUsersQuery({
    variables: { authId },
    skip: !authId,
  });

  const matches = data?.getMatchedUsers;

  const handleAddToRecentChats = async (targetUserId: string) => {
    try {
      const match = matches?.find((m) => m.targetUserId._id === targetUserId);

      const username = match?.targetUserId.username;

      if (username && !recentChats.includes(username)) {
        setRecentChats((prevChats) => [username, ...prevChats]);
      }

      if (username) {
        router.replace(`/chat?username=${username}`);
      }
    } catch (error) {
      console.error('Error adding to recent chats:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (!token) {
      router.push('/');
    }

    setLoading(false);
  }, [router]);

  if (loading) {
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
