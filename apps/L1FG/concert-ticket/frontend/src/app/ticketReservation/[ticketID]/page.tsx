'use client';
import SuccessMessage from '@/components/success/Success';
import PaymentTicket from '@/components/ticketConfirm/Payment';
import ReservationConfirm from '@/components/ticketConfirm/ReservationConfirm';
import TicketReservations from '@/components/ticketReservation/TicketReservations';
import { useState } from 'react';

export type OrderProps = {
  concertday: string;
  concertId: string;
  vipQuantity: number;
  vipPrice: number;
  standartQuantity: number;
  standartPrice: number;
  standingAreaQuantity: number;
  standingAreaPrice: number;
  phoneNumber: number;
  totalPrice: number;
  orderNumber: number;
  payType: string;
  email: string;
};
type CustomEvent = {
  target: {
    name: string;
    value: string | number;
  };
};
export type OrderClick = {
  handleBack: () => void;
  handleNext: () => void;
  value: OrderProps;
  handleChange: (_event: CustomEvent | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  text: string;
  ticketID: string;
};

const stepper = [TicketReservations, ReservationConfirm, PaymentTicket, SuccessMessage];

const Page = ({ params }: { params: { ticketID: string } }) => {
  const [order, setOrder] = useState<OrderProps>({
    concertday: '',
    concertId: '',
    vipQuantity: 0,
    vipPrice: 0,
    standartQuantity: 0,
    standartPrice: 0,
    standingAreaQuantity: 0,
    standingAreaPrice: 0,
    email: '',
    phoneNumber: 0,
    totalPrice: 0,
    orderNumber: 0,
    payType: '',
  });

  const [step, setStep] = useState(0);

  const Step = stepper[step];

  const ticketID = params.ticketID;

  const handleChange = (event: CustomEvent | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (step < stepper.length)
    return <Step text="" ticketID={ticketID} handleChange={handleChange} handleBack={() => setStep((prev) => prev - 1)} handleNext={() => setStep((prev) => prev + 1)} value={order}></Step>;

  return <div></div>;
};
export default Page;
