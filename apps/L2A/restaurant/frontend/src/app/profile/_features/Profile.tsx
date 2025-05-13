'use client';

import { UserProfile, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UseProfile = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div>
      <h1 data-cyid="Хэрэглэгчийн хэсэг" className="text-center font-bold text-[#441500] text-[1.3rem] mt-5 mb-5">
        Хэрэглэгчийн хэсэг
      </h1>{' '}
      <div className="flex justify-center">
        {' '}
        <UserProfile routing="hash" />
      </div>
    </div>
  );
};

export default UseProfile;
