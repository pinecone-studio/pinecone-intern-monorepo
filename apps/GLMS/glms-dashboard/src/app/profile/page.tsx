'use client';

import { useHelloQueryFromProfileServiceQuery } from '@/generated/index';
import Link from 'next/link';
import { ProfileMain } from './_features';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { data } = useHelloQueryFromProfileServiceQuery();
  return (
    <div data-testid="profile-main">
      <h1>hello from GLMS dashboard Profile Page</h1>
      <h1>hello from Profile Service Query {data?.helloQueryFromProfileService}</h1>
      <ProfileMain data-testid="profile-main" />
      <Link href="/">
        <button data-testid="profile-btn">Go back to home page</button>
      </Link>
    </div>
  );
};

export default ProfilePage;
