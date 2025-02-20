'use client';
import { TextSideBar } from '@/components/notifications/TextSideBar';
import { HomeSVG } from '../../svg/HomeSvg';
import { useRouter } from 'next/navigation';
import { SearchSVG } from '../../svg/SearchSvg';
import { HeartSVG } from '../../../features/HeartSvg';
import { Create } from './Create';
import { SquarePlus } from 'lucide-react';
import { UserSvg } from '../../svg/UserSvg';
import { useAuth } from '@/components/providers/AuthProvider';

type Props = {
  isOpen: boolean;
  searchOpen: boolean;
  openSearchSheet: () => void;
  toggleNotifications: () => void;
  closeSheets: () => void;
};
/*eslint-disable*/
export const SidebarContent = ({ isOpen, searchOpen, openSearchSheet, toggleNotifications, closeSheets }: Props) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2 mb-auto" data-testid="sidebar-content">
      <TextSideBar
        icon={<HomeSVG />}
        text="Home"
        isOpen={!isOpen && !searchOpen}
        onclick={() => {
          router.push('/');
          closeSheets();
        }}
      />
      <button
        data-testid="search-button"
        onClick={openSearchSheet}
        className={`${searchOpen ? 'h-12 w-12 border rounded-lg shadow-sm' : ''} flex items-center gap-6  rounded-md text-sm font-medium hover:bg-accent  my-1 p-[12px]`}
      >
        <SearchSVG data-testid="search-svg" />
        {!isOpen && !searchOpen && <p className="">Search</p>}
      </button>
      <button
        data-testid="click-open-sheet"
        onClick={toggleNotifications}
        className={`${isOpen ? 'h-12 w-12 border rounded-lg shadow-sm' : ''} flex items-center gap-6  rounded-md text-sm font-medium hover:bg-accent  my-1 p-[12px]`}
      >
        <HeartSVG isOpen={isOpen} data-testid="heart-svg" />
        {!isOpen && !searchOpen && <p className="">Notifications</p>}
      </button>
      <Create>
        <button className={`flex items-center gap-6 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px] w-full `}>
          <SquarePlus className="h-6 w-6" />
          {!isOpen && !searchOpen && <p className="">Create</p>}
        </button>
      </Create>
      <TextSideBar
        icon={<UserSvg />}
        text="Profile"
        searchOpen={searchOpen}
        isOpen={!isOpen && !searchOpen}
        onclick={() => {
          router.push(`/${user?._id}`);
          closeSheets();
        }}
      />
    </div>
  );
};
