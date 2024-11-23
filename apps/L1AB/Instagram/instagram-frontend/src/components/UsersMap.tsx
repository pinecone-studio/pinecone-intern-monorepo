'use client';
import { useGetAllUsersQuery } from '@/generated';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const UsersMap = () => {
  const { data } = useGetAllUsersQuery();

  const users = data?.getAllUsers;
  return (
    <div className="flex flex-col pt-4 gap-4">
      {users?.slice(0, 5).map((user, index) => (
        <div key={index} className="rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.profilePicture} alt="@shadcn" />
              <AvatarFallback className="uppercase">{user.username.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p data-testid="username" className="font-semibold">
                {user.username}
              </p>
            </div>
          </div>
          <p className="text-sm  text-[#2563EB] text-[14px]  hover:bg-white bg-white">Follow</p>
        </div>
      ))}
    </div>
  );
};
