/*eslint-disable*/
import { CreateCommentDocument, GetCommentsDocument, UserPostType } from '@/generated';
import { useMutation } from '@apollo/client';
import { Smile } from 'lucide-react';
import React, { forwardRef, useState } from 'react';
import { TbLoaderQuarter } from 'react-icons/tb';
type CreateCommentProps = {
  post: UserPostType;
};
const CreateComment = forwardRef<HTMLInputElement, CreateCommentProps>(({ post }, ref) => {
  const [text, setText] = useState('');
  const [createComment, { loading: loadingComment }] = useMutation(CreateCommentDocument, {
    refetchQueries: [
      {
        query: GetCommentsDocument,
        variables: {
          input: {
            postId: post?._id,
            after: '',
            first: 4,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handlePost = async () => {
    try {
      const trimmedText = text.trim();
      if (!trimmedText) return;

      await createComment({
        variables: { input: { postId: post?._id, comment: trimmedText, ownerId: post?.user?._id } },
      });

      setText('');
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <div className="flex justify-between pb-3 pt-1 px-5">
      <div className="flex gap-3 justify-center items-center">
        <Smile />
      </div>
      <input ref={ref} className="w-full outline-none px-3" placeholder="Add a comment..." value={text} onChange={(e) => setText(e.target.value.slice(0))} />
      <button onClick={handlePost} className={`cursor-pointer hover:text-black ${!text.trim() || loadingComment ? 'opacity-50 ' : ''}`} disabled={!text.trim() || loadingComment}>
        {loadingComment ? <TbLoaderQuarter className="animate-spin" /> : 'Post'}
      </button>
    </div>
  );
});

export default CreateComment;
