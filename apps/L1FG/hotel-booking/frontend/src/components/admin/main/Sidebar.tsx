import { WhiteCircle, Zap, Zap2 } from '../svg';

export const Sidebar = () => {
  return (
    <div className="max-w-[240px] min-h-screen w-full bg-white border-r border-[#E2E8F0] flex flex-col ">
      <div className="p-2 w-full">
        <div className="p-2 flex gap-2 items-center">
          <div className="p-2 rounded-lg bg-[#2563EB]">
            <WhiteCircle />
          </div>
          <div className="flex flex-col">
            <p className="font-Inter text-sm font-medium text-[#334155]">Pedia</p>
            <p className="font-Inter text-xs font-normal text-[#334155]">Admin</p>
          </div>
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="py-1.5 px-2 flex items-center gap-2 rounded-sm bg-[#F4F4F5]">
          <Zap />
          <p className="text-[#09090B] font-Inter text-sm font-normal">Hotels</p>
        </div>
        <div className="py-1.5 px-2 flex items-center gap-2 rounded-sm">
          <Zap2 />
          <p className="text-[#71717A] font-Inter text-sm font-normal">Guests</p>
        </div>
      </div>
    </div>
  );
};
