import React from 'react';
import { Navbar } from './Navbar';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const WalletComponent = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full h-[170px] bg-muted flex flex-col items-center justify-center">
        <p className="text-[20px] text-[#441500] font-medium">Хэтэвч</p>
        <p className="text-[32px]">18,864</p>
        <p className="text-[12px] font-light">Үлдэгдэл</p>
      </div>
      <div className="flex justify-between pt-4 items-center px-4 ">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-muted rounded-md flex items-center justify-center ">
            <ArrowUp color="green" />
          </div>
          <p className="font-semibold">+324</p>
        </div>
        <p className="font-light text-[12px]">24.10.19 15:25</p>
      </div>
      <div className="flex pt-3 px-5">
        <div className="w-full flex h-[1px] border-[1px]  "></div>
      </div>
      <div className="flex justify-between pt-4 items-center px-4 ">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-muted rounded-md flex items-center justify-center ">
            <ArrowUp color="green" />
          </div>
          <p className="font-semibold">+324</p>
        </div>
        <p className="font-light text-[12px]">24.10.19 15:25</p>
      </div>
      <div className="flex pt-3 px-5">
        <div className="w-full flex h-[1px] border-[1px]  "></div>
      </div>
      <div className="flex justify-between pt-4 items-center px-4 ">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-muted rounded-md flex items-center justify-center ">
            <ArrowUp color="green" />
          </div>
          <p className="font-semibold">+324</p>
        </div>
        <p className="font-light text-[12px]">24.10.19 15:25</p>
      </div>
      <div className="flex pt-3 px-5">
        <div className="w-full flex h-[1px] border-[1px]  "></div>
      </div>
      <div className="flex justify-between pt-4 items-center px-4 ">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-muted rounded-md flex items-center justify-center ">
            <ArrowDown color="red" />
          </div>
          <p className="font-semibold">+324</p>
        </div>
        <p className="font-light text-[12px]">24.10.19 15:25</p>
      </div>
      <div className="flex pt-3 px-5">
        <div className="w-full flex h-[1px] border-[1px]  "></div>
      </div>
    </div>
  );
};
