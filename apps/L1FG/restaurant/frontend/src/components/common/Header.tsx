import React from 'react';
import { AlignJustify, Bell, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
const Header = () => {
  return (
    <div className="flex justify-between border-b border-[#ECEDF0] px-4 py-3">
      <Image className="h-8" src="/Logo.png" alt="" />
      <div className="flex gap-3 items-center">
        <ShoppingCart width={16} />
        <Bell width={16} />
        <AlignJustify width={16} />
      </div>
    </div>
  );
};

export default Header;
