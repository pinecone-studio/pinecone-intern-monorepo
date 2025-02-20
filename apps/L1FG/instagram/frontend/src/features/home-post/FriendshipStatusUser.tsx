'use client';
import { GetUserTogetherQuery, useCreateFollowerMutation, useDeleteFollowerMutation, UserTogetherUserType } from '@/generated';
import { Follow } from './Follow';
import { useAuth } from '../../components/providers/AuthProvider';
import { Requested } from './Requested';
import { useEffect, useState } from 'react';
import { useCache } from '@/components/providers/CacheProvider';
import { IsRequest } from './IsRequest';
import { Remove } from './Remove';

// eslint-disable-next-line complexity
export const FriendshipStatusUser = ({
  removeStyle,
  followStyle,
  preview,
  onclick,
  statuss,
  requestStyle,
  requestedStyle,
  datas,
}: {
  preview: UserTogetherUserType;
  onclick?: () => void;
  statuss?: boolean;
  followStyle?: string;
  followingStyle?: string;
  requestStyle?: string;
  requestedStyle?: string;
  removeStyle?: string;
  datas?: GetUserTogetherQuery;
}) => {
  const targetId = preview._id;

  const { user } = useAuth();
  const [follow, { data }] = useCreateFollowerMutation();
  const [removeFollow] = useDeleteFollowerMutation();
  const [status, setStatus] = useState(preview.friendshipStatus);
  const { cacheFollow } = useCache();
  const { cacheRemovefollow } = useCache();

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
  const handleRemove = async () => {
    try {
      setStatus((pre) => {
        if (preview.isPrivate) {
          return { ...pre, outgoingRequest: true };
        }
        return { ...pre, following: false };
      });
      await removeFollow({
        variables: {
          followerId: preview._id,
        },
      });
      cacheRemovefollow({ followerId: preview._id, followerCount: preview.followerCount - 1 });
    } catch (error) {
      console.log(error);
    }
  };

  if (user?._id == targetId) {
    return;
  }
  if (status.incomingRequest && statuss) {
    return <IsRequest requestStyle={requestStyle} onclick={onclick as () => void} />;
  }
  if (status.following) {
    return <Remove datas={datas as GetUserTogetherQuery} removeStyle={removeStyle} onclick={handleRemove} />;
  } else {
    if (status.outgoingRequest) {
      return <Requested setStatus={setStatus} targetId={targetId} requestedStyle={requestedStyle as string} />;
    } else {
      return <Follow followStyle={followStyle} handleClickLike={handleClick} />;
    }
  }
};
