'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoDotFill } from 'react-icons/go';
import { LuSearch } from 'react-icons/lu';

export const MainNavbar = () => {
  const pathname = usePathname();
  const paths = [
    {
      name: 'Бүртгүүлэх',
      path: '/signup',
    },
    {
      name: 'Нэвтрэх',
      path: '/signin',
    },
  ];

  return (
    <div className=" py-6 px-12 flex justify-between">
      <Link href={`/`}>
        <div className="flex items-center">
          <GoDotFill className="w-8 h-8 text-[#00B7F4]" />
          <h1 className="text-white font-semibold text-2xl">TICKET BOOKING</h1>
        </div>
      </Link>

      <div className="text-white text-sm font-medium flex gap-4">
        <Link className=" text-white flex relative items-center text-sm" href={`/events`}>
          <LuSearch className="w-6 h-6" />
        </Link>
        {paths.map((path) => (
          <Link href={path.path} key={path.name}>
            <Button className={`border border-[#27272A] py-2 px-10 rounded-md hover:bg-[#00B7F4] hover:text-black  ${pathname === path.path ? 'bg-[#00B7F4]' : ''}`}>{path.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
