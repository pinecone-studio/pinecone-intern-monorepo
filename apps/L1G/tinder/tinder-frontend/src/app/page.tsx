'use client';

import TinderCard from '@/components/Tinder-card';
import { useQuery, gql, useMutation } from '@apollo/client';
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

const LIKE_MUTATION = gql`
  mutation Like($likedByUser: ID!, $likeReceiver: ID!) {
    like(likedByUser: $likedByUser, likeReceiver: $likeReceiver)
  }
`;

const DISLIKE_MUTATION = gql`
  mutation Dislike($dislikedByUser: ID!, $dislikeReceiver: ID!) {
    dislike(dislikedByUser: $dislikedByUser, dislikeReceiver: $dislikeReceiver)
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loggedInUserId = '68639484a94a2ebfd7cccae5';

  const [likeMutation] = useMutation(LIKE_MUTATION);
  const [dislikeMutation] = useMutation(DISLIKE_MUTATION);

  const handleLike = async (profileId: string) => {
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
      goToNextProfile();
    } catch (err) {
      alert('Error liking user');
      goToNextProfile();
    }
  };

  const handleDislike = async (profileId: string) => {
    try {
      await dislikeMutation({
        variables: {
          likedByUser: loggedInUserId,
          likeReceiver: profileId,
        },
      });
      goToNextProfile();
    } catch (err) {
      alert('Error disliking user');
      goToNextProfile();
    }
  };

  const goToNextProfile = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profiles.</div>;
  console.log(data, 'data');

  const profiles: UserProfile[] = (data?.getusers ?? []).filter((profile: UserProfile) => profile.id !== loggedInUserId);
  const currentProfile = profiles[currentIndex];

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-100">
      {currentProfile ? <TinderCard profile={currentProfile} onLike={handleLike} onDislike={handleDislike} /> : <div className="text-2xl font-bold text-gray-500">No more profiles</div>}
    </div>
  );
}
