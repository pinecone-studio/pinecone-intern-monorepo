import { Button } from '@/components/ui/button';
import React from 'react';
import { FaPhone } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa6';

export const HotelDetailsGeneralInfo = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">General info</h3>
        <Button className="border-none text-[#2563EB]" variant="outline">
          Edit
        </Button>
      </div>
      <div className="border-t w-full my-6"></div>
      <div className="flex flex-col gap-6">
        <div className="w-full text-sm">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm ">Name</p>
            <p className="">Chingis Khaan Hotel</p>
          </div>
        </div>

        <div className="w-full text-sm flex justify-between items-center">
          <div className="flex flex-col gap-1 w-[245.33px] justify-start">
            <p className="text-muted-foreground text-sm ">Phone Number</p>
            <div className="flex gap-2 items-center">
              <FaPhone />
              <p className="">72700800</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-[245.33px] justify-start">
            <p className="text-muted-foreground text-sm ">Rating</p>
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center bg-[#2563EB] rounded-full  w-[39px] h-5 px-2 py-[2px] ">
                <p className="text-white">8.6</p>
              </div>
              <p className="">72700800</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-[245.33px] justify-start">
            <p className="text-muted-foreground text-sm ">Stars Rating</p>
            <div className="flex gap-2 items-center">
              <FaStar className="text-[#F97316]" />
              <FaStar className="text-[#F97316]" />
              <FaStar className="text-[#F97316]" />
              <FaStar className="text-[#F97316]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="text-muted-foreground text-sm ">Description</p>
          <div className="flex gap-2 items-center">Ulaanbaatar hotel in Downtown Ulaanbaatar with 4 restaurants and a full-service spa</div>
        </div>
      </div>
    </div>
  );
};
