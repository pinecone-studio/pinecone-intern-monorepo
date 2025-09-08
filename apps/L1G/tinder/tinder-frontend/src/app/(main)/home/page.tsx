/* eslint-disable complexity */
/* eslint-disable max-lines */

'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { useDislikeMutation, useGetOtherUsersQuery, useLikeUserMutation } from '@/generated';
import type { UserProfile } from '@/app/page';
import MatchDialogClose from '@/components/MatchDialogClose';
import ProfileSwiper from '@/components/ProfileSwiper';
import { useCurrentUser } from '@/app/contexts/CurrentUserContext';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import socket from 'utils/socket';

const calculateAge = (dateOfBirth: string): number => {
  const birthYear = parseInt(dateOfBirth.split('-')[0], 10);
  return new Date().getFullYear() - birthYear;
};

const handleKeyDown = (e: KeyboardEvent, isMatched: boolean, closeMatchDialog: () => void) => {
  if (e.key === 'Escape' && isMatched) {
    closeMatchDialog();
  }
};

export type MatchedUser = {
  id: string;
  name: string;
  images: string[];
};

const HomePage = () => {
  const { currentUser, loading: userLoading, error: userError } = useCurrentUser();
  const {
    data,
    loading: profilesLoading,
    error: profilesError,
  } = useGetOtherUsersQuery({
    variables: currentUser ? { id: currentUser.id } : undefined,
    skip: !currentUser,
  });

  const [like] = useLikeUserMutation();
  const [dislike] = useDislikeMutation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Memoize filtered profiles - only recalculate when dependencies change
  const profiles = useMemo(() => {
    if (!data?.getOtherUsers || !currentUser) return [];

    const genderFilter = currentUser.genderPreferences;
    const currentUserId = currentUser.id;

    return data.getOtherUsers
      .filter((u: any): u is NonNullable<typeof u> => u && (typeof u.id === 'string' || typeof u.id === 'number'))
      .filter((u: any) => u.id.toString() !== currentUserId)
      .filter((u: any) => {
        if (!genderFilter || genderFilter === 'Both') return true;
        return u.gender === genderFilter;
      })
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
        age: calculateAge(u.dateOfBirth),
        gender: u.gender ?? undefined,
      }));
  }, [data?.getOtherUsers, currentUser?.id, currentUser?.genderPreferences]);

  const handleLike = useCallback(
    async (profileId: string, profileData?: UserProfile) => {
      if (!currentUser) return;

      try {
        const response = await like({
          variables: {
            likedByUser: currentUser.id,
            likeReceiver: profileId,
          },
        });

        const didMatch = response?.data?.like?.isMatch ?? false;
        let matchId: string;

        try {
          matchId = (response?.data?.like as any)?.matchId || `match_${currentUser.id}_${profileId}_${Date.now()}`;
          if (!matchId || matchId.trim() === '') {
            matchId = `match_${currentUser.id}_${profileId}_${Date.now()}`;
          }
        } catch (matchIdError) {
          matchId = `match_${currentUser.id}_${profileId}_${Date.now()}`;
          console.warn('Failed to get matchId from response, using generated ID:', matchIdError);
        }

        if (didMatch) {
          setIsMatched(true);
          setMatchedUsers([
            {
              id: currentUser.id,
              name: currentUser.name ?? 'Unknown',
              images: (currentUser.images ?? []).filter((img): img is string => img !== null && img !== undefined),
            },
            {
              id: profileId,
              name: profileData?.name ?? 'Unknown',
              images: profileData?.images || [],
            },
          ]);

          socket.emit('new_match_created', {
            matchId,
            user1Id: currentUser.id,
            user2Id: profileId,
            matchData: {
              user1: {
                id: currentUser.id,
                name: currentUser.name,
                images: currentUser.images,
                dateOfBirth: currentUser.dateOfBirth,
                profession: currentUser.profession,
              },
              user2: {
                id: profileId,
                name: profileData?.name,
                images: profileData?.images,
                dateOfBirth: profileData?.dateOfBirth || null,
                profession: profileData?.profession || null,
              },
            },
          });

          console.log('Match created and socket event emitted:', {
            matchId,
            currentUser: currentUser.id,
            profileId,
          });
        } else {
          socket.emit('user_liked', {
            likedBy: currentUser.id,
            likedUserId: profileId,
          });
        }
        requestAnimationFrame(() => {
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
          }, 300);
        });
      } catch (err) {
        console.error('Error liking user:', err);
        requestAnimationFrame(() => {
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
          }, 300);
        });
      }
    },
    [currentUser, like]
  );

  const handleDislike = useCallback(
    async (profileId: string) => {
      if (!currentUser) return;

      try {
        await dislike({
          variables: {
            dislikedByUser: currentUser.id,
            dislikeReceiver: profileId,
          },
        });

        socket.emit('user_disliked', {
          dislikedBy: currentUser.id,
          dislikedUserId: profileId,
        });

        requestAnimationFrame(() => {
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
          }, 300);
        });
      } catch (err) {
        console.error('Error disliking user:', err);
        requestAnimationFrame(() => {
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
          }, 300);
        });
      }
    },
    [currentUser, dislike]
  );

  const closeMatchDialog = useCallback(() => {
    setIsMatched(false);
  }, []);

  // Memoize keyboard event handler
  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      handleKeyDown(e, isMatched, closeMatchDialog);
    },
    [isMatched, closeMatchDialog]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/');
    } else {
      setToken(storedToken);
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [keydownHandler]);

  if (!token) {
    return null;
  }

  if (profilesLoading || userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading msg="Please wait..." />
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

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="fixed top-0 left-0 w-full z-50 flex justify-start items-start">
        <Header />
      </div>
      <ProfileSwiper profiles={profiles} currentIndex={currentIndex} onLike={handleLike} onDislike={handleDislike} />
      {isMatched && <MatchDialogClose data={{ getMe: currentUser }} matchedUsers={matchedUsers} onClose={closeMatchDialog} />}
    </div>
  );
};

export default HomePage;
