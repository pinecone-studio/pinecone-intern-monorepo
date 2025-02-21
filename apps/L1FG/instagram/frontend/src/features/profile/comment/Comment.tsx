import CommentLikeModal from '@/components/home-post/CommentLikeModal';
import { PostDate } from '@/components/home-post/PostDate';
import { ProfileHover } from '@/features/home-post/ProfileHover';
import { CommentLike } from '@/components/profile/comment/CommentLike';
import { useCache } from '@/components/providers/CacheProvider';
import { imageUrlOptimizer } from '@/components/utils/image-url-optimizer';
import { quantityConverter } from '@/components/utils/quantity-converter';
import { CommentDetailType, useCreateCommentLikeMutation, useDeleteCommentLikeMutation, UserPostType } from '@/generated';
import Image from 'next/image';
import { useState } from 'react';
import DeleteComment from './DeleteComment';
import { useAuth } from '@/components/providers/AuthProvider';

export const Comment = ({ comment, post }: { comment: CommentDetailType; post: UserPostType }) => {
  const [liked, setLiked] = useState(comment.commentLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);

  const { cacheLikeComment, cacheUnlikeComment } = useCache();
  const [createCommentLike] = useCreateCommentLikeMutation();
  const [deleteCommentLike] = useDeleteCommentLikeMutation();
  const { user } = useAuth();
  const isOwner = user?._id === comment.userId;
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
        const like = await createCommentLike({
          variables: {
            input: {
              commentId: comment._id,
              postId: post._id,
              ownerUserId: comment?.user?._id,
            },
          },
        });
        console.log('createLike', like);

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
        <ProfileHover searchingUserId={comment.user._id}>
          <Image src={imageUrlOptimizer(comment.user.profileImage)} width={35} height={35} alt="User profile" className="rounded-full w-[35px] h-[35px] hover:cursor-pointer" />
        </ProfileHover>

        <div className="flex flex-col gap-2">
          <div className="flex ">
            <ProfileHover searchingUserId={comment.user._id}>
              <p className="font-semibold  ml-5 hover:cursor-pointer"> {comment.user?.userName}</p>
            </ProfileHover>

            <p className="ml-2 text-sm flex justify-center items-center">{comment.comment}</p>
          </div>
          <div className="flex ml-5 gap-4 items-center ">
            <PostDate date={comment.createdAt} />
            <div className="flex items-center font-semibold text-gray-600 text-sm">
              <CommentLikeModal commentId={comment._id}>
                <p data-testid="like-count">{quantityConverter({ quantity: likeCount, text: 'like' })}</p>
              </CommentLikeModal>
            </div>
            {isOwner ? <DeleteComment commentId={comment._id} postId={post._id} /> : ''}
          </div>
        </div>
      </div>
      <CommentLike liked={liked} handleClickLike={handleClickLike} />
    </div>
  );
};
