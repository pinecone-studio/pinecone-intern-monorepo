import { PropsWithChildren } from 'react';
import ProfileSideBar from './_components/ProfileSideBar';
import { ProfileHeader } from './_components/ProfileHeader';

const profileLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-[1280px] m-auto py-10 px-6">
      <ProfileHeader />
      <div className="flex">
        <ProfileSideBar />
        {children}
      </div>
    </div>
  );
};

export default profileLayout;
