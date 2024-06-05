import { useGetRepliesByCommentIdQuery } from '@/generated';
import { useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import CreateReply from '../ReplyComment/CreateReply';
import ReplyComment from '../ReplyComment';

type CommentsProps = {
  name?: string;
  comment?: string;
  id?: string | undefined | null;
  refetch: () => void;
};

const NotSignedUserComment = (props: CommentsProps) => {
  const { comment, name, id, refetch } = props;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { data } = useGetRepliesByCommentIdQuery({ variables: { commentId: id! } });
  const replyComments = data?.getRepliesByCommentId || [];

  return (
    <div>
      <div className="p-[32px] bg-white rounded-2xl  mt-6 ">
        <div className="items-stretch">
          <div>
            <div>
              <h1 className="text-[20px] font-bold">{name}</h1>
              <p className="text-[18px] font-normal mt-2">{comment}</p>
            </div>
          </div>
          <div className=" justify-between  grid grid-cols-2 h-[60px]">
            <div className="flex gap-[16px] justify-start">
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineLike className="h-[20px] w-[20px]" /> 0
              </button>
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineDislike className="h-[20px] w-[20px]" />0
              </button>
              <button id="show-reply-form-button-test-id" onClick={() => setShowReplyForm(!showReplyForm)} className="flex justify-center items-center gap-2 self-end">
                <FaReply /> Хариулах
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="flex justify-between items-center p-2">
        <FaReply />
        Хариулт 2
      </button>
      {showReplyForm && <CreateReply commentId={id!} refetch={refetch} />}
      {replyComments.map((item) => (
        <div key={item?._id}>{item?.reply && <ReplyComment id={item._id} refetch={refetch} reply={item.reply} name={item.name ?? ''} />}</div>
      ))}
    </div>
  );
};

export default NotSignedUserComment;
