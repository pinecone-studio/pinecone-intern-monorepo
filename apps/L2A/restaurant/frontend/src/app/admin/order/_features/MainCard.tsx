"use client";

import { Button } from "@/components/ui/button";
import FoodCard, { Food } from "../_components/FoodCard";
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
const MainCard = ({ order }: OrderProps) => {
  const total = getTotalPrice(order.items);
  return (
    <div className="w-[600px] border rounded-lg shadow-md bg-white px-6 py-5 mt-5" data-testid="order-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <p className="text-[24px] text-[#3F4145]" data-testid="table-number">{order.table}</p>
          <p className="text-[24px] text-[#1D1F24]" data-testid="order-number">{order.orderNumber}</p>
        </div>
        <div className="text-[16px] text-gray-500" data-testid="order-time">🕒 {order.time}</div>
      </div>
      <div className="border-t py-4">
        <FoodCard orders={order.items} />
      </div>
      <div className="flex items-center justify-between border-t pt-4" data-testid="order-total">
        <p className="text-base font-medium">Нийлбэр дүн:</p>
        <p className="text-lg font-bold">{total.toLocaleString()}₮</p>
      </div>
      <div className="flex items-center justify-end gap-3 mt-3" data-testid="select-status">
        <Select>
          <SelectTrigger  className="w-[160px]">
            <SelectValue data-testid="select-options-card" placeholder="Хүлээгдэж буй" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Бэлэн">Бэлэн</SelectItem>
            <SelectItem value="хүлээгдэж буй">Хүлээгдэж буй</SelectItem>
            <SelectItem value="хүлээгдэж байна">Хийгдэж буй</SelectItem>
            <SelectItem data-testid="finish-button" value="дууссан">Дууссан</SelectItem>
          </SelectContent>
        </Select>
        <Button className="rounded-md" data-testid="save-button">Хадгалах</Button>
      </div>
    </div>
  );
};

export default MainCard;
