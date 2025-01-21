import { useState } from 'react';
import Image from 'next/image';
import { InstaSVG } from './Svg/InstaSvg';
import { HomeSVG } from './Svg/HomeSvg';
import { SearchSVG } from './Svg/SearchSvg';
import { HumSVG } from './Svg/HumSvg';
import { NotificationSheet } from '@/components/notifications/NotificationSheet';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { TextSideBar } from '@/components/notifications/TextSideBar';
import { InstagramSvg } from './Svg/InstagramSvg';
import { Create } from './Greate';

export const MenuButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        data-testid="menu-button-open-sheet"
        className={`${isOpen ? 'w-[80px] px-2' : 'w-[300px] p-4'} fixed z-50 h-[100vh] flex flex-col border-r bg-white transform transition-[width,padding] duration-500`}
      >
        <div data-testid="click-push-home" onClick={() => router.push('/home')} className="mb-12 pt-[25px] px-[12px] ">
          {isOpen ? (
            <div className={`h-10 w-10 hover:border hover:bg-accent hover:rounded-sm  mt-4 pl-2 pt-2`}>
              <InstagramSvg />
            </div>
          ) : (
            <InstaSVG />
          )}
        </div>
        <div className="flex flex-col gap-2 ml-2 mb-auto">
          <TextSideBar icon={<HomeSVG data-testid="sidebar-home" />} text="Home" />
          <TextSideBar icon={<SearchSVG data-testid="sidebar-search" />} text="Search" isOpen={isOpen} />
          <button
            data-testid="click-open-sheet"
            onClick={toggleNotifications}
            className={`${
              isOpen ? 'h-12 w-12 border rounded-lg' : ''
            }flex items-center gap-6 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]`}
          >
            <Heart data-testid="heart-svg" />
            <p className={`${isOpen ? 'hidden' : 'block'}`}>Notifications</p>
          </button>
          <Create />
          <TextSideBar icon={<Image data-testid="sidebar-profile" className="w-6 h-6 rounded-full" src="/images/profilePic.png" alt="imgProfile" width={16} height={16} />} text="profile" />
        </div>
        <TextSideBar icon={<HumSVG data-testid="sidebar-more" />} text="More" />
      </div>
      <NotificationSheet isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
