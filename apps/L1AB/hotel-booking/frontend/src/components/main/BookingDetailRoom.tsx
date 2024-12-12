import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const BookingDetailRoom = () => {
  return (
    <div className="flex justify-center">
      <div className="flex gap-6 p-4 border ">
        <div className="flex flex-col w-[480px] p-3 border ">
          <div className="border border-[#E4E4E7] p-3 rounded-xl">
            <div>
              <div className="bg-pink-100 w-96 h-56"></div>
            </div>
            <div className="flex flex-col mt-3 gap-3 ">
              <h1 className="font-bold"> Flower Hotel Ulaanbaatar</h1>
              <p className="text-[#71717A] text-sm">Zaluuchuud Avenue, 18, Bayanzurkh, Ulaanbaatar, Ulaanbaatar, 001334</p>
            </div>
            <div className="flex flex-row gap-1 mt-3">
              <button className="w-[39px] h-[20px] border rounded-3xl bg-blue-600 text-white flex justify-center items-center text-sm">8.6</button>
              <h3>Excellent</h3>
            </div>
            <div className="border border-[#E4E4E7] mt-5 "></div>
            <div className="mt-3">
              <Link href="https://www.google.com/maps">
                <Button className="w-full border border-[#E4E4E7] rounded-xl" variant="outline">
                  View in Google Maps
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
