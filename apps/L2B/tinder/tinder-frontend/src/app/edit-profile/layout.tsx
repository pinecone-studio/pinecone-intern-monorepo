'use client';
import React, { ReactNode } from 'react';
import Sidebar from '../_components/Sidebar';
import UserHeader from '../_components/UserHeader';
import UserInfo from '../_components/UserInfo';

type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  // if (!user) {
  //   return <div>Burtguulne uu</div>;
  // } else if (user.role == "ADMIN") {
  return (
    <div className="flex flex-col gap-[24px]">
      <UserHeader />
      <div className="w-[80%] m-auto flex flex-col gap-[48px] ">
        <UserInfo />
        <div className=" flex gap-[48px]">
          <Sidebar />
          {props.children}
        </div>
      </div>
    </div>
  );
  // }
};

export default Authlayout;
