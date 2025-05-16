'use client';
import { useGetUserQuery } from '@/generated';

export const ProfileHeader = () => {
  const { data } = useGetUserQuery({
    variables: {
      id: '682207ae2c5870fba2e6da4c', //Nevtersen hereglegchiin _id baih ystoi
    },
  });

  return (
    <div className="h-[83px] pl-2 border-b-[1px] mb-6">
      <h2 className="text-[24px] font-[600] ">Hi,{data?.getUser.firstName}</h2>
      <p className="text-[#71717a] text-[16px] font-extralight">{data?.getUser.email}</p>
    </div>
  );
};
