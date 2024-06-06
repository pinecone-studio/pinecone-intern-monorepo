import { useGetRepliesByCommentIdQuery } from '@/generated';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { PiArrowBendDownRightBold } from 'react-icons/pi';
import { useState } from 'react';
import CreateReply from './CreateReply';
import ReplyComment from '.';
import EditReply from './EditReply';
import DeleteReply from './DeleteReply';
type SignedReplyProps = {
  id?: string | undefined | null;
  reply?: string;
  onReplySubmitted: () => void;
};
const SignedUserReply = (props: SignedReplyProps) => {
  const { id, reply, onReplySubmitted } = props;
  const { data, refetch: refetchReplies } = useGetRepliesByCommentIdQuery({ variables: { commentId: id! } });
  const replyComments = data?.getRepliesByCommentId || [];
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const handleReplySubmitted = () => {
    refetchReplies();
    setShowReplyForm(false);
    onReplySubmitted();
  };
  const handleEditReply = () => {
    setIsEditing(true);
  };
  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };
  const renderEditReply = () => (
    <EditReply
      onReplySubmitted={() => {
        setIsEditing(false);
        handleReplySubmitted();
      }}
      id={id}
      reply={reply}
    />
  );
  const renderReplyForm = () => showReplyForm && <CreateReply commentId={id!} onReplySubmitted={handleReplySubmitted} />;
  const renderReplies = () =>
    showReplies &&
    replyComments.map((item) => <div key={item?._id}>{item?.reply && <ReplyComment onReplySubmitted={handleReplySubmitted} id={item._id} reply={item.reply} name={item.name ?? ''} />}</div>);
  const renderReplyButton = () =>
    replyComments.length > 0 && (
      <div className="flex gap-2 items-center py-2">
        <button onClick={handleToggleReplies} className="flex items-center gap-2">
          <PiArrowBendDownRightBold />
          Хариу {replyComments.length}
        </button>
      </div>
    );
  return (
    <div className="px-4">
      <div className="p-[28px] rounded-2xl">
        <div className="items-stretch">
          <div>
            <div>
              <h1 className="text-[20px] font-bold">Таны сэтгэгдэл</h1>
              {isEditing ? renderEditReply() : <p className="text-[18px] font-normal mt-2">{reply}</p>}
            </div>
          </div>
          <div className="justify-between grid grid-cols-2 h-[60px]">
            <div className="flex gap-[16px]">
              <button onClick={handleEditReply} id="edit-comment-button-test-id" className="flex justify-center items-center gap-2 self-end">
                <MdOutlineEdit className="h-[20px] w-[20px]" />
                Засах
              </button>
              <DeleteReply id={id} onReplySubmitted={handleReplySubmitted} />
            </div>
            <div className="flex gap-[16px] justify-end">
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineLike className="h-[20px] w-[20px]" /> 0
              </button>
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineDislike className="h-[20px] w-[20px]" /> 0
              </button>
              <button id="show-reply-form-button-test-id" onClick={() => setShowReplyForm(!showReplyForm)} className="flex justify-center items-center gap-2 self-end">
                <FaReply /> Хариулах
              </button>
            </div>
          </div>
        </div>
      </div>
      {renderReplyButton()}
      {renderReplyForm()}
      {renderReplies()}
    </div>
  );
};

export default SignedUserReply;
