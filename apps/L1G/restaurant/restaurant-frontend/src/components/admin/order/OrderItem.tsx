'use client';
import React from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { OrderedFoods } from './OrderedFoods';
import { UpdateFoodOrderStatus } from './UpdateFoodOrderStatus';
import { ApolloQueryResult } from '@apollo/client';
import { GetFoodOrdersQuery } from '@/generated';
import { Separator } from '@/components/ui/separator';

type orderedFoodsType = {
  quantity: number;
  food: {
    foodName: string;
    price: string;
    image: string;
  };
}[];

type orderType = {
  orderId: string;
  totalPrice: number;
  orderNumber: number;
  orderType: string;
  tableName: string;
  createdAt: string;
  foodOrderItems: orderedFoodsType;
  orderStatus: string;
  refetch: () => Promise<ApolloQueryResult<GetFoodOrdersQuery>>;
};
export const OrderItem = ({ totalPrice, orderNumber, tableName, createdAt, foodOrderItems, orderStatus, orderId, orderType, refetch }: orderType) => {
  const date = new Date(Number(createdAt)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [open, setOpen] = useState(false);
  return (
    <Collapsible data-testid="admin-order" className="flex w-full h-fit flex-col" open={open} onOpenChange={setOpen}>
      <div className="flex  flex-col p-4 bg-white border border-solid border-[#E4E4E7] rounded-md ">
        {/* Header */}
        <div className="pb-4 flex items-center justify-between">
          <div className="font-semibold">
            #{orderNumber} <span className="text-[#3F4145]">{tableName}</span> <span className="text-[#3F4145]">{orderType}</span>
          </div>
          <div className="flex gap-1 items-center justify-center text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <p className="text-[#3F4145]">{date}</p>
          </div>
        </div>
        <Separator />
        <div className=" pt-4 flex flex-col items-center justify-between gap-4">
          <div className=" w-full flex justify-between items-center">
            <span className="text-[#09090B]"> Нийлбэр дүн:</span> <span className="font-bold text-lg">{totalPrice}₮</span>
          </div>
          <UpdateFoodOrderStatus refetch={refetch} orderStatus={orderStatus} orderId={orderId} />
          <CollapsibleTrigger>see more</CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <>
            {foodOrderItems.map((item, i) => (
              <OrderedFoods key={i} src={item.food.image} price={item.food.price} quantity={item.quantity} foodName={item.food.foodName} />
            ))}
          </>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
