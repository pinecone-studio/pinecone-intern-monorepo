import { GetUserTogetherQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { FriendshipStatus } from '@/features/home-post/FriendshipStatus';

interface ButtonsProps {
  userId: string;
  data: GetUserTogetherQuery;
}

export const Buttons = ({ userId, data }: ButtonsProps) => {
  const router = useRouter();
  const isOwnerId = data?.getUserTogether?.viewer?._id === userId;

  const EditProfileFollowing = isOwnerId ? (
    <button data-testid="edit-profile-button" className=" px-4 h-[34px] bg-[#EFEFEF] hover:bg-[#C7C7C7] rounded-lg text-sm font-bold" onClick={() => router.push('/settings')}>
      Edit Profile
    </button>
  ) : (
    data?.getUserTogether?.user && (
      <FriendshipStatus
        followerId=""
        preview={data?.getUserTogether?.user}
        requestStyle="flex gap-2"
        followingStyle="bg-[#EFEFEF] hover:bg-[#C7C7C7] h-[36px]  rounded-lg font-semibold text-sm px-5"
        followStyle="bg-[#0095F6] hover:bg-[#2563EB] h-[36px] px-5 text-white rounded-lg font-semibold text-sm"
        requestedStyle="bg-[#EFEFEF] hover:bg-[#C7C7C7] h-[36px]  rounded-lg font-semibold text-sm px-5"
      />
    )
  );

  const MessageAdtools = isOwnerId ? (
    <button className="px-4 h-[34px] bg-[#EFEFEF] hover:bg-[#C7C7C7] rounded-lg text-sm font-semibold ">View archive</button>
  ) : (
    <button
      className="hidden
  "
    />
  );

  const SettingsButton = isOwnerId ? (
    <div className="flex justify-center items-center">
      {/* <Setting>
        <Settings />
      </Setting> */}
    </div>
  ) : null;

  return (
    <div className="flex gap-2">
      {EditProfileFollowing}
      {MessageAdtools}
      {SettingsButton}
    </div>
  );
};
