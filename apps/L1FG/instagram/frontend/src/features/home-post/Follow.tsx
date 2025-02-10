import Loading from '@/components/Loading';
import { GetProfilePreviewQuery, useCreateFollowerMutation } from '@/generated';
import { ApolloQueryResult } from '@apollo/client';
import { useState } from 'react';

export const Follow = ({ targetId, profilePrevieRefetch }: { targetId: string; profilePrevieRefetch: () => Promise<ApolloQueryResult<GetProfilePreviewQuery>> }) => {
  const [follow] = useCreateFollowerMutation();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    await follow({
      variables: {
        input: {
          targetId: targetId,
        },
      },
    });
    await profilePrevieRefetch();
    setLoading(false);
  };
  return (
    <button
      className="w-full h-[30px] bg-[#2563EB] text-white rounded-[6px]
            flex justify-center items-center mt-2"
      data-testid="friendship-status-follow"
      onClick={handleClick}
    >
      {loading ? <Loading /> : 'Follow'}
    </button>
  );
};
