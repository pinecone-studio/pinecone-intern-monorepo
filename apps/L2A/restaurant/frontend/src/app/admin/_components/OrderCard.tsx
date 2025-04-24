import { Clock } from 'lucide-react';

const OrderCard = () => {
  return (
    <div className="border rounded-2xl p-4 space-y-3 shadow-sm bg-white w-[600px]">
      <div className="flex justify-between items-center text-sm font-medium">
        <div className="flex gap-1">
          <span>Хүснэгт 3</span>
          <span className="text-gray-500">#12345</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Clock size={15} /> 12:30 PM
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-3">
          <div className="w-14 h-14 bg-blue-400 rounded-lg" />
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium">Бургер</span>
            <span className="text-xs text-gray-500">500₮ × 2</span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-14 h-14 bg-red-400 rounded-lg" />
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium">Ундаа</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 border-t text-sm">
        <span className="text-gray-600">Нийлбэр дүн:</span>
        <span className="text-lg font-bold">2000₮</span>
      </div>

      <div className="flex justify-end">
        <button className="border border-black bg-black text-white px-4 py-1 rounded-md text-sm w-full sm:w-auto">Дэлгэрэнгүй харах</button>
      </div>
    </div>
  );
};
export default OrderCard;
