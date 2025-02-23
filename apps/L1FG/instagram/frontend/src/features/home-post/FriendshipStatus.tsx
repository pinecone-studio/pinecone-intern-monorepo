'use client';
import { FriendshipStatusType, useCreateFollowerMutation, UserTogetherUserType } from '@/generated';
import { Follow } from './Follow';
import { useAuth } from '../../components/providers/AuthProvider';
import { Requested } from './Requested';
import { Following } from './Following';
import { useEffect, useState } from 'react';
import { useCache } from '@/components/providers/CacheProvider';
import { IsRequest } from './IsRequest';

// eslint-disable-next-line complexity
export const FriendshipStatus = ({
  followingStyle,
  followStyle,
  preview,
  requestStyle,
  requestedStyle,
  followerId,
}: {
  preview: UserTogetherUserType;
  onclick?: () => void;
  followStyle?: string;
  followingStyle?: string;
  requestStyle?: string;
  requestedStyle: string;
  followerId: string;
}) => {
  const targetId = preview?._id;

  const { user } = useAuth();
  const [follow, { data }] = useCreateFollowerMutation();
  const [status, setStatus] = useState<FriendshipStatusType>(preview.friendshipStatus);
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
      if (preview?.isPrivate) {
        setStatus((pre) => ({ ...pre, outgoingRequest: true }));
      } else {
        setStatus((pre) => ({ ...pre, following: true }));
      }

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
  if (status.incomingRequest) {
    return <IsRequest followerId={followerId} setStatus={setStatus} requestStyle={requestStyle} />;
  }
  if (status.following) {
    return <Following followerCount={preview.followerCount} setStatus={setStatus} targetId={targetId} followingStyle={followingStyle} />;
  } else {
    if (status.outgoingRequest) {
      return <Requested targetId={targetId as string} setStatus={setStatus} requestedStyle={requestedStyle as string} />;
    } else {
      return <Follow followStyle={followStyle} handleClickLike={handleClick} />;
    }
  }
};
