import { Star } from '../svg/Star';
import { AirVent, Cat, CigaretteOff, ConciergeBell, Dumbbell, Martini, ParkingCircle, Phone, Utensils, WashingMachine } from 'lucide-react';

export const GeneralInformation = () => {
  return (
    <div className="flex flex-col gap-[56px] px-[40px]">
      <div className="w-full flex gap-[48px] ">
        <div className="max-w-[552px] w-full flex flex-col">
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
  );
};
