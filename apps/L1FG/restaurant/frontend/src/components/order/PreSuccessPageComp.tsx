'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useMakeOrderMutation } from '@/generated';
import { useCart } from '../providers/LocalProvider';
import Link from 'next/link';
import { toast } from 'sonner';

const PreSuccessPageComp = () => {
  const { orders, tableId, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser._id);
    } else {
      toast.error('Та захиалга хийхээс өмнө нэвтэрч орно уу!');
      router.push('/login');
    }
  }, []);

  const totalPrice = orders.reduce((total, item) => total + item.price * item.quantity, 0);
  const [makeOrder] = useMakeOrderMutation();

  const handleOrderSubmit = async () => {
    if (!tableId || orders.length === 0) return;

    setIsSubmitting(true);
    try {
      await makeOrder({
        variables: {
          input: {
            tableId: Number(tableId),
            userId: userId,
            items: orders.map((item) => ({
              name: item.foodName,
              quantity: item.quantity,
              price: item.price,
              imageUrl: item.imageUrl,
            })),
          },
        },
      });
      clearCart();
      toast.success('Таны захиалга амжилттай үүслээ');
      router.push('/payment-successful');
    } catch (err) {
      console.error('Order submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orders.length === 0 && !isSubmitting) {
    return (
      <Link href={`/order/${tableId}`}>
        <div className="pt-[150px] px-8 bg-[#F7F7F8] w-full h-[100vh] flex flex-col items-center gap-10">
          <div className="text-[#441500] font-semibold w-[70%] text-center text-xl font-gip leading-8">Таны захиалга хоосон байна.</div>
        </div>
      </Link>
    );
  }

  return (
    <div>
      <div className="w-full bg-[#F7F7F8] flex justify-end p-4">
        <button data-testid="back" onClick={() => router.back()}>
          <X width={16} height={16} className="cursor-pointer" />
        </button>
      </div>
      <div className="pt-[150px] px-8 bg-[#F7F7F8] w-full h-[100vh] flex flex-col items-center gap-10">
        <div className="text-[#441500] font-semibold w-[70%] text-center text-xl font-gip leading-8">Төлбөрийн хэрэгслээ сонгоно уу</div>
        <div className="flex gap-3">
          <button
            onClick={!isSubmitting ? handleOrderSubmit : undefined}
            data-testid="Qpay"
            className="w-[100px] h-[100px] rounded-[8px] flex flex-col justify-center items-center gap-1 cursor-pointer bg-white shadow-sm"
          >
            <Image src="/qpayimg.png" alt="qpayimage" width={40} height={40} className={isSubmitting ? 'opacity-50' : ''} />
            <div className="text-[#09090B] text-center font-gip text-[14px] font-medium leading-[20px]">Qpay</div>
          </button>
          <button className="w-[100px] h-[100px] bg-white rounded-[8px] shadow-sm flex flex-col justify-center items-center gap-1">
            <Image src="/Logo.png" alt="wallet-image" width={40} height={40} />
            <div className="text-[#09090B] text-center font-gip text-[14px] font-medium leading-[20px]">Хэтэвч</div>
          </button>
        </div>
        <div>
          <div className="flex w-[326px] py-2 justify-between items-center border-b border-[#E4E4E7]">
            <div className="text-[#8B8E95] font-gip text-[12px] font-medium leading-[16px]">Захиалгын нийт дүн:</div>
            <div className="text-[#09090B] text-right font-gip text-[16px] font-normal leading-[28px]">{totalPrice.toLocaleString('en-US')}₮</div>
          </div>
          <div className="flex w-[326px] py-2 justify-between items-center">
            <div className="text-[#8B8E95] font-gip text-[12px] font-medium leading-[16px]">Төлөх дүн:</div>
            <div className="text-[#09090B] text-right font-gip text-[16px] font-semibold leading-[28px]">{totalPrice.toLocaleString('en-US')}₮</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSuccessPageComp;
