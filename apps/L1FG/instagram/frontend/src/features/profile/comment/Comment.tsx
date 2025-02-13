import { PostDate } from '@/components/home-post/PostDate';
import { ProfileHover } from '@/components/home-post/ProfileHover';
import { CommentLike } from '@/components/profile/comment/CommentLike';
import { useCache } from '@/components/providers/CacheProvider';
import { imageUrlOptimizer } from '@/components/utils/image-url-optimizer';
import { quantityConverter } from '@/components/utils/quantity-converter';
import { CommentDetailType, useCreateCommentLikeMutation, useDeleteCommentLikeMutation, UserPostType } from '@/generated';
import Image from 'next/image';
import { useState } from 'react';

export const Comment = ({ comment, post }: { comment: CommentDetailType; post: UserPostType }) => {
  const [liked, setLiked] = useState(comment.commentLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const { cacheLikeComment, cacheUnlikeComment } = useCache();
  const [createCommentLike] = useCreateCommentLikeMutation();
  const [deleteCommentLike] = useDeleteCommentLikeMutation();
  const handleClickLike = async () => {
    setLiked((prev) => !prev);
    try {
      if (liked) {
        setLikeCount((pre) => pre - 1);
        const unlike = await deleteCommentLike({
          variables: {
            input: {
              commentId: comment._id,
              postId: post._id,
              ownerUserId: post.user._id,
            },
          },
        });
        console.log('UNLIKE:', unlike);
        cacheUnlikeComment({
          commentId: comment._id,
          likeCount: comment.likeCount - 1,
        });
      } else {
        setLikeCount((pre) => pre + 1);
        await createCommentLike({
          variables: {
            input: {
              commentId: comment._id,
              postId: post._id,
              ownerUserId: post.user._id,
            },
          },
        });
        cacheLikeComment({ commentId: comment._id, likeCount: comment.likeCount + 1 });
      }
    } catch (error) {
      setLiked(liked);
      setLikeCount(likeCount);
    }
  };
  return (
    <div className="flex  justify-between items-center">
      <div className="flex  ">
        <ProfileHover searchingUserId={post.user._id}>
          <Image src={imageUrlOptimizer(comment.user.profileImage)} width={35} height={35} alt="User profile" className="rounded-full w-[35px] h-[35px]" />
        </ProfileHover>

        <div className="flex flex-col gap-2">
          <div className="flex ">
            <ProfileHover searchingUserId={post.user._id}>
              <p className="font-semibold  ml-5"> {comment.user?.userName}</p>
            </ProfileHover>

            <p className="ml-2 text-sm flex justify-center items-center">{comment.comment}</p>
          </div>
          <div className="flex ml-5 gap-4 items-center ">
            <PostDate date={comment.createdAt} />
            <div>
              <p data-testid="like-count">{quantityConverter({ quantity: likeCount, text: 'like' })}</p>
            </div>
            <p className="text-xs text-gray-500">Reply</p>
          </div>
        </div>
      </div>
      <CommentLike liked={liked} handleClickLike={handleClickLike} />
    </div>
  );
};
