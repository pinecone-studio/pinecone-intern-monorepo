import { Checkbox } from '@/components/ui/checkbox';

export const LeftNavbar = () => {
  return (
    <div className="w-[240px] flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <p className="text-[14px] leading-[20px] font-[500]">Search by property name</p>
        <input className="w-full h-[40px] px-3 py-2 rounded-md border border-[#E4E4E7]" type="text" placeholder="Search" />
      </div>
      <div className="w-full border border-[#E4E4E7] mt-4 mb-4"></div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[20px]">
          <p className="text-[14px] leading-[14px] font-[500]">Rating</p>
          <div className="flex gap-4 items-center">
            <Checkbox />
            <label className="text-[14px] leading-[14px] font-[500]">+9</label>
          </div>
          <div className="flex gap-4 items-center">
            <Checkbox />
            <label className="text-[14px] leading-[14px] font-[500]">+8</label>
          </div>
          <div className="flex gap-4 items-center">
            <Checkbox />
            <label className="text-[14px] leading-[14px] font-[500]">+7</label>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className="text-[14px] leading-[14px] font-[500]">Stars</p>
          <div className="flex gap-4 items-center">
            <Checkbox />
            <label className="text-[14px] leading-[14px] font-[500]">5 stars</label>
          </div>
          <div className="flex gap-4 items-center">
            <Checkbox />
            <label className="text-[14px] leading-[14px] font-[500]">4 stars</label>
          </div>
          <div className="flex gap-4 items-center">
            <Checkbox />
            <label className="text-[14px] leading-[14px] font-[500]">2 stars</label>
          </div>
          <div className="flex gap-4 items-center">
            <Checkbox />
            <label className="text-[14px] leading-[14px] font-[500]">1 stars</label>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className="text-[14px] leading-[14px] font-[500]">Amenities</p>
          <div className="flex gap-4 items-center">
            <Checkbox className="rounded-sm" />
            <label className="text-[14px] leading-[14px] font-[500]">Pet friendly</label>
          </div>
          <div className="flex gap-4 items-center">
            <Checkbox className="rounded-sm" />
            <label className="text-[14px] leading-[14px] font-[500]">Airport shuttle included</label>
          </div>
          <div className="flex gap-4 items-center">
            <Checkbox className="rounded-sm" />
            <label className="text-[14px] leading-[14px] font-[500]">Pool</label>
          </div>
        </div>
      </div>
    </div>
  );
};
