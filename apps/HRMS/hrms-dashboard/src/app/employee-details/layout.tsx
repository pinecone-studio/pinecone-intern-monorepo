import { Header } from '@/components/ProjectHeader';
import { Sidebar } from '@/components/SideBar';
import { ReactNode } from 'react';
import React from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className=" mt-[40px]">
        <Sidebar />
        <div className=" ml-[242px] ">{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
