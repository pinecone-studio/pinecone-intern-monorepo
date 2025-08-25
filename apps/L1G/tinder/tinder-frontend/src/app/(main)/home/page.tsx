'use client';
import { UserProfile } from '@/app/page';
import { Header } from '@/components/Header';
import TinderCard from '@/components/TinderCard';
import { useDislikeMutation, useGetusersQuery, useLikeUserMutation } from '@/generated';
import { useState } from 'react';

const HomePage = () => {
  const { data, loading, error } = useGetusersQuery();
  const [like] = useLikeUserMutation();
  const [dislike] = useDislikeMutation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<UserProfile | null>(null);

  const currentUserId = '68a7dd5a3435c832c6c97b7d';
  console.log(data, 'data');

  const handleLike = async (profileId: string) => {
    try {
      await like({
        variables: {
          likedByUser: currentUserId,
          likeReceiver: profileId,
        },
      });
      goToNextProfile();
    } catch (err) {
      console.error('Error liking user:', err);
    }
  };

  const handleDislike = async (profileId: string) => {
    try {
      await dislike({
        variables: {
          dislikedByUser: currentUserId,
          dislikeReceiver: profileId,
        },
      });
      goToNextProfile();
    } catch (err) {
      console.error('Error disliking user:', err);
    }
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
    <div className=" w-screen h-screen flex felx-col justify-center items-center">
      <div className="fixed top-0 left-0 w-full z-50 flex justify-start items-start ">
        <Header />
      </div>

      {currentProfile ? <TinderCard profile={currentProfile} onLike={handleLike} onDislike={handleDislike} /> : <div className="text-2xl font-bold text-gray-500">No more profiles</div>}
    </div>
  );
};

export default HomePage;
