'use client';

import Lottie from 'lottie-react';
import animationData from '../../../../public/correct.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export const PaymentDone = () => {
  return (
    <div data-testid="payment-done">
      <div className="flex items-center justify-center  mt-[400px]">
        <Lottie data-testid="lottie" className="w-40 h-40" animationData={animationData} />
      </div>{' '}
      <p className="text-[#441500] text-center text-[18px]">Төлбөр амжилттай төлөгдлөө</p>
      <Link href="/">
        {' '}
        <div className="flex justify-center mt-80">
          <Button data-testid="button">Захиалгын дэлгэрэнгүй харах</Button>
        </div>
      </Link>
    </div>
  );
};
