'use client';

import { HotelGeneralInfoDialogProps } from '@/components/admin/add-hotel/type';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

export const GeneralInfoDialog = ({
  name,
  rating,
  description,
  phoneNumber,
  setName,
  setRating,
  setStarRating,
  setDescription,
  setPhoneNumber,
  handleEditHotelGeneralInfo,
}: HotelGeneralInfoDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium hover:bg-[#F4F4F5] rounded-sm transition-all duration-200">Edit</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[626px] w-full gap-6">
        <AlertDialogTitle className="font-Inter text-base font-semibold leading-4 tracking-[-0.4px]">General Info</AlertDialogTitle>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Name</p>
            <input
              value={name}
              type="text"
              className="bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Description</p>
            <textarea
              value={description}
              className="min-h-[80px] resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Stars Rating</p>
            <Select onValueChange={setStarRating}>
              <SelectTrigger className="w-full outline-none">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All</SelectLabel>
                  <SelectItem value="5">5 stars</SelectItem>
                  <SelectItem value="4">4 stars</SelectItem>
                  <SelectItem value="3">3 stars</SelectItem>
                  <SelectItem value="2">2 stars</SelectItem>
                  <SelectItem value="1">1 star</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Phone Number</p>
            <input
              value={phoneNumber}
              type="text"
              className="bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Rating</p>
            <input
              value={rating}
              type="number"
              className="bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <AlertDialogCancel className="px-4 py-2 bg-white rounded-[6px] ">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEditHotelGeneralInfo} className="px-4 py-2 bg-[#2563EB] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#256eeb]">
            Save
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
