import React from 'react';
import { HotelGeneralInfoDailog } from '../../dialogs';
import { Phone, Star } from 'lucide-react';

export const HotelDetailsGeneralInfo = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">General info</h3>
        <HotelGeneralInfoDailog />
      </div>
      <div className="border-t w-full my-6"></div>
      <div className="flex flex-col gap-6">
        <div className="w-full text-sm">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm ">Name</p>
            <p>-/-</p>
          </div>
        </div>

        <div className="w-full text-sm flex justify-between items-center">
          <div className="flex flex-col gap-1 w-[245.33px] justify-start">
            <p className="text-muted-foreground text-sm ">Phone Number</p>
            <div className="flex gap-2 items-center">
              <Phone className="w-4 h-4" />
              <p className="">-/-</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-[245.33px] justify-start">
            <p className="text-muted-foreground text-sm ">Rating</p>
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center bg-[#2563EB] rounded-full  w-[39px] h-5 px-2 py-[2px] ">
                <p className="text-white">0.0</p>
              </div>
              <p className="">Excellent</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-[245.33px] justify-start">
            <p className="text-muted-foreground text-sm ">Stars Rating</p>
            <div className="flex gap-2 items-center">
              <Star className="w-4 h-4" />
              <Star className="w-4 h-4" />
              <Star className="w-4 h-4" />
              <Star className="w-4 h-4" />
              <Star className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="text-muted-foreground text-sm ">Description</p>
          <div className="flex gap-2 items-center">-/-</div>
        </div>
      </div>
    </div>
  );
};
