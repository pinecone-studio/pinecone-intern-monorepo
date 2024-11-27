import React from 'react';
import { HotelGeneralInfoDailog } from '../../dialogs';
import { Phone } from 'lucide-react';
import { StarFillIcon, StarIcon } from '@/components/icon';

type HotelDetailsGeneralInfoProps = {
  name?: string;
  phone?: string;
  desc?: string;
  rating?: number;
  stars?: number;
};
export const HotelDetailsGeneralInfo = ({ name, phone, desc, rating, stars }: HotelDetailsGeneralInfoProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">General info</h3>
        <HotelGeneralInfoDailog name={name || ''} phone={phone || ''} desc={desc || ''} stars={stars || 0} />
      </div>
      <div className="border-t w-full my-6"></div>
      <div className="flex flex-col gap-6">
        {DetailName(name)}
        <div className="w-full text-sm flex justify-between items-center">
          {DetailPhone(phone)}
          {DetailRating(rating)}
          {DetailStars(stars)}
        </div>
        {DetailDescription(desc)}
      </div>
    </div>
  );
};
const DetailName = (name?: string) => (
  <div className="w-full text-sm">
    <div className="flex flex-col gap-1">
      <p className="text-muted-foreground text-sm ">Name</p>
      {name ? <p>{name}</p> : <p>-/-</p>}
    </div>
  </div>
);
const DetailPhone = (phone?: string) => (
  <div className="flex flex-col gap-1 w-[245.33px] justify-start">
    <p className="text-muted-foreground text-sm ">Phone Number</p>
    <div className="flex gap-2 items-center">
      <Phone className="w-4 h-4" />
      {phone ? <p>{phone}</p> : <p>-/-</p>}
    </div>
  </div>
);
const DetailRating = (rating?: number) => (
  <div className="flex flex-col gap-1 w-[245.33px] justify-start">
    <p className="text-muted-foreground text-sm ">Rating</p>
    <div className="flex gap-2 items-center">
      <div className="flex justify-center items-center bg-[#2563EB] rounded-full text-white w-[39px] h-5 px-2 py-[2px] ">
        <p>{rating ? rating : 0.0}</p>
      </div>
      <p className="">Excellent</p>
    </div>
  </div>
);
const DetailStars = (stars?: number) => (
  <div className="flex flex-col gap-1 w-[245.33px] justify-start">
    <p className="text-muted-foreground text-sm ">Stars Rating</p>
    <div className="flex gap-2 items-center">
      {stars ? Array.from({ length: stars }).map((_, index) => <StarFillIcon key={index} />) : Array.from({ length: 5 }).map((_, index) => <StarIcon key={index} />)}
    </div>
  </div>
);
const DetailDescription = (desc?: string) => (
  <div className="flex flex-col gap-1 ">
    <p className="text-muted-foreground text-sm ">Description</p>
    <div className="flex gap-2 items-center">{desc ? <p>{desc}</p> : <p>-/-</p>}</div>
  </div>
);