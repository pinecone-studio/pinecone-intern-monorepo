import { ParkingIcon, SpaIcon, StarIcon, WifiIcon } from '@/components/icons';

export const HomePageCard = () => {
  return (
    <div className="card bg-base-100 w-[308px] shadow-xl rounded-md">
      <div className="w-full h-[216px] bg-slate-400"></div>
      <div className="card-body p-3">
        <h2 className="card-title text-base leading-7 font-bold">Toyoko Inn Ulaanbaatar</h2>
        <div className="flex">
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-2 ">
            <WifiIcon />
            <p className="text-sm font-Inter font-normal leading-5 text-[#09090B]">Free WiFi</p>
          </div>
          <div className="flex items-center gap-2">
            <SpaIcon />
            <p className="text-sm font-Inter font-normal leading-5 text-[#09090B]">Spa access</p>
          </div>
          <div className="flex items-center gap-2">
            <ParkingIcon />
            <p className="text-sm font-Inter font-normal leading-5 text-[#09090B]">Free self parking</p>
          </div>
          <div className="flex gap-2">
            <div className="flex justify-center items-center w-9 h-5 rounded-full bg-[#2563EB] text-xs font-Inter font-semibold leading-4 text-[#FAFAFA]">8.1</div>
            <p className="text-sm font-Inter font-semibold leading-5">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};
