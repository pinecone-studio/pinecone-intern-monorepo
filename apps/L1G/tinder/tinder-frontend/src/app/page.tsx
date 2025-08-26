'use client';
import { HomeFooter, HomeHeader, HomeMain, HomePageBackground } from '@/components/HomePage';
import { useGetusersQuery } from '@/generated';
import { useEffect } from 'react';
import socket from 'utils/socket';

export interface UserProfile {
  id: string;
  name: string | null | undefined;
  age?: number;
  images: string[] | null;
}

const Home: React.FC = () => {
  const { loading } = useGetusersQuery();
  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to socket server');
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Connection error:', err);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
    };
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-pink-500 text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden gap-4 bg-black absolute">
      <div className="w-full flex justify-center items-center fixed top-0 left-0 z-30">
        <HomeHeader />
      </div>

      <div className="flex justify-center items-center rotate-[30deg] gap-4 relative z-0 opacity-30">
        {Array.from({ length: 7 }).map((_, idx) => {
          return <HomePageBackground key={idx} />;
        })}
      </div>

      <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <HomeMain />
      </div>

      <div className="w-full flex justify-center items-center fixed bottom-0 l-0 z-30">
        <HomeFooter />
      </div>
    </div>
  );
};
export default Home;
