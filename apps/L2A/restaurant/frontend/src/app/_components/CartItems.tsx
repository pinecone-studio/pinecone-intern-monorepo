'use client';

import Image from 'next/image';
import React, { useState } from 'react';

type CartItemData = {
  image: string;
  name: string;
  price: string;
};

type CartItemProps = {
  item: CartItemData;
  onDelete?: () => void;
};

const CartItem = ({ item, onDelete }: CartItemProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center justify-between border rounded-xl shadow-sm p-4 max-w-2xl bg-white">
      <div className="flex items-center gap-4">
        <Image src="/Taco.png" alt={item.name} width={80} height={80} className="rounded-xl object-cover" />
        <div>
          <p className="text-sm text-gray-600">{item.name}</p>
          <p className="text-xl font-bold">{item.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border rounded-lg">
          –
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border rounded-lg">
          +
        </button>
      </div>
      <button onClick={onDelete} className="ml-4 text-red-500 text-xl">
        🗑️
      </button>
    </div>
  );
};

export default CartItem;
