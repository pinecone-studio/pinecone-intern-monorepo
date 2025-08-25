'use client';

import Profile from '@/components/profile/Profile';
import { useAuth } from '@/components/providers/AuthProvider';
import { useGetSomeoneProfileQuery } from '@/generated';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const InstagramProfile = () => {
  const params = useParams();
  const userName = params?.userName as string;
  const router = useRouter();

  const { data, loading, error } = useGetSomeoneProfileQuery({
    variables: { userName },
    skip: !userName,
  });

  const { user } = useAuth();
  console.log('User in InstagramProfile:', user);
  useEffect(() => {
    if (user?.userName && data?.getSomeoneProfile?.userName) {
      router.push('/profile');
    }
  }, [user, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <Profile
        isMine={false}
        userName={data?.getSomeoneProfile.userName as string}
        bio={data?.getSomeoneProfile.bio}
        isPrivate={data?.getSomeoneProfile.isPrivate as boolean}
        image={data?.getSomeoneProfile.profileImage as string}
        posts={data?.getSomeoneProfile.posts as any}
        followers={data?.getSomeoneProfile.followers as any}
        following={data?.getSomeoneProfile.following as any}
      />
    </div>
  );
};

export default InstagramProfile;
