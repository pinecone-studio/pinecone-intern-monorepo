'use client';

import { useExampleQueryFromProfileServiceQuery } from '@/generated/index';
import Link from 'next/link';
import { ProfileMain } from './_features';

const ProfilePage = () => {
  // const { data } = useHelloQueryFromProfileServiceQuery();
  const { data } = useExampleQueryFromProfileServiceQuery();
  return (
    <div>
      <h1>hello from GLMS dashboard Profile Page</h1>
      <h1>hello from Profile Service Query {data?.exampleQueryFromProfileService}</h1>
      <h1></h1>
      <ProfileMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default ProfilePage;
