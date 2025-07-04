'use client';

import TinderCard from '@/components/TinderCard';
import { useGetUsersQuery } from '@/generated';
import { useState } from 'react';

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
    <main>
      <div className="relative w-full h-screen flex justify-center items-center bg-gray-100">
        {currentProfile ? <TinderCard profile={currentProfile} onLike={handleLike} onDislike={handleDislike} /> : <div className="text-2xl font-bold text-gray-500">No more profiles</div>}
      </div>
    </main>
  );
};

export default Home;
