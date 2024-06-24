/* eslint-disable no-secrets/no-secrets */
import React from 'react';
import { Input } from '@/components/ui/input';
import { inputOne } from '../../constants';

export const StepPersonalInfo = () => {
  return (
    <>
      <div data-testid="step-personal-info" className="flex gap-4 flex-col">
        {inputOne.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className=" text-[16px] font-normal text-[#121316]">{item.label}</label>
            <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type={item.type} placeholder={item.placeholder} name={item.name} value="" />
          </div>
        ))}
      </div>
    </>
  );
};
