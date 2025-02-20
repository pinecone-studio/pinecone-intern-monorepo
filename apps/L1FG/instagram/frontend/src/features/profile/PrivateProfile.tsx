import { GetUserTogetherQuery } from '@/generated';
import { UserProfile } from './UserProfile';
import { PrivateUser } from '@/features/profile/follow/PrivateUser';

export const PrivateProfile = ({ userId, data }: { userId: string; data: GetUserTogetherQuery }) => {
  if (data.getUserTogether.user?.friendshipStatus.outgoingRequest || !data.getUserTogether.user?.friendshipStatus.following) {
    return <PrivateUser data={data} userId={userId} />;
  }
  return <UserProfile userId={userId} data={data} />;
};
