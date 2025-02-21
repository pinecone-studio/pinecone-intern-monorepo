/*eslint-disable*/
'use client';

import { useState } from 'react';
import StandartTicket from '../../../components/ticketReservation/StandartTicket';
import RearTicket from '../../../components/ticketReservation/RearTicket';
import { TotalPrice } from '../../../components/ticketReservation/TicketPrice';
import VipTicket from '../../../components/ticketReservation/VipTicket';
import SelectDemo from '../../../components/ticketReservation/SelectDay';
import { Concert, useUpdateConcertTicketMutation } from '@/generated';
import { useAlert } from '../../../components/providers/AlertProvider';

type ConcertProps = {
  data: Concert | undefined;
  handleNext: () => void;
  handleChange: (_event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export const TicketReservation = ({ data, handleNext, handleChange }: ConcertProps) => {
  const { showAlert } = useAlert();

  const [standartCount, setStandartCount] = useState(0);

  const [rearCount, setRearCount] = useState(0);

  const [vipCount, setVipCount] = useState(0);

  const [standartClick, setStandartClick] = useState(0);

  const [rearClick, setRearClick] = useState(0);

  const [vipClick, setVipClick] = useState(0);

  const rear = data?.standingAreaTicket?.quantity ?? 0;

  const standart = data?.regularTicket?.quantity ?? 0;

  const vip = data?.vipTicket?.quantity ?? 0;

  const standartPrice = data?.regularTicket?.price ?? 0;

  const rearPrice = data?.standingAreaTicket?.price ?? 0;

  const vipPrice = data?.vipTicket?.price ?? 0;
  const concertID = data?._id ?? '';
  const concertDay = data?.concertDay ?? 0;
  const standartRealCount = Math.max(-1, standart - standartCount);

  const rearRealCount = Math.max(-1, rear - rearCount);

  const vipRealCount = Math.max(-1, vip - vipCount);

  const vipTotalPrice = vipCount * vipPrice;

  const standartTotalPrice = standartCount * standartPrice;

  const standingAreaTotalPrice = rearClick * rearPrice;

  const total = standingAreaTotalPrice + standartTotalPrice + vipTotalPrice;

  const ticketNumber = Math.floor(Math.random() * 1000000);

  const [updateConcertTicket] = useUpdateConcertTicketMutation({
    onError: (error) => {
      showAlert('error', `${error.message}`);
    },
  });

  const handleUpdate = async () => {
    await updateConcertTicket({
      variables: {
        input: { concertID: concertID, standartTicketQuantity: standartCount, standingAreaTicketQuantity: rearCount, vipTicketQuantity: vipCount, ticketNumber: ticketNumber },
      },
    });
  };

  const ticketValues = () => {
    handleChange({ target: { name: 'concertday', value: concertDay } } as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'standartQuantity', value: String(standartCount) } } as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'standartPrice', value: String(standartTotalPrice) } } as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'vipQuantity', value: String(vipCount) } } as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'vipPrice', value: String(vipTotalPrice) } } as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'standingAreaPrice', value: String(standingAreaTotalPrice) } } as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'standingAreaQuantity', value: String(rearCount) } } as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'totalPrice', value: String(total) } } as React.ChangeEvent<HTMLInputElement>);
    handleChange({ target: { name: 'orderNumber', value: String(ticketNumber) } } as React.ChangeEvent<HTMLInputElement>);
    if (total === 0) {
      return showAlert('warning', 'Мэдээлэл дутуу байна');
    }

    handleUpdate();
    handleNext();
  };
  return (
    <div className="w-fit h-fit bg-[#131313] rounded-xl flex flex-col gap-4 py-5 px-8">
      <div className="">
        <SelectDemo date={data?.concertDay} time={data?.concertTime} />
      </div>
      <div className="w-[345px] h-[255px] ">
        <StandartTicket
          handleChange={handleChange}
          standart={standart}
          standartClick={standartClick}
          standartPrice={standartPrice}
          standartRealCount={standartRealCount}
          standartCount={standartCount}
          Increment={() => {
            setStandartCount(Math.max(-1, standartCount + 1));
            setStandartClick((prev) => prev + 1);
          }}
          Decrement={() => {
            setStandartCount(Math.max(0, standartCount - 1));
          }}
        />
        <RearTicket
          rearClick={rearClick}
          rear={rear}
          rearPrice={rearPrice}
          rearRealCount={rearRealCount}
          rearCount={rearCount}
          Increment={() => {
            setRearCount(Math.max(-1, rearCount + 1)), setRearClick((prev) => prev + 1);
          }}
          Decrement={() => {
            setRearCount(Math.max(0, rearCount - 1)), setRearClick((prev) => prev - 1);
          }}
        />
        <VipTicket
          vip={vip}
          vipClick={vipClick}
          vipPrice={vipPrice}
          vipRealCount={vipRealCount}
          vipCount={vipCount}
          Increment={() => {
            setVipCount(Math.max(-1, vipCount + 1)), setVipClick((prev) => prev + 1);
          }}
          Decrement={() => {
            setVipCount(Math.max(0, vipCount - 1)), setVipClick((prev) => prev - 1);
          }}
        />
      </div>
      <TotalPrice
        standartClick={standartClick}
        vipClick={vipClick}
        rearClick={rearClick}
        handleNext={ticketValues}
        standartCount={standartCount}
        standartPrice={standartPrice}
        rearCount={rearCount}
        rearPrice={rearPrice}
        vipCount={vipCount}
        vipPrice={vipPrice}
        total={total}
      />
    </div>
  );
};
