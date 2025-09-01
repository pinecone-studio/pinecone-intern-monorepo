'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { MyProfileForm } from './MyProfileForm';
import { MyImages } from './MyImages';
import clsx from 'clsx';

type MenuType = 'profile' | 'images' | 'appearance' | 'notifications';

export const MyProfile = () => {
  const [menu, setMenu] = useState<MenuType>('profile');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-testid="my-profile" className="w-full h-screen px-3 flex flex-col gap-6">
      <MyProfileHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex w-full flex-1 flex-col md:flex-row justify-start items-start gap-6 lg:gap-12 px-4 sm:px-6 md:px-10 pb-6 md:overflow-hidden">
        <SidebarMenu menu={menu} setMenu={setMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div data-testid="menu-content" className="w-full flex-1" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          <MenuContent menu={menu} />
        </div>
      </div>
    </div>
  );
};

export const SidebarMenu = ({ menu, setMenu, isOpen, setIsOpen }: { menu: MenuType; setMenu: (_m: MenuType) => void; isOpen: boolean; setIsOpen: (_open: boolean) => void }) => {
  const items: { label: string; value: MenuType }[] = [
    { label: 'Profile', value: 'profile' },
    { label: 'Images', value: 'images' },
    { label: 'Appearance', value: 'appearance' },
    { label: 'Notifications', value: 'notifications' },
  ];

  const handleSelect = (value: MenuType) => {
    setMenu(value);
    setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar for desktop */}
      <div data-testid="sidebar-menu-desktop" className="hidden md:flex flex-col gap-2 min-w-[250px]">
        {items.map(({ label, value }) => (
          <Button
            key={value}
            data-testid={`menu-button-${value}`}
            onClick={() => setMenu(value)}
            className={clsx(
              'rounded-md py-2 px-4 text-sm font-sans font-medium text-[#09090B] justify-start transition-colors',
              menu === value ? 'bg-[#F4F4F5] hover:bg-[#E4E4E7]' : 'bg-transparent hover:bg-[#F4F4F5]'
            )}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 md:invisible ${isOpen ? 'z-50' : 'z-[-20]'}`} aria-hidden={!isOpen}>
        {/* Backdrop */}
        {isOpen && <div data-testid="drawer-backdrop" className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300" onClick={() => setIsOpen(false)} />}
        {/* Drawer */}
        <div
          data-testid="mobile-drawer"
          className={clsx(
            'fixed top-0 left-0 w-[50%] h-screen overflow-y-auto bg-white shadow-xl z-50 flex flex-col p-6 transform transition-transform duration-300',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex justify-between items-center mb-6">
            <p className="font-semibold text-lg text-[#09090B]">Menu</p>
            <Button data-testid="close-mobile-drawer" aria-label="close" variant="ghost" onClick={() => setIsOpen(false)} className="p-2">
              <X size={24} />
            </Button>
          </div>
          <div className="flex flex-col gap-3" data-testid="mobile-menu-items">
            {items.map(({ label, value }) => (
              <Button
                key={value}
                data-testid={`mobile-menu-button-${value}`}
                onClick={() => handleSelect(value)}
                className={clsx(
                  'rounded-lg py-3 px-4 text-base font-sans font-medium text-[#09090B] justify-start transition-colors',
                  menu === value ? 'bg-[#F4F4F5] hover:bg-[#E4E4E7]' : 'bg-transparent hover:bg-[#F4F4F5]'
                )}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const MenuContent = ({ menu }: { menu: MenuType }) => {
  switch (menu) {
    case 'profile':
      return <MyProfileForm />;
    case 'images':
      return <MyImages />;
    case 'appearance':
      return <div data-testid="appearance-settings">Appearance Settings</div>;
    case 'notifications':
      return <div data-testid="notification-settings">Notification Settings</div>;
    default:
      return null;
  }
};

export const MyProfileHeader = ({ setIsOpen }: { isOpen: boolean; setIsOpen: (_open: boolean) => void }) => {
  return (
    <div className="w-full sticky top-0 z-40 bg-white shadow-sm">
      <div className="flex items-center justify-start gap-3 px-4 sm:px-6 py-4 h-16">
        <div className="md:hidden">
          <Button variant="ghost" data-testid="open-mobile-menu" onClick={() => setIsOpen(true)} className="p-2" aria-label="Open mobile menu">
            <Menu size={24} />
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-sans font-semibold text-[#09090B]">Hi, user</p>
          <p className="text-sm font-sans font-normal text-[#71717A]">n.shagai@pinecone.mn</p>
        </div>
        <div className="md:hidden w-10" />
      </div>
      <Separator />
    </div>
  );
};
