'use client';
import { Header } from '@/components/Header';
import { MyProfile } from '@/components/MyProfile';
import { WhiteTinderLogo } from '@/components/TinderLogo';

const Profile = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-shrink-0">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto flex justify-center items-start py-6 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-[1334px] h-fit flex flex-col gap-6">
          <MyProfile />
        </div>
      </div>

      <div className="flex-shrink-0 w-full max-w-[1552px] mx-auto h-[64px] flex flex-col sm:flex-row justify-between items-center px-4 py-4 gap-2 sm:gap-4">
        <WhiteTinderLogo color="#71717A" />
        <p className="text-[#71717A] font-sans text-sm">© Copyright 2024</p>
      </div>
    </div>
  );
};

export default Profile;
