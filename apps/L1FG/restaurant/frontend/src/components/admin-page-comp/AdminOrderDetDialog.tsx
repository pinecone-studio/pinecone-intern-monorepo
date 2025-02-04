import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Clock2 } from 'lucide-react';
import Image from 'next/image';

interface OrderStatusProps {
  order: Order;
}

interface Order {
  _id: string; // Required
  status?: string;
  createdAt?: any;
  tableId?: number;
  items?: {
    price?: number;
    quantity?: number;
    name?: string;
    imageUrl?: string;
  }[];
}

const DialogDetails: React.FC<OrderStatusProps> = ({ order }) => {
  const totalPrice = order?.items
    ?.reduce((total, item) => total + (item?.price ?? 0) * (item?.quantity ?? 0), 0)
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "'");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Дэлгэрэнгүй харах</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col p-6 bg-white rounded-[8px] gap-4 w-[600px] border border-[#E4E4E7] shadow-sm">
        <div className="flex justify-between">
          <div className="text-2xl font-normal flex gap-2">
            <div className="text-[#1D1F24] ">#33999</div>
            <div data-testid="order-table-num" className="text-[#3F4145]">
              {order?.tableId}
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <Clock2 size={16} />
            <div data-testid="date" className="text-base font-medium text-[#09090B] ">
              {new Date(order?.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
          </div>
        </div>

        <div className="w-full border border-[#E4E4E7]"></div>
        <div className="flex flex-col max-h-[400px] gap-4 overflow-scroll">
          {order?.items?.map((item, index) => (
            <div className="flex gap-6" key={index}>
              <Image src={item?.imageUrl ?? '/default-image.jpg'} alt="food" width={87} height={87} className="rounded-xl w-[87px] h-[87px] object-cover" />
              <div className="flex flex-col gap-2">
                <div className="text-[#09090B] text-[16px] leading-[20px] font-light">{item?.name}</div>
                <div className="text-[#09090B] text-[18px] leading-[20px] font-bold">{item?.price}₮</div>
                <div className="text-[#09090B] text-[16px] leading-[20px] font-light">{item?.quantity}ш</div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full border border-[#E4E4E7]"></div>

        <div className="flex justify-between">
          <div className="text-[#09090B] text-base font-normal">Төлөв:</div>
          <div className="text-[#09090B] flex justify-center items-center text-xs font-semibold border border-[#E4E4E7] rounded-[6px] px-[10px] py-[2px] " data-testid="total-price">
            {order.status}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-[#09090B] text-base font-normal">Нийлбэр дүн:</div>
          <div className="text-[#09090B] text-xl font-bold" data-testid="total-price">
            {totalPrice}₮
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetails;
