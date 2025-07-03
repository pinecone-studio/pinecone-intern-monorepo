'use client';

<<<<<<< HEAD
import TinderCard from '@/components/TinderCard';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useState, useCallback } from 'react';
=======
import TinderCard from '@/components/Tinder-card';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
>>>>>>> f64f174a8 (push)

export interface UserProfile {
  id: string;
  name: string;
  age?: number;
  images: string[] | null;
}

<<<<<<< HEAD
export const GET_USERS = gql`
=======
const GET_USERS = gql`
>>>>>>> f64f174a8 (push)
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

<<<<<<< HEAD
export const LIKE_MUTATION = gql`
  mutation Like($likedByUser: ID!, $likeReceiver: ID!) {
    like(likedByUser: $likedByUser, likeReceiver: $likeReceiver)
  }
`;

const loggedInUserId = '68639484a94a2ebfd7cccae5';

const Home: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [likeMutation] = useMutation(LIKE_MUTATION);

  const profiles: UserProfile[] = (data?.getusers ?? []).filter((profile: UserProfile) => profile.id !== loggedInUserId);

  const currentProfile = profiles[currentIndex];

  const goToNextProfile = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  const executeLike = useCallback(
    async (profileId: string) => {
      try {
        const { data } = await likeMutation({
          variables: {
            likedByUser: loggedInUserId,
            likeReceiver: profileId,
          },
        });

        if (data?.like === "🎉 It's a match!") {
          alert("It's a match!");
        }
      } catch (err) {
        alert('Error liking user');
      }
    },
    [likeMutation]
  );

  const handleLike = useCallback(
    (profileId: string) => {
      executeLike(profileId);
      goToNextProfile();
    },
    [executeLike, goToNextProfile]
  );

  const handleDislike = useCallback(
    (_profileId: string) => {
      console.log('User disliked:', _profileId);
      goToNextProfile();
    },
    [goToNextProfile]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profiles.</div>;

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-100" data-testid="home-container">
      {currentProfile ? (
        <TinderCard key={currentProfile.id} profile={currentProfile} onLike={handleLike} onDislike={handleDislike} />
      ) : (
        <div className="text-2xl font-bold text-gray-500" data-testid="no-more-profiles">
          No more profiles
        </div>
      )}
=======
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
>>>>>>> f64f174a8 (push)
    </div>
  );
}
