import Image from 'next/image';

export const HotelInfo = () => {
  return (
    <div className="max-w-[480px] w-full border border-[#E4E4E7] rounded-[6px] flex flex-col overflow-hidden">
      <div className="w-full h-[216px]">
        <Image src="https://www.hotelescenter.es/wp-content/blogs.dir/1601/files/home//header-home-mb.jpg" alt="room" width={478} height={216} className="w-full h-full object-cover object-center" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[#09090B] font-Inter text-base font-bold">Flower Hotel Ulaanbaatar</p>
            <p className="text-[#71717A] font-Inter text-sm font-normal">Zaluuchuud Avenue, 18, Bayanzurkh, Ulaanbaatar, Ulaanbaatar, 001334</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="px-[10px] py-[2px] bg-[#2563EB] rounded-full text-[#FAFAFA] font-Inter text-xs font-semibold">8.6</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">Excellent</p>
          </div>
        </div>
        <div className="py-4 w-full">
          <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
        </div>
        <button className="px-3 py-2 border border-[#E4E4E7] rounded-[6px] text-[#18181B] font-Inter text-sm font-medium">View in Google Maps</button>
      </div>
    </div>
  );
};
