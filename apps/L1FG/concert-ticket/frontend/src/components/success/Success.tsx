import { OrderClick } from '@/app/ticketReservation/[ticketID]/page';
import Image from 'next/image';

const SuccessMessage = ({ value }: OrderClick) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image width={100} height={100} src={'/BigCorrect.svg'} alt="BigCorrect" />
      <div className="p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-white text-center text-xl mb-2">Захиалга амжилттай</div>
          <div className="text-gray-400 text-center">
            Таны имэйл хаяг руу <div className="text-blue-500">#{value.orderNumber}</div> тасалбар амжилттай илгээгдлээ
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessMessage;
