'use client';

import { useState } from 'react';
import { Modal } from '../../app/_features/userProfile/Modal';

export const Order = () => {
  const [orderData, setOrderData] = useState('order');

  return (
    <div className="">
      <div data-cy="order-page" className="w-fit h-[800px] mx-auto flex flex-row gap-10 items-center px-[117px]">
        <div className="flex flex-col  gap-4">
          <div
            data-testid="user-data"
            onClick={() => setOrderData('order')}
            className={`text-white rounded-sm px-3 py-1 ${orderData === 'order' ? 'bg-neutral-900' : 'bg-black'} w-[211px] text-sm font-thin`}
          >
            Хэрэглэгчийн мэдээлэл
          </div>
          <div
            data-cy="order-data"
            data-testid="order-history"
            onClick={() => setOrderData('data')}
            className={`text-white rounded-sm px-3 py-1 ${orderData === 'data' ? 'bg-neutral-900' : 'bg-black'}  w-[211px] text-sm font-thin `}
          >
            Захиалгын түүх
          </div>
          <div
            data-cy="order-pass"
            data-testid="password-proceed"
            onClick={() => setOrderData('pass')}
            className={`text-white rounded-sm px-3 py-1 ${orderData === 'pass' ? 'bg-neutral-900' : 'bg-black'} w-[211px] text-sm font-thin`}
          >
            Нууц үг сэргээх
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div className="text-2xl font-semibold text-white">Захиалагчийн мэдээлэл</div>
          <Modal orderData={orderData}></Modal>
        </div>
      </div>
    </div>
  );
};
