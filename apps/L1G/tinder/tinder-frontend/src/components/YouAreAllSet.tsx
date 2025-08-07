import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import React from 'react';

export const YouAreAllSet = () => {
  return (
    <div className="w-[320px] max-w-[320px] font-sans h-fit flex flex-col justify-center items-center gap-6">
      <div className="w-full flex flex-col items-center gap-4 py-2">
        <CircleCheck size={48} color="#18BA51" strokeWidth={1} role="img" aria-label="check icon" />
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[24px] font-sans font-semibold text-[#09090B] text-center">You&#39;re all set!</p>
          <p className="text-[14px] font-sans font-normal text-[#71717A] text-center">Your account is all set. You&#39;re ready to explore and connect!</p>
        </div>
      </div>

      <Button className="flex h-[40px] justify-center items-center bg-[#E11D48] font-sans font-[500] text-[14px] py-2 px-4 text-[#FAFAFA] rounded-full">Start Swiping!</Button>
    </div>
  );
};
