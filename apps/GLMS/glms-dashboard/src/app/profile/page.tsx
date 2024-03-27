'use client';

import Link from 'next/link';
import { ProfileMain } from './_features';
import { useHelloQueryFromProfileServiceQuery } from '@/generated/index';

const ProfilePage = () => {
  const { data, loading, error } = useHelloQueryFromProfileServiceQuery();

  console.log(data?.helloQueryFromProfileService);

  if (loading) {
    return <div>This is Loading</div>;
  }

  if (error) {
    return <div>This is Error</div>;
  }
  return (
    <div>
      <h1>hello from GLMS dashboard Profile Page</h1>
      <h1>
        hello from Profile Service Query
        {}
      </h1>
      <ProfileMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default ProfilePage;
