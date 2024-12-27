'use client';

import { Button } from '@/components/ui/button';
import { Container } from './assets';
import { useAuth } from '../providers/Auth.Provider';
import Link from 'next/link';
import { IoIosLogOut } from 'react-icons/io';

export const Header = () => {
  const { user, signout } = useAuth();

  return (
    <Container backgroundColor="bg-white">
      <div className="flex justify-between items-center h-16">
        <Link href="/">
          {' '}
          <div className="flex flex-row gap-1 items-center">
            <div className="w-[20px] h-[20px] rounded-full bg-blue-600"></div>
            <h1 className="text-lg">Pedia</h1>
          </div>{' '}
        </Link>
        <div className="flex gap-4 items-center">
          <Button variant="ghost">My Booking</Button>
          <Link href="/profile">
            <Button variant="ghost">{user?.email}</Button>
          </Link>
          <IoIosLogOut onClick={signout} className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </Container>
  );
};
