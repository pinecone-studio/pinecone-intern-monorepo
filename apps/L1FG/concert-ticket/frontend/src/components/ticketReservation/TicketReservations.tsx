'use client';
import { OrderClick } from '@/app/ticketReservation/[ticketID]/page';
import { TicketReservation } from '@/app/_features/ticketReservation/Ticketreservation';
import { useGetConcertQuery } from '@/generated';
import { useRouter } from 'next/navigation';

const TicketReservations = ({ handleChange, handleNext, ticketID }: OrderClick) => {
  const router = useRouter();

  const { data } = useGetConcertQuery({ variables: { id: ticketID } });

  return (
    <div className="Container w-[1334px] mx-auto">
      <div data-testid="concert-detail-button" onClick={() => router.push(`../detail/${ticketID}`)} className="flex text-[48px] w-[1334px] h-[112px] items-center">
        <img className="w-[40px] h-[40px] cursor-pointer" src="/chevron-back.svg" />
        <div className="text-white text-[28px] mx-auto items-center">Тасалбар захиалах</div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <img className="w-[723px] h-[684px] mt-[50px]" src="/stage.svg" />
        </div>
        <div className="flex-1">
          <TicketReservation handleChange={handleChange} handleNext={handleNext} data={data?.getConcert} />
        </div>
      </div>
    </div>
  );
};
export default TicketReservations;
