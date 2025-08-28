import React from 'react';

export const Interest = ({ interestName }: { interestName: string }) => {
  return <div className="w-fit px-[10px] py-[2px] flex justify-center items-center bg-[#F4F4F5] text-[#18181B] text-[12px] rounded-full">{interestName}</div>;
};
