'use client';

import Link from 'next/link';
import { ProfileMain } from './_features';
import { HistoryBar, PaginationBar } from './_components';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <div data-testid="profile-main">
      <h1>hello from GLMS dashboard Profile Page</h1>

      <ProfileMain data-testid="profile-main" />
      <Link href="/">
        <button data-testid="profile-btn">Go back to home page</button>
      </Link>
      <HistoryBar />
      <PaginationBar />
    </div>
  );
};

export default ProfilePage;
