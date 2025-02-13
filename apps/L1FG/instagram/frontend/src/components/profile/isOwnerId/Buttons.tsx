import { useGetUserTogetherQuery } from '@/generated';
import { Settings } from 'lucide-react';
import Setting from '../profilePost/Setting';
import { useRouter } from 'next/navigation';

interface ButtonsProps {
  userId: string;
}

export const Buttons = ({ userId }: ButtonsProps) => {
  const { data } = useGetUserTogetherQuery({
    variables: { searchingUserId: userId },
  });
  const router = useRouter();

  const isOwnerId = data?.getUserTogether?.viewer?._id === userId;

  const EditProfileFollowing = isOwnerId ? (
    <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold" onClick={() => router.push('/settings')}>
      Edit Profile
    </button>
  ) : (
    <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold">Following</button>
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
