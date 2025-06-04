import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const GuestHeader = () => {
  return (
    <div data-testid="guest-header" className="w-[80%] flex justify-between items-center mt-3">
      <Link href={'/'}>
        <Image src="header.svg" width={100} height={25} alt="header-image" />
      </Link>
      <div className="flex gap-4">
        <Link href="/auth/sign-up">
          <button className="text-white font-medium py-2 px-4">Create Account</button>
        </Link>
        <Link href="/auth/sign-in">
          <button className="bg-white py-2 px-4 rounded-full border border-solid border-[#E4E4E7] text-black">Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default GuestHeader;
