'use client';
import { useCreateFollowerMutation, UserTogetherUserType } from '@/generated';
import { Follow } from './Follow';
import { useAuth } from '../../components/providers/AuthProvider';
import { Requested } from './Requested';
import { Following } from './Following';
import { useEffect, useState } from 'react';
import { useCache } from '@/components/providers/CacheProvider';
import { IsRequest } from './IsRequest';

// eslint-disable-next-line complexity
export const FriendshipStatus = ({ preview, onclick, statuss }: { preview: UserTogetherUserType; onclick?: () => void; statuss?: boolean }) => {
  const targetId = preview._id;

  const { user } = useAuth();
  const [follow, { data }] = useCreateFollowerMutation();
  const [status, setStatus] = useState(preview.friendshipStatus);

  const { cacheFollow } = useCache();
  useEffect(() => {
    if (data) {
      if (data.createFollower.isFollowed) {
        setStatus((pre) => ({ ...pre, following: true }));
      } else {
        setStatus((pre) => ({ ...pre, outgoingRequest: true }));
      }
    }
  }, [data]);
  const handleClick = async () => {
    try {
      setStatus((pre) => {
        if (preview.isPrivate) {
          return { ...pre, outgoingRequest: true };
        }
        return { ...pre, following: true };
      });
      await follow({
        variables: {
          input: {
            targetId: targetId,
          },
        },
      });
      cacheFollow({ targetId: preview._id, followerCount: preview.followerCount + 1 });
    } catch (error) {
      console.log(error);
    }
  };
  if (user?._id == targetId) {
    return;
  }
  if (status.incomingRequest && statuss) {
    return <IsRequest onclick={onclick as () => void} />;
  }
  if (status.following) {
    return <Following />;
  } else {
    if (status.outgoingRequest) {
      return <Requested />;
    } else {
      return <Follow handleClickLike={handleClick} />;
    }
  }
};
