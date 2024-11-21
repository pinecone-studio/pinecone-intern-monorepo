'use client';
import React from 'react';
export const RoomFix = () => {
  return (
    <div className="">
      <div className="mt-5 flex ">
        <div>
          <h1 className="text-black not-italic font-sans text-lg font-semibold p-1">Bedroom</h1>
          <li className="pl-5 font-thin text-black text-sm">Air conditioning </li>
          <li className="pl-5 font-thin text-black text-sm">Bed sheets </li>
          <li className="pl-5 font-thin text-black text-sm"> Cribs (infant beds) not available</li>
          <li className="pl-5 font-thin text-black text-sm"> Heating</li>
        </div>
        <div className="ml-5">
          <h1 className="text-black not-italic font-sans text-lg font-semibold p-1">Bathroom</h1>
          <li className="pl-5 font-thin text-black text-sm">Cable channels</li>
          <li className="pl-5 font-thin text-black text-sm">TV</li>
        </div>
      </div>
      <div className="mt-5 flex gap-12">
        <div>
          <h1 className="text-black not-italic font-sans text-lg font-semibold p-1">Food and drink</h1>
          <li className="pl-5 font-thin text-black text-sm">Electric kettle </li>
          <li className="pl-5 font-thin text-black text-sm">Free bottled water</li>
          <li className="pl-5 font-thin text-black text-sm"> Minibar (fees may apply)</li>
          <li className="pl-5 font-thin text-black text-sm"> Room service (limited)</li>
        </div>
        <div className="ml-5">
          <h1 className="text-black not-italic font-sans text-lg font-semibold p-1">Internet</h1>
          <li className="pl-5 font-thin text-black text-sm">Free WiFi</li>
          <li className="pl-5 font-thin text-black text-sm"> Free wired internet</li>
        </div>
      </div>
      <div className="mt-5 flex">
        <div>
          <h1 className="text-black not-italic font-sans text-lg font-semibold p-1">More</h1>
          <li className="pl-5 font-thin text-black text-sm">Daily housekeeping</li>
          <li className="pl-5 font-thin text-black text-sm"> Desk</li>
          <li className="pl-5 font-thin text-black text-sm"> Laptop workspace</li>
          <li className="pl-5 font-thin text-black text-sm"> Phone </li>
          <li className="pl-5 font-thin text-black text-sm"> Safe </li>
          <li className="pl-5 font-thin text-black text-sm"> Sitting area </li>
          <li className="pl-5 font-thin text-black text-sm"> Soundproofed rooms </li>
          <li className="pl-5 font-thin text-black text-sm"> Wardrobe or closet </li>
        </div>
      </div>
      <div className="mt-5 flex border w-full  rounded-lg gap-2 justify-between p-4">
        <div className="grid gap-1">
          <div>
            <h1 className="text-gray-400 font-thin text-xs">Total</h1>
            <h1 className=" text-black not-italic font-sans text-lg font-semibold p-1">225,000₮</h1>
          </div>
          <div className="flex justify-center gap-1">
            <h1 className="text-black  font-thin text-xs">112,500₮ </h1>
            <h1 className="text-black  font-thin text-xs">Price per night</h1>
          </div>
          <h1 className=" text-[#2563EB] font-thin text-sm">Price detail {'>'}</h1>
        </div>
        <div className="gap-8">
          <h1 className="text-[#F97316] text-xs font-thin flex mt-8 mb-2">We have 2 left</h1>
          <button className="bg-[#2563EB] text-[#FAFAFA] text-xs font-thin w-[79px] h-[36px]  rounded-sm">Reserve</button>
        </div>
      </div>
    </div>
  );
};
