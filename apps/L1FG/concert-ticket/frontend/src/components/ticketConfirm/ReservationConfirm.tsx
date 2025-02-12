import Image from 'next/image';
import TicketSubscriberBuysection from './TicketBuySection';
import TicketSubscriber from './TicketSubscriber';
import { OrderClick } from '@/app/ticketReservation/[ticketID]/page';
import { useAlert } from '../providers/AlertProvider';

const ReservationConfirm = ({ handleChange, handleBack, handleNext, value, ticketID }: OrderClick) => {
  const { showAlert } = useAlert();
  const orderContinue = () => {
    if (value.email.length === 0) {
      return showAlert('warning', 'Захиалагчийн мэдээллийг бөглөнө үү');
    }
    handleNext();
  };
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
        <div className="flex flex-row gap-20">
          <TicketSubscriber handleChange={handleChange} />
          <TicketSubscriberBuysection ticketID={ticketID} value={value} handleNext={orderContinue} />
        </div>
      </div>
    </div>
  );
};
export default ReservationConfirm;
