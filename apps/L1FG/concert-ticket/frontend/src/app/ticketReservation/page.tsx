import { TicketReservation } from '@/components/ticketReservation/Ticketreservation';

const Page = () => {
  return (
    <div className="Container w-[1334px] mx-auto">
      <div className="flex text-[48px] w-[1334px] h-[112px] items-center">
        <img className="w-[40px] h-[40px] cursor-pointer" src="/chevron-back.svg" />
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
