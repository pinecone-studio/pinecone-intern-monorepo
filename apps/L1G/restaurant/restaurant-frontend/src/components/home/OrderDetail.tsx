'use client';

import { useGetFoodOrdersByUserQuery, FoodOrder } from '@/generated';
import { decode } from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { OrderDetailCard } from './OrderDetailField';

type UserJwtPayload = {
  user: {
    _id: string;
  };
};

const OrderDetail = () => {
  const [orderUserId, setOrderUserId] = useState<string | null>(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decode(token) as UserJwtPayload | null;
      if (decoded?.user?._id) {
        setOrderUserId(decoded.user._id);
      }
    }
    setTokenChecked(true);
  }, []);

  const { data } = useGetFoodOrdersByUserQuery({
    variables: { input: { userId: orderUserId || '' } },
    skip: !orderUserId,
  });

  if (!tokenChecked) {
    return (
      <div className="flex flex-col w-[375px] h-[680px] justify-center items-center">
        <p className="text-center text-[#8B8E95]">Ачааллаж байна...</p>
      </div>
    );
  }

  if (!orderUserId) {
    return (
      <div className="flex flex-col w-[375px] h-[680px] justify-center items-center">
        <p className="text-center text-[#8B8E95]">Захиалгын мэдээлэл үзэхийн тулд нэвтэрнэ үү</p>
      </div>
    );
  }

  const orders = data?.getFoodOrdersByUser || [];
  const lastOrder = [...orders].sort((a, b) => Number(b?.createdAt) - Number(a?.createdAt))[0];

  return (
    <div className="flex flex-col w-[375px] gap-2 pl-4 pr-4 pt-6">
      <h3 data-testid="order-detail-card" className="text-[20px] leading-[32px] font-semibold text-[#441500] text-center">
        Захиалгын дэлгэрэнгүй
      </h3>
      <OrderDetailCard lastOrder={lastOrder as FoodOrder} />
    </div>
  );
};

export default OrderDetail;
