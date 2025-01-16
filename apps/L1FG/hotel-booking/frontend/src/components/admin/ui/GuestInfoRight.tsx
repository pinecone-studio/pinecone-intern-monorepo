import Image from 'next/image';

export const GuestInfoRight = () => {
  return (
    <div className="max-w-[440px] w-full flex flex-col gap-2">
      <div className="w-full border border-[#E4E4E7] rounded-[8px] bg-white px-6 pt-4 pb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">Economy Single Room</p>
          <p className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">View</p>
        </div>
        <div className="relative w-full h-[294px]">
          <Image src="/Hotel.png" alt="hotel" fill className="object-cover rounded-sm" />
        </div>
      </div>
      <div className="w-full border border-[#E4E4E7] rounded-[8px] bg-white p-6 flex flex-col gap-4">
        <p className="text-[#09090B] font-Inter text-xl font-semibold tracking-[-0.5px]">Price Detail</p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-[#18181B] font-Inter text-sm font-normal">1 night</p>
                <p className="text-[#71717A] font-Inter text-sm font-normal">150,000₮ per night</p>
              </div>
              <p className="text-[#18181B] font-Inter text-sm font-medium">150,000₮</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#18181B] font-Inter text-sm font-normal">Taxes</p>
              <p className="text-[#18181B] font-Inter text-sm font-medium">12,000₮</p>
            </div>
          </div>
          <div className="py-4">
            <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#18181B] font-Inter text-sm font-medium">Total price</p>
            <p className="text-[#18181B] font-Inter text-lg font-semibold">162,000₮</p>
          </div>
        </div>
      </div>
    </div>
  );
};
