import { FaStar } from 'react-icons/fa';
import { FaWifi } from 'react-icons/fa';
import { LuFlower } from 'react-icons/lu';
import { LuParkingCircle } from 'react-icons/lu';

export const PopularHotelsCard = () => {
  const cards = Array.from({ length: 12 }, (_, index) => index);
  return (
    <div className="w-screen flex">
      <div className="w-screen flex flex-wrap justify-center gap-10">
        {cards.map((index) => (
          <div key={index} className="w-[308px] h-[424px] border rounded-xl">
            <div className="w-[308px] h-[216px] border"></div>
            <div className="p-3 flex flex-col gap-2">
              <h1 className="font-bold">Toyoko Inn Ulaanbaatar</h1>
              <div className="flex gap-3 text-[#f97316] ">
                <FaStar className="w-[16px] h-[16px]" />
                <FaStar className="w-[16px] h-[16px]" />
                <FaStar className="w-[16px] h-[16px]" />
              </div>
              <div className="flex gap-3">
                <FaWifi className="w-[16px] h-[16px]" />
                <h1 className="">Free WiFi</h1>
              </div>
              <div className="flex gap-3">
                <LuFlower className="w-[16px] h-[16px]" />
                <h1 className="">Spa access</h1>
              </div>
              <div className="flex gap-3">
                <LuParkingCircle className="w-[16px] h-[16px]" />
                <h1>Free self parking</h1>
              </div>
              <div className="flex gap-3">
                <div className="w-[36px] h-[20px] bg-blue-600 rounded-3xl flex justify-center items-center">
                  <h1 className="text-white">3.1</h1>
                </div>
                <h1>Excellent</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
