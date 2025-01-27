'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useMakeOrderMutation } from '@/generated';

interface FoodItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  categoryId: string;
  quantity: number;
}

const PreSuccessPageComp = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [tableId, setTableId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering state
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Enable router after the component mounts on the client side
  }, []);

  // Get the items and tableId from localStorage
  useEffect(() => {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      setItems(parsedOrder.items);
      setTableId(String(parsedOrder.tableId));
    }
  }, []);

  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const [makeOrder] = useMakeOrderMutation();

  const handleOrderSubmit = async () => {
    // Prepare the order data with correct structure
    const orderInput = {
      tableId: Number(tableId), // Use the tableId from localStorage and convert to number
      items: items.map((item) => ({
        name: item.name, // Ensure correct mapping
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      // Call the mutation
      await makeOrder({
        variables: { input: orderInput },
      });

      router.push('/payment-successful'); // Use client-side router navigation
    } catch (err) {
      console.error('Error making order:', err);
    }
  };

  if (!isClient) {
    return null; // Avoid rendering before client-side mounting
  }

  // Conditionally render the total price section if there are items in the order
  if (items.length === 0) {
    return (
      <div className="pt-[150px] px-8 bg-[#F7F7F8] w-full h-[100vh] flex flex-col items-center gap-10">
        <div className="text-[#441500] font-semibold w-[70%] text-center text-xl font-gip leading-8" data-testid="empty-order-message">
          Таны захиалга хоосон байна.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full bg-[#F7F7F8] flex justify-end p-4" data-testid="close-button-container">
        <X
          width={16}
          height={16}
          className="cursor-pointer"
          onClick={() => router.back()} // Navigate back on click
          data-testid="close-button"
        />
      </div>
      <div className="pt-[150px] px-8 bg-[#F7F7F8] w-full h-[100vh] flex flex-col items-center gap-10" data-testid="payment-methods">
        <div className="text-[#441500] font-semibold w-[70%] text-center text-xl font-gip leading-8" data-testid="payment-method-title">
          Төлбөрийн хэрэгслээ сонгоно уу
        </div>
        <div className="flex gap-3" data-testid="payment-options">
          <div onClick={handleOrderSubmit} className="w-[100px] h-[100px] bg-white rounded-[8px] shadow-sm flex flex-col justify-center items-center gap-1 cursor-pointer" data-testid="qpay-button">
            <Image src="/qpayimg.png" alt="qpayimage" width={40} height={40} data-testid="qpay-image" />
            <div className="text-[#09090B] text-center font-gip text-[14px] font-medium leading-[20px]" data-testid="qpay-label">
              Qpay
            </div>
          </div>
          <div className="w-[100px] h-[100px] bg-white rounded-[8px] shadow-sm flex flex-col justify-center items-center gap-1" data-testid="wallet-button">
            <Image src="/Logo.png" alt="wallet-image" width={40} height={40} data-testid="wallet-image" />
            <div className="text-[#09090B] text-center font-gip text-[14px] font-medium leading-[20px]" data-testid="wallet-label">
              Хэтэвч
            </div>
          </div>
        </div>

        {/* Conditionally render the total price section if the order has items */}
        <div data-testid="total-price-section">
          <div className="flex w-[326px] py-2 justify-between items-center border-b border-[#E4E4E7]" data-testid="total-price-label">
            <div className="text-[#8B8E95] font-gip text-[12px] font-medium leading-[16px]">Захиалгын нийт дүн:</div>
            <div className="text-[#09090B] text-right font-gip text-[16px] font-normal leading-[28px]" data-testid="total-price-value">
              {totalPrice.toLocaleString('en-US')}₮
            </div>
          </div>
          <div className="flex w-[326px] py-2 justify-between items-center" data-testid="payable-amount-label">
            <div className="text-[#8B8E95] font-gip text-[12px] font-medium leading-[16px]">Төлөх дүн:</div>
            <div className="text-[#09090B] text-right font-gip text-[16px] font-semibold leading-[28px]" data-testid="payable-amount-value">
              {totalPrice.toLocaleString('en-US')}₮
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSuccessPageComp;
