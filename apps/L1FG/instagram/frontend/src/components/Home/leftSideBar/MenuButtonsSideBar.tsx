import Link from 'next/link';

import Image from 'next/image';
import { InstaSVG } from './Svg/InstaSvg';
import { HomeSVG } from './Svg/HomeSvg';
import { SearchSVG } from './Svg/SearchSvg';
import { HeartSVG } from './Svg/HeartSvg';
import { HumSVG } from './Svg/HumSvg';
import Greate from './Greate';
// import { DialogDemo } from '@/components/create-post/CreatePostDialog';

export const MenuButtons = () => {
  return (
    <div className="w-[260px] h-[100vh] flex flex-col ml-6 py-14 justify-between border-r">
      <div className="flex flex-col gap-5">
        <div className="mb-8">
          <InstaSVG />
        </div>
        <Link href="/home">
          <button className="flex items-center gap-4 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ml-2 p-2">
            <HomeSVG />
            <p className="text-[#09090B]">Home</p>
          </button>
        </Link>
        <Link href="/home">
          <button className="flex items-center gap-4 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ml-2 p-2">
            <SearchSVG />
            <p>Search</p>
          </button>
        </Link>
        <Link href="/home">
          <button className="flex items-center gap-4 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ml-2 p-2">
            <HeartSVG />
            <p>Notifications</p>
          </button>
        </Link>
        {/* <DialogDemo /> */}
        <Greate />
        <Link href="/profile">
          <button className="flex items-center gap-4 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ml-2 p-2 relative">
            <Image className="w-6 h-6 rounded" src="/images/profilePic.png" alt="imgProfile" width={16} height={16} />
            <p>Profile</p>
          </button>
        </Link>
      </div>
      <div className="flex items-center gap-4 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ml-2 p-2">
        <HumSVG />
        <p>More</p>
      </div>
    </div>
  );
};
