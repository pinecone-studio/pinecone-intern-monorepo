"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Food } from "@/app/admin/orders/_components/OrderFood";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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

const OrderSecondCard = ({ order }: OrderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const total = getTotalPrice(order.items);

  return (
    <>
      <div className="w-[600px] border rounded-lg shadow-md bg-white px-6 py-5 mt-5" data-cy="order-card">
        <div className="flex items-center justify-between mb-3" data-cy="order-header">
          <div className="flex gap-2">
            <p className="text-[24px] text-[#3F4145]" data-cy="table-number">{order.table}</p>
            <p className="text-[24px] text-[#1D1F24]" data-cy="order-number">{order.orderNumber}</p>
          </div>
          <div className="text-[16px] text-gray-500" data-cy="order-time">🕒 {order.time}</div>
        </div>
        <div className="flex items-center justify-between border-t pt-4" data-cy="order-total-price">
          <p className="text-base font-medium">Нийлбэр дүн:</p>
          <p className="text-lg font-bold">{total.toLocaleString()}₮</p>
        </div>
        <div className="flex items-center justify-end gap-3 mt-3" data-cy="order-actions">
          <Select>
            <SelectTrigger className="w-[160px]" data-cy="select-trigger">
              <SelectValue placeholder="Хүлээгдэж буй" data-cy="select-value" />
            </SelectTrigger>
            <SelectContent data-cy="select-options">
              <SelectItem value="Бэлэн" data-cy="select-item-ready">Бэлэн</SelectItem>
              <SelectItem value="хүлээгдэж буй" data-cy="select-item-pending">Хүлээгдэж буй</SelectItem>
              <SelectItem value="хүлээгдэж байна" data-cy="select-item-inprogress">Хийгдэж буй</SelectItem>
              <SelectItem value="дууссан" data-cy="select-item-done">Дууссан</SelectItem>
            </SelectContent>
          </Select>
          <Button className="rounded-md" data-cy="save-button" onClick={() => setIsOpen(true)}>
            Дэлгэрэнгүй харах
          </Button>
        </div>
      </div>
      <OrderDialog open={isOpen} onOpenChange={setIsOpen} order={order} data-cy="order-dialog" />
    </>
  );
};

export default OrderSecondCard;
