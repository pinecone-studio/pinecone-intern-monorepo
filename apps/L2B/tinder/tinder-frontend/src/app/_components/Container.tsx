import Link from 'next/link';
import React from 'react';

const Container = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <h1 className="text-[64px] font-bold text-white">Swipe Right®</h1>
      <Link href={'/auth/sign-up'} data-testid="create-account-button">
        <button className="rounded-full bg-[#E11D48] py-2 px-4">Create Account</button>
      </Link>
    </div>
  );
};

export default Container;
