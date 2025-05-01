export type OrderStatus = 'done' | 'preparing';

interface OrderStatusCardProps {
  orderId: string;
  status: OrderStatus;
  timestamp: string;
  totalPrice: number;
}

export const OrderStatusCard = ({ orderId, status, timestamp, totalPrice }: OrderStatusCardProps) => {
  const statusLabel = status === 'done' ? 'Дууссан' : 'Бэлтгэгдэж буй';
  const statusBgColor = status === 'done' ? 'bg-[#F4F4F5]' : 'bg-yellow-100';

  return (
    <div className="flex flex-col p-4 justify-between w-full h-[10vh] border-[1px] border-[#E4E4E7] rounded-xl bg-white cursor-pointer">
      <div className="flex gap-2 items-center">
        <p className="text-[#441500] font-semibold text-lg">#{orderId}</p>
        <div className={`px-3 rounded-full ${statusBgColor} text-[0.8em] flex justify-center items-center h-[5vw]`}>
          {statusLabel}
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <p className="text-[#3F4145]">{timestamp}</p>
        <p className="text-[#3F4145] text-lg font-semibold">{totalPrice.toLocaleString()}₮</p>
      </div>
    </div>
  );
};
