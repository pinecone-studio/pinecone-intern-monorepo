'use client';
import { GetProfilePreviewQuery } from '@/generated';
import { Follow } from './Follow';
import { useAuth } from '../../components/providers/AuthProvider';
import { ApolloQueryResult } from '@apollo/client';

export const FriendshipStatus = ({ preview, profilePreviewRefetch }: { preview: GetProfilePreviewQuery; profilePreviewRefetch: () => Promise<ApolloQueryResult<GetProfilePreviewQuery>> }) => {
  const targetId = preview.getProfilePreview.user._id;
  const status = preview.getProfilePreview.user.friendshipStatus;
  const { user } = useAuth();
  if (user?._id == targetId) {
    return;
  }
  if (status.following) {
    return (
      <button
        className="w-full h-[30px] bg-[#2563EB] text-white rounded-[6px]
            flex justify-center items-center mt-2"
        data-testid="friendship-status-following"
      >
        Following
      </button>
    );
  } else {
    if (status.outgoingRequest) {
      return (
        <button
          className="w-full h-[30px] bg-[#2563EB] text-white rounded-[6px]
            flex justify-center items-center mt-2"
          data-testid="friendship-status-request"
        >
          Requested
        </button>
      );
    } else {
      return <Follow targetId={targetId} profilePrevieRefetch={profilePreviewRefetch} />;
    }
  }
};
