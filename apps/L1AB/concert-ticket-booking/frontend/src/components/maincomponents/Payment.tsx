'use client';

import { FaArrowLeft } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useGetBookingByIdQuery } from '@/generated';

interface PaymentProps {
  id: string | string[];
}
export const Payment = ({ id }: PaymentProps) => {
  const router = useRouter();
  const [qr, setQr] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // const { data } = useGetBookingByIdQuery({ variables: { id: '6744701ff9507660ab5b664b' }, pollInterval: 2000 });
  // const isBookingPaid = data?.getBookingById;

  const { data } = useGetBookingByIdQuery({ variables: { id: id as string }, pollInterval: 2000 });
  const bookingDetails = data?.getBookingById;

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

  return (
    <div className="h-[48rem]">
      <nav className="flex items-center justify-between border-b-[2px] border-[#27272A] py-8 px-12">
        <Button className="bg-[#1F1F1F] h-10 w-10 text-white" data-testid="BacktoPush" onClick={() => router.push(`/order/${id}`)}>
          <FaArrowLeft />
        </Button>
        <p className="text-2xl font-semibold text-white">Захиалга баталгаажуулах</p>
      </nav>
      {bookingDetails?.status === 'Баталгаажсан' ? (
        <div className="flex flex-col items-center justify-center gap-2 text-center mt-24">
          <p className="text-green-500 font-bold text-lg">Төлбөр амжилттай төлөгдлөө!</p>
          <p className="text-white text-sm">Захиалгын дугаар: {bookingDetails._id}</p>
          <p className="text-white text-sm">Төлсөн дүн: {bookingDetails.amountTotal}₮</p>
          <Button className="mt-4 bg-green-500 text-white hover:bg-green-600" data-testid="ProfiletoPush" onClick={() => router.push(`/profile`)}>
            Захиалгын дэлгэрэнгүйг харах
          </Button>
        </div>
      ) : (
        <div className="bg-[#131313] w-fit p-6 grid gap-4 rounded-[12px] m-auto my-[60px]">
          <div className="flex items-center py-3 justify-between">
            <p className="font-extralight text-white">Нийт төлөх дүн</p>
            <p className="font-bold text-xl text-white">{bookingDetails?.amountTotal}₮</p>
          </div>
          <div className="flex gap-3 w-[380px] justify-center">
            {qr ? (
              <div className="relative w-[200px] h-[200px] m-auto" data-testid="qr">
                <Image src={qr} alt="QR code" fill />
              </div>
            ) : loading ? (
              <>Loading...</>
            ) : (
              <div data-testid="QpayClick" className="bg-[#27272A] relative flex-1 py-6 rounded-[8px] grid justify-center border border-transparent" onClick={paymentHandler}>
                <div className="relative w-[100px] h-[100px] m-auto">
                  <Image src={'/QPay.png'} alt="Qpay" fill />
                </div>
                <p className="text-white font-medium">Qpay</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
