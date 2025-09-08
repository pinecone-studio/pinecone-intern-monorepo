'use client';
import React from 'react';
import { TinderLogo } from './TinderLogo';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useGetMeQuery } from '@/generated';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const goToProfileBtn = () => {
    router.push('/profile');
  };
  const { data, loading } = useGetMeQuery();
  const router = useRouter();
  let firstImage = '/profile.jpg';

  if (!loading && data?.getMe?.images?.length) {
    firstImage = data.getMe.images[0];
  }
  const handleTohome = () => {
    router.push('/home');
  };
  const handleTochat = () => {
    router.push('/chat');
  };
  return (
    <div className="w-full h-[64px] py-4 flex justify-center items-center border border-b-[#E4E4E7] px-4">
      <div className="w-full flex justify-between items-center">
        <TinderLogo handleTohome={handleTohome} />

        <div className="w-fit h-fit flex justify-center items-center gap-4">
          <Button
            type="button"
            aria-label="Messages"
            onClick={handleTochat}
            className="w-10 h-10 flex bg-transparent items-center justify-center rounded-full hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <MessageSquare size={16} strokeWidth={2} aria-hidden="true" color="#09090B" />
          </Button>

          <Button onClick={goToProfileBtn} className="relative w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image src={firstImage} alt="Profile Picture" fill className="object-cover" />
          </Button>
        </div>
      </div>
    </div>
  );
};
