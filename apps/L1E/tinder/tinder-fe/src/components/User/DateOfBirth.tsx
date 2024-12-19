'use client';

import { Button } from '@/components/ui/button';
import { InputForm } from '../common/InputForm';
import { Title } from '../common/Title';
import { Logo } from '../common/Logo';
import { Tinder } from '../common/Tinder';

export const DateOfBirth = () => {
  return (
    <div className="w-screen h-screen justify-between items-center flex flex-col">
      <div className="w-screen h-screen flex justify-center mt-[80px] ">
        <div className="w-[400px], h-[244px] gap-[24px] flex flex-col justify-center items-center ">
          <Logo />
          <Title text="How old are you" desc="Please enter your age to continue." />
          <div className="flex flex-col gap-7">
            <InputForm />
            <div className="w-[400px] flex justify-between text-end">
              <Button className=" bg-white border rounded-full w-[64px] h-[36px] text-black ">Back</Button>
              <Button className="bg-[#E11D48E5] text-white rounded-full w-[64px] h-[36px] ">Next</Button>
            </div>
          </div>
        </div>
      </div>
      <Tinder />
    </div>
  );
};
