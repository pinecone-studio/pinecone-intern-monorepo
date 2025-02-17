'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import { useGetOrdersForUserQuery } from '@/generated';

const OrderHistory = () => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser._id);
    }
  }, []);
  const { data } = useGetOrdersForUserQuery({
    variables: {
      userId: userId,
    },
  });

  return (
    <div className="min-h-[500px] w-full">
      <Header />

      <h1 className="text-center text-xl pt-20 text-black mb-6">Захиалгын түүх</h1>

      <div className="flex-1 overflow-y-scroll px-4 py-4 space-y-4">
        {data?.getOrdersForUser &&
          data.getOrdersForUser.map((order, index) => {
            const totalAmount = order?.items?.reduce((acc, item) => acc + (item?.price ?? 0) * (item?.quantity ?? 0), 0);
            return (
              <div key={index} className="flex flex-col bg-white text-black p-4 rounded-lg border">
                <div className="flex gap-2 items-center">
                  <p className="text-base font-bold text-[#441500]">#{index + 1}</p>
                  <p className="text-xs text-[#18181B] font-medium border rounded-xl px-2 bg-[#F4F4F5]">{order?.status}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#3F4145]">
                    {new Date(order?.createdAt)
                      .toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                      .replace(',', '')}
                  </p>
                  <p className="text-lg font-bold">{totalAmount}₮</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrderHistory;
