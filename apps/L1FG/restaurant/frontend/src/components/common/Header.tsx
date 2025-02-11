import React from 'react';
import Image from 'next/image';
import { Sidemenu } from '../sidemenu/Sidemenu';
import NotificationSection from '../NotificationSection';
import Link from 'next/link';
import BasketFood from '../BasketFood';

const Header = () => {
  return (
    <div className="flex justify-between border-b bg-white border-[#ECEDF0] px-4 py-3 container fixed z-20">
      <Link href={'/'}>
        <Image className="h-8" height={32} width={32} src="/Logo.png" alt="" />
      </Link>
      <div className="flex items-center">
        <BasketFood />
        <NotificationSection />
        <Sidemenu />
      </div>
    </div>
  );
};

export default Header;
