'use client';

import { UserProfile } from '@/components/main';
import { Loading } from '@/components/main/assets';

const UserProfilePage = () => {
  return (
    <>
      <UserProfile />
      <Loading />
    </>
  );
};

export default UserProfilePage;
