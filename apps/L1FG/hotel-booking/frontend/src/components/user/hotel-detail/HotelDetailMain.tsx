import { AirVent, Cat, CigaretteOff, ConciergeBell, Dumbbell, Martini, ParkingCircle, Phone, Utensils, WashingMachine } from 'lucide-react';
import { Star } from '../svg/Star';
import { DetailHero } from './DetailHero';
import { SinglePageCard } from '../ui/cards';

export const HotelDetailMain = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="container flex flex-col items-center  gap-8 px-[60px] py-[32px]">
        <DetailHero />
        <div className="w-[1080px] flex flex-col gap-[56px] px-[40px]">
          <div className="flex gap-[48px] ">
            <div className="w-[552px] flex flex-col">
              <div className="flex flex-col gap-2">
                <p className="text-[30px] leading-[36px] font-[600]">Flower Hotel Ulaanbaatar</p>
                <div className="flex gap-1">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="text-[16px] leading-[24px] font-[400]">Ulaanbaatar hotel in Downtown Ulaanbaatar with 4 restaurants and a full-service spa</p>
              </div>
              <div className="flex gap-2 items-center mt-6 mb-4">
                <p className="w-[39px] h-[20px] text-center py-[2px] text-white bg-[#2563EB] rounded-full text-[12px] leading-[16px] font-600">8.6</p>
                <p className="text-[14px] leading-[20px] font-[500]">Excellent</p>
              </div>
              <div className="flex flex-col gap-4 border-t border-t-[#E4E4E7] pt-4">
                <p className="text-[14px] leading-[19.12px] font-[700]">Most popular facilities</p>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <ParkingCircle width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">Parking available</p>
                    </div>
                    <div className="flex gap-2">
                      <ConciergeBell width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">24/7 front desk</p>
                    </div>
                    <div className="flex gap-2">
                      <AirVent width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">Air conditioning</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <Dumbbell width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">Gym</p>
                    </div>
                    <div className="flex gap-2">
                      <Cat width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">Pet-friendly</p>
                    </div>
                    <div className="flex gap-2">
                      <CigaretteOff width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">Non-smoking</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <Martini width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">Bar</p>
                    </div>
                    <div className="flex gap-2">
                      <Utensils width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">Restraurant</p>
                    </div>
                    <div className="flex gap-2">
                      <WashingMachine width={16} height={16} />
                      <p className="text-[14px] leading-[20px] font-[500]">Laundry</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[480px] flex flex-col gap-2">
              <p className="text-[16px] leading-[28px] font-[700]">Location</p>
              <div className=" flex flex-col px-[16px] pt-[16px] pb-[4px] border border-[#E4E4E7] rounded-md gap-1  ">
                <p className="text-[16px] leading-[24px] font-[400]">Damdinbazar street-52, Bayangol district, Bayangol, 212513 Ulaanbaatar, Mongolia</p>
                <p className="text-[14px] leading-[20px] font-[500] text-[#2563EB]">Veiw in Google Maps</p>
              </div>
              <p className="text-[16px] leading-[28px] font-[700]">Contact</p>
              <div className="flex gap-3 items-center">
                <Phone height={16} width={16} />
                <div className="flex flex-col gap-1 text-[14px] leading-[20px] font-[500]">
                  <p className="text-[#71717A]">Phone number</p>
                  <p>77-700-700</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1080px] flex flex-col gap-[16px] px-[40px]">
          <h1 className="text-[24px] leading-[32px] font-[600]">Choose your room</h1>
          <div className="w-[223px] bg-[#F4F4F5] rounded-lg">
            <button className=" bg-white  py-[4px] px-[12px]">All room</button>
            <button className=" py-[4px] px-[12px]">1 bed</button>
            <button className=" py-[4px] px-[12px]">2 bed</button>
          </div>
          <div className="grid grid-rows-2 grid-cols-3 gap-[16px]">
            <SinglePageCard />
            <SinglePageCard />
            <SinglePageCard />
            <SinglePageCard />
            <SinglePageCard />
          </div>
        </div>
      </div>
    </div>
  );
};
