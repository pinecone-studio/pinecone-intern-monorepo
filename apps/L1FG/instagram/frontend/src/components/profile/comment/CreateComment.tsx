import { CreateCommentDocument, GetCommentsDocument } from '@/generated';
import { useMutation } from '@apollo/client';
import { Smile } from 'lucide-react';
import React, { useState } from 'react';
import { TbLoaderQuarter } from 'react-icons/tb';
const CreateComment = ({ postId }: { postId: string }) => {
  const [text, setText] = useState('');
  const [createComment, { loading: loadingComment }] = useMutation(CreateCommentDocument, {
    refetchQueries: [
      {
        query: GetCommentsDocument,
        variables: {
          input: {
            postId: postId,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handlePost = async () => {
    await createComment({ variables: { input: { postId, comment: text } } });
  };

  return (
    <div className="flex justify-between pb-3 pt-1 px-5 ">
      <div className="flex gap-3 justify-center items-center">
        <Smile />
      </div>
      <input className="w-full outline-none px-3" placeholder="Add a comment" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handlePost} className=" cursor-pointer hover:text-black" disabled={loadingComment}>
        {loadingComment ? <TbLoaderQuarter className="animate-spin" /> : 'Post'}
      </button>
    </div>
  );
};

export default CreateComment;
