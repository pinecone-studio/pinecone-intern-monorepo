import { useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { useGetRepliesByCommentIdQuery } from '@/generated';
import ReplyComment from '.';
import CreateReply from './CreateReply';
import { PiArrowBendDownRightBold } from 'react-icons/pi';

type CommentsProps = {
  name?: string;
  id?: string | undefined | null;
  reply?: string;
};

const NotSignedUserReply = (props: CommentsProps) => {
  const { name, id, reply } = props;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { data, refetch: refetchReplies } = useGetRepliesByCommentIdQuery({ variables: { commentId: id! } });
  const replyComments = data?.getRepliesByCommentId || [];
  const [showReplies, setShowReplies] = useState(false);
  const handleReplySubmitted = () => {
    refetchReplies();
    setShowReplyForm(false);
  };
  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };
  return (
    <div>
      <div className="p-[32px] rounded-2xl  mt-6 ">
        <div className="items-stretch">
          <div>
            <div>
              <h1 className="text-[20px] font-bold">{name}</h1>
              <p className="text-[18px] font-normal mt-2">{reply}</p>
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
      {replyComments.length > 0 && (
        <div className="flex gap-2 items-center py-2">
          <button onClick={handleToggleReplies} className="flex items-center gap-2">
            <PiArrowBendDownRightBold />
            Хариу {replyComments.length}
          </button>
        </div>
      )}
      {showReplyForm && <CreateReply onReplySubmitted={handleReplySubmitted} commentId={id!} />}
      {showReplies &&
        replyComments.map((item) => <div key={item?._id}>{item?.reply && <ReplyComment onReplySubmitted={handleReplySubmitted} id={item._id} reply={item.reply} name={item.name ?? ''} />}</div>)}
    </div>
  );
};

export default NotSignedUserReply;
