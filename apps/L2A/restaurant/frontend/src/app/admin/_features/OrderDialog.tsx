"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import OrderFood from "@/app/admin/_components/OrderFood";
import type { Food } from "@/app/admin/_components/OrderFood";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Order = {
  table: string;
  time: string;
  status: string;
  orderNumber: string;
  items: Food[];
};
type OrderDialogProps = {
  order: Order;
  open: boolean;
  onOpenChange: (_open: boolean) => void;
};

const getTotalPrice = (items: { price: number; quantity: number }[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
const OrderDialog = ({ order, open, onOpenChange }: OrderDialogProps) => {
  const total = getTotalPrice(order.items);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[600px]" data-cy="order-dialog">
        <div className="flex items-center justify-between" data-cy="dialog-header">
          <div className="flex gap-2">
            <p className="text-2xl font-bold text-[#1D1F24]" data-cy="dialog-order-number">{order.orderNumber}</p>
            <p className="text-2xl text-[#3F4145]" data-cy="dialog-table-number">{order.table}</p>
          </div>
          <div className="font-bold" data-cy="dialog-order-time">🕒 {order.time}</div>
        </div>
        <div className="border-t pt-4" data-cy="dialog-order-foods">
          <OrderFood orders={order.items} />
        </div>
        <div className="flex items-center justify-between gap-2 pt-3 border-t" data-cy="dialog-status">
          <p>Төлөв:</p>
          <Select>
            <SelectTrigger className="w-[160px]" data-cy="dialog-status-trigger">
              <SelectValue placeholder="Хүлээгдэж буй" data-cy="dialog-status-value" />
            </SelectTrigger>
            <SelectContent data-cy="dialog-status-options">
              <SelectItem value="Бэлэн" data-cy="dialog-status-ready">Бэлэн</SelectItem>
              <SelectItem value="хүлээгдэж буй" data-cy="dialog-status-pending">Хүлээгдэж буй</SelectItem>
              <SelectItem value="хүлээгдэж байна" data-cy="dialog-status-progress">Хийгдэж буй</SelectItem>
              <SelectItem value="дууссан" data-cy="dialog-status-done">Дууссан</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between" data-cy="dialog-total">
          <p>Нийлбэр дүн:</p>
          <p className="text-xl font-bold" data-cy="dialog-total-price">{total.toLocaleString()}₮</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default OrderDialog;
