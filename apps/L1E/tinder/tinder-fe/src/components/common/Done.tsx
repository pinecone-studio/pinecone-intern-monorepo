'use client';
import { Logo } from '../Logo';
import { Title } from './Title';
import { Tinder } from './Tinder';
import { Button } from '@/components/ui/button';

export const Done = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center ">
      <div className="w-screen h-screen flex flex-col justify-between items-center ">
        <div className="mt-[80px]">
          <Logo />
        </div>
        <div className="w-[320px] h-[220px] flex flex-col justify-center items-center gap-6">
          <div className="w-12 h-12"></div>

          <Title text="You're all set!" desc="Your account is all set. You're ready to explore and connect!" />
          <Button className="bg-[#E11D48E5] text-white rounded-full w-[127px] h-[40px] ">Start Swiping!</Button>
        </div>
        <Tinder />
      </div>
    </div>
  );
};
