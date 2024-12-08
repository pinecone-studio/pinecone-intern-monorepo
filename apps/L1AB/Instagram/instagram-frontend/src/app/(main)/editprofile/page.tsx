'use client';

import { EditProfile } from '@/components/EditProfile';
import { UserContext } from '@/components/providers';
import { useContext } from 'react';

const Page = () => {
  const { user }: any = useContext(UserContext);

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Page;
