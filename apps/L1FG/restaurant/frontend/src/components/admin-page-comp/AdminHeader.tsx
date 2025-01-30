'use client';

import Image from 'next/image';
import React from 'react';
import NavButton from './NavButton';

const AdminHeader: React.FC = () => {
  return (
    <div className="w-[100vw] flex justify-center border-b border-b-[#E4E4E7]">
      <div className="flex flex-col px-6 pt-4 gap-3">
        <div className="flex w-[1600px] px-2 justify-between items-center">
          <Image src="/Logo.png" alt="logo" width={32} height={32} />
          <Image src="/user.jpeg" alt="user" width={32} height={32} className="rounded-full" />
        </div>
        <div className="flex">
          <NavButton href="/admin/dashboard">Захиалга</NavButton>
          <NavButton href="/admin/dashboard/menu">Цэс</NavButton>
          <NavButton href="/admin/dashboard/foods">Хоол</NavButton>
          <NavButton href="/admin/dashboard/tables">Ширээ</NavButton>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
