'use client';

import { useAuth } from '@/components/providers';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export const NavigationWhiteDown = () => {
  const { user, signout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-cy="menutrigger" className="flex items-center rounded-[6px] justify-between text-sm font-normal border border-none py-2 px-4">
        <p className="font-normal font-Inter text-sm text-[#09090B]">{user?.email}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 rounded-md">
        <Link href={'/profile'}>
          <div className="py-[6px] px-2">
            <p className="font-Inter font-normal not-italic text-sm">Profile</p>
          </div>
        </Link>
        <button data-cy="Log-Out-Button" onClick={() => signout()} className="py-[6px] px-2">
          <p className="font-Inter font-normal not-italic text-sm">Log out</p>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
