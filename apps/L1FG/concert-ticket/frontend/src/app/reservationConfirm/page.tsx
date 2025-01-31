import TicketSubscriber from '@/components/ticketConfirm/ticketSubscriber';
import TicketSubscriberBuysection from '@/components/ticketConfirm/ticketSubscriberBuysection';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="Container w-[1334px] mx-auto">
      <div className="flex text-[48px] w-[1334px] h-[112px] items-center">
        <Link href={'/ticketReservation'}>
          <Image className="cursor-pointer" width={40} height={40} src={'/chevron-back.svg'} alt="chevron-back" />
        </Link>
        <div className="text-white text-[28px] mx-auto items-center">Захиалга баталгаажуулах</div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <TicketSubscriber />
        </div>
        <div className="flex-1">
          <TicketSubscriberBuysection />
        </div>
      </div>
    </div>
  );
};
export default Page;
