'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PaymentSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen w-screen p-5 bg-[#F2F2F7]">
      <div className="flex flex-col w-full h-[90%] justify-center items-center gap-[20px]">
        <div className="flex w-[150px] h-[150px] rounded-full bg-white justify-center items-center">
          <Check className="w-[100px] h-[100px]" />
        </div>
        <p className="text-center text-[18px]">
          Төлбөр амжилттай <br />
          төлөгдлөө
        </p>
      </div>
      <div className="flex w-full h-[30px] justify-center items-center">
        <Button
          onClick={() => {
            router.push('/orderDetail');
          }}
          className="w-full bg-white hover:bg-[#F2F2F7] text-black py-4 text-lg font-medium rounded-lg border-[1px]"
        >
          Захиалгын дэлгэрэнгүй харах
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
