import Image from 'next/image';
import { Flower, ParkingCircle, Star, Wifi } from 'lucide-react';

const Card = () => (
  <div data-testid="card-component" className="border-2 max-w-[280px] w-[100%] md:w-[260px] sm:w-[220px] overflow-hidden h-[360px] m-auto rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <Image width={500} height={500} className="bg-gray-200 h-[160px]" src="/placeholder.png" alt="" />
    <div className="p-4">
      <h1 className="font-bold text-base">Hotel Name</h1>
      <Star fill="orange" color="orange" size={16} />
      <div className="flex font-[intern] text-sm font-normal gap-3 mt-2 flex-col ">
        <p className="flex gap-2">
          <Wifi size={20} width={18} /> Free wifi
        </p>
        <p className="flex gap-2">
          <Flower size={20} width={18} />
          Spa access
        </p>
        <p className="flex gap-2">
          <ParkingCircle size={20} width={18} />
          Free self parking
        </p>
      </div>
      <div className="flex py-4 gap-2">
        <p className="bg-[#2563EB] rounded-full w-[39px] h-[20px] font-md text-sm flex items-center justify-center text-white ">8.6</p>
        <p className="text-sm font-medium">Excellent</p>
      </div>
    </div>
  </div>
);
export default Card;
