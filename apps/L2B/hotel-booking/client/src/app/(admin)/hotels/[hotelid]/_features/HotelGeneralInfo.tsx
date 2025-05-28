'use client';

import { Phone, Star } from 'lucide-react';
import { useHotelQuery } from '@/generated';
import { GeneralInfoForm } from './GeneralInfoForm';
import { useSearchParams } from 'next/navigation';

export const HotelGeneralInfo = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotelid');
  const { data } = useHotelQuery({
    variables: { hotelId: hotelId || '' },
    skip: !hotelId,
  });

  const hotel = data?.hotel;
  const starRating = hotel?.starRating || 0;

  return (
    <div className="w-[49rem] max-h-[19.5rem] bg-white flex flex-col p-6 rounded-[0.5rem] border ">
      <div className="w-full h-9 flex justify-between items-center ">
        <h2 className="text-lg font-semibold tracking-wide ">General Info</h2>
        <GeneralInfoForm />
      </div>
      <div className="w-full pt-6 self-stretch border-b "></div>
      <div className="w-full pb-6 self-stretch border-t "></div>
      <div className="w-full flex flex-col gap-6">
        <div>
          <h6 className="text-sm text-[#71717A]">Name</h6>
          <p className="text-sm font-medium ">{hotel?.name}</p>
        </div>
        <div className="w-full flex">
          <div className="w-1/3 flex flex-col gap-1">
            <h6 className="text-sm text-[#71717A]">phone number</h6>
            <div className="text-sm font-medium flex items-center gap-1 ">
              <Phone size={16} /> {hotel?.phone || 'phone not available'}
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-0.5">
            <h6 className="text-sm text-[#71717A]">rating</h6>
            <div className="text-sm font-medium flex items-center gap-1 ">
              <p className="bg-[#2564ebeb] rounded-full w-[32px] h-[18px] font-md text-xs flex items-center justify-center text-white ">{hotel?.rating}</p>
              <p>Excellent</p>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-1">
            <h6 className="text-sm text-[#71717A]">star rating</h6>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star data-testid="star-icon-filled" key={i} fill={i < starRating ? 'orange' : 'transparent'} color="orange" size={16} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <h6 className="text-sm text-[#71717A]">Description</h6>
          <p className="text-sm font-medium ">{hotel?.description || 'description not available'}</p>
        </div>
      </div>
    </div>
  );
};
