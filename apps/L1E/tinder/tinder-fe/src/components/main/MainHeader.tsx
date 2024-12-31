import Link from 'next/link';

import { ProfileIcon } from './ProfileIcon';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Flame, MessageSquare } from 'lucide-react';

export const MainHeader = () => {
  return (
    <div className="absolute w-screen z-10 flex justify-center items-center  pt-4 bg-transparent">
      <div className="max-w-[1180px] w-screen flex justify-between">
        <img src="redlogo.png" className="w-[100px] cursor-pointer h-[24px]" alt="" />
        <div className=" flex w-[180px] justify-between items-center">
          <Link href="/libgun">
            <Flame className="w-4 text-red-500 h-4" />
          </Link>
          <Link href="/chat" className="flex text-red-500 items-center">
            <MessageSquare className="w-4 h-4" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ProfileIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
