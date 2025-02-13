import { UserByNameBasicInfoFragment, useSavedSearchUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';

type Props = {
  users?: UserByNameBasicInfoFragment[] | undefined;
  setSearchOpen: (_searchOpen: boolean) => void;
  setUserName: (_userName: string) => void;
};

export const Users = ({ users, setSearchOpen, setUserName }: Props) => {
  const [savedSearchUser] = useSavedSearchUserMutation();
  const router = useRouter();

  const handleCreateUser = async (searchedUserId: string) => {
    await savedSearchUser({
      variables: { searchedUserId },
    });
  };

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500 mt-4">User not found</p>;
  }
  const clickUser = (_id: string) => {
    setSearchOpen(false);
    router.push(`/${_id}`);
    handleCreateUser(_id);
    setUserName('');
  };
  return (
    <div className="mt-4">
      {users?.map((user) => (
        <div data-testid="visit-profile" onClick={() => clickUser(user._id)} key={user._id} className="px-4 py-2 flex gap-2 hover:bg-accent">
          <div style={{ backgroundImage: `url(${user.profileImage || ''})` }} className="w-[44px] h-[44px] bg-gray-300 rounded-full bg-cover bg-center"></div>
          <div>
            <h3 className="font-bold">{user.userName}</h3>
            <div className="flex gap-2 items-center text-sm text-[#71717A]">
              <p>{user.fullName}</p>
              {user.friendshipStatus?.following}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
