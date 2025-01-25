import { UserTogetherUserType } from '@/generated';

export const Users = ({ users }: { users?: UserTogetherUserType[] | undefined | null }) => {
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No users found.</p>;
  }

  return (
    <div>
      {users?.map((user) => (
        <div key={user._id} className="px-4 py-2 flex gap-2 hover:bg-accent">
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
