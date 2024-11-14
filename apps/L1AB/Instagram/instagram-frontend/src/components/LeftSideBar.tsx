'use client';
import { Heart, House, Menu, SquarePlus, Search } from 'lucide-react';
import { CreateDropDownMenu } from './CreateDropDownMenu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Profile } from './Profile';
import Image from 'next/image';

interface Path {
  icon: React.ReactNode;
  title: string | React.ReactNode;
  path: string;
}
const paths: Path[] = [
  { icon: <House />, title: 'Home', path: '/' },
  { icon: <Search />, title: 'Search', path: '/search' },
  { icon: <Heart />, title: 'Notification', path: '/notification' },
  { icon: <SquarePlus />, title: <CreateDropDownMenu />, path: '/' },
  { icon: <Profile />, title: 'Profile', path: '/profile' },
];

export const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[260px]  h-screen pl-4 pt-8 pb-4 border-r fixed l-0">
      <div className="h-full flex flex-col">
        <div className="space-y-12 flex flex-col ">
          <div className="w-[103px] h-[29px] relative">
            <Image src={'/Logo.png'} alt="instagram logo" fill />
          </div>
          <div className=" space-y-2">
            {paths.map((path, index) => (
              <Link key={index} href={path.path}>
                <div data-testid={path.path} className={`flex items-center gap-4 p-[14px] cursor-pointer group ${pathname === path.path ? 'font-bold' : 'font-light'}`}>
                  <div>{path.icon}</div>
                  <p>{path.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-4 p-[14px] mt-auto b-0">
          <Menu />
          <p className="font-light">More</p>
        </div>
      </div>
    </div>
  );
};
