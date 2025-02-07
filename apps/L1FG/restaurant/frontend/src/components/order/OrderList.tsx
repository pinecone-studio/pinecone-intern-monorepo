'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import Image from 'next/image';
import { Minus, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FoodItem {
  id: string;
  foodName: string;
  imageUrl: string;
  price: number;
  categoryId: string;
  quantity: number;
}

interface OrderListProps {
  selectedItems: FoodItem[];
  updateItemQuantity: (_id: string, _quantity: number) => void;
  removeItem: (_id: string) => void;
  tableNumber: number;
}

const OrderList: React.FC<OrderListProps> = ({ selectedItems, updateItemQuantity, removeItem, tableNumber }) => {
  const router = useRouter();

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return (price / 1000).toFixed(1) + 'к';
    }
    return price.toString();
  };

  const updateQuantity = (id: string, delta: number) => {
    const item = selectedItems.find((item) => item.id === id);

    if (item && item.quantity + delta > 0) {
      updateItemQuantity(id, item.quantity + delta);
    }
  };

  const handleDecrease = (id: string) => updateQuantity(id, -1);
  const handleIncrease = (id: string) => updateQuantity(id, 1);

  const handleDelete = (id: string) => {
    removeItem(id);
  };

  const handleOrderSubmit = () => {
    const orderInput = {
      tableId: tableNumber,
      items: selectedItems.map((item) => ({
        name: item.foodName,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl,
      })),
    };

    localStorage.setItem('order', JSON.stringify(orderInput));
    router.push('/qpay');
  };

  return (
    <Drawer>
      <div className="px-4 py-6 bg-white bg-opacity-80 backdrop-blur-sm ">
        <DrawerTrigger asChild>
          <Button data-testid="order-button" className="w-full flex h-[36px] p-[8px_16px] justify-center items-center gap-[8px] self-stretch rounded-md bg-[#441500] shadow-sm">
            Захиалах
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent aria-describedby="order-list" data-testid="drawer-content">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle data-testid="drawer-title" className="text-[#441500] text-center font-gip text-[20px] font-semibold leading-[32px]">
              Таны захиалга
            </DrawerTitle>
          </DrawerHeader>
          <div data-testid="order-items" className="overflow-scroll max-h-56">
            {selectedItems && selectedItems.length > 0 ? (
              selectedItems.map((item) => (
                <div key={item.id} className="border-b py-2 px-4 flex justify-between" data-testid="order-item">
                  <div>
                    <Image data-testid="food-image" width={87} height={87} src={item.imageUrl} alt="food image" className="object-cover w-[87px] h-[87px] rounded-md " />
                  </div>
                  <div className="flex flex-col w-[52%] gap-1">
                    <div>
                      <div className="text-[#09090B] text-[14px] font-[300] leading-[20px] font-gip" data-testid="food-name">
                        {item.foodName}
                      </div>
                      <div className="text-[#09090B] text-[18px] font-[700] leading-[20px] font-gip" data-testid="food-price">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="p-4 rounded-[12px] border border-[#E4E4E7] bg-[#FFF] cursor-pointer" data-testid="decrease-button" onClick={() => handleDecrease(item.id)}>
                        <Minus width={16} height={16} />
                      </div>
                      <div className="text-[#09090B] text-xm font-normal leading-[16px] font-gip p-4" data-testid="food-quantity">
                        {item.quantity}
                      </div>
                      <div className="p-4 rounded-[12px] border border-[#E4E4E7] bg-[#FFF] cursor-pointer" data-testid="increase-button" onClick={() => handleIncrease(item.id)}>
                        <Plus width={16} height={16} />
                      </div>
                    </div>
                  </div>
                  <div className="h-max p-4 bg-[#F4F4F5] rounded-md cursor-pointer" data-testid="delete-button" onClick={() => handleDelete(item.id)}>
                    <Trash width={16} height={16} />
                  </div>
                </div>
              ))
            ) : (
              <p data-testid="empty-state" className="text-center text-gray-500">
                Хоосон байна.
              </p>
            )}
          </div>
          <DrawerFooter className="px-4 py-6 bg-white bg-opacity-80">
            <Button data-testid="submit-order-button" className="w-full flex h-[36px] justify-center items-center gap-[8px] self-stretch rounded-md bg-[#441500] shadow-sm" onClick={handleOrderSubmit}>
              Захиалах
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderList;
