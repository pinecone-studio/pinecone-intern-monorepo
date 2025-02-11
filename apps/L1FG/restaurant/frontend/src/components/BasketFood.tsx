'use client';

import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Order {
  items: { quantity: number }[];
}

const BasketFood = () => {
  const [order, setOrder] = useState<Order>({ items: [] });
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const orderString = localStorage.getItem('order');
    const orderData: Order = orderString ? JSON.parse(orderString) : { items: [] };
    setOrder(orderData);
  }, []);

  useEffect(() => {
    const totalQuantity = order.items.reduce((acc, item) => acc + item.quantity, 0);
    setQuantity(totalQuantity);
  }, [order]);

  return (
    <div className="bg-white text-black px-3 py-2 relative">
      {quantity > 0 && <p className="absolute left-6 top-0 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">{quantity}</p>}
      <ShoppingCart width={16} />
    </div>
  );
};

export default BasketFood;
