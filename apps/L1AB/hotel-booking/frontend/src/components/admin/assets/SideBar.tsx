'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevIcon, LightningIcon, PediaIcon40 } from '@/components/icon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <div data-testid="sidebar" className="min-w-[240px] h-full border flex flex-col justify-between bg-white">
      <div>
        <div className="flex m-2 px-2 py-[10px] gap-2">
          <PediaIcon40 />
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-[#334155] font-semibold">Pedia</h1>
            <p className="text-[#334155] text-xs">Admin</p>
          </div>
        </div>
        <div className="m-2">
          <Link href="/admin">
            <div className={`w-full flex items-center p-2 gap-2 rounded-sm ${pathname === '/admin' ? 'text-black bg-gray-100' : ''} hover:text-[#334155]`}>
              <LightningIcon />
              <p>Hotels</p>
            </div>
          </Link>
          <Link href="/admin/guests">
            <div className={`w-full flex items-center p-2 gap-2 rounded-sm ${pathname === '/admin/guests' ? 'text-black bg-gray-100' : ''} hover:text-[#334155]`}>
              <LightningIcon />
              <p>Guests</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="p-2 m-2">
        <div className="flex gap-2 justify-evenly items-center">
          <Avatar className="rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-start w-[144px]">
            <p className="text-[#334155] text-sm font-semibold">admin</p>
            <p className="text-[#334155] text-xs">admin@pedia.com</p>
          </div>
          <ChevIcon />
        </div>
      </div>
    </div>
  );
};
