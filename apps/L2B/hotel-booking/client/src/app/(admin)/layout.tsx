import { PropsWithChildren } from 'react';
import AdminSideBar from './_components/AdminSideBar';

const adminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex max-h-full ">
      <AdminSideBar />
      {children}
    </div>
  );
};

export default adminLayout;
