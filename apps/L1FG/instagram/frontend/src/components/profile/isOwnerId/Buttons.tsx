import { GetUserTogetherQuery } from '@/generated';
import { Settings } from 'lucide-react';
import Setting from '../profilePost/Setting';
import { useRouter } from 'next/navigation';

interface ButtonsProps {
  userId: string;
  data: GetUserTogetherQuery;
}

export const Buttons = ({ userId, data }: ButtonsProps) => {
  const router = useRouter();
  const isOwnerId = data?.getUserTogether?.viewer?._id === userId;
  console.log('data:', data);

  const EditProfileFollowing = isOwnerId ? (
    <button data-testid="edit-profile-button" className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold" onClick={() => router.push('/settings')}>
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
