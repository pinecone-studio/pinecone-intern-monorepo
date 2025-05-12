import { PropsWithChildren } from 'react';
import AdminSideBar from './_components/AdminSideBar';

const adminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex absolute max-h-[10000px] ">
      <AdminSideBar />
      {children}
    </div>
  );
};

export default adminLayout;
