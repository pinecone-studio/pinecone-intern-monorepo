'use client';

import Link from 'next/link';
import { ProfileMain } from './_features';
import { HomeButton } from './_components/HomeButton';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <div className="bg-[#F7F7F8] py-[21.52px] dark:bg-[#121316ec]">
      <div className=" w-[85vw] max-w-[1440px] m-auto bg-[#F7F7F8] dark:bg-transparent" data-testid="profile-main">
        <Link className="flex gap-[2px] " href="/">
          <div className="flex justify-center items-center">
            <HomeButton />
          </div>
          <button className="p-[10px] font-[inter] font-[600] text-[18px] text-black dark:text-[#ededed]" data-testid="profile-btn">
            Нүүр хуудас
          </button>
        </Link>
        <div className="mt-[25px] flex gap-[24px]">
          <div>SideBarProfile</div>
          <ProfileMain data-testid="profile-main" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
