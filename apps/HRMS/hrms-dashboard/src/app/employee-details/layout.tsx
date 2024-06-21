import { Header } from '@/components/ProjectHeader';
import { Sidebar } from '@/components/SideBar';
import { ReactNode } from 'react';
import React from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header></Header>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className=" ml-[250px]">{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
