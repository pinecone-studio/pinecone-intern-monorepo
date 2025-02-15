import { MenuButtons } from '@/components/home/left/MenuButtonsSideBar';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">

      <div className="hidden xl:block">
        <MenuButtons />
      </div>


      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
