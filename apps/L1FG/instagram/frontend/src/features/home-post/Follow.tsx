import { GetProfilePreviewQuery, useCreateFollowerMutation } from '@/generated';
import { ApolloQueryResult } from '@apollo/client';

export const Follow = ({ targetId, profilePrevieRefetch }: { targetId: string; profilePrevieRefetch: () => Promise<ApolloQueryResult<GetProfilePreviewQuery>> }) => {
  const [follow] = useCreateFollowerMutation();
  const handleClick = async () => {
    await follow({
      variables: {
        input: {
          targetId: targetId,
        },
      },
    });
    await profilePrevieRefetch();
  };
  return (
    <button
      className="w-full h-[30px] bg-[#2563EB] text-white rounded-[6px]
            flex justify-center items-center mt-2"
      data-testid="friendship-status-follow"
      onClick={handleClick}
    >
      Follow
    </button>
  );
};
