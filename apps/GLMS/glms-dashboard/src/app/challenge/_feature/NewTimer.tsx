import React from 'react';

const NewTimer = ({ time }: { time: number }) => {
  return (
    <div className="flex-1">
      <div className="w-[60px] h-[60px] rounded-full border-[4.5px] border-[#F5C416] flex justify-center items-center text-black">{time}</div>
    </div>
  );
};

export default NewTimer;
