export const Reservation = () => {
  return (
    <div className="max-w-[712px] w-full p-6 flex flex-col gap-6 bg-white border border-[#E4E4E7] rounded-[6px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[#09090B] font-Inter text-2xl font-semibold tracking-[-0.6px]">Flower Hotel Ulaanbaatar</p>
          <p className="px-[10px] py-[2px] bg-[#18BA51] rounded-full text-[#FAFAFA] font-Inter text-xs font-semibold">Booked</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-1 max-w-[282.5px] w-full">
              <p className="text-[#71717A] font-Inter text-sm font-normal">Check in</p>
              <div className="flex items-center gap-1">
                <p className="text-[#09090B] font-Inter text-base font-normal">Tuesday, Jul 2,</p>
                <p className="text-[#09090B] font-Inter text-base font-normal">11:00am</p>
              </div>
            </div>
            <div className="h-full px-4 flex justify-center">
              <div className="w-[1px] bg-[#E4E4E7]"></div>
            </div>
            <div className="flex flex-col gap-1 max-w-[282.5px] w-full">
              <p className="text-[#71717A] font-Inter text-sm font-normal">Check out</p>
              <div className="flex items-center gap-1">
                <p className="text-[#09090B] font-Inter text-base font-normal">Tuesday, Jul 3,</p>
                <p className="text-[#09090B] font-Inter text-base font-normal">11:00am</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="py-2 text-[#2563EB] font-Inter text-sm font-medium">Check-in and special instructions</p>
            <p className="py-2 text-[#2563EB] font-Inter text-sm font-medium">View pricing details</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="px-3 py-2 text-[#18181B] font-Inter text-sm font-medium border border-[#E4E4E7] rounded-[6px]">Contract property</button>
          <button className="px-3 py-2 text-[#FAFAFA] font-Inter text-sm font-medium rounded-[6px] bg-[#2563EB]">Cancel booking</button>
        </div>
      </div>
      <div className="py-4 w-full">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Room detail</p>
          <p className="text-[#09090B] font-Inter text-xl font-semibold tracking-[-0.5px]">Standard Single Room, 1 King Bed</p>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Reserved for</p>
            <p className="text-[#09090B] font-Inter text-base font-normal">Nyamdorj Shagai, 1 adult</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Request</p>
            <p className="text-[#09090B] font-Inter text-base font-normal">Non-Smoking</p>
          </div>
        </div>
        <button className="px-3 py-2 border border-[#E4E4E7] rounded-[6px] text-[#18181B] font-Inter text-sm font-medium">View rules & restrictions</button>
      </div>
      <div className="py-4 w-full">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-xl font-semibold tracking-[-0.5px]">Pedia support</p>
          <p className="text-[#71717A] font-Inter text-sm font-normal">Contact Pedia if you need help managing this Itinerary</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Itinerary:</p>
          <p className="text-[#09090B] font-Inter text-base font-normal">72055771948934</p>
        </div>
        <button className="px-3 py-2 border border-[#E4E4E7] rounded-[6px] text-[#18181B] font-Inter text-sm font-medium">Call +976 70080072</button>
      </div>
    </div>
  );
};
