import { MenuButtons } from '@/components/Home/leftSideBar/MenuButtonsSideBar';
import { PropsWithChildren } from 'react';
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <MenuButtons />
      {children}
    </div>
  );
};
export default Layout;
