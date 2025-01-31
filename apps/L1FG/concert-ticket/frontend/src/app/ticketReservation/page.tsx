import TicketReservation from '@/components/ticketReservation/TicketReservation';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="Container w-[1334px] mx-auto">
      <div className="flex text-[48px] w-[1334px] h-[112px] items-center">
        <Image className="cursor-pointer" width={40} height={40} src={'/chevron-back.svg'} alt="chevron-back" />
        <div className="text-white text-[28px] mx-auto items-center">Тасалбар захиалах</div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <img className="w-[723px] h-[684px] mt-[50px]" src="/stage.svg" />
        </div>
        <div className="flex-1">
          <TicketReservation vip={1} standart={1} rear={1} />
        </div>
      </div>
    </div>
  );
};
export default Page;
