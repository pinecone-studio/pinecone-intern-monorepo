'use client';

import Link from 'next/link';
import { ProfileMain } from './_features';

const ProfilePage = () => {
  return (
    <div>
      <h1>hello from GLMS dashboard Profile Page</h1>

      <ProfileMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default ProfilePage;
