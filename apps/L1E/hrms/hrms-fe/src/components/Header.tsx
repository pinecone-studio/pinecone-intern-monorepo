'use client';

import React, { useState, useEffect } from 'react';
import { IoSunnyOutline } from 'react-icons/io5';
import { IoMdMoon } from 'react-icons/io';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type ComponentName = 'my-requests' | 'request-form' | 'leave-calendar' | 'pending-requests' | 'employee-list';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState<ComponentName | null>(null);
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

    const savedTheme = localStorage.getItem('theme');
    {
      savedTheme && setIsDarkMode(savedTheme === 'dark');
    }
    setActiveComponent(path);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return !prev;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div>
      <div className="w-full flex justify-between h-[120px] pl-[50px] pr-[50px] pt-[20px]  border-b-[1px]">
        <div>
          <Image src="/Logo.png" alt="Logo" width={32} height={28} />
          <div className="flex gap-[20px] pt-[30px]">
            {/* user */}
            <button data-testid="employee-list-btn" onClick={() => handleComponentChange('employee-list')} className={`${clickButton('employee-list')}`}>
              Employee list
            </button>
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
            <button data-testid="PendingRequest-btn" onClick={() => handleComponentChange('pending-requests')} className={` ${clickButton('pending-requests')}`}>
              Pending Requests
            </button>
          </div>
        </div>

        <div className="flex">
          <div>
            <label className="swap swap-rotate">
              <input data-testid="input" type="checkbox" checked={isDarkMode} onChange={toggleTheme} className="theme-controller absolute opacity-0 w-0 h-0" />
              <IoSunnyOutline data-testid="IoSunnyOutline" className={`h-[40px] w-[40px] border-slate-400 border-[1px] rounded-3xl p-[10px] fill-current ${isDarkMode ? 'hidden' : 'block'}`} />
              <IoMdMoon data-testid="IoMdMoon" className={`h-[40px] w-[40px] border-slate-400 border-[1px] rounded-3xl p-[10px] fill-current ${isDarkMode ? 'block' : 'hidden'}`} />
            </label>
          </div>
          <div>
            <Avatar className="ml-[10px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};
// aaa
