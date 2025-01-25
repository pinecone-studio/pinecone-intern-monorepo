import { useState } from 'react';
import { InstaSVG } from './Svg/InstaSvg';
import { HomeSVG } from './Svg/HomeSvg';
import { SearchSVG } from './Svg/SearchSvg';
import { NotificationSheet } from '@/components/notifications/NotificationSheet';
import { useRouter } from 'next/navigation';
import { TextSideBar } from '@/components/notifications/TextSideBar';
import { InstagramSvg } from './Svg/InstagramSvg';
import { Create } from './Greate';
import { UserSvg } from './Svg/UserSvg';
import { SearchSheet } from '@/components/search/SearchSheet';
import { HeartSVG } from './Svg/HeartSvg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download, ImageDown, Menu, Moon, OctagonAlert, Settings } from 'lucide-react';

export const MenuButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    setSearchOpen(false);
  };
  const openSearchSheet = () => {
    setIsOpen(false);
    setSearchOpen(!searchOpen);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-2 ml-2 mb-auto w-[20%]">
      <p className="text-[18px] w-[200px] font-bold ">
        <TextSideBar icon={<HomeSVG />} text="Home" data-testid="sidebar-home" />
      </p>
      <button
        data-testid="search-button"
        onClick={openSearchSheet}
        className={`${isOpen ? 'h-12 w-12 border rounded-lg' : ''} flex items-center gap-6 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]`}
      >
        <SearchSVG data-testid="heart-svg" />
        <p>Search</p>
      </button>
      <button
        data-testid="click-open-sheet"
        onClick={toggleNotifications}
        className={`${isOpen ? 'h-12 w-12 border rounded-lg' : ''} flex items-center gap-6 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]`}
      >
        <HeartSVG isOpen={isOpen} data-testid="heart-svg" />
        <p>Notifications</p>
      </button>
      <Create searchOpen={searchOpen} isOpen={isOpen} />
      <TextSideBar icon={<UserSvg />} text="Profile" searchOpen={searchOpen} />
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
            <Button variant="outline">
              <div className="flex gap-3 items-center">
                <div>
                  <Menu />
                </div>
                <p>More</p>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[266px] h-[404px]">
            <div className="flex flex-col">
              <div className="">
                <Link className=" " href={'/settings'}>
                  <div className="flex gap-2 h-[50px] items-center">
                    <div>
                      <Settings />
                    </div>
                    <p>Settings</p>
                  </div>
                </Link>
                <div className="flex gap-2 h-[50px] items-center">
                  <div>
                    <ImageDown />
                  </div>
                  <p>Your activity</p>
                </div>
                <div className="flex gap-2 h-[50px] items-center">
                  <div>
                    <Download />
                  </div>
                  <p>Saved</p>
                </div>
                <div className="flex gap-2 h-[50px] items-center">
                  <div>
                    <Moon />
                  </div>
                  <p>Switch appearance</p>
                </div>
                <div className="flex gap-2 h-[50px] items-center">
                  <div>
                    <OctagonAlert />
                  </div>
                  <p>Report a problem</p>
                </div>
              </div>
              <div className="h-1 "></div>
              <div className="">
                <p className="h-[50px] items-center flex">Switch ccounts</p>
                <p className="h-[50px] items-center flex">Log out</p>
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
