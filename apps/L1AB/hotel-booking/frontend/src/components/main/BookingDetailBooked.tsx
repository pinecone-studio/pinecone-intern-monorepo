import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckInDialog, ViewPricingDialog, ViewRulesDialog } from './assets';
export const BookingDetailBooked = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full border border-[#E4E4E7] p-3 rounded-xl">
        <div>
          <div className="flex justify-between gap-2 mb-4">
            <h3 className="font-bold"> Flower Hotel Ulaanbaatar</h3>

            <Button asChild className="bg-[#18BA51]">
              <Link href="/login">Booked</Link>
            </Button>
          </div>
          <div className="flex w-full gap-6 mb-4">
            <div className="flex w-full flex-col">
              <p className="text-[#71717A] text-sm">Check out</p>
              <p>Tuesday, Jul 2,11:00am</p>
            </div>
            <div className=" flex px-4 gap-3">
              <div className="h-full w-[1px] border border-[#E4E4E7]"></div>
            </div>
            <div className="flex  w-full flex-col">
              <p className="text-[#71717A] text-sm">Check Out</p>
              <p>Tuesday, Jul 3,11:00am</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <CheckInDialog checkInDialogPhone="" />
            </div>
            <div>
              <ViewPricingDialog />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="border border-[#E4E4E7] rounded-xl">
              Contract property
            </Button>
            <Button variant="secondary" className="bg-[#2563EB] text-[#FAFAFA]">
              Cancel booking
            </Button>
            <div className="border border-[#E4E4E7] my-5"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[#71717A] text-sm">Room detail</div>
          <div className="font-semibold ">
            <h4>Standard Single Room, 1 King Bed</h4>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-5">
              <div className="flex gap-10 text-sm text-[#71717A]">
                <h1 className="">Reserved for</h1>
                <h1>Request</h1>
              </div>
              <div className="flex gap-10">
                <h1>Nyamdorj Shagai, 1 adult</h1>
                <h1>Non-Smoking</h1>
              </div>
            </div>
            <div className="w-full  items-center flex">
              <div className="flex w-full   border border-[#E4E4E7] rounded-xl mt-4">
                <ViewRulesDialog />
              </div>
            </div>
            <div className="border border-[#E4E4E7] my-5 mt-10"></div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3">
          <h4 className="font-bold">Pedia support</h4>
          <h3 className="text-[#71717A] text-sm">Contact Pedia if you need help managing this Itinerary</h3>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#71717A]">Itinerary:</h3>
            <h3>72055771948934</h3>
          </div>
          <Button variant="outline" className="border border-[#E4E4E7] rounded-xl">
            Call +976 70080072
          </Button>
        </div>
      </div>
    </div>
  );
};
