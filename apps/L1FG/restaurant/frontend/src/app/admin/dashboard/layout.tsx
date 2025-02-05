import AdminHeader from '@/components/admin-page-comp/AdminHeader';
import React, { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex flex-col items-center ">
      <div className=" ">
        <AdminHeader />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
