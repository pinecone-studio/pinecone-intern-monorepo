'use client';

import Profile from '@/components/profile/Profile';
import { useGetSomeoneProfileQuery } from '@/generated';
import { useParams } from 'next/navigation';

const InstagramProfile = () => {
  const params = useParams();
  const userName = params?.userName as string;

  const { data, loading, error } = useGetSomeoneProfileQuery({
    variables: { userName },
    skip: !userName,
  });

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
