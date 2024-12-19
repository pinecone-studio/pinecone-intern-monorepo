'use client';

import { Logo } from '../common/Logo';
import { Title } from '../common/Title';
import { Tinder } from '../common/Tinder';
import { Button } from '@/components/ui/button';
import { SelectDemo } from '@/components/user/Select';

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
