'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@/provider/UserProvider';
import { Button } from '@/components/ui/button';
import { LogoutModal } from './LogoutModal';
import { cn } from '../../../../../../libs/shadcn/src/lib/utils';

const navBars = [
  {
    pageName: 'My requests',
    path: '/my-requests',
  },
  {
    pageName: 'Request Form',
    path: '/request-form',
  },
  {
    pageName: 'Leave Calendar',
    path: '/leave-calendar',
  },
];

export const Header = () => {
  const [isOpen, setIsopen] = useState(false);
  const pathname = usePathname();

  const { user } = useUser();

  const router = useRouter();

  const handleComponentChange = (componentName: string) => {
    router.push(`${componentName}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsopen(false);
    router.push('/login');
  };

  const onClose = () => {
    setIsopen(false);
  };

  return (
    <div>
      <div className="w-full absolute top-0 bg-white flex justify-between h-[120px] pl-[50px] pr-[50px] pt-[20px]   border-b-[1px]">
        <div>
          <Image src="/Logo.png" alt="Logo" width={32} height={28} />
          <div className="flex gap-[20px] pt-[30px]">
            {/* user */}
            {user?.adminStatus && (
              <button
                data-testid="employee-list-btn"
                onClick={() => handleComponentChange('employee-list')}
                className={cn('border-b-2 border-transparent', '/employee-list' === pathname && `border-black`)}
              >
                Employee list
              </button>
            )}

            {navBars.map(({ pageName, path }, index) => (
              <button key={index} data-testid={`${path}`} onClick={() => handleComponentChange(path)} className={cn('border-b-2 border-transparent', path === pathname && `border-black`)}>
                {pageName}
              </button>
            ))}

            {/* chuluu batlah hun */}
            {user?.employeeStatus == 'Lead' && (
              <button
                data-testid="PendingRequest-btn"
                onClick={() => handleComponentChange('pending-requests')}
                className={cn('border-b-2 border-transparent', '/pending-requests' === pathname && `border-black`)}
              >
                Pending Requests
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start">
          <Button
            data-testid="logout-button"
            variant="outline"
            onClick={() => {
              setIsopen(true);
            }}
            className="inline-flex items-center space-x-2"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span>Logout</span>
          </Button>
          <LogoutModal isOpen={isOpen} onClose={onClose} onSubmit={handleLogout} />
          <Avatar className="ml-[10px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
