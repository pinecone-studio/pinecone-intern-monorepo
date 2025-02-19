import { useDeleteSearchUserMutation, useGetSearchedUserQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { SearchSkeleton } from './SkeletonSearch';

// eslint-disable-next-line complexity
export const SavedUsers = ({ searchOpen, setSearchOpen, onclcik }: { searchOpen: boolean; setSearchOpen: (_searchOpen: boolean) => void; onclcik?: () => void }) => {
  const [deleteUser] = useDeleteSearchUserMutation();
  const { data, loading, refetch } = useGetSearchedUserQuery();
  const router = useRouter();

  if (!searchOpen) {
    refetch();
  }

  const handleDeleteUser = async (searchedUserId: string) => {
    await deleteUser({
      variables: { searchedUserId },
    });
    refetch();
  };

  const handleCloseSheet = (_id: string) => {
    router.push(`/${_id}`);
    setSearchOpen(false);
  };

  if (loading) {
    return <SearchSkeleton data-testid="search-skeleton" />;
  }

  if (!data?.getSearchedUser) {
    return <p className="flex items-center justify-center text-gray-500 mt-4 w-full h-full">No recent searches</p>;
  }

  const reversedUsers = data.getSearchedUser;

  return (
    <div>
      <div className="border mt-8"></div>
      <div className="flex justify-between p-4 items-center ">
        <p className="font-bold">Recent</p>
        <button onClick={onclcik} className="text-[#2563EB] text-xs">
          Clear All
        </button>
      </div>
      <div className="mt-4">
        {reversedUsers.map((user) => (
          <div className="flex hover:bg-accent" key={user?._id}>
            <div onClick={() => handleCloseSheet(user?._id as string)} data-testid="saved-users" className="px-4 py-2 flex gap-2 mr-auto w-[350px]">
              <div style={{ backgroundImage: `url(${user?.profileImage})` }} className="w-[44px] h-[44px] bg-gray-300 rounded-full bg-cover bg-center"></div>
              <div>
                <h3 className="font-bold">{user?.userName}</h3>
                <div className="flex gap-2 items-center text-sm text-[#71717A]">
                  <p>{user?.fullName}</p>
                  {user?.friendshipStatus?.following === true && 'following'}
                </div>
              </div>
            </div>
            <div className=" flex items-center text-gray-500 text-2xl pr-4">
              {user?._id && (
                <button data-testid="delete-saved-user" onClick={() => handleDeleteUser(user?._id)}>
                  <X />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
