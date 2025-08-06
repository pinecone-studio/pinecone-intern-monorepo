'use client';
import { HomeFooter, HomeHeader, HomeMain, HomePageBackground } from '@/components/HomePage';

import { useState } from 'react';
import { useGetUsersQuery } from '../generated';
import TinderCard from '@/components/TinderCard';

export interface UserProfile {
  id: string;
  name: string;
  age?: number;
  images: string[] | null;
}

const Home: React.FC = () => {
  const { data, loading, error } = useGetUsersQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = (profileId: string) => {
    console.log('Liked:', profileId);
    goToNextProfile();
  };

  const handleDislike = (profileId: string) => {
    console.log('Disliked:', profileId);
    goToNextProfile();
  };

  const goToNextProfile = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-pink-500 text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  if (error) return <div>Error loading profiles.</div>;

  const profiles: UserProfile[] = (data?.getusers ?? [])
    .filter((user): user is NonNullable<typeof user> => user !== null)
    .map((user) => ({
      id: user.id,
      name: user.name,
      images: user.images ? user.images.filter((img): img is string => img !== null) : null,
    }));

  const currentProfile = profiles[currentIndex];

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

      <div className="relative w-full h-screen flex justify-center items-center bg-gray-100">
        {currentProfile ? <TinderCard profile={currentProfile} onLike={handleLike} onDislike={handleDislike} /> : <div className="text-2xl font-bold text-gray-500">No more profiles</div>}
      </div>

      <div className="w-full flex justify-center items-center fixed bottom-0 l-0 z-30">
        <HomeFooter />
      </div>
    </div>
  );
};
export default Home;
