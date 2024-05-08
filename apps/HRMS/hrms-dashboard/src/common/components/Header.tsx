'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { PineLogo } from './SVG';
export const Header = () => {
  const pathname = usePathname()
  const router = useRouter(); 
  if (pathname === '/login') {
    return null
  }
  
  return (
    <header className="w-full flex items-center justify-between py-1 px-6 bg-main">
      <div
        onClick={() => {
          router.push('/');
        }}
        data-cy="headerIcon"
        className="flex items-center justify-center cursor-pointer"
      >
        <PineLogo/>
      </div>
      <div className="flex gap-4">
        <div data-cy="headerProfile" className="flex items-center justify-center rounded-full py-0.5 overflow-hidden cursor-pointer aspect-square">
          <Image style={{ objectFit: 'cover' }} alt="profile image" width={32} height={32} sizes="small" src={'/profile.png'} />
        </div>
      </div>
    </header>
  );
};
