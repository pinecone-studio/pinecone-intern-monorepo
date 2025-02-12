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
    <div className="Container w-[1334px] mx-auto">
      <div className="flex text-[48px] w-[1334px] h-[112px] items-center">
        <Image className="cursor-pointer" onClick={handleBack} width={40} height={40} src={'/chevron-back.svg'} alt="chevron-back" />
        <div className="text-white text-[28px] mx-auto items-center">Захиалга баталгаажуулах</div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <TicketSubscriber handleChange={handleChange} />
        </div>
        <div className="flex-1">
          <TicketSubscriberBuysection ticketID={ticketID} value={value} handleNext={orderContinue} />
        </div>
      </div>
    </div>
  );
};
export default ReservationConfirm;
