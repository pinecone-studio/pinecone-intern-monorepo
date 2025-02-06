import Payment from '@/components/ticketReservation/PaymentSection';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="Container w-[1334px] mx-auto">
      <div className="flex text-[48px] w-[1334px] h-[112px] items-center">
        <Image className="cursor-pointer" width={40} height={40} src={'/chevron-back.svg'} alt="chevron-back" />
        <div className="text-white text-[28px] mx-auto items-center">Төлбөр төлөх</div>
      </div>
      <div className="">
        <Payment />
      </div>
    </div>
  );
};
export default Page;
