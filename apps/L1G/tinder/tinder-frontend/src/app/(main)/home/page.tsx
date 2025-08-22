'use client';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/app/page';
import { Header } from '@/components/Header';
import TinderCard from '@/components/TinderCard';
import { useDislikeMutation, useGetusersQuery, useLikeUserMutation } from '@/generated';

const HomePage = () => {
  const { data, loading, error } = useGetusersQuery();
  const [like] = useLikeUserMutation();
  const [dislike] = useDislikeMutation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // JWT decode хийх функц (Buffer ашиглана)
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  };

  // client-side-д token-аас currentUserId-г авах
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload) setCurrentUserId(payload.userId || payload.id);
    }
  }, []);

  const handleLike = async (profileId: string) => {
    if (!currentUserId) return; // ID байхгүй бол mutation ажиллахгүй
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
//  console.log('User ID:', currentUserId); /////////////////////////////////////////////////////////////////////////koko
  const handleDislike = async (profileId: string) => {
    if (!currentUserId) return;
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

  if (error) return <div>huts</div>;

  const profiles: UserProfile[] = (data?.getusers ?? [])
    .filter((user): user is NonNullable<typeof user> => user !== null)
    .map((user) => ({
      id: user.id,
      name: user.name,
      images: user.images ? user.images.filter((img): img is string => img !== null) : null,
    }));

  const currentProfile = profiles[currentIndex];

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="fixed top-0 left-0 w-full z-50 flex justify-start items-start">
        <Header />
      </div>

      {currentProfile ? (
        <TinderCard profile={currentProfile} onLike={handleLike} onDislike={handleDislike} />
      ) : (
        <div className="text-2xl font-bold text-gray-500">No more profiles</div>
      )}
    </div>
  );
};

export default HomePage;

