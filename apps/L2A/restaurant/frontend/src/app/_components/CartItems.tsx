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
    <div className="flex items-center justify-between border rounded-xl shadow-sm p-4 bg-white xs:w-[350px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px]" data-testid="cart-item">
      <div className="flex items-center gap-4">
        <Image src="/Taco.png" alt={item.name} width={80} height={80} className="rounded-xl object-cover" data-testid="zurag" />
        <div>
          <p className="text-sm text-gray-600" data-testid="ner">{item.name}</p>
          <p className="text-xl font-bold" data-testid="une">{item.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border rounded-lg" data-testid="minus-button">
          –
        </button>
        <span className="w-6 text-center" data-testid="amount">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border rounded-lg" data-testid="plus-button">
          +
        </button>
      </div>
      <button data-cyid="delete-button" onClick={onDelete} className="ml-4 text-red-500 text-xl">
        🗑️
      </button>
    </div>
  );
};

export default CartItem;
