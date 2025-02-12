import { PostDate } from '@/components/home-post/PostDate';
import { CommentLike } from '@/components/profile/comment/CommentLike';
import { imageUrlOptimizer } from '@/components/utils/image-url-optimizer';
import { quantityConverter } from '@/components/utils/quantity-converter';
import { CommentDetailType } from '@/generated';
import Image from 'next/image';
import { useState } from 'react';

export const Comment = ({ comment }: { comment: CommentDetailType }) => {
  const [liked, setLiked] = useState(comment.commentLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);

  const handleClickLike = () => {
    setLiked((prev) => !prev);
    try {
      if (liked) {
        setLikeCount((pre) => pre - 1);
      } else {
        setLikeCount((pre) => pre + 1);
      }
    } catch (error) {
      setLiked(liked);
      setLikeCount(likeCount);
    }
  };
  return (
    <div className="flex  justify-between items-center">
      <div className="flex  ">
        <Image src={imageUrlOptimizer(comment.user.profileImage)} width={35} height={35} alt="User profile" className="rounded-full w-[35px] h-[35px]" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center ">
            <p className="font-semibold  ml-5"> {comment.user?.userName}</p>
            <p className="ml-2 text-sm">{comment.comment}</p>
          </div>
          <div className="flex ml-5 gap-4">
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
