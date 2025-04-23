import { Clock } from 'lucide-react';
import { OrderCardProps } from '@/types/order';
export const OrderCard = ({
  orderNumber,
  table,
  time,
  items,
  total,
}: OrderCardProps) => {
  return (
    <div className="border rounded-2xl p-4 space-y-3 shadow-sm bg-white w-[600px]">
      <div className="flex justify-between items-center text-sm font-medium">
        <div className="flex gap-1">
          <span>{table}</span>
          <span className="text-gray-500">#{orderNumber}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Clock size={15} /> {time}
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center">
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-xs text-gray-500">
                {item.price}₮ × {item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-2 border-t text-sm">
        <span className="text-gray-600">Нийлбэр дүн:</span>
        <span className="text-lg font-bold">{total}₮</span>
      </div>
      <div className="flex justify-end">
          <button className="border border-black bg-black text-white px-4 py-1 rounded-md text-sm w-full sm:w-auto">
            Дэлгэрэнгүй харах
          </button>
      </div>
    </div>
  );
};
