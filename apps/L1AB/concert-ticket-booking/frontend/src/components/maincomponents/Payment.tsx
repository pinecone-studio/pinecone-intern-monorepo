'use client';

import { FaArrowLeft } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
interface PaymentProps {
  id: string | string[];
}
export const Payment = ({ id }: PaymentProps) => {
  const router = useRouter();
  const [choose, setChoose] = useState<string | null>(null);
  return (
    <div className="h-[48rem]">
      <nav className="flex items-center justify-between border-b-[2px] border-[#27272A] py-8 px-12">
        <Button className="bg-[#1F1F1F] h-10 w-10 text-white" data-testid="BacktoPush" onClick={() => router.push(`/order/${id}`)}>
          <FaArrowLeft />
        </Button>
        <p className="text-2xl font-semibold text-white">Захиалга баталгаажуулах</p>
        <p></p>
      </nav>
      <div className="bg-[#131313] w-fit p-6 grid gap-4 rounded-[12px] m-auto my-[60px]">
        <div className="flex items-center py-3 justify-between">
          <p className="font-extralight text-white">Нийт төлөх дүн</p>
          <p className="font-bold text-xl text-white">980’000₮</p>
        </div>
        <div className="flex gap-3 w-[380px]">
          <div
            data-testid="QpayClick"
            className={`bg-[#27272A] relative flex-1 py-6 rounded-[8px] grid justify-center border border-transparent ${choose === 'Qpay' ? 'border border-[#00B7F4]' : ''}`}
            onClick={() => setChoose('Qpay')}
          >
            <div className="relative w-10 h-10 m-auto">
              <Image src={'/QPay.png'} alt="Qpay" fill />
            </div>
            <div className={`${choose === 'Qpay' ? 'visible' : 'hidden'} absolute text-white rounded-full p-1 -top-3 bg-[#00B7F4] -right-3 `}>
              <IoMdCheckmark />
            </div>
            <p className="text-white font-medium">Qpay</p>
          </div>
          <div
            data-testid="SocialPayClick"
            className={`bg-[#27272A] relative flex-1 py-6 rounded-[8px] grid justify-center border border-transparent ${choose === 'Social Pay' ? 'border border-[#00B7F4]' : ''}`}
            onClick={() => setChoose('Social Pay')}
          >
            <div className="relative w-10 h-10 m-auto">
              <Image src={'/SocialPay.png'} alt="Social Pay" fill />
            </div>
            <div className={`${choose === 'Social Pay' ? 'visible' : 'hidden'} absolute text-white rounded-full p-1 -top-3 bg-[#00B7F4] -right-3 `}>
              <IoMdCheckmark />
            </div>
            <p className="text-white font-medium">Social Pay</p>
          </div>
        </div>
        <Button className="w-full bg-[#00B7F4] hover:bg-[#6ad4f8] pt-2 px-4 text-black" data-testid="SuccessToPush" onClick={() => router.push(`/succes`)}>
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
};
