'use client';

import TinderCard from '@/components/TinderCard';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  age?: number;
  images: string[] | null;
}

const GET_USERS = gql`
  query GetUsers {
    getusers {
      id
      name
      images
      likedBy {
        id
        name
      }
      likedTo {
        id
        name
      }
      matched {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_USERS);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profiles.</div>;
  console.log(data, 'data');

  const profiles: UserProfile[] = data?.getusers ?? [];
  const currentProfile = profiles[currentIndex];

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-100">
      {currentProfile ? <TinderCard profile={currentProfile} onLike={handleLike} onDislike={handleDislike} /> : <div className="text-2xl font-bold text-gray-500">No more profiles</div>}
    </div>
  );
}
