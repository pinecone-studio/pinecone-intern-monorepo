import { Zap } from 'lucide-react';
import Image from 'next/image';

// interface RoomService {
//   key: string;
//   value: string;
// }

// interface RoomCardProps {
//   hotelId: string; // For MongoDB ObjectId
//   name: string;
//   roomNumber: string;
//   price: number;
//   bed: number;
//   images: string[];
//   roomInfo: string[];
//   type: string;
//   roomServices: RoomService[];
//   tax?: number; // Optional since no required in schema
// }

export const CheckOutRoomCard = () => {
  return (
    <div className="flex flex-col gap-6 w-[515px] text-foreground ">
      <div className="w-full border rounded-[6px]">
        <Image src={'/EconomySingleRoom.png'} alt={'name'} height={216} width={515} className="rounded-t-[6px] w-full" style={{ width: '515px', height: 'auto' }} />

        <div className="w-full flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-bold leading-7 ">Flower Hotel Ulaanbaatar</h1>
            <p className="text-muted-foreground text-sm font-normal">Zaluuchuud Avenue, 18, Bayanzurkh, Ulaanbaatar, Ulaanbaatar, 001334</p>
          </div>

          <div className="flex gap-[10px] items-center">
            <button className="text-primary-foreground bg-[#2563EB] py-[2px] px-[10px] rounded-full">8.6</button>
            <p className="text-foreground text-sm">Excellent</p>
          </div>
          <div className="py-4">
            <div className=" border border-border"></div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-sm text-muted-foreground font-normal flex flex-col gap-1">
              <p>Check in</p>
              <p className="text-sm text-foreground font-medium">Monday, Jul 1, 3:00pm</p>
            </div>
            <div className="text-sm text-muted-foreground font-normal flex flex-col gap-1">
              <p>Check out</p>
              <p className="text-sm text-foreground font-medium">Tuesday, Jul 3, 11:00am</p>
            </div>
          </div>
          <div className="py-4">
            <div className=" border border-border"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-Inter text-sm font-medium ">Standard room, City view</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Zap />
                <p className="text-sm font-Inter font-normal leading-5">1 Queen bed</p>
              </div>
              <div className="flex items-center gap-2">
                <Zap />
                <p className="text-sm font-Inter font-normal leading-5">Non smoking</p>
              </div>
              <div className="flex items-center gap-2">
                <Zap />
                <p className="text-sm font-Inter font-normal leading-5">Breakfast included</p>
              </div>
              <div className="flex items-center gap-2">
                <Zap />
                <p className="text-sm font-Inter font-normal leading-5">Pet friendly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[515px] border rounded-[6px] flex flex-col gap-2 p-4">
        <h1 className="text-base font-bold">Price detail</h1>
        <div className="flex justify-between">
          <div>
            <p className=" text-sm font-normal">1 room x 1 night</p>
            <p className="text-muted-foreground text-sm font-normal">$78.30 per night</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium text-sm text-secondary-foreground">USD 81.00</p>
          </div>
        </div>
        <div className="py-4">
          <div className="border"></div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm font-medium leading-5 text-secondary-foreground">Total price</div>
          <div className="text-lg font-semibold leading-7 text-secondary-foreground">USD 81.00</div>
        </div>
      </div>
    </div>
  );
};
