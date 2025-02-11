'use client';
import { GetProfilePreviewQuery, useCreateFollowerMutation } from '@/generated';
import { Follow } from './Follow';
import { useAuth } from '../../components/providers/AuthProvider';
import { Requested } from './Requested';
import { Following } from './Following';
import { useEffect, useState } from 'react';
import { useCache } from '@/components/providers/CacheProvider';

export const FriendshipStatus = ({ preview }: { preview: GetProfilePreviewQuery }) => {
  const targetId = preview.getProfilePreview.user._id;
  const { user } = useAuth();
  const [follow, { data }] = useCreateFollowerMutation();
  const [status, setStatus] = useState(preview.getProfilePreview.user.friendshipStatus);
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
        if (preview.getProfilePreview.user.isPrivate) {
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
      cacheFollow({ targetId: preview.getProfilePreview.user._id, followerCount: preview.getProfilePreview.user.followerCount + 1 });
    } catch (error) {
      console.log(error);
    }
  };
  if (user?._id == targetId) {
    return;
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
