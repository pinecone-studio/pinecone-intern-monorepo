'use client';

import { Navbar } from '@/components/Navbar';
import { UpdateUserProfile } from '@/components/user/UpdateUserProfile';

const UpdateUser = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center">
      <Navbar />
      <UpdateUserProfile />
    </div>
  );
};
export default UpdateUser;
