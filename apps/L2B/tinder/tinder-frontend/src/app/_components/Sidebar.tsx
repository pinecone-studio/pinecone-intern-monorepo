import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className=" flex flex-col gap-1 ">
      <Link href="/edit-profile/profile">
        <Button className={`${pathname == '/edit-profile/profile' ? 'bg-[#F4F4F5]' : ' bg-white'} hover:bg-accent-none text-black w-[250px] rounded-md h-[36px]`}>Profile</Button>
      </Link>
      <Link href="/edit-profile/profile-image">
        <Button className={`${pathname == '/edit-profile/profile-image' ? 'bg-[#F4F4F5]' : 'bg-white '} hover:bg-accent-none text-black rounded-md w-[250px] h-[36px]`}>Image</Button>
      </Link>
    </div>
  );
};

export default Sidebar;
