'use client';

import { useState } from 'react';
import { Modal } from '../../app/_features/userProfile/Modal';
/*eslint-disable*/
export const Order = () => {
  const [orderData, setOrderData] = useState('order');

  return (
    <div className="mt-[15vh] mb-[15vh] bg-black flex flex-col">
      <main className="flex-1 py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div data-cy="order-page" className="flex flex-row gap-12">
            <div className="flex flex-col gap-2 w-[250px]">
              <div
                data-testid="user-data"
                onClick={() => setOrderData('order')}
                className={`text-white px-4 py-3 cursor-pointer transition-colors ${orderData === 'order' ? 'bg-[#171717] rounded-md' : 'hover:bg-[#171717] hover:rounded-md'}`}
              >
                <span className="text-[15px] font-light">Хэрэглэгчийн мэдээлэл</span>
              </div>

              <div
                data-cy="order-data"
                data-testid="order-history"
                onClick={() => setOrderData('data')}
                className={`text-white px-4 py-3 cursor-pointer transition-colors ${orderData === 'data' ? 'bg-[#171717] rounded-md' : 'hover:bg-[#171717] hover:rounded-md'}`}
              >
                <span className="text-[15px] font-light">Захиалгын түүх</span>
              </div>

              <div
                data-cy="order-pass"
                data-testid="password-proceed"
                onClick={() => setOrderData('pass')}
                className={`text-white px-4 py-3 cursor-pointer transition-colors ${orderData === 'pass' ? 'bg-[#171717] rounded-md' : 'hover:bg-[#171717] hover:rounded-md'}`}
              >
                <span className="text-[15px] font-light">Нууц үг сэргээх</span>
              </div>
            </div>

            <div className="flex-1 max-w-[800px]">
              <h1 className="text-2xl font-medium text-white mb-6">
                {' '}
                {orderData === 'order' && 'Захиалагчийн мэдээлэл'}
                {orderData === 'data' && 'Захиалгын түүх'}
                {orderData === 'pass' && 'Нууц үг сэргээх'}
              </h1>

              <Modal orderData={orderData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
