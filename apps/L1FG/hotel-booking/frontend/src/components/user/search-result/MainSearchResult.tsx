import { LeftNavbar } from './LeftNavbar';
import { RightNavbar } from './RightNavbar';

export const MainResultSearch = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="container flex gap-[48px] px-[60px] py-[32px] justify-center">
        <LeftNavbar />
        <RightNavbar />
      </div>
    </div>
  );
};
