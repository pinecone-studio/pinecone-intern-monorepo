import { BottomLayout } from '@/components/home/bottom/BottomLayout';
import { MenuButtons } from '@/components/home/left/MenuButtonsSideBar';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <div className="hidden xl:block">
        <MenuButtons />
      </div>
      <div className="block xl:hidden">
        <BottomLayout />
      </div>

      <div className="grow">{children}</div>
    </div>
  );
};

export default Layout;
