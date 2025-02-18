'use client';
import { GetUserTogetherQuery, useGetUserTogetherQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { UserProfile } from '@/features/profile/UserProfile';
import { PublicProfileParent } from '@/features/profile/PublicProfileParent';

export const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { data } = useGetUserTogetherQuery({
    variables: { searchingUserId: userId as string },
  });
  const isItself: boolean = userId === user?._id;
  return (
    <div>
      <div className="flex flex-col py-14" data-testid="profile-visit-container">
        {isItself ? <UserProfile userId={userId as string} data={data as GetUserTogetherQuery} /> : <PublicProfileParent userId={userId as string} data={data as GetUserTogetherQuery} />}
      </div>
    </div>
  );
};
