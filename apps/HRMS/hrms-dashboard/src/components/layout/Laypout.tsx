import { ReactElement, ReactNode } from 'react';
import React from 'react';
import { Sidebar } from '../SideBar';
import { ProjectHeader } from '../ProjectHeader';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ProjectHeader></ProjectHeader>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className=" ml-[250px]">{children}</div>
      </div>
    </div>
  );
};
export const getDashboardLayout = (children: any): ReactNode => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
