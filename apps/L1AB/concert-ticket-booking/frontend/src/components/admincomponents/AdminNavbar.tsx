/* eslint-disable complexity */
'use client';
import Link from 'next/link';
import { GoDotFill } from 'react-icons/go';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoIosLogOut } from 'react-icons/io';
import { useAuth } from '../providers';
export const AdminNavbar = () => {
  const currentPath = usePathname();
  const { signout } = useAuth();

  return (
    <div className="py-4 px-6 h-fit flex flex-col gap-3 bg-white border-b">
      <div className="flex items-center justify-between">
        <div className="flex">
          <GoDotFill className="w-8 h-8 text-[#00B7F4]" />
          <h1 className="text-black font-semibold text-2xl">TICKET BOOKING</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-8 h-8 relative">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <IoIosLogOut onClick={signout} className="w-8 h-8 cursor-pointer text-black" />
        </div>
      </div>
      <div className="flex">
        <Link href={`/admin`}>
          <div data-testid="/admin" className={`py-2 px-4 text-[14px] font-medium text-black cursor-pointer ${currentPath === '/admin' ? 'border-b-black border-b-2' : ''}`}>
            Тасалбар
          </div>
        </Link>

        <Link href={`/admin/bookings`}>
          <div data-testid="/admin/bookings" className={`py-2 px-4 text-[14px] font-medium text-black cursor-pointer ${currentPath === '/admin/bookings' ? 'border-b-black border-b-2' : ''}`}>
            Захиалгууд
          </div>
        </Link>
        <Link href={`/admin/cancel`}>
          <div
            data-testid="/admin/cancel"
            data-cy="Cancel"
            className={`py-2 px-4 text-[14px] font-medium text-black cursor-pointer ${currentPath === '/admin/cancel' ? 'border-b-black border-b-2' : ''}`}
          >
            Цуцлах хүсэлт
          </div>
        </Link>

        <Link href={`/admin/artist`}>
          <div
            data-testid="/admin/artist"
            data-cy="Artist"
            className={`py-2 px-4 text-[14px] font-medium text-black cursor-pointer ${currentPath === '/admin/artist' ? 'border-b-black border-b-2' : ''}`}
          >
            Артист
          </div>
        </Link>
        <Link href={`/admin/demo`}>
          <div data-testid="/admin/demo" data-cy="demo" className={`py-2 px-4 text-[14px] font-medium text-black cursor-pointer ${currentPath === '/admin/demo' ? 'border-b-black border-b-2' : ''}`}>
            Demo
          </div>
        </Link>
      </div>
    </div>
  );
};
