'use client';

import { useAuth } from '@/components/providers';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const NavigationWhiteDown = () => {
  const { signout } = useAuth();
  const [isUser, setIsUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('user')!;
    setIsUser(token);
  }, []);
  const jsonObject = isUser ? JSON.parse(isUser) : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-cy="menutrigger" className="flex items-center rounded-[6px] justify-between text-sm font-normal border border-none py-2 px-4">
        <p className="font-normal font-Inter text-sm text-[#09090B]">{jsonObject?.email}</p>
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
