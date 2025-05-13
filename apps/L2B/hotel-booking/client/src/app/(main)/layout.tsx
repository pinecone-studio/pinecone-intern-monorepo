import { PropsWithChildren } from 'react';
import ProfileSideBar from './_components/ProfileSideBar';

const profileLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-[1280px] m-auto py-10 px-6">
      <div className="flex">
        <ProfileSideBar />
        {children}
      </div>
    </div>
  );
};

export default profileLayout;
