'use client';
import { useState } from 'react';
import { InstaSVG } from '../../svg/InstaSvg';
import { useRouter } from 'next/navigation';
import { InstagramSvg } from '../../svg/InstagramSvg';
import { SearchSheet } from '@/components/search/SearchSheet';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bookmark, CircleAlert, ImageDown, Menu, Settings, Sun } from 'lucide-react';
import { SidebarContent } from './SidebarContent';
import { NotificationSheet } from '@/components/notifications/NotificationSheet';

export const MenuButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const toggleNotifications = () => {
    setIsOpen((prev) => !prev);
    setSearchOpen(false);
  };
  const openSearchSheet = () => {
    setIsOpen(false);
    setSearchOpen((prev) => !prev);
  };
  const closeSheets = () => {
    setIsOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      <div
        data-testid="menu-button-open-sheet"
        className={`${isOpen || searchOpen ? 'w-[80px] px-2' : 'w-[300px] p-4'} fixed z-50 h-full flex flex-col border-r bg-white transform transition-[width,padding] duration-500 `}
      >
        <div data-testid="click-push-home" onClick={() => router.push('/')} className="mb-12 pt-[25px] px-[12px]">
          {isOpen || searchOpen ? (
            <div className={`h-10 w-10 hover:border hover:bg-accent hover:rounded-sm mt-4 pl-2 pt-2`}>
              <InstagramSvg />
            </div>
          ) : (
            <InstaSVG />
          )}
        </div>
        <SidebarContent isOpen={isOpen} searchOpen={searchOpen} openSearchSheet={openSearchSheet} toggleNotifications={toggleNotifications} closeSheets={closeSheets} />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              <div className="flex gap-3 items-center">
                <div>
                  <Menu />
                </div>
                <p>More</p>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[266px] h-[410px] rounded-2xl border-none drop-shadow-lg p-0">
            <div className="flex flex-col text-sm ">
              <div className="px-4 py-2">
                <Button variant="outline" className="h-[50px] w-full justify-start items-center flex gap-2">
                  <Settings /> <p>Settings</p>
                </Button>

                <Button variant="outline" className="h-[50px] w-full justify-start items-center flex gap-2">
                  <ImageDown /> <p>Your activity</p>
                </Button>

                <Button variant="outline" className="h-[50px] w-full justify-start items-center flex gap-2">
                  <Bookmark /> <p>Saved</p>
                </Button>

                <Button variant="outline" className="h-[50px] w-full justify-start items-center flex gap-2">
                  <Sun /> <p>Switch appearance</p>
                </Button>
                <Button variant="outline" className="h-[50px] w-full justify-start items-center flex gap-2">
                  <CircleAlert /> <p>Report a problem</p>
                </Button>
              </div>
              <div className="w-full bg-stone-100 h-[6px]"></div>
              <div className="px-4 py-2 flex flex-col gap-2">
                <Button variant="outline" className=" h-[50px] w-full justify-start items-center flex">
                  Switch accounts
                </Button>
                <div className="border-b border-stone-100"></div>
                <Button variant="outline" className=" h-[50px] w-full justify-start items-center flex  ">
                  Log out
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <NotificationSheet isOpen={isOpen} setIsOpen={setIsOpen} />
      <SearchSheet searchOpen={searchOpen} setSearchOpen={setSearchOpen} data-testid="search-sheet" />
    </>
  );
};
