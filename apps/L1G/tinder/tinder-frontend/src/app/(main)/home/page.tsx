'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';

import { useDislikeMutation, useGetusersQuery, useLikeUserMutation } from '@/generated';
import { UserProfile } from '@/app/page';
import MatchDialogClose from '@/components/MatchDialogClose';
import ProfileSwiper from '@/components/ProfileSwiper';

const HomePage = () => {
  const { data, loading, error } = useGetusersQuery();
  const [like] = useLikeUserMutation();
  const [like] = useLikeUserMutation();
  const [dislike] = useDislikeMutation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatched, setIsMatched] = useState(false);

  const currentUserId = '68a7b842f11c5ff030e65958';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMatched) {
        closeMatchDialog();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMatched]);

  const handleLike = async (profileId: string) => {
    try {
      const response = await like({
        variables: {
          likedByUser: currentUserId,
          likeReceiver: profileId,
        },
      });

      const didMatch = response?.data?.like?.isMatch ?? false;

      if (didMatch) {
        setIsMatched(true);
      } else {
        goToNextProfile();
      }
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
    setCurrentIndex((prev) => prev + 1);
  };

  const closeMatchDialog = () => {
    setIsMatched(false);
    goToNextProfile();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-pink-500 text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) return <div>Error loading profiles.</div>;

  const profiles: UserProfile[] = (data?.getusers ?? [])
    .filter((user): user is NonNullable<typeof user> => user !== null)
    .map((user) => ({
      id: user.id,
      name: user.name,
      images: user.images?.filter((img): img is string => img !== null) ?? [],
    }));

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="fixed top-0 left-0 w-full z-50 flex justify-start items-start">
        <Header />
      </div>

      <ProfileSwiper profiles={profiles} currentIndex={currentIndex} onLike={handleLike} onDislike={handleDislike} />

      {isMatched && <MatchDialogClose onClose={closeMatchDialog} />}
    </div>
  );
};

export default HomePage;
