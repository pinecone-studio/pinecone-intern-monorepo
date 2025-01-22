'use client';

import { useState } from 'react';
import { Modal } from './Modal';

export const Order = () => {
  const [orderData, setOrderData] = useState('order');
  return (
    <div data-cy="order-page" className="w-fit mx-auto flex flex-row gap-10 py-12 px-[117px]">
      <div className="flex flex-col gap-4">
        <div
          data-testid="user-data"
          onClick={() => setOrderData('order')}
          className={`text-white rounded-sm px-3 py-1 ${orderData === 'order' ? 'bg-neutral-900' : 'bg-black'} w-[211px] text-sm font-thin`}
        >
          Хэрэглэгчийн мэдээtлэл
        </div>
        <div
          data-testid="order-history"
          onClick={() => setOrderData('data')}
          className={`text-white rounded-sm px-3 py-1 ${orderData === 'data' ? 'bg-neutral-900' : 'bg-black'}  w-[211px] text-sm font-thin `}
        >
          Захиалгын түүх
        </div>
        <div
          data-testid="password-proceed"
          onClick={() => setOrderData('pass')}
          className={`text-white rounded-sm px-3 py-1 ${orderData === 'pass' ? 'bg-neutral-900' : 'bg-black'} w-[211px] text-sm font-thin`}
        >
          Нууц үг сэргээх
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="text-xl font-semibold text-white">Захиалагчийн мэдээлэл</div>
        <Modal orderData={orderData}></Modal>
      </div>
    </div>
  );
};
