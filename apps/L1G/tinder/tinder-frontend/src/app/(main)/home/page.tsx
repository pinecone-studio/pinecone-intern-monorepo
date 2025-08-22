'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';

import { useDislikeMutation, useGetusersQuery, useLikeUserMutation } from '@/generated';
import { UserProfile } from '@/app/page';
import MatchDialogClose from '@/components/MatchDialogClose';
import ProfileSwiper from '@/components/ProfileSwiper';
import { useCurrentUser } from '@/app/contexts/CurrentUserContext';

const HomePage = () => {
  const { currentUser } = useCurrentUser();

  const { data, loading, error } = useGetusersQuery();
  const [like] = useLikeUserMutation();
  const [dislike] = useDislikeMutation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatched, setIsMatched] = useState(false);

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
    if (!currentUser) return;
    try {
      const response = await like({
        variables: {
          likedByUser: currentUser.id,
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
    if (!currentUser) return;
    try {
      await dislike({
        variables: {
          dislikedByUser: currentUser.id,
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

  if (!currentUser) return <div>User not found.</div>;

  const profiles: UserProfile[] = (data?.getusers ?? [])
    .filter((u): u is NonNullable<typeof u> => u !== null)
    .filter((u) => u.id !== currentUser?.id)
    .map((u) => ({
      id: u.id,
      name: u.name,
      images: u.images?.filter((img): img is string => img !== null) ?? [],
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
