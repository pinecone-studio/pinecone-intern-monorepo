import React from 'react';
import { TinderLogo } from '@/components/TinderLogo';
import { useRouter } from 'next/navigation';

export const MainHeader = () => {
  const router = useRouter();

  const handleTohome = () => {
    router.push('/home');
  };
  return (
    <div className="flex gap-1 justify-center items-center px-2">
      <TinderLogo handleTohome={handleTohome} />
    </div>
  );
};
