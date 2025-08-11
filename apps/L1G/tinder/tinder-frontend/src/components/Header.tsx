import React from 'react';
import { TinderLogo } from './TinderLogo';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className="w-full h-[64px] py-4 flex justify-center items-center border border-b-[#E4E4E7] ">
      <div className="w-[1280px] max-w-[1280px] flex justify-between items-center">
        <TinderLogo />

        <div className="w-fit h-fit flex justify-center items-center gap-4">
          <div className="w-[40px] h-[40px] flex justify-center items-center ">
            <MessageSquare size={16} strokeWidth={2} />
          </div>

          <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full">
            <Image src="/profile.jpg" alt="Profile Picture" width={40} height={40} className="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
