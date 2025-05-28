'use client';
import { useAuth } from '../../_context/AuthContext';

export const ProfileHeader = () => {
  const { user } = useAuth();

  return (
    <div className="h-[83px] pl-2 border-b-[1px] mb-6">
      <h2 className="text-[24px] font-[600] ">Hi,{user?.firstName}</h2>
      <p className="text-[#71717a] text-[16px] font-extralight">{user?.email}</p>
    </div>
  );
};
