import { ProjectHeader } from '@/components/ProjectHeader';
import { Sidebar } from 'lucide-react';
import { ReactNode } from 'react';
import React from 'react';

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
export default DashboardLayout;
