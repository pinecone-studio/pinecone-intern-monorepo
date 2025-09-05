'use client';

import { Navbar } from '@/components/sheets/Navbar';
import { UpdateUserProfile } from '@/components/user/UpdateUserProfile';

const UpdateUser = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className=" flex flex-col w-[375px] h-[812px] items-center">
        <Navbar />
        <UpdateUserProfile />
      </div>
    </div>
  );
};
export default UpdateUser;
