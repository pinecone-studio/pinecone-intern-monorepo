'use client';
import { OrderClick } from '@/app/ticketReservation/[ticketID]/page';
import { TicketReservation } from '@/app/_features/ticketReservation/Ticketreservation';
import { useGetConcertQuery, useGetOrderTicketNumberQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { useAlert } from '../providers/AlertProvider';
import { useEffect } from 'react';

const TicketReservations = ({ handleChange, handleNext, ticketID, value }: OrderClick) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { data: orderData, error } = useGetOrderTicketNumberQuery({ variables: { ticketNumber: value.orderNumber } });
  useEffect(() => {
    if (!orderData && value.orderNumber) {
      showAlert('error', `${error} `);
    }
  }, [error, value.orderNumber, orderData]);

  const { data } = useGetConcertQuery({ variables: { id: ticketID } });
  return (
    <div className=" h-screen flex flex-col items-center justify-start ">
      <div className="w-[1334px] flex flex-col gap-14">
        <div data-testid="concert-detail-button" onClick={() => router.push(`../detail/${ticketID}`)} className="flex text-[48px] w-[1334px] pt-20 items-center ">
          <img className="w-[40px] h-[40px] cursor-pointer" src="/chevron-back.svg" />
          <div className="text-white text-2xl font-bold mx-auto items-center">Тасалбар захиалах</div>
        </div>
        <div className="border-b border-neutral-500"></div>
        <div className="flex justify-around">
          <div className="flex">
            <img className="w-[723px] h-[684px] " src="/stage.svg" />
          </div>
          <div className="flex justify-start items-center">
            <TicketReservation handleChange={handleChange} handleNext={handleNext} data={data?.getConcert} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketReservations;
