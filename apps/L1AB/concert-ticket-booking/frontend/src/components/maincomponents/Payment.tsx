'use client';
import { FaArrowLeft } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useGetBookingByIdQuery, useSendQrToEmailMutation } from '@/generated';
import { toast } from 'react-toastify';

interface PaymentProps {
  id: string | string[];
}
export const Payment = ({ id }: PaymentProps) => {
  const router = useRouter();
  const [qr, setQr] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { data } = useGetBookingByIdQuery({ variables: { id: id as string }, pollInterval: 2000 });
  const bookingDetails = data?.getBookingById;
  const [sendQrToEmail] = useSendQrToEmailMutation();

  const paymentHandler = async () => {
    if (!bookingDetails?.venues || bookingDetails.venues.length === 0) {
      return;
    }
    setLoading(true);
    try {
      const venues = [
        {
          name: 'Энгийн',
          price: bookingDetails.venues[0]?.price,
          quantity: bookingDetails.venues[0]?.quantity,
        },
        {
          name: 'Fan-Zone',
          price: bookingDetails.venues[1]?.price,
          quantity: bookingDetails.venues[1]?.quantity,
        },
        {
          name: 'Vip',
          price: bookingDetails.venues[2]?.price,
          quantity: bookingDetails.venues[2]?.quantity,
        },
      ];

      const { data } = await axios.post('https://qpaymock.onrender.com/generate-qr', {
        serviceName: 'ticket',
        venues,
        bookingId: bookingDetails._id,
        eventId: bookingDetails.eventId._id,
      });

      setQr(data);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendQrHandler = async () => {
    setLoading(true);
    await sendQrToEmail();
    toast.success('Таны И-мэйл рүү QR код илгээгдлээ');
    setLoading(false);
  };

  return (
    <div className="h-[48rem] max-sm:h-full">
      <nav className="flex items-center justify-between border-b-[2px] dark:border-[#27272A] border-[#c6c6c6] py-8 px-12 max-sm:px-3 max-sm:justify-evenly max-md:px-3 max-md:justify-evenly max-lg:px-3 max-lg:justify-evenly">
        <Button className="bg-[#1F1F1F] h-10 w-10 text-white" data-testid="BacktoPush" onClick={() => router.push(`/order/${id}`)}>
          <FaArrowLeft />
        </Button>
        <p className="text-2xl font-semibold text-black dark:text-white max-sm:tex-sm">Захиалга баталгаажуулах</p>
        <p></p>
      </nav>
      {bookingDetails?.status === 'Баталгаажсан' ? (
        <div className="flex flex-col items-center justify-center gap-2 mt-24 text-center">
          <p className="text-lg font-bold text-green-500">Төлбөр амжилттай төлөгдлөө!</p>
          <p className="text-sm text-black dark:text-white">Захиалгын дугаар: {bookingDetails._id}</p>
          <p className="text-sm text-black dark:text-white">Төлсөн дүн: {bookingDetails.amountTotal}₮</p>
          <Button className="mt-4 text-white bg-green-500 hover:bg-green-600" data-testid="SendQrButton" onClick={sendQrHandler}>
            {loading ? 'QR код илгээж байна...' : 'Захиалга шалгах QR код авах'}
          </Button>
          <Button className="mt-4 text-white bg-green-500 hover:bg-green-600" data-testid="ProfiletoPush" onClick={() => router.push(`/profile`)}>
            Захиалгын дэлгэрэнгүйг харах
          </Button>
        </div>
      ) : (
        <div className="dark:bg-[#131313] bg-[#f2f2f2] w-fit p-6 grid gap-4 rounded-[12px] m-auto my-[60px]">
          <div className="flex items-center justify-between gap-2 py-3 text-black dark:text-white">
            <p className="font-extralight">Нийт төлөх дүн</p>
            <p className="text-xl font-bold max-sm:text-sm">{bookingDetails?.amountTotal}₮</p>
          </div>
          <div className="flex gap-3 w-[380px] justify-center max-sm:w-full">
            {qr ? (
              <div className="relative w-[200px] h-[200px] m-auto" data-testid="qr">
                <Image src={qr} alt="QR code" fill />
              </div>
            ) : loading ? (
              <>Loading...</>
            ) : (
              <div data-testid="QpayClick" className="dark:bg-[#27272A] bg-white relative flex-1 py-6 rounded-[8px] grid justify-center border border-transparent" onClick={paymentHandler}>
                <div className="relative w-[100px] h-[100px] m-auto max-sm:w-[60px] max-sm:h-[60px]">
                  <Image src={'/QPay.png'} alt="Qpay" fill />
                </div>
                <p className="flex justify-center pt-2 font-medium text-black dark:text-white">Qpay</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
