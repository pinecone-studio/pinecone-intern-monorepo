'use client';

import { RoomServicesProps } from '@/components/admin/add-room/type';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export const RoomServicesDialog = ({
  accessibility,
  bathroom,
  bedroom,
  foodAndDrink,
  internet,
  other,
  setAccessibility,
  setBathroom,
  setBedroom,
  setFoodAndDrink,
  setInternet,
  setOther,
  handleEditRoomServices,
}: RoomServicesProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium hover:bg-[#F4F4F5] rounded-sm transition-all duration-200">Edit</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[626px] w-full gap-6">
        <AlertDialogTitle className="font-Inter text-base font-semibold leading-4 tracking-[-0.4px]">General Info</AlertDialogTitle>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Bathroom</p>
            <textarea
              value={bathroom?.join(', ')}
              className="min-h-[64px] resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => setBathroom(e.target.value.split(',').map((item) => item.trim()))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Accessibility</p>
            <textarea
              value={accessibility?.join(', ')}
              className="min-h-[64px] resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => setAccessibility(e.target.value.split(',').map((item) => item.trim()))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Bedroom</p>
            <textarea
              value={bedroom?.join(', ')}
              className="min-h-[64px] resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => setBedroom(e.target.value.split(',').map((item) => item.trim()))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Internet</p>
            <textarea
              value={internet?.join(', ')}
              className="min-h-[64px] resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => setInternet(e.target.value.split(',').map((item) => item.trim()))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Food and dring</p>
            <textarea
              value={foodAndDrink?.join(', ')}
              className="min-h-[64px] resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => setFoodAndDrink(e.target.value.split(',').map((item) => item.trim()))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Other</p>
            <textarea
              value={other?.join(', ')}
              className="min-h-[64px] resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => setOther(e.target.value.split(',').map((item) => item.trim()))}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <AlertDialogCancel className="px-4 py-2 bg-white rounded-[6px] ">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEditRoomServices} className="px-4 py-2 bg-[#2563EB] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#256eeb]">
            Save
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
