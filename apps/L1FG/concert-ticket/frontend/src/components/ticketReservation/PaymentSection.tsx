'use client';
import { OrderProps } from '@/app/ticketReservation/[ticketID]/page';
import Image from 'next/image';
import { useState } from 'react';

type PayProps = {
  handleNext: () => void;
  handleChange: (_event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value: OrderProps;
};

const Payment = ({ handleNext, handleChange, value }: PayProps) => {
  const [activePayment, setActivePayment] = useState('');

  return (
    <div className="mx-auto mt-[100px] h-fit w-fit bg-[#131313] rounded-xl p-8 flex flex-col gap-2 ">
      <div className="flex justify-between items-center">
        <p className="text-neutral-400 font-light text-base">Нийт төлөх дүн:</p>
        <p className="text-white text-2xl font-semibold">{value.totalPrice}</p>
      </div>
      <div className="flex mt-[20px] gap-6 justify-around">
        <div
          className={`w-[170px]  bg-[#27272A] rounded-lg p-5 cursor-pointer relative ${activePayment === 'qpay' ? 'border-[#00B7F4] border-[2px]' : 'hover:border-[#00B7F4] hover:border-[2px]'}`}
          onClick={() => {
            setActivePayment('qpay');
            handleChange({ target: { name: 'payType', value: 'socialpay' } as HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
          }}
        >
          <Image className="mx-auto " width={40} height={40} src="/qpay.svg" alt="qpay" />
          <p className="text-white mx-auto w-fit">Qpay</p>
          <Image className={`${activePayment === 'qpay' ? 'block' : 'hidden'} absolute top-[0px] left-[158px] `} src={'/correct.svg'} width={16} height={16} alt="Correct" />
        </div>

        <div
          className={`w-[170px]  bg-[#27272A] rounded-lg p-5 cursor-pointer relative ${activePayment === 'socialpay' ? 'border-[#00B7F4] border-[2px]' : 'hover:border-[#00B7F4] hover:border-[2px]'}`}
          onClick={() => {
            setActivePayment('socialpay');
            handleChange({ target: { name: 'payType', value: 'socialpay' } as HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
          }}
        >
          <Image className="mx-auto" width={40} height={40} src="/socialpay.svg" alt="social" />
          <p className="text-white mx-auto w-fit">Social pay</p>
          <Image className={`${activePayment === 'socialpay' ? 'block' : 'hidden'} absolute top-[0px] left-[158px]`} src={'/correct.svg'} width={16} height={16} alt="Correct" />
        </div>
      </div>
      <button
        data-testid="payment-section-button"
        onClick={handleNext}
        className={`w-full h-[36px] mx-auto mt-[15px] rounded-lg bg-[#00B7F4] hover:bg-[#3279e3] flex justify-center items-center text-black font-thin`}
      >
        Төлбөр төлөх
      </button>
    </div>
  );
};

export default Payment;
