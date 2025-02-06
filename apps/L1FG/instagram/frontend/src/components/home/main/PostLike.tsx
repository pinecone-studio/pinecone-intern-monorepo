'use client';
import { useCreatePostLikeMutation, useDeletePostLikeMutation } from '@/generated';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  postId: string;
  ownerUserId: string;
};

export const PostLike = ({ postId, ownerUserId }: Props) => {
  const [createPostLike] = useCreatePostLikeMutation();
  const [deleteLike] = useDeletePostLikeMutation();
  const [liked, setLiked] = useState(false);

  const handleClickLike = async () => {
    setLiked((prev) => !prev);
    try {
      if (liked) {
        await deleteLike({
          variables: {
            postId,
          },
        });
      } else {
        await createPostLike({
          variables: {
            input: {
              postId,
              ownerUserId,
            },
          },
        });
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  return <HeartIcon onClick={handleClickLike} data-testid="like-icon" className={`${liked && 'fill-red-500 border-none cursor-pointer'} cursor-pointer fill-none`} />;
};
