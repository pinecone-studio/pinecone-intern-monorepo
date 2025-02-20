'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import Image from 'next/image';
import { Minus, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FoodItems, useCart } from '../providers';

const OrderList: React.FC = () => {
  const router = useRouter();
  const { orders, addToCart, minusFromCart, removeFromCart } = useCart();

  const formatPrice = (price: number) => (price >= 1000 ? `${(price / 1000).toFixed(1)}k` : `${price}`);

  const handleDecrease = (item: FoodItems) => {
    if (item.quantity > 1) {
      minusFromCart(item);
    } else {
      removeFromCart(item._id);
    }
  };

  const handleIncrease = (item: FoodItems) => {
    addToCart(item);
  };

  const handleDelete = (id: string) => {
    removeFromCart(id);
  };

  const handleOrderSubmit = () => {
    router.push('/qpay');
  };

  return (
    <Drawer>
      <div className="px-4 py-6 bg-white bg-opacity-80 backdrop-blur-sm">
        <DrawerTrigger asChild>
          <Button className="w-full h-9 rounded-md bg-[#441500] shadow-sm" data-testid="order-button">
            Захиалах
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-[#441500] text-center font-semibold text-lg">Таны захиалга</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto max-h-56">
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <div key={item._id} className="border-b py-2 px-4 flex justify-between items-center">
                  <Image width={87} height={87} src={item.imageUrl} alt={item.foodName} className="w-[87px] h-[87px] rounded-md object-cover" />
                  <div className="flex flex-col w-[52%] gap-1">
                    <div className="text-sm font-light">{item.foodName}</div>
                    <div className="text-lg font-bold">{formatPrice(item.price * item.quantity)}</div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 border rounded-md" onClick={() => handleDecrease(item)} data-testid={`minus${index}`}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button className="p-2 border rounded-md" onClick={() => handleIncrease(item)} data-testid={`plus${index}`}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button className="p-2 bg-gray-200 rounded-md" onClick={() => handleDelete(item._id)} data-testid={`delete${index}`}>
                    <Trash size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">Хоосон байна.</p>
            )}
          </div>
          <DrawerFooter className="px-4 py-6 bg-white bg-opacity-80">
            <div className="flex justify-between text-lg font-semibold">
              <span>Нийт үнэ:</span>
              <span>{formatPrice(orders.reduce((sum, item) => sum + item.price * item.quantity, 0))}</span>
            </div>
            <Button className="w-full h-9 rounded-md bg-[#441500] shadow-sm mt-2" onClick={handleOrderSubmit} data-testid="order">
              Захиалах
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderList;
