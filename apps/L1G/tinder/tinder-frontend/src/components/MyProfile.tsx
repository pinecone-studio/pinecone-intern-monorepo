'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { MyProfileForm } from './MyProfileForm';
import { MyImages } from './MyImages';

type MenuType = 'profile' | 'images' | 'appearance' | 'notifications' | 'display';

export const MyProfile = () => {
  const [menu, setMenu] = useState<MenuType>('profile');

  return (
    <div className="w-full h-fit flex flex-col gap-6 py-10 px-6">
      <MyProfileHeader />

      <div className="flex justify-start items-start gap-12">
        <SidebarMenu menu={menu} setMenu={setMenu} />
        <MenuContent menu={menu} />
      </div>
    </div>
  );
};

const SidebarMenu = ({ menu, setMenu }: { menu: MenuType; setMenu: (_m: MenuType) => void }) => {
  const items: { label: string; value: MenuType }[] = [
    { label: 'Profile', value: 'profile' },
    { label: 'Images', value: 'images' },
    { label: 'Appearance', value: 'appearance' },
    { label: 'Notifications', value: 'notifications' },
    { label: 'Display', value: 'display' },
  ];

  return (
    <div className="flex flex-col gap-1">
      {items.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => setMenu(value)}
          className={`w-[250px] rounded-md py-2 px-4 text-[#09090B] text-[14px] font-sans font-[400] flex justify-start items-center ${
            menu === value ? 'bg-[#F4F4F5] hover:bg-[#F4F4F5]' : 'bg-transparent hover:bg-[#F4F4F5]'
          }`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

const MenuContent = ({ menu }: { menu: MenuType }) => {
  switch (menu) {
    case 'profile':
      return <MyProfileForm />;
    case 'images':
      return <MyImages />;
    case 'appearance':
      return <div>Appearance Settings</div>;
    case 'notifications':
      return <div>Notification Settings</div>;
    default:
      return null;
  }
};

export const MyProfileHeader = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-6 px-6">
      <div className="flex flex-col gap-[2px] justify-start items-start">
        <p className="text-[24px] font-sans font-[600] text-[#09090B]">Hi, user</p>
        <p className="text-[14px] font-sans font-[400] text-[#71717A]">n.shagai@pinecone.mn</p>
      </div>
      <Separator />
    </div>
  );
};
