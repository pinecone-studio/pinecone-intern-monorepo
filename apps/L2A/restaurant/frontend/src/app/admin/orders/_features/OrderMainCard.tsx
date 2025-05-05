"use client";

import { Button } from "@/components/ui/button";
import type { Food } from "@/app/admin/orders/_components/OrderFood";
import OrderFood from "@/app/admin/orders/_components/OrderFood";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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
const OrderMainCard = ({ order }: OrderProps) => {
  const total = getTotalPrice(order.items);
  return (
    <div className="w-[600px] border rounded-lg shadow-md bg-white px-6 py-5 mt-5" data-cy="order-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <p className="text-[24px] text-[#3F4145]" data-cy="table-number">{order.table}</p>
          <p className="text-[24px] text-[#1D1F24]" data-cy="order-number">{order.orderNumber}</p>
        </div>
        <div className="text-[16px] text-gray-500" data-cy="order-time">🕒 {order.time}</div>
      </div>
      <div className="border-t py-4">
        <OrderFood orders={order.items} />
      </div>
      <div className="flex items-center justify-between border-t pt-4" data-cy="order-total">
        <p className="text-base font-medium">Нийлбэр дүн:</p>
        <p className="text-lg font-bold">{total.toLocaleString()}₮</p>
      </div>
      <div className="flex items-center justify-end gap-3 mt-3"  data-cy="select-status">
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Хүлээгдэж буй" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Бэлэн">Бэлэн</SelectItem>
            <SelectItem value="хүлээгдэж буй">Хүлээгдэж буй</SelectItem>
            <SelectItem value="хүлээгдэж байна">Хийгдэж буй</SelectItem>
            <SelectItem value="дууссан">Дууссан</SelectItem>
          </SelectContent>
        </Select>
        <Button className="rounded-md" data-cy="save-button">Хадгалах</Button>
      </div>
    </div>
  );
};
export default OrderMainCard;







