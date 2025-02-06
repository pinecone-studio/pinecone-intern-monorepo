import Image from 'next/image';

export const BookingCard = () => {
  return (
    <div className="w-full flex border border-[#E4E4E7] rounded-md ">
      <Image src="/EconomySingleRoom.png" alt="Economy Single Room" height={222.19} width={395} className="rounded-l-md w-full" priority />
      <div className="container w-full flex flex-col justify-between items-start p-5 gap-3">
        <div className="flex gap-[10px] py-[2px] px-[10px] bg-[#18BA51] rounded-full">
          <p className="text-xs font-semibold font-inter leading-4 text-[#FAFAFA]">Booked</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold font-inter leading-7">Flower Hotel Ulaanbaatar</p>
          <p className="text-sm font-normal text-[#71717A] font-inter leading-5">Standard Room, City View, 1 Queen Bed</p>
        </div>

        <p className="mt-2">1 night • 1 adult • 1 room</p>
        <div className="flex justify-between  mt-3 w-full">
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <p>Check in</p>
              <p>Monday, Jul 1, 3:00pm</p>
            </div>
            <div className="flex gap-5">
              <p>Itinerary:</p>
              <p>72055771948934</p>
            </div>
          </div>
          <button className="flex justify-center items-center text-center py-2 px-3 gap-2 border border-[#E4E4E7] rounded-md hover:bg-blue-400 hover:text-white transition-colors duration-200">
            <p>View Detail</p>
          </button>
        </div>
      </div>
    </div>
  );
};
