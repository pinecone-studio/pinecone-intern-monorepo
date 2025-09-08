/* eslint max-lines: "off" */
'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogOut, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MyProfileForm } from './MyProfileForm';
import { MyImages } from './MyImages';
import clsx from 'clsx';
import { useGetMeQuery } from '@/generated';
import Loading from './Loading';
import { LogoutBtn } from './LogoutBtn';
import { useRouter } from 'next/navigation';
import { DeleteAccBtn } from './DeleteAccBtn';
import { initializeApollo } from 'utils/apollo-client';

type MenuType = 'profile' | 'images' | 'settings' | 'logout';

export const MyProfile = () => {
  const [menu, setMenu] = useState<MenuType>('profile');
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error } = useGetMeQuery();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.getMe?.images) {
      setImages(data.getMe.images);
    }
  }, [data?.getMe?.images]);
  if (loading)
    return (
      <div>
        <Loading msg="Please wait..." />
      </div>
    );

  if (error) return <div>Error loading profile. {error.message};</div>;
  const user = data?.getMe;

  return (
    <div data-testid="my-profile" className="flex flex-col w-full h-full gap-6 px-3 overflow-y-auto">
      <MyProfileHeader isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      <div className="flex flex-col items-start justify-start flex-1 w-full gap-6 px-4 pb-6 md:flex-row lg:gap-12 sm:px-6 md:px-10 md:overflow-hidden">
        <SidebarMenu menu={menu} setMenu={setMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div data-testid="menu-content" className="flex w-full h-fit">
          <MenuContent menu={menu} user={user} images={images} setImages={setImages} />
        </div>
      </div>
    </div>
  );
};

export const SidebarMenu = ({ menu, setMenu, isOpen, setIsOpen }: { menu: MenuType; setMenu: (_m: MenuType) => void; isOpen: boolean; setIsOpen: (_open: boolean) => void }) => {
  const items: { label: string; value: MenuType }[] = [
    { label: 'Profile', value: 'profile' },
    { label: 'Images', value: 'images' },
    { label: 'Settings', value: 'settings' },
  ];

  const handleSelect = (value: MenuType) => {
    setMenu(value);
    setIsOpen(false);
  };

  const router = useRouter();
  const handleLogout = async () => {
    try {
      const client = initializeApollo();

      // Clear auth token
      localStorage.removeItem('token');

      // Clear Apollo cache
      await client.clearStore();

      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
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
        <Button
          onClick={() => handleLogout()}
          className={clsx(
            'rounded-md py-2 px-4 text-sm font-sans font-medium justify-start transition-colors flex',
            menu === 'logout' ? 'bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#E11D48E5]' : 'bg-transparent hover:bg-[#F4F4F5] text-[#E11D48E5]'
          )}
        >
          Log out
          <LogOut className="ml-2" size={16} strokeWidth={2.25} />
        </Button>

        {/* <LogoutBtn /> */}
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 md:invisible ${isOpen ? 'z-50' : 'z-[-20]'}`} aria-hidden={!isOpen}>
        {/* Backdrop */}
        {isOpen && <div data-testid="drawer-backdrop" className="fixed inset-0 transition-opacity duration-300 bg-black bg-opacity-40" onClick={() => setIsOpen(false)} />}
        {/* Drawer */}
        <div
          data-testid="mobile-drawer"
          className={clsx(
            'fixed top-0 left-0 w-[50%] h-screen overflow-y-auto bg-white shadow-xl z-50 flex flex-col p-6 transform transition-transform duration-300',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold text-lg text-[#09090B]">Menu</p>
            <Button data-testid="close-mobile-drawer" aria-label="close" variant="ghost" onClick={() => setIsOpen(false)} className="p-2">
              <X size={24} />
            </Button>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
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
            {/* <div className="flex justify-center w-full"> */}
            <LogoutBtn />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export const MenuContent = ({ menu, user, images, setImages }: { menu: MenuType; user?: any; images: string[]; setImages: (_imgs: string[]) => void }) => {
  return (
    <div className="w-full">
      <div hidden={menu !== 'profile'}>
        <MyProfileForm user={user} images={images} disableUpdate={images.length === 0} />
      </div>
      <div hidden={menu !== 'images'}>
        <MyImages user={{ images }} onImagesChange={setImages} />
      </div>
      <div hidden={menu !== 'settings'}>
        <div data-testid="settings" className="flex flex-col items-start justify-start gap-4">
          Settings
          <DeleteAccBtn user={user} />
        </div>
      </div>
    </div>
  );
};

export const MyProfileHeader = ({ setIsOpen, user }: { isOpen: boolean; setIsOpen: (_open: boolean) => void; user?: any }) => {
  return (
    <div className="top-0 z-40 w-full bg-white shadow-sm">
      <div className="flex items-center justify-start h-16 gap-3 px-4 py-4 sm:px-6">
        <div className="md:hidden">
          <Button variant="ghost" data-testid="open-mobile-menu" onClick={() => setIsOpen(true)} className="p-2" aria-label="Open mobile menu">
            <Menu size={24} />
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-sans font-semibold text-[#09090B]">Hi, {user?.name || 'Name'}</p>
          <p className="text-sm font-sans font-normal text-[#71717A]">{user?.email || 'email@example.com'}</p>
        </div>
        <div className="w-10 md:hidden" />
      </div>
      <Separator />
    </div>
  );
};
