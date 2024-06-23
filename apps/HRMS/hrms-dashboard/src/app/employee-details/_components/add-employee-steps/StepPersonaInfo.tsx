/* eslint-disable no-secrets/no-secrets */
import React from 'react';
import { Input } from '@/components/ui/input';

export const StepPersonalInfo = ({ firstname, lastname, email, handleChange }: { firstname: string; lastname: string; email: string; handleChange: (_e: React.ChangeEvent<unknown>) => void }) => {
  return (
    <>
      <div data-testid="step-personal-info" className="flex gap-4 flex-col">
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Овог'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="lastname" value={lastname} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Нэр'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="firstname" value={firstname} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" text-[16px] font-normal text-[#121316]">{'Имайл'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="email" value={email} onChange={handleChange} />
        </div>
      </div>
    </>
  );
};
