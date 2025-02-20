'use client';

import Image from 'next/image';
import React from 'react';
import NavButton from './NavButton';
import { useRouter } from 'next/navigation';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const AdminHeader: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove auth token
    router.push('/admin/login'); // Redirect to login page
  };

  return (
    <div className="w-[100vw] flex justify-center border-b border-b-[#E4E4E7]">
      <div className="flex flex-col px-6 pt-4 gap-3">
        <div className="flex w-[70vw] px-2 justify-between items-center">
          <Image src="/Logo.png" alt="logo" width={32} height={32} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image data-testid="userr" src="/user.jpeg" alt="user" width={32} height={32} className="rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <Button className="w-full" onClick={handleLogout}>
                Гарах
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
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
