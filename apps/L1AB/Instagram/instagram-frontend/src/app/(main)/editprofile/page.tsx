'use client';

import { EditProfile } from '@/components/EditProfile';
import { UserContext } from '@/components/providers';
import { useContext } from 'react';

const Page = () => {
  const { user }: any = useContext(UserContext);

  return (
    <div className="2xl:pl-[600px] xl:pl-[400px]">
      <EditProfile user={user} />
    </div>
  );
};

export default Page;
