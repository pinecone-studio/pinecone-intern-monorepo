'use client';

import { Navbar } from '@/components/Navbar';
import { UpdateUserProfile } from '@/features/update-user-profile/UpdateUserProfile';

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
