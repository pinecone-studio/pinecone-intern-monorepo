import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { PiArrowBendDownRightBold } from 'react-icons/pi';
import { useState } from 'react';
import CreateReply from '../ReplyComment/CreateReply';
import ReplyComment from '../ReplyComment';
import DeleteComment from './DeleteComment';
import { useGetRepliesByCommentIdQuery } from '@/generated';
import EditComment from './EditComment';

type CommentsProps = {
  comment?: string;
  id?: string | undefined | null;
  refetch: () => void;
};

const SignedUserComment = (props: CommentsProps) => {
  const { comment, id, refetch } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { data, refetch: refetchReplies } = useGetRepliesByCommentIdQuery({ variables: { commentId: id! } });
  const replyComments = data?.getRepliesByCommentId || [];
  const handleCommentSubmitted = () => {
    refetchReplies();
    setShowReplyForm(false);
    refetch();
  };
  const handleEditComment = () => {
    setIsEditing(true);
  };
  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };
  const renderEditComment = () => (
    <EditComment
      onReplySubmitted={() => {
        setIsEditing(false);
        handleCommentSubmitted();
      }}
      id={id}
      comment={comment}
    />
  );
  const renderReplyForm = () => showReplyForm && <CreateReply commentId={id!} onReplySubmitted={handleCommentSubmitted} />;
  const renderReplies = () =>
    showReplies &&
    replyComments.map((item) => <div key={item?._id}>{item?.reply && <ReplyComment onReplySubmitted={handleCommentSubmitted} id={item._id} reply={item.reply} name={item.name ?? ''} />}</div>);
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
    <div>
      <div className="p-[32px] bg-white rounded-2xl ">
        <div className="items-stretch">
          <div>
            <div>
              <h1 className="text-[20px] font-bold">Таны сэтгэгдэл</h1>
              {isEditing ? renderEditComment() : <p className="text-[18px] font-normal mt-2">{comment}</p>}
            </div>
          </div>
          <div className=" justify-between  grid grid-cols-2 h-[60px]">
            <div className="flex gap-[16px] ">
              <button id="edit-comment-button-test-id" onClick={handleEditComment} className="flex justify-center items-center gap-2 self-end">
                <MdOutlineEdit className="h-[20px] w-[20px]" />
                Засах
              </button>
              <DeleteComment id={id} refetch={refetch} />
            </div>
            <div className="flex gap-[16px] justify-end">
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineLike className="h-[20px] w-[20px]" /> 0
              </button>
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineDislike className="h-[20px] w-[20px]" />0
              </button>
              <button className="flex justify-center items-center gap-2 self-end" onClick={() => setShowReplyForm(!showReplyForm)}>
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

export default SignedUserComment;
