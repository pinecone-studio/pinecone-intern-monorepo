'use client';
import { Check } from 'lucide-react';
type PropsText = {
  text?: string;
};

export const SubmitAlert = ({ text }: PropsText) => {
  return (
    <div className=' w-screen h-screen justify-end items-end'>
      <div className="max-w-[384px] max-h-[84px] bg-[#EAF6ED] py-[12px] px-[16px] flex gap-x-[16px] rounded-md border-b-4 border-b-[#01E17B]">
        <div className="flex">
          <div className="bg-[#00DF80] rounded-full p-[5px] max-w-[75px] max-h-[45px] self-center border-[10px] border-[#C3F1CE]">
            <Check size={15} color="#EAF6ED"></Check>
          </div>
        </div>
        <div>
          <p className="font-bold leading-5 text-[17px]">Successfully</p>
          <div className="text-[14px] max-w-[290px] max-h-[40px] overflow-y-hidden">{text}</div>
        </div>
      </div>
    </div>
  );
};
