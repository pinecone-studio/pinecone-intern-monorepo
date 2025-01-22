import { LeftNavbar } from './LeftNavbar';
import { RightNavbar } from './RightNavbar';

export const MainResultSearch = () => {
  return (
    <div>
      <div className="container mx-auto flex gap-[48px] px-[60px] py-[32px] justify-center">
        <LeftNavbar />
        <RightNavbar />
      </div>
    </div>
  );
};
