import { NavigationWhiteDown } from '@/features/user/main/NavigationWhiteDown';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const NavigationWhite = () => {
  const [isUser, setIsUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('user')!;
    setIsUser(token);
  }, []);

  if (isUser) {
    return (
      <div className="bg-[#FFFFFF] h-[64px]">
        <div className="container mx-auto h-full flex items-center justify-between">
          <Link href={'/'}>
            <Image src="/LogoWhite.png" alt="Logo" width={86} height={20} />
          </Link>
          <div className="flex gap-4">
            <Link href={'/booking'}>
              <div className="py-2 px-4">
                <p className="font-normal font-Inter text-sm text-[#09090B]">My Booking</p>
              </div>
            </Link>
            <NavigationWhiteDown />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] h-[64px]">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/LogoWhite.png" alt="Logo" width={86} height={20} />
        </Link>
        <div className="flex gap-4">
          <Link href={'/create-account'}>
            <div className="py-2 px-4">
              <p className="font-normal font-Inter text-sm text-[#09090B]">Register</p>
            </div>
          </Link>
          <Link href={'/sign-up'}>
            <div className="py-2 px-4">
              <p className="font-normal font-Inter text-sm text-[#09090B]">Sign in</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
