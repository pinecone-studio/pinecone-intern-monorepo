import Image from 'next/image';
import TicketSubscriber from '../../app/_features/userProfile/TicketSubscriber';
import { OrderClick } from '@/app/ticketReservation/[ticketID]/page';

const ReservationConfirm = ({ handleChange, handleBack, handleNext, value, ticketID }: OrderClick) => {
  return (
    <div className="h-screen flex flex-col items-center justify-start ">
      <div className="w-[1334px] flex flex-col gap-32">
        <div className="flex flex-col gap-14">
          <div className="flex text-[48px] w-[1334px] pt-20">
            <Image className="cursor-pointer" onClick={handleBack} width={40} height={40} src={'/chevron-back.svg'} alt="chevron-back" />
            <div className="text-white text-2xl mx-auto font-bold items-center">Захиалга баталгаажуулах</div>
          </div>
          <div className="border-b border-neutral-500  w-[1334px]"></div>
        </div>
        <TicketSubscriber ticketID={ticketID} value={value} handleNext={handleNext} handleChange={handleChange} />
      </div>
    </div>
  );
};
export default ReservationConfirm;
