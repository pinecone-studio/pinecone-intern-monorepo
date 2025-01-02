'use client';

import MainChat from '@/components/chat/MainChat';
import Matches from '@/components/chat/Matches';
import { Loading } from '@/components/main/Loading';
import { MainHeader } from '@/components/main/MainHeader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Main: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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

  if (!user) {
    return <div>Error: No user found</div>;
  }

  return (
    <div>
      <MainHeader user={user} />
      <Matches />
      <MainChat />
    </div>
  );
};

export default Main;
