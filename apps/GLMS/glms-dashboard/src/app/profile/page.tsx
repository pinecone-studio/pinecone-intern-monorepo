'use client';

import { useHelloQueryFromProfileServiceQuery}from '@/generated/index';
import Link from 'next/link';
import { ProfileMain } from './_features';

const ProfilePage = () => {
  const { data } = useHelloQueryFromProfileServiceQuery();

  return (
    <div>
      <SignIn />
    </div>
  );
};

export default ProfilePage;
