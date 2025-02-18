import { CreateCommentDocument, GetCommentsDocument, UserPostType } from '@/generated';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { TbLoaderQuarter } from 'react-icons/tb';

const HomePostCreateComment = ({ post }: { post: UserPostType }) => {
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
    const trimmedText = text.trim();
    if (!trimmedText) return;

    await createComment({
      variables: { input: { postId: post?._id, comment: trimmedText, ownerId: post?.user?._id } },
    });

    setText('');
  };

  return (
    <div className="flex justify-between ">
      <input className="w-full outline-none px-3" placeholder="Add a comment..." value={text} onChange={(e) => setText(e.target.value.slice(0))} />
      <button onClick={handlePost} className={`cursor-pointer hover:text-black ${!text.trim() || loadingComment ? 'opacity-50 ' : ''}`} disabled={!text.trim() || loadingComment}>
        {loadingComment ? <TbLoaderQuarter className="animate-spin" /> : 'Post'}
      </button>
    </div>
  );
};

export default HomePostCreateComment;
