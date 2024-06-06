'use client';

import Link from 'next/link';
import { HistoryBox, ProfileMain } from './_features';
import jwt from 'jsonwebtoken';
import { User } from '@/generated';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const user = jwt.decode(localStorage.getItem('token') as string) as User;

  console.log('user', user);
  return (
    <div data-testid="profile-main">
      <h1>hello from GLMS dashboard Profile Page</h1>
      <ProfileMain data-testid="profile-main" />
      <Link href="/">
        <button data-testid="profile-btn">Go back to home page</button>
      </Link>
      <HistoryBox />
    </div>
  );
};

export default ProfilePage;
