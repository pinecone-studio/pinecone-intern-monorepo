import { CreateCommentDocument, GetCommentsDocument } from '@/generated';
import { useMutation } from '@apollo/client';
import { Smile } from 'lucide-react';
import React from 'react';

const CreateComment = ({ postId }: { postId: string }) => {
  const [text, setText] = React.useState('');
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
    <div className="flex justify-between py-2 px-5">
      <div className="flex gap-3 justify-center items-center">
        <Smile />
        <input className="w-full" placeholder="Add a comment" value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <button onClick={handlePost} className="text-[#2563EB] cursor-pointer hover:text-black" disabled={loadingComment}>
        {loadingComment ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};

export default CreateComment;
