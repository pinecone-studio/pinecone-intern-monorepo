import { GetUserTogetherQuery } from '@/generated';
import { PrivateProfile } from './PrivateProfile';
import { UserProfile } from './UserProfile';

export const PublicProfileParent = ({ userId, data }: { userId: string; data: GetUserTogetherQuery }) => {
  const isPrivate = data?.getUserTogether.user?.isPrivate;
  if (isPrivate) return <PrivateProfile userId={userId as string} data={data as GetUserTogetherQuery} />;
  return <UserProfile userId={userId as string} data={data as GetUserTogetherQuery} />;
};
