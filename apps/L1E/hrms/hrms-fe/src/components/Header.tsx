'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@/provider/UserProvider';
import { Button } from '@/components/ui/button';

type ComponentName = 'my-requests' | 'request-form' | 'leave-calendar' | 'pending-requests' | 'employee-list';

export const Header = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentName | null>(null);

  const { user } = useUser();

  const router = useRouter();

  const handleComponentChange = (componentName: ComponentName) => {
    setActiveComponent(componentName);
    router.push(`/${componentName}`);
  };
  const clickButton = (componentName: ComponentName) => {
    return activeComponent === componentName ? 'border-b-2 border-black pb-[11px]' : 'border-b-0';
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const path = pathname.slice(1, pathname.length) as ComponentName;

    setActiveComponent(path);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <div className="w-full flex justify-between h-[120px] pl-[50px] pr-[50px] pt-[20px]  border-b-[1px]">
        <div>
          <Image src="/Logo.png" alt="Logo" width={32} height={28} />
          <div className="flex gap-[20px] pt-[30px]">
            {/* user */}
            {user?.adminStatus && (
              <button data-testid="employee-list-btn" onClick={() => handleComponentChange('employee-list')} className={`${clickButton('employee-list')}`}>
                Employee list
              </button>
            )}
            <button
              data-testid="MyRequest-btn"
              onClick={() => handleComponentChange('my-requests')}
              className={`${clickButton('my-requests')} ${!activeComponent && 'border-b-2 border-black pb-[11px]'}`}
            >
              My requests
            </button>
            <button data-testid="RequestForm-btn" onClick={() => handleComponentChange('request-form')} className={` ${clickButton('request-form')}`}>
              Request Form
            </button>
            <button data-testid="LeaveCalendar-btn" onClick={() => handleComponentChange('leave-calendar')} className={` ${clickButton('leave-calendar')}`}>
              Leave Calendar
            </button>
            {/* chuluu batlah hun */}
            {user?.employeeStatus == 'Lead' && (
              <button data-testid="PendingRequest-btn" onClick={() => handleComponentChange('pending-requests')} className={` ${clickButton('pending-requests')}`}>
                Pending Requests
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start">
          <Button data-testid="logout-button" variant="outline" onClick={handleLogout} className="inline-flex items-center space-x-2">
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

          <Avatar className="ml-[10px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
