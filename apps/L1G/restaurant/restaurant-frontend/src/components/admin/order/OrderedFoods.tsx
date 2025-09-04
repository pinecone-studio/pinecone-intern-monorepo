import React from 'react';

export const OrderedFoods = ({ src, foodName, price, quantity }: { src: string; foodName: string; price: string; quantity: number }) => {
  return (
    <div className="space-y-2 py-2">
      <div className="flex items-center gap-2">
        <img src={src} alt="food" className="w-14 h-14 rounded-md object-cover" />
        <div className="flex-1">
          <p className="font-light">{foodName}</p>
          <p className="font-bold text-sm text-[#09090B]">{price}</p>
          <p className="text-sm  text-[#09090B]">{quantity}ш</p>
        </div>
      </div>
    </div>
  );
};
