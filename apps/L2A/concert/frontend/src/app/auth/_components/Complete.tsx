'use client';
import { MdOutlineDone } from 'react-icons/md';
export const Complete = () => {
  return (
    <div className="bg-black flex justify-center h-[100vh] w-[100%]">
      <div className="w-[446px] h-[276px] border-[1px]  border-[#27272A] rounded-2xl flex justify-center items-center mt-[190px]">
        <div>
          <div className="w-[100px] h-[100px] rounded-full bg-[#131313] ml-[32px] mb-4 flex justify-center items-center ">
            <MdOutlineDone className="w-[65px] h-[56px] text-[#00B7F4] " />
          </div>
          <div className="text-white">Амжилттай үүсгэлээ.</div>
        </div>
      </div>
    </div>
  );
};
