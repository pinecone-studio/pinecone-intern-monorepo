'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../_context/AuthContext';

const ProfileSideBar = () => {
  const { user } = useAuth();
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
          data-testid="Profile"
          onClick={() => {
            handleSelect(`/profile?userId=${user?._id}`);
          }}
          className={selectedPage === `/profile?userId=${user?._id}` ? 'bg-[#F4F4F5] flex items-center h-9 rounded-sm px-2 py-1.5' : 'flex items-center h-9 rounded-sm px-2 py-1.5'}
        >
          <p className="text-[14px] font-normal">Profile</p>
        </button>
        <button
          data-testid="Contact"
          onClick={() => {
            handleSelect(`/contact?userId=${user?._id}`);
          }}
          className={selectedPage === `/contact?userId=${user?._id}` ? 'bg-[#F4F4F5] flex items-center h-9 rounded-sm px-2 py-1.5' : 'flex items-center h-9 rounded-sm px-2 py-1.5'}
        >
          <p className="text-[14px] font-normal">Contact</p>
        </button>
        <button
          data-testid="Security"
          onClick={() => {
            handleSelect(`/security?userId=${user?._id}`);
          }}
          className={selectedPage === `/security?userId=${user?._id}` ? 'bg-[#F4F4F5] flex items-center h-9 rounded-sm px-2 py-1.5' : 'flex items-center h-9 rounded-sm px-2 py-1.5'}
        >
          <p className="text-[14px] font-normal">Security</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileSideBar;
