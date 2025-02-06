'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Payment = () => {
  const [activePayment, setActivePayment] = useState<string | null>(null);

  const handlePaymentToggle = (method: string) => {
    setActivePayment((prev) => (prev === method ? null : method));
  };
  return (
    <div className="w-[440px] mx-auto mt-[100px] h-[208px] bg-[#131313] rounded-xl p-[20px]">
      <div className="flex justify-between">
        <p className="text-white">Нийт төлөх дүн:</p>
        <p className="text-white">980 00₮</p>
      </div>
      <div className="flex mt-[20px] gap-6 justify-around">
        <div
          className={`w-[170px] h-[80px] bg-[#27272A] rounded-xl p-[15px] cursor-pointer relative ${
            activePayment === 'qpay' ? 'border-[#00B7F4] border-[2px]' : 'hover:border-[#00B7F4] hover:border-[2px]'
          }`}
          onClick={() => handlePaymentToggle('qpay')}
        >
          <Image className="mx-auto" width={30} height={30} src="/qpay.svg" alt="qpay" />
          <p className="text-white mx-auto w-fit">Qpay</p>
          <Image className={`${activePayment === 'qpay' ? 'block' : 'hidden'} absolute bottom-[69px] left-[158px]`} src={'/correct.svg'} width={16} height={16} alt="Correct" />
        </div>

        <div
          className={`w-[170px] h-[80px] bg-[#27272A] rounded-xl p-[15px] cursor-pointer relative ${
            activePayment === 'socialpay' ? 'border-[#00B7F4] border-[2px]' : 'hover:border-[#00B7F4] hover:border-[2px]'
          }`}
          onClick={() => handlePaymentToggle('socialpay')}
        >
          <Image className="mx-auto" width={30} height={30} src="/socialpay.svg" alt="social" />
          <p className="text-white mx-auto w-fit">Social pay</p>
          <Image className={`${activePayment === 'socialpay' ? 'block' : 'hidden'} absolute bottom-[69px] left-[158px]`} src={'/correct.svg'} width={16} height={16} alt="Correct" />
        </div>
      </div>
      <Link href={'/success'}>
        <button className={`w-[297px] h-[36px] mx-auto mt-[15px] rounded-lg bg-[#00B7F4] hover:bg-[#3279e3] flex justify-center items-center text-white font-semibold`}>Төлбөр төлөх</button>
      </Link>
    </div>
  );
};

export default Payment;
