import Ticketreservation from '@/components/ticketReservation/Ticketreservation';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="Container w-[1334px] mx-auto">
      <div className="flex text-[48px] w-[1334px] h-[112px] items-center">
        <Image className="w-[40px] h-[40px] cursor-pointer" src="/chevron-back.svg" alt="Back" width={40} height={40} />
        <div className="text-white text-[28px] mx-auto items-center">Тасалбар захиалах</div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <Image className="w-[723px] h-[684px] mt-[50px]" src="/stage.svg" alt="Stage" width={723} height={684} />
        </div>
        <div className="flex-1">
          <Ticketreservation />
        </div>
      </div>
    </div>
  );
};
export default Page;
