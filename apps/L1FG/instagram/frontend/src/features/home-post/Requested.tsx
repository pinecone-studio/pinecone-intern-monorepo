import { FriendshipStatusType, useDeleteRequestMutation } from '@/generated';
import { cn } from '@/utils';

type Props = {
  requestedStyle: string;
  targetId: string;
  setStatus: React.Dispatch<React.SetStateAction<FriendshipStatusType>>;
};

export const Requested = ({ requestedStyle, targetId, setStatus }: Props) => {
  const [removeRequest] = useDeleteRequestMutation();

  const handleRemove = () => {
    removeRequest({
      variables: { targetId },
    });
    setStatus((pre) => ({ ...pre, outgoingRequest: false }));
  };
  return (
    <button onClick={handleRemove} className={cn(``, requestedStyle)} data-testid="friendship-status-request">
      Requested
    </button>
  );
};
