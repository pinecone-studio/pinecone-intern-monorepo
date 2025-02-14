'use client';

import { ShoppingCart } from 'lucide-react';

const BasketFood = ({ orderLength }: { orderLength: number }) => {
  return (
    <div className="bg-white text-black px-3 py-2 relative">
      <p className={`absolute left-6 top-0 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${Number(orderLength) > 0 ? 'flex' : 'hidden'}`}>
        {Number(orderLength)}
      </p>
      <ShoppingCart width={16} />
    </div>
  );
};

export default BasketFood;
