'use client';

import { useEffect, useState } from 'react';
import Header from '../common/Header';
import Image from 'next/image';
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  tableId: number;
  items: OrderItem[];
  status: string;

  imageUrl: string;
}

const OrderDetail = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedOrder = localStorage.getItem('order');
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        if (parsedOrder?.tableId && parsedOrder.items?.length > 0) {
          setOrder(parsedOrder as Order);
        }
      }
    } catch (error) {
      console.error('Error parsing order:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div data-testid="order-found" className="  text-center py-10">
        Захиалгуудыг ачаалж байна...
      </div>
    );
  }

  if (!order) {
    return (
      <div data-testid="order-not-found" className=" text-center py-10 text-red-500">
        Захиалга олдсонгүй.
      </div>
    );
  }

  return (
    <div>
      <div data-testid="mock-header">
        <Header />
      </div>

      <div className="p-6 bg-white rounded-lg  w-full max-w-xl mx-auto mt-10">
        <h2 data-testid="order-detail" className="text-2xl font-semibold text-center text-[#441500]">
          {' '}
          Захиалгын дэлгэрэнгүй
        </h2>
        <div className="mt-4">
          <div className="border-b py-4">
            <div className="flex flex-col justify-between items-start gap-4">
              <p>
                <p data-testid="order-found-id" className="text-[#8B8E95] text-[12px]">
                  Захиалгын дугаар: #33999
                </p>
              </p>
              <div className="w-full border border-[#8B8E95] "></div>
              <div className="flex flex-col items-start gap-2">
                <p data-testid="tolov" className="text-[#8B8E95] text-[12px]">
                  Захиалгын төлөв:
                </p>{' '}
                {order.status === 'PAID' ? '✅ Төлөгдсөн' : '⏳ Хүлээгдэж байна'}
              </div>
              <div className="w-full border  border-[#8B8E95]  "></div>
              <p className="flex flex-col gap-2">
                <p className="text-[#8B8E95] text-[12px]">Захиалгын Огноо:</p> {new Date().toLocaleString()}
              </p>
              <div className="w-full border  border-[#8B8E95]  "></div>
            </div>

            <div className="mt-2">
              <p className="text-[16px] text-[#8B8E95] items-start justify-start ">Захиалгa:</p>
              {order.items.map((item, index) => (
                <div key={index} className="flex  justify-between  items-center">
                  <div className="flex  items-center ">
                    <div className="flex items-center justify-center gap-4">
                      <Image src={item.imageUrl} alt="" width={64} height={64} className="w-20 h-20 mt-1 rounded-md object-cover mr-4" />

                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                    </div>
                  </div>
                  <span>{item.price.toLocaleString()}₮</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
