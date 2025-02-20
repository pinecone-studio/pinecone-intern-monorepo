'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sidemenu } from '../sidemenu/Sidemenu';
import NotificationSection from '../NotificationSection';
import Link from 'next/link';
import BasketFood from '../BasketFood';
import { useCart } from '../providers';

const Header = () => {
  const { orders } = useCart();
  const [orderLength, setOrderLength] = useState<number>(0);

  const totalQuantity = orders.reduce((total, order) => total + order.quantity, 0);

  useEffect(() => {
    setOrderLength(totalQuantity);
  }, [totalQuantity]);

  return (
    <div className="flex justify-between border-b bg-white border-[#ECEDF0] px-4 py-3 container fixed z-20">
      <Link href={'/order/1'}>
        <Image className="h-8" height={32} width={32} src="/Logo.png" alt="" />
      </Link>
      <div className="flex items-center">
        <BasketFood orderLength={orderLength} />
        <NotificationSection />
        <Sidemenu data-testid="sidemenu" />
      </div>
    </div>
  );
};

export default Header;
