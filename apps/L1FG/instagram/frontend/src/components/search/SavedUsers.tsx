import { useDeleteSearchUserMutation, useGetSearchedUserQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export const SavedUsers = () => {
  const [deleteUser] = useDeleteSearchUserMutation();

  const { data, refetch } = useGetSearchedUserQuery();
  const router = useRouter();
  console.log('hi');

  const handleDEleteUser = async (searchedUserId: string) => {
    await deleteUser({
      variables: { searchedUserId },
    });
    refetch();
  };

  if (!data?.getSearchedUser || data.getSearchedUser.length === 0) {
    return <p className="flex items-center justify-center text-gray-500 mt-4 w-full h-full">No recent searches</p>;
  }

  return (
    <div>
      <div className="border mt-8"></div>
      <div className="flex justify-between p-4 items-center ">
        <p className="font-bold">Recent</p>
        <button className="text-[#2563EB] text-xs">Clear All</button>
      </div>
      <div className="mt-4">
        {data?.getSearchedUser.map((user) => (
          <div onClick={() => refetch} key={user?._id} data-testid="saved-users" className="px-4 py-2 flex gap-2 hover:bg-accent">
            <div style={{ backgroundImage: `url(${user?.profileImage})` }} className="w-[44px] h-[44px] bg-gray-300 rounded-full bg-cover bg-center"></div>
            <div onClick={() => router.push(`/${user?._id}`)}>
              <h3 className="font-bold">{user?.userName}</h3>
              <div className="flex gap-2 items-center text-sm text-[#71717A]">
                <p>{user?.fullName}</p>
                {user?.friendshipStatus?.following === true && 'following'}
              </div>
            </div>
            {user?._id && (
              <button data-testid="delete-saved-user" onClick={() => handleDEleteUser(user?._id)} className="ml-auto flex items-center text-gray-500 text-2xl pr-4">
                <X />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
