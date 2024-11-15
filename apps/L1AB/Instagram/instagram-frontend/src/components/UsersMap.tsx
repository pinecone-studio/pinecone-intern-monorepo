/* eslint-disable no-secrets/no-secrets */
'use client';
import { Button } from '@/components/ui/button';
import { useGetAllUsersQuery } from '@/generated';
import Image from 'next/image';

export const UsersMap = () => {
  const { data } = useGetAllUsersQuery();

  const users = data?.getAllUsers || [];
  return (
    <div>
      <div className="flex-col pt-4">
        {users.slice(0, 10).map((user, index) => (
          <div key={index} className="rounded p-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-12 w-12 border rounded-full overflow-hidden">
                <Image src="https://res.cloudinary.com/dezeem4wu/image/upload/v1726459018/samples/man-portrait.jpg" alt="Profile image" fill style={{ objectFit: 'cover' }} />
              </div>

              <div className="flex flex-col">
                <p data-testid="username" className="font-semibold">
                  {user.username}
                </p>
              </div>
            </div>

            <div className="flex">
              <Button className="text-sm  text-[#2563EB] text-[14px]  hover:bg-white bg-white">Follow</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
