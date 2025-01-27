import { UserTogetherUserType } from '@/generated';
import { useRouter } from 'next/navigation';

type Props = {
  users?: UserTogetherUserType[] | undefined;
  setSearchOpen: (_searchOpen: boolean) => void;
};

export const Users = ({ users, setSearchOpen }: Props) => {
  const router = useRouter();
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500 mt-4">User not found</p>;
  }
  const clickUser = (_id: string) => {
    setSearchOpen(false);
    router.push(`/${_id}`);
  };
  return (
    <div>
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
