"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Food } from "@/app/admin/order/_components/FoodCard";
import OrderDialog from "./Dialog";

type Order = {
  table: string;
  time: string;
  status: string;
  orderNumber: string;
  items: Food[];
};

type OrderProps = {
  order: Order;
};

const getTotalPrice = (items: { price: number; quantity: number }[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const SecondCard = ({ order }: OrderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const total = getTotalPrice(order.items);

  return (
    <>
      <div className="w-[600px] border rounded-lg shadow-md bg-white px-6 py-5 mt-5" data-testid="order-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <p className="text-[24px] text-[#3F4145]" data-testid="table-number">{order.table}</p>
            <p className="text-[24px] text-[#1D1F24]" data-testid="order-number">{order.orderNumber}</p>
          </div>
          <div className="text-[16px] text-gray-500" data-testid="order-time">🕒 {order.time}</div>
        </div>
        <div className="flex items-center justify-between border-t pt-4" data-testid="order-total-price">
          <p className="text-base font-medium">Нийлбэр дүн:</p>
          <p className="text-lg font-bold">{total.toLocaleString()}₮</p>
        </div>
        <div className="flex items-center justify-end mt-3"  data-testid="order-dialog">
          <Button className="rounded-md" data-testid="save-button" onClick={() => setIsOpen(true)}>
            Дэлгэрэнгүй харах
          </Button>
        </div>
      </div>
      <OrderDialog open={isOpen} onOpenChange={setIsOpen} order={order} />
    </>
  );
};

export default SecondCard;
