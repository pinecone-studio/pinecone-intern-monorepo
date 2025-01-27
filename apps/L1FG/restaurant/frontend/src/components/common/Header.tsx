import React from 'react';
import { AlignJustify, Bell, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex justify-between border-b bg-white border-[#ECEDF0] px-4 py-3">
      <Image className="h-8" height={32} width={32} src="/Logo.png" alt="" />
      <div className="flex gap-3 items-center">
        <ShoppingCart data-testid="shopping-cart-icon" width={16} />
        <Bell data-testid="bell-icon" width={16} />
        <AlignJustify data-testid="align-justify-icon" width={16} />
      </div>
    </div>
  );
};

export default Header;
