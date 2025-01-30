/*eslint-disable */
'use client';
import { useState } from 'react';
import { InstaSVG } from './Svg/InstaSvg';
import { HomeSVG } from './Svg/HomeSvg';
import { SearchSVG } from './Svg/SearchSvg';
import { NotificationSheet } from '@/components/notifications/NotificationSheet';
import { useRouter } from 'next/navigation';
import { TextSideBar } from '@/components/notifications/TextSideBar';
import { InstagramSvg } from './Svg/InstagramSvg';
import { Create } from './Greate';

import { SearchSheet } from '@/components/search/SearchSheet';
import { HeartSVG } from './Svg/HeartSvg';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bookmark, CircleAlert, ImageDown, Menu, Settings, Sun, User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';

export const MenuButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    setSearchOpen(false);
  };
  const openSearchSheet = () => {
    setIsOpen(false);
    setSearchOpen(!searchOpen);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-2 mb-auto ">
      <button
        onClick={() => router.push('./')}
        className={`flex items-center gap-6 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px] w-full`}
        data-testid="sidebar-home"
      >
        <HomeSVG />
        {!isOpen && !searchOpen && <p className="">Home</p>}
      </button>

      <button
        data-testid="search-button"
        onClick={openSearchSheet}

        className={`${
          searchOpen ? 'h-12 w-12 rounded-lg' : ''
        } w-full justify-start flex items-center gap-6  rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]`}
      >
        <SearchSVG data-testid="heart-svg" />
        {!isOpen && !searchOpen && <p className="">Search</p>}

      </button>
      <Button
        data-testid="click-open-sheet"
        variant="outline"
        onClick={toggleNotifications}

        className={`${isOpen ? 'h-12 w-full rounded-lg ' : ''} w-full justify-start flex items-center gap-6 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]`}
      >
        <HeartSVG isOpen={isOpen} data-testid="heart-svg" />
        {!isOpen && !searchOpen && <p className="">Notifications</p>}
      </Button>

      <Create searchOpen={searchOpen} isOpen={isOpen} />

      <Link href={`/${user?._id}`}>
        <button
          data-testid="profile-button"
          onClick={() => router.push('./profile')}
          className="w-full border-none flex items-center gap-6 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]"
        >
          <div>
            <User />
          </div>

          {!isOpen && !searchOpen && <p>Profile</p>}
        </button>
      </Link>

    </div>
  );

  return (
    <>
      <div
        data-testid="menu-button-open-sheet"
        className={`${isOpen || searchOpen ? 'w-[80px] px-2' : 'w-[300px] p-4'} fixed z-50 h-[100vh] flex flex-col border-r bg-white transform transition-[width,padding] duration-500 `}
      >
        <div data-testid="click-push-home" onClick={() => router.push('/home')} className="mb-12 pt-[25px] px-[12px]">
          {isOpen || searchOpen ? (
            <div className={`h-10 w-10 hover:border hover:bg-accent hover:rounded-sm mt-4 pl-2 pt-2`}>
              <InstagramSvg />
            </div>
          ) : (
            <InstaSVG />
          )}
        </div>
        <SidebarContent data-testid="toggle-search" />

        <Popover>
          <PopoverTrigger asChild>
            <Button className="justify-start" variant="outline">
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
