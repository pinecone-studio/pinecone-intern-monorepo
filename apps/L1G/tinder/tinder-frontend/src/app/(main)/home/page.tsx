'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { useDislikeMutation, useGetusersQuery, useLikeUserMutation } from '@/generated';
import { UserProfile } from '@/app/page';
import MatchDialogClose from '@/components/MatchDialogClose';
import ProfileSwiper from '@/components/ProfileSwiper';
import { useCurrentUser } from '@/app/contexts/CurrentUserContext';
import Loading from '@/components/Loading';

const handleKeyDown = (e: KeyboardEvent, isMatched: boolean, closeMatchDialog: () => void) => {
  if (e.key === 'Escape' && isMatched) {
    closeMatchDialog();
  }
};

const getFilteredProfiles = (data: any, currentUserId: string, gender?: string) => {
  return (data?.getOtherUsers ?? [])
    .filter((u: any): u is NonNullable<typeof u> => u && (typeof u.id === 'string' || typeof u.id === 'number'))
    .filter((u: any) => u.id.toString() !== currentUserId)
    .filter((u: any) => !gender || u.gender === gender)
    .filter((u: any) => Array.isArray(u.images) && u.images.length > 0)
    .map((u: any) => ({
      id: u.id.toString(),
      name: u.name ?? 'Unknown',
      interests:
        u.interests
          ?.filter((i: any) => i && (typeof i._id === 'string' || typeof i._id === 'number') && i.interestName)
          .map((i: any) => ({
            _id: i._id.toString(),
            interestName: i.interestName ?? '',
          })) ?? [],
      images: u.images?.filter((img: any) => img != null) ?? [],
      bio: u.bio,
      gender: u.gender ?? undefined,
    }));
};

/* eslint-disable-next-line complexity */
const HomePage = () => {
  const { currentUser, loading: userLoading, error: userError } = useCurrentUser();

  const {
    data,
    loading: profilesLoading,
    error: profilesError,
  } = useGetOtherUsersQuery({
    variables: { _id: currentUser?.id }, // энд заавал дамжуулах хэрэгтэй
    skip: !currentUser,
  });

  console.log(currentUser, 'l');

  const [like] = useLikeUserMutation();
  const [dislike] = useDislikeMutation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const [matchedusersid, setMatchedusersid] = useState<string[]>([]);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyDown(e, isMatched, closeMatchDialog);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
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
        setMatchedusersid([currentUser.id, profileId]);
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

  if (profilesLoading || userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (userError) {
    console.error(userError);
    return <div>Error loading user info.</div>;
  }

  if (profilesError) {
    console.error(profilesError);
    return <div>Error loading profiles.</div>;
  }

  if (!currentUser) {
    return <div>User not found.</div>;
  }

  const profiles: UserProfile[] = getFilteredProfiles(data, currentUser.id, currentUser.genderPreferences || undefined);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="fixed top-0 left-0 z-50 flex items-start justify-start w-full">
        <Header />
      </div>

      <ProfileSwiper profiles={profiles} currentIndex={currentIndex} onLike={handleLike} onDislike={handleDislike} />

      {isMatched && <MatchDialogClose matchedusersid={matchedusersid} onClose={closeMatchDialog} />}
    </div>
  );
};

export default HomePage;
