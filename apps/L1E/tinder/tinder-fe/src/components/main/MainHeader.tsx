import Logo from '../common/Logo';
import { ChatLogo } from './ChatLogo';
import { ProfileIcon } from './ProfileIcon';

export const MainHeader = () => {
  return (
    <>
      <div className="flex w-screen h-[64px] justify-center items-center sticky top-0 z-50">
        <div className="w-[1280px] h-10 flex justify-between">
          <Logo />
          <div className=" flex w-[96px] gap-4">
            <div className="w-10 h-10 flex items-center">
              <ChatLogo />
            </div>
            <ProfileIcon />
          </div>
        </div>
      </div>
    </>
  );
};
