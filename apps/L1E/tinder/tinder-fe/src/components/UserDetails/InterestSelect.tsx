'use client';

import { Logo } from '../Logo';
import { SelectDemo } from './Select';
import { Title } from '../mkae/Title';
import { Tinder } from '../mkae/Tinder2024';
import { Button } from '@/components/ui/button';

export const InterestSelect = () => {
  return (
    <div className="w-screen h-screen justify-between items-center flex flex-col">
      <div className="w-screen h-screen flex justify-center mt-[80px] ">
        <div className="w-[400px], h-[244px] gap-[24px] flex flex-col justify-center items-center ">
          <Logo />
          <Title text="Who are you interested in?" desc="Pick the one that feels right for you!" />
          <SelectDemo />
          <div className="w-[400px] flex justify-end text-end">
            <Button className="bg-[#E11D48E5] text-white rounded-full w-[64px] h-[36px] ">Next</Button>
          </div>
        </div>
      </div>
      <Tinder />
    </div>
  );
};
