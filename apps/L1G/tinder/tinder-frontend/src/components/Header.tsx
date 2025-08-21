import React from 'react';
import { TinderLogo } from './TinderLogo';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <div className="w-full h-[64px] py-4 flex justify-center items-center border border-b-[#E4E4E7] px-4">
      <div className="w-[1280px] max-w-[1280px] flex justify-between items-center">
        <TinderLogo />

        <div className="w-fit h-fit flex justify-center items-center gap-4">
          <Button
            type="button"
            aria-label="Messages"
            className="w-10 h-10 flex bg-transparent items-center justify-center rounded-full hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <MessageSquare size={16} strokeWidth={2} aria-hidden="true" color="#09090B" />
          </Button>

          <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full">
            <Image src="/profile.jpg" alt="Profile Picture" width={40} height={40} className="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
