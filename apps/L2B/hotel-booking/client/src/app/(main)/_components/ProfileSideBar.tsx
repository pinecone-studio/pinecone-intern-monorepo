'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProfileSideBar = () => {
  const [selectedPage, setSelectedPage] = useState<string | '/hotels'>('/hotels');

  const handleSelect = (uri: string) => {
    setSelectedPage(uri);
    router.push(uri);
  };

  const router = useRouter();

  return (
    <div className="w-[298px]">
      <div className="w-[250px] flex flex-col gap-0.5 justify-start">
        <button
          onClick={() => {
            handleSelect('/profile');
          }}
          className={selectedPage === '/profile' ? 'bg-[#F4F4F5] flex items-center h-9 rounded-sm px-2 py-1.5' : 'flex items-center h-9 rounded-sm px-2 py-1.5'}
        >
          <p className="text-[14px] font-normal">Profile</p>
        </button>
        <button
          onClick={() => {
            handleSelect('/contact');
          }}
          className={selectedPage === '/contact' ? 'bg-[#F4F4F5] flex items-center h-9 rounded-sm px-2 py-1.5' : 'flex items-center h-9 rounded-sm px-2 py-1.5'}
        >
          <p className="text-[14px] font-normal">Contact</p>
        </button>
        <button
          onClick={() => {
            handleSelect('/security');
          }}
          className={selectedPage === '/security' ? 'bg-[#F4F4F5] flex items-center h-9 rounded-sm px-2 py-1.5' : 'flex items-center h-9 rounded-sm px-2 py-1.5'}
        >
          <p className="text-[14px] font-normal">Security</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileSideBar;
