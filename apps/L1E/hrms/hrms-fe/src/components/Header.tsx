'use client';

import React, { useState, useEffect } from 'react';
import { IoSunnyOutline } from 'react-icons/io5';
import { IoMdMoon } from 'react-icons/io';
import { MyRequest } from './MyRequest';
import RequestForm from './RequestForm';
import { LeaveCalendar } from './LeaveCalendar';
import { PendingRequest } from './PendingRequest';
import { Leave } from './Leave';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EmployeeList } from './EmployeeList';

type ComponentName = 'MyRequest' | 'RequestForm' | 'LeaveCalendar' | 'PendingRequest' | 'EmployeeList' | 'Leave';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState<ComponentName | null>();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setActiveComponent('MyRequest');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
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

  const handleComponentChange = (componentName: ComponentName) => {
    setActiveComponent(componentName);
  };
  const componentMap: Record<ComponentName, JSX.Element> = {
    MyRequest: <MyRequest />,
    RequestForm: <RequestForm />,
    LeaveCalendar: <LeaveCalendar handlechange={handleComponentChange} />,
    PendingRequest: <PendingRequest />,
    EmployeeList: <EmployeeList />,
    Leave: <Leave />,
  };

  const clickButton = (componentName: ComponentName) => {
    return activeComponent === componentName ? 'border-b-2 border-black pb-[11px]' : 'border-b-0';
  };
  console.log(activeComponent);

  return (
    <div>
      <div className="w-full flex justify-between h-[120px] pl-[50px] pr-[50px] pt-[20px]  border-b-[1px]">
        <div>
          <img src="Logo.png" alt="Logo" />
          <div className="flex gap-[20px] pt-[30px]">
            {/* user */}
            <button data-testid="MyRequest-btn" onClick={() => handleComponentChange('MyRequest')} className={`${clickButton('MyRequest')}`}>
              My requests
            </button>
            <button data-testid="RequestForm-btn" onClick={() => handleComponentChange('RequestForm')} className={` ${clickButton('RequestForm')}`}>
              Request Form
            </button>
            <button data-testid="LeaveCalendar-btn" onClick={() => handleComponentChange('LeaveCalendar')} className={` ${clickButton('LeaveCalendar')}`}>
              Leave Calendar
            </button>
            {/* chuluu batlah hun */}
            <button data-testid="PendingRequest-btn" onClick={() => handleComponentChange('PendingRequest')} className={` ${clickButton('PendingRequest')}`}>
              Pending Requests
            </button>
            <button data-testid="EmployeeList-btn" onClick={() => handleComponentChange('EmployeeList')} className={` ${clickButton('EmployeeList')}`}>
              Employee List
            </button>
            <button data-testid="Leave-btn" onClick={() => handleComponentChange('Leave')} className={` ${clickButton('Leave')}`}>
              Leave Requests
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

      <div className="w-full h-max absolute pt-10 bg-neutral-100">
        <div>{componentMap[activeComponent ?? 'RequestForm']}</div>
      </div>
    </div>
  );
};
