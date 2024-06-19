import { ReactNode } from 'react';
import React from 'react';
import { Sidebar } from '../SideBar';
import { ProjectHeader } from '../ProjectHeader';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
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
export const getDashboardLayout = (children: ReactNode): ReactNode => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
