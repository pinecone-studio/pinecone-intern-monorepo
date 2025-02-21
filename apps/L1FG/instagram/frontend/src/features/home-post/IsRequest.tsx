import { FriendshipStatusType, useAcceptRequestMutation, useRemoveRequestMutation } from '@/generated';
import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const IsRequest = ({ requestStyle, setStatus, followerId }: { followerId: string; requestStyle?: string; setStatus: React.Dispatch<React.SetStateAction<FriendshipStatusType>> }) => {
  const [acceptFollow] = useAcceptRequestMutation();
  const [remove] = useRemoveRequestMutation();
  const handleFollowConfirm = async () => {
    await acceptFollow({
      variables: {
        followerId,
      },
    });
    setStatus((pre) => ({ ...pre, incomingRequest: false }));
  };
  const handleRemove = async () => {
    await remove({
      variables: {
        followerId,
      },
    });
    setStatus((prev) => ({ ...prev, incomingRequest: false }));
  };
  return (
    <div className={cn(``, requestStyle)}>
      <button onClick={handleFollowConfirm} className="bg-[#2563EB] py-[7px] px-4 text-white rounded-md">
        Confirm
      </button>
      <button className="bg-[#F4F4F5] py-[7px] px-4 rounded-md " onClick={handleRemove}>
        Delete
      </button>
    </div>
  );
};
