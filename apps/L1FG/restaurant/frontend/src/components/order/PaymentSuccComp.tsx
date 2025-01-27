import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PaymentSuccessComp = () => {
  return (
    <div className="bg-[#F7F7F8] w-full h-[100vh] flex flex-col items-center justify-between pt-52 ">
      <div className="flex flex-col items-center gap-4">
        <div className="w-[100px] h-[100px] bg-white rounded-full flex justify-center items-center ">
          <Check role="img" color="#441500" width={50} height={50} />
        </div>
        <div className="text-[#441500] font-semibold w-[70%] text-center text-xl font-gip leading-[160%]">Төлбөр амжилттай төлөгдлөө</div>
      </div>
      <Link href="order-details">
        <div className="bg-#E4E4E7 w-[90vw] mb-[10vw] px-4 py-2 flex justify-center rounded-md border border-zinc-200 bg-white font-gip text-sm font-medium text-[#18181B] leading-5 ">
          Захиалгын дэлгэрэнгүй харах
        </div>
      </Link>
    </div>
  );
};

export default PaymentSuccessComp;
