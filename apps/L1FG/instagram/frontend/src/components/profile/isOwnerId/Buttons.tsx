import { GetUserTogetherQuery } from '@/generated';
import { Settings } from 'lucide-react';
import Setting from '../profilePost/Setting';
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
    <button data-testid="edit-profile-button" className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold" onClick={() => router.push('/settings')}>
      Edit Profile
    </button>
  ) : (
    data?.getUserTogether?.user && (
      <FriendshipStatus
        preview={data?.getUserTogether?.user}
        requestStyle="flex gap-2"
        followingStyle="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold"
        followStyle="bg-[#2563EB] h-[36px] w-[86px] text-white rounded-md"
        requestedStyle="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold"
      />
    )
  );

  const MessageAdtools = isOwnerId ? (
    <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold">Ad tools</button>
  ) : (
    <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold">Message</button>
  );

  const SettingsButton = isOwnerId ? (
    <div className="flex justify-center items-center">
      <Setting>
        <Settings />
      </Setting>
    </div>
  ) : null;

  return (
    <div className="flex gap-3">
      {EditProfileFollowing}
      {MessageAdtools}
      {SettingsButton}
    </div>
  );
};
