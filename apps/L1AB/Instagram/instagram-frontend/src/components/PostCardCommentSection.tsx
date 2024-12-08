'use client';

import { useCreateCommentMutation, useGetCommentsByPostIdQuery } from '@/generated';
import { Smile } from 'lucide-react';
import { useState } from 'react';

export type CardPropsType = {
  postId: string;
  userId: string;
  userName: string;
  images: string[];
  profilePicture: string;
  caption: string;
};

const PostCardCommentSection = ({ postId, userId }: CardPropsType) => {
  const [comment, setComment] = useState('');

  const { data, refetch } = useGetCommentsByPostIdQuery({
    variables: { postId: postId },
  });

  const commentsData = data?.getCommentsByPostId;

  const [createComment] = useCreateCommentMutation();

  const handleComment = async (postId: string) => {
    if (!userId) return;

    await createComment({
      variables: {
        input: {
          comment: comment,
          postId: postId,
          userId: userId,
        },
      },
    });
    await refetch();
    setComment('');
  };
  return (
    <div>
      <div className="text-[#71717A]">
        <div>View all {commentsData?.length} comments</div>
        <div className="flex justify-between pt-2 items-center">
          <input data-testid="commentInput" value={comment} onChange={(e) => setComment(e.target.value)} className="w-3/4 focus:outline-none" placeholder="Add comment ..." />
          <div
            onClick={() => {
              handleComment(postId);
            }}
            data-testid="handleComment"
            className={`text-blue-500 font-semibold ${comment ? 'block' : 'hidden'} cursor-pointer`}
          >
            Post
          </div>
          <Smile className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
export default PostCardCommentSection;
