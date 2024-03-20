'use client';

import { ProfileMain } from '@/domains/profile';
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <>
      <div>
        hello from GLMS dashboard Profile Page
        <ProfileMain />
        <Link href="/">
          <button>Go back to home page</button>
        </Link>
      </div>
    </>
  );
};

export default ProfilePage;
